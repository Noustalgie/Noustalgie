// api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
// que le client revienne ou non sur le site.
const https = require('https');
const crypto = require('crypto');
const { escapeHtml: h } = require('./_lib/security');

async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) { console.log('Email non envoyé (pas de RESEND_API_KEY):', to); return; }
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', reply_to: 'contact@noustalgie.fr', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length },
    }, r => { r.on('data', () => {}); r.on('end', () => { console.log('Email →', to, r.statusCode); resolve(); }); });
    req.on('error', e => { console.error('Email error:', e.message); resolve(); });
    req.write(buf); req.end();
  });
}

// Pays de livraison (Europe + Suisse) à partir du texte saisi
const COUNTRIES = [
  ['BE', /BELG/], ['CH', /SUIS|SWITZ|SCHWEIZ|SVIZZ/], ['LU', /LUXEM/], ['MC', /MONACO/],
  ['DE', /ALLEM|GERMAN|DEUTSCH/], ['ES', /ESPAG|SPAIN|ESPAÑA|ESPANA/], ['IT', /ITAL/],
  ['PT', /PORTUG/], ['NL', /PAYS-BAS|PAYS BAS|NETHERL|NEDERL|HOLLAN/], ['AT', /AUTRICH|AUSTRI|ÖSTERR/],
  ['IE', /IRLAND|IRELAND/], ['GB', /ROYAUME|UNITED KINGDOM|\bUK\b|ANGLET/], ['CA', /CANAD/],
  ['FR', /FRANCE/],
];
function detectCountry(text) {
  const t = String(text || '').toUpperCase();
  for (const [code, re] of COUNTRIES) if (re.test(t)) return code;
  return 'FR';
}

async function createProdigiOrder({ pdfUrl, name, email, address, stripeSessionId, orderNumber, pages }) {
  if (!process.env.PRODIGI_API_KEY) { global.__lastProdigiError = 'PRODIGI_API_KEY manquante'; return null; }
  if (!pdfUrl) { global.__lastProdigiError = 'Pas de PDF'; return null; }
  const parts = (address || '').split(',').map(s => s.trim()).filter(Boolean);
  let postalCode = '', city = '', postalIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    const m = parts[i].match(/^([A-Z]{0,2}-?\d{4,5}(?:\s?[A-Z]{2})?)\s+(.+)$/i);
    if (m) { postalCode = m[1]; city = m[2]; postalIdx = i; break; }
  }
  const addressParts = postalIdx >= 0 ? parts.slice(0, postalIdx) : parts.slice(0, Math.max(1, parts.length - 1));
  const line1 = addressParts.join(', ') || (parts[0] || '');
  const country = detectCountry(postalIdx >= 0 ? parts.slice(postalIdx + 1).join(' ') : parts[parts.length - 1]);

  const orderPayload = {
    merchantReference: orderNumber,
    shippingMethod: 'Budget',
    idempotencyKey: `noustalgie-${stripeSessionId}`,
    recipient: { name, email, address: { line1, postalOrZipCode: postalCode, countryCode: country, townOrCity: city, isBusiness: false } },
    items: [{
      merchantReference: `album-${stripeSessionId}`,
      sku: 'BOOK-FE-8_3-SQ-HARD-G',
      copies: 1,
      sizing: 'fillPrintArea',
      assets: [{ printArea: 'default', url: pdfUrl, pageCount: parseInt(pages, 10) || 36 }],
    }],
  };
  return new Promise(resolve => {
    const buf = Buffer.from(JSON.stringify(orderPayload));
    const req = https.request({
      hostname: 'api.prodigi.com', path: '/v4.0/orders', method: 'POST',
      headers: { 'X-API-Key': process.env.PRODIGI_API_KEY, 'Content-Type': 'application/json', 'Content-Length': buf.length },
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        try {
          const body = JSON.parse(d);
          const orderId = body?.order?.id || body?.id;
          if (r.statusCode < 300) { console.log(`Commande Prodigi : ${orderId}`); resolve(orderId); }
          else { global.__lastProdigiError = `HTTP ${r.statusCode} — ${d.slice(0, 600)}`; console.error(global.__lastProdigiError); resolve(null); }
        } catch (e) { global.__lastProdigiError = 'Parse error: ' + String(d).slice(0, 400); resolve(null); }
      });
    });
    req.on('error', e => { global.__lastProdigiError = 'Erreur réseau: ' + e.message; resolve(null); });
    req.write(buf); req.end();
  });
}

function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!secret || !sigHeader) return false;
  try {
    const parts = {};
    sigHeader.split(',').forEach(kv => { const i = kv.indexOf('='); parts[kv.slice(0, i)] = kv.slice(i + 1); });
    const t = parts.t, v1 = parts.v1;
    if (!t || !v1) return false;
    // Refuse les événements de plus de 5 minutes (anti-rejeu)
    if (Math.abs(Date.now() / 1000 - parseInt(t, 10)) > 300) return false;
    const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`, 'utf8').digest('hex');
    const a = Buffer.from(expected), b = Buffer.from(v1);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (e) { return false; }
}

function readRawBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

// Gabarit email commun, aux couleurs du site
const mail = (title, inner) => `<div style="background:#0e0b09;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
<div style="max-width:480px;margin:0 auto;background:#141008;border:1px solid rgba(210,175,120,.2);padding:32px 28px;color:#f2ebe0;">
<div style="font-size:20px;margin-bottom:24px;">Nous<em style="color:#c9a05a;">talgie</em></div>
<h2 style="font-weight:400;font-size:22px;margin:0 0 16px;">${title}</h2>
<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(242,235,224,.8);">${inner}</div>
<p style="font-family:Arial,sans-serif;font-size:12px;color:rgba(242,235,224,.4);margin-top:28px;">Une question ? Répondez simplement à cet email.</p>
</div></div>`;
const btn = (href, label) => `<div style="margin:24px 0;"><a href="${h(href)}" style="background:#c9a05a;color:#0e0b09;padding:14px 26px;text-decoration:none;font-weight:600;font-size:14px;display:inline-block;">${label}</a></div>`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const WH_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!WH_SECRET) { console.error('STRIPE_WEBHOOK_SECRET manquant — webhook refusé'); return res.status(500).send('Not configured'); }

  const rawBody = await readRawBody(req);
  if (!verifyStripeSignature(rawBody, req.headers['stripe-signature'], WH_SECRET)) {
    console.error('Signature webhook invalide');
    return res.status(400).send('Invalid signature');
  }

  let event;
  try { event = JSON.parse(rawBody); } catch (e) { return res.status(400).send('Invalid JSON'); }
  if (event.type !== 'checkout.session.completed') return res.status(200).json({ received: true, ignored: event.type });

  const session = event.data.object;
  if (session.payment_status !== 'paid') return res.status(200).json({ received: true, ignored: 'unpaid' });

  const m = session.metadata || {};
  const name = m.name || session.customer_details?.name || '';
  const email = session.customer_details?.email || session.customer_email || m.email || '';
  const address = m.address || '';
  const names = m.names || '';
  const pages = m.pages || '36';
  const price = typeof session.amount_total === 'number' ? (session.amount_total / 100).toFixed(2) : (m.price || '');
  const format = m.format === 'pdf' ? 'pdf' : 'print';
  const pdfUrl = m.pdf_url || '';
  const first = String(name).trim().split(' ')[0];

  // Numéro de commande stable (dérivé de la session → identique si Stripe renvoie l'événement)
  const d = new Date((session.created || Date.now() / 1000) * 1000);
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const orderNumber = `NOUST-${ymd}-${crypto.createHash('sha1').update(session.id).digest('hex').slice(0, 5).toUpperCase()}`;

  let prodigiOrderId = null;
  try {
    if (format === 'pdf' && pdfUrl && email) {
      await sendEmail({
        to: email,
        subject: 'Votre album Noustalgie est prêt ♥',
        html: mail(`Bonjour ${h(first)},`, `<p>Votre album <b>${h(names)}</b> est prêt.</p>${btn(pdfUrl, 'Télécharger mon album (PDF)')}<p style="color:rgba(242,235,224,.5);font-size:12px;">Lien valable 14 jours — pensez à l’enregistrer. N° de commande : ${orderNumber}</p>`),
      });
    }

    if (format === 'print' && pdfUrl) {
      prodigiOrderId = await createProdigiOrder({ pdfUrl, name, email, address, stripeSessionId: session.id, orderNumber, pages });
    }

    const NOTIFY = process.env.NOTIFY_EMAIL;
    if (NOTIFY) {
      const warn = (format === 'print' && !prodigiOrderId)
        ? `<p style="color:#e07070"><b>⚠️ Commande Prodigi NON créée — à traiter manuellement !</b><br><small>${h(global.__lastProdigiError || 'aucune erreur capturée')}</small></p>` : '';
      await sendEmail({
        to: NOTIFY,
        subject: `🎉 ${orderNumber} — ${first} — ${price}€${prodigiOrderId ? ' ✅ Prodigi' : format === 'print' ? ' ⚠️ À TRAITER' : ''}`,
        html: `<h2>Nouvelle commande</h2>
          <p><b>N° :</b> ${orderNumber}<br><b>Client :</b> ${h(name)} (${h(email)})<br><b>Couple :</b> ${h(names)}</p>
          <p><b>Format :</b> ${format} · <b>Pages :</b> ${h(pages)} · <b>Montant :</b> ${h(price)}€${m.promo ? ` · <b>Promo :</b> ${h(m.promo)}` : ''}</p>
          <p><b>Adresse :</b> ${h(address || '(PDF)')}</p>
          <p><b>PDF :</b> ${pdfUrl ? `<a href="${h(pdfUrl)}">ouvrir</a>` : 'Non disponible'}</p>
          ${prodigiOrderId ? `<p style="color:green"><b>✅ Prodigi : ${h(prodigiOrderId)}</b></p>` : warn}
          <p><a href="https://dashboard.stripe.com/payments">Voir Stripe</a></p>`,
      });
    }

    if (format === 'print' && email) {
      await sendEmail({
        to: email,
        subject: 'Votre livre Noustalgie part à l’impression ♥',
        html: mail(`Bonjour ${h(first)},`, `<p>Votre commande est confirmée : le livre <b>${h(names)}</b> part à l’impression.</p>
          <p>N° de commande : <b style="color:#f2ebe0;">${orderNumber}</b><br>Format : 21×21 cm, couverture rigide, ${h(pages)} pages<br>Livraison estimée : 3 à 5 jours ouvrés</p>
          <p>Vous recevrez le numéro de suivi par email dès l’expédition.</p>`),
      });
    }
  } catch (e) {
    console.error('Erreur traitement webhook:', e.message);
  }
  return res.status(200).json({ received: true, orderNumber, prodigiOrderId });
};

module.exports.config = { api: { bodyParser: false } };
