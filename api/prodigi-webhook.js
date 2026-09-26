// api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
// Sécurité : on ne fait PAS confiance au contenu reçu. On relit la commande
// directement chez Prodigi avec notre clé API avant d'envoyer quoi que ce soit.
const https = require('https');
const { escapeHtml: h } = require('./_lib/security');

async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) return;
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', reply_to: 'contact@noustalgie.fr', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({ hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length } },
      r => { r.on('data', () => {}); r.on('end', resolve); });
    req.on('error', () => resolve()); req.write(buf); req.end();
  });
}

function readRawBody(req) {
  return new Promise(resolve => { let d = ''; req.on('data', c => d += c); req.on('end', () => resolve(d)); req.on('error', () => resolve('')); });
}

function fetchOrder(id) {
  return new Promise(resolve => {
    if (!/^ord_[A-Za-z0-9]+$/.test(id || '') || !process.env.PRODIGI_API_KEY) return resolve(null);
    https.get({ hostname: 'api.prodigi.com', path: `/v4.0/orders/${id}`, headers: { 'X-API-Key': process.env.PRODIGI_API_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(r.statusCode < 300 ? (JSON.parse(d).order || null) : null); } catch (e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  let event;
  try { event = JSON.parse(await readRawBody(req)); } catch (e) { return res.status(400).send('Invalid JSON'); }

  const claimedId = event?.data?.order?.id || event?.data?.id || '';
  const order = await fetchOrder(claimedId);
  if (!order) return res.status(200).json({ received: true, ignored: 'unverified' });
  // Uniquement nos commandes
  if (!String(order.merchantReference || '').startsWith('NOUST-')) return res.status(200).json({ received: true, ignored: 'foreign' });

  const tracking = (order.shipments || []).map(s => s.tracking).find(t => t && (t.number || t.url));
  const email = order.recipient?.email || '';
  if (!tracking || !email) return res.status(200).json({ received: true });

  const first = String(order.recipient?.name || '').split(' ')[0];
  const url = /^https:\/\//.test(tracking.url || '') ? tracking.url : '';
  await sendEmail({
    to: email,
    subject: 'Votre livre Noustalgie est en route ♥',
    html: `<div style="background:#0e0b09;padding:32px 16px;font-family:Georgia,serif;"><div style="max-width:480px;margin:0 auto;background:#141008;border:1px solid rgba(210,175,120,.2);padding:32px 28px;color:#f2ebe0;">
<div style="font-size:20px;margin-bottom:24px;">Nous<em style="color:#c9a05a;">talgie</em></div>
<h2 style="font-weight:400;font-size:22px;margin:0 0 16px;">Bonjour ${h(first)},</h2>
<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:rgba(242,235,224,.8);">
<p>Votre livre vient d’être expédié.</p>
${tracking.number ? `<p>N° de suivi : <b style="color:#f2ebe0;">${h(tracking.number)}</b></p>` : ''}
${url ? `<div style="margin:24px 0;"><a href="${h(url)}" style="background:#c9a05a;color:#0e0b09;padding:14px 26px;text-decoration:none;font-weight:600;display:inline-block;">Suivre mon colis</a></div>` : ''}
<p style="color:rgba(242,235,224,.5);font-size:12px;">Le suivi peut mettre quelques heures à s’activer. Commande ${h(order.merchantReference)}.</p>
</div></div></div>`,
  });
  if (process.env.NOTIFY_EMAIL) {
    await sendEmail({ to: process.env.NOTIFY_EMAIL, subject: `📦 Expédié — ${h(order.merchantReference)}`,
      html: `<p>${h(order.recipient?.name)} (${h(email)}) — suivi ${h(tracking.number || '—')} ${url ? `<a href="${h(url)}">lien</a>` : ''}</p>` });
  }
  return res.status(200).json({ received: true });
};

module.exports.config = { api: { bodyParser: false } };
