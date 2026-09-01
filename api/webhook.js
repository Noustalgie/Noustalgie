// api/webhook.js
// Webhook Stripe : déclenché AUTOMATIQUEMENT à chaque paiement réussi,
// que le client revienne ou non sur le site. Fiabilité totale.
const https = require('https');
const crypto = require('crypto');

// ─────────────────────────────────────────────
// Email via Resend
// ─────────────────────────────────────────────
async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) { console.log('Email non envoyé (pas de RESEND_API_KEY):', to); return; }
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length }
    }, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{ console.log('Email →',to,r.statusCode); resolve(); }); });
    req.on('error', e => { console.error('Email error:', e.message); resolve(); });
    req.write(buf); req.end();
  });
}

// ─────────────────────────────────────────────
// Créer la commande Prodigi
// ─────────────────────────────────────────────
async function createProdigiOrder({ pdfUrl, name, email, address, stripeSessionId }) {
  if (!process.env.PRODIGI_API_KEY) { console.log('PRODIGI_API_KEY manquante'); return null; }
  if (!pdfUrl) { console.log('Pas de PDF URL — commande Prodigi ignorée'); return null; }
  const parts = (address || '').split(',').map(s => s.trim());
  const line1 = parts[0] || '';
  let postalCode = '', city = '', country = 'FR';
  if (parts[1]) {
    const m = parts[1].match(/^(\d{4,5})\s+(.+)$/);
    if (m) { postalCode = m[1]; city = m[2]; } else { city = parts[1]; }
  }
  if (parts[2]) { const cc = parts[2].toUpperCase(); country = cc.includes('BELG')?'BE':cc.includes('SUISS')?'CH':'FR'; }
  const orderPayload = {
    merchantReference: `NOUST-${stripeSessionId||Date.now()}`,
    shippingMethod: 'Budget',
    idempotencyKey: `noustalgie-${stripeSessionId||Date.now()}`,
    recipient: {
      name: name,
      email: email,
      address: { line1, postalOrZipCode: postalCode, countryCode: country, townOrCity: city, isBusiness: false }
    },
    items: [{
      merchantReference: `album-${Date.now()}`,
      sku: 'BOOK-FE-8_3-SQ-HARD-G',
      copies: 1,
      sizing: 'fillPrintArea',
      assets: [{ printArea: 'default', url: pdfUrl }]
    }]
  };
  return new Promise((resolve) => {
    const buf = Buffer.from(JSON.stringify(orderPayload));
    const req = https.request({
      hostname: 'api.prodigi.com', path: '/v4.0/orders', method: 'POST',
      headers: { 'X-API-Key': process.env.PRODIGI_API_KEY, 'Content-Type': 'application/json', 'Content-Length': buf.length }
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        try {
          const body = JSON.parse(d);
          const orderId = body?.order?.id || body?.id;
          if (r.statusCode < 300) { console.log(`Commande Prodigi : ${orderId}`); resolve(orderId); }
          else { console.error(`Prodigi ${r.statusCode}:`, d.slice(0,300)); resolve(null); }
        } catch(e) { console.error('Prodigi parse error:', e.message); resolve(null); }
      });
    });
    req.on('error', e => { console.error('Prodigi error:', e.message); resolve(null); });
    req.write(buf); req.end();
  });
}

// ─────────────────────────────────────────────
// Vérifier la signature Stripe (sécurité)
// ─────────────────────────────────────────────
function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!secret || !sigHeader) return false;
  try {
    const parts = {};
    sigHeader.split(',').forEach(kv => { const [k,v] = kv.split('='); parts[k]=v; });
    const t = parts['t']; const v1 = parts['v1'];
    if (!t || !v1) return false;
    const signedPayload = `${t}.${rawBody}`;
    const expected = crypto.createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');
    // Comparaison à temps constant
    const a = Buffer.from(expected); const b = Buffer.from(v1);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch(e) { console.error('Signature verify error:', e.message); return false; }
}

// ─────────────────────────────────────────────
// Lire le corps brut de la requête (nécessaire pour la signature)
// ─────────────────────────────────────────────
function readRawBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

// ─────────────────────────────────────────────
// Handler principal
// ─────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await readRawBody(req);
  const sig = req.headers['stripe-signature'];
  const WH_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  // Vérifier la signature (si le secret est configuré)
  if (WH_SECRET) {
    if (!verifyStripeSignature(rawBody, sig, WH_SECRET)) {
      console.error('Signature webhook invalide');
      return res.status(400).send('Invalid signature');
    }
  } else {
    console.warn('STRIPE_WEBHOOK_SECRET non configuré — signature non vérifiée');
  }

  let event;
  try { event = JSON.parse(rawBody); }
  catch(e) { return res.status(400).send('Invalid JSON'); }

  // On ne traite que les paiements réussis
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: event.type });
  }

  const session = event.data.object;
  const m = session.metadata || {};
  const name    = m.name  || session.customer_details?.name || '';
  const email   = session.customer_email || session.customer_details?.email || m.email || '';
  const address = m.address || '';
  const names   = m.names || '';
  const pages   = m.pages || '30';
  const price   = m.price || '';
  const format  = m.format || 'print';
  const pdfUrl  = m.pdf_url || '';

  console.log(`Webhook paiement: ${name} (${email}) — ${format} — ${pages}p`);

  let prodigiOrderId = null;

  try {
    // Format PDF : envoyer le lien au client
    if (format === 'pdf' && pdfUrl && email) {
      await sendEmail({
        to: email,
        subject: 'Votre PDF Noustalgie est prêt ♥',
        html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#333;">
          <h1 style="color:#c9a05a;">Noustalgie</h1><h2>Bonjour ${name} ♥</h2>
          <p>Votre album PDF <b>${names}</b> est prêt !</p>
          <div style="text-align:center;margin:2rem 0;">
            <a href="${pdfUrl}" style="background:#c9a05a;color:#0e0b09;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:600;">Télécharger mon album PDF ↓</a>
          </div>
          <p style="color:#888;font-size:12px;">Ce lien est valide 14 jours.</p>
          <p>Merci ! ♥<br><b>L'équipe Noustalgie</b></p></div>`
      });
    }

    // Format imprimé : créer la commande Prodigi
    if (format === 'print' && pdfUrl) {
      prodigiOrderId = await createProdigiOrder({ pdfUrl, name, email, address, stripeSessionId: session.id });
    }

    // Email au propriétaire (toi)
    const NOTIFY = process.env.NOTIFY_EMAIL;
    if (NOTIFY) {
      const warn = (format === 'print' && !prodigiOrderId)
        ? '<p style="color:red"><b>⚠️ Commande Prodigi NON créée — à traiter manuellement !</b></p>' : '';
      await sendEmail({
        to: NOTIFY,
        subject: `🎉 Commande Noustalgie — ${name} — ${price}€${prodigiOrderId?' ✅ Prodigi':''}`,
        html: `<h2>Nouvelle commande (webhook) !</h2>
          <p><b>Client :</b> ${name} (${email})</p>
          <p><b>Couple :</b> ${names}</p>
          <p><b>Format :</b> ${format} · <b>Pages :</b> ${pages} · <b>Montant :</b> ${price}€</p>
          <p><b>Adresse :</b> ${address||'(PDF)'}</p>
          <p><b>PDF :</b> ${pdfUrl||'Non disponible'}</p>
          ${prodigiOrderId?`<p style="color:green"><b>✅ Prodigi : ${prodigiOrderId}</b></p>`:warn}
          <p><a href="https://dashboard.stripe.com">Voir Stripe</a></p>`
      });
    }

    // Email de confirmation au client (imprimé)
    if (format === 'print' && email) {
      await sendEmail({
        to: email,
        subject: 'Votre livre Noustalgie est en préparation ♥',
        html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#333;">
          <h1 style="color:#c9a05a;">Noustalgie</h1><h2>Bonjour ${name} ♥</h2>
          <p>Votre commande est confirmée. Votre livre <b>${names}</b> est en cours d'impression.</p>
          <p style="color:#888;font-size:13px;">Vous recevrez un email de suivi à l'expédition avec le numéro de tracking.</p>
          <p>Merci pour votre confiance 🎉<br><b>L'équipe Noustalgie</b></p></div>`
      });
    }
  } catch(e) {
    console.error('Erreur traitement webhook:', e.message);
    // On répond quand même 200 pour éviter que Stripe réessaie en boucle,
    // mais l'email NOTIFY avec le warning t'aura prévenu.
  }

  return res.status(200).json({ received: true, prodigiOrderId });
};

// IMPORTANT : désactiver le bodyParser de Vercel pour lire le corps brut
module.exports.config = { api: { bodyParser: false } };
