// api/prodigi-webhook.js
// Reçoit les callbacks Prodigi. Quand une commande est expédiée (shipment avec tracking),
// envoie automatiquement le numéro de suivi au client par email.
const https = require('https');

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

function readRawBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const rawBody = await readRawBody(req);
  let event;
  try { event = JSON.parse(rawBody); }
  catch(e) { return res.status(400).send('Invalid JSON'); }

  // Le callback Prodigi est un CloudEvent : { type, data: { order: {...} } }
  const type = event.type || '';
  const order = event.data?.order || event.data || {};
  const shipments = order.shipments || [];
  const recipient = order.recipient || {};
  const email = recipient.email || '';
  const name = (recipient.name || '').split(' ')[0] || '';
  const merchantRef = order.merchantReference || '';

  console.log(`Prodigi callback: ${type} — order ${order.id} — ${shipments.length} shipment(s)`);

  // Chercher un shipment expédié avec un tracking
  let tracking = null;
  for (const s of shipments) {
    if (s.tracking && (s.tracking.number || s.tracking.url)) {
      tracking = s.tracking;
      break;
    }
  }

  // On envoie le mail de suivi UNIQUEMENT si :
  // - il y a un tracking disponible
  // - il y a un email client
  // - c'est un événement d'expédition ou de complétion
  const isShipEvent = /shipment/i.test(type) || /Complete/i.test(type) || /shipping/i.test(type);

  if (tracking && email && (isShipEvent || shipments.length > 0)) {
    const trackNumber = tracking.number || '';
    const trackUrl = tracking.url || '';
    // Éviter les doublons : on pourrait stocker un flag, mais Prodigi n'envoie
    // le shipment qu'une fois normalement. On envoie donc directement.
    await sendEmail({
      to: email,
      subject: 'Votre livre Noustalgie a été expédié ! ♥',
      html: `<div style="font-family:'Times New Roman',Georgia,serif;max-width:480px;margin:0 auto;color:#111;border:1px solid #e2e2e2;padding:2rem;">
        <h1 style="color:#111;">Noustalgie</h1>
        <h2>Bonjour ${name} ♥</h2>
        <p>Bonne nouvelle : votre livre a été expédié et est en route vers vous ! 📦</p>
        ${trackNumber?`<table style="width:100%;margin:1rem 0;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Numéro de suivi</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">${trackNumber}</td></tr>
        </table>`:''}
        ${trackUrl?`<div style="text-align:center;margin:1.5rem 0;">
          <a href="${trackUrl}" style="background:#111;color:#fff;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:600;">Suivre mon colis →</a>
        </div>`:''}
        <p style="color:#888;font-size:13px;">La livraison prend généralement 3 à 5 jours ouvrés. Le suivi peut mettre quelques heures à s'activer.</p>
        <p style="margin-top:1.5rem;">Merci pour votre confiance 🎉<br><b>L'équipe Noustalgie</b></p>
      </div>`
    });

    // Notifier le propriétaire aussi
    const NOTIFY = process.env.NOTIFY_EMAIL;
    if (NOTIFY) {
      await sendEmail({
        to: NOTIFY,
        subject: `📦 Expédié — ${recipient.name||''} — ${trackNumber||'sans n°'}`,
        html: `<h2>Commande expédiée</h2>
          <p><b>Client :</b> ${recipient.name} (${email})</p>
          <p><b>Réf :</b> ${merchantRef}</p>
          <p><b>Tracking :</b> ${trackNumber||'—'}</p>
          <p><b>URL :</b> ${trackUrl||'—'}</p>
          <p>Email de suivi envoyé au client automatiquement ✅</p>`
      });
    }
  }

  // Toujours répondre 200 rapidement (Prodigi attend une réponse rapide)
  return res.status(200).json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
