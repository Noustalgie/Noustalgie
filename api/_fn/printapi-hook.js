// api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
// Sécurité : le corps ne contient qu'un numéro ; la commande est relue chez Print API avec notre clé avant tout envoi.
// Expédiée → email de suivi au client (adresse gardée dans les métadonnées de la commande) ; annulée → alerte à Gabin.
const https = require('https');
const { escapeHtml: h } = require('../_lib/security');
const PA = require('../_lib/printapi');

function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND || !to) return Promise.resolve();
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', reply_to: 'contact@noustalgie.fr', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({ hostname: 'api.resend.com', path: '/emails', method: 'POST', timeout: 10000,
      headers: { Authorization: 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length } },
      r => { r.on('data', () => {}); r.on('end', resolve); });
    req.on('timeout', () => { req.destroy(); resolve(); }); req.on('error', () => resolve()); req.write(buf); req.end();
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const b = req.body;
  const id = String((b && typeof b === 'object' ? b.orderId : new URLSearchParams(String(b || '')).get('orderId')) || '').trim();
  if (!/^NOUST-\d{6}-[A-Z0-9]{5}$/.test(id) || !PA.configured()) return res.status(200).json({ received: true, ignored: true });
  let o = null;
  try { o = await PA.getOrder(id); } catch (e) { console.error('printapi-hook:', e.message); }
  // Print API réessaie plus tard si on ne répond pas 200 : utile quand sa lecture a échoué
  if (!o) return res.status(503).json({ retry: true });
  let meta = {}; try { meta = JSON.parse(o.metadata || '{}'); } catch (e) {}

  if (o.status === 'Shipped') {
    const url = /^https?:\/\//.test(o.trackingUrl || '') ? o.trackingUrl : '';
    await sendEmail({
      to: meta.email,
      subject: 'Votre livre Noustalgie est en route ♥',
      html: `<div style="background:#f6f4f0;padding:32px 16px;font-family:Georgia,serif;"><div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e4dfd7;border-radius:14px;padding:32px 28px;color:#1c1a18;">
<div style="font-size:20px;margin-bottom:24px;">Nous<em>talgie</em></div>
<h2 style="font-weight:400;font-size:24px;margin:0 0 16px;">Bonjour ${h(meta.first || '')},</h2>
<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#5f5a54;">
<p>Votre livre vient d’être expédié.</p>
<div style="margin:24px 0;"><a href="${h(url || 'https://noustalgie.fr/#suivi')}" style="background:#1c1a18;color:#ffffff;padding:14px 26px;border-radius:999px;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;display:inline-block;">Suivre mon colis</a></div>
<p style="color:#8b857d;font-size:12px;">Le suivi peut mettre quelques heures à s’activer. Commande ${h(o.id)}.</p>
</div></div></div>`,
    });
    if (process.env.NOTIFY_EMAIL) await sendEmail({ to: process.env.NOTIFY_EMAIL, subject: `📦 Expédié — ${o.id}`,
      html: `<p>${h(meta.first || '')} (${h(meta.email || '?')}) — ${url ? `<a href="${h(url)}">suivi</a>` : 'pas encore de lien de suivi'}</p>` });
  } else if (o.status === 'Cancelled' && process.env.NOTIFY_EMAIL) {
    await sendEmail({ to: process.env.NOTIFY_EMAIL, subject: `⚠️ Print API a annulé ${o.id}`,
      html: `<p>La commande ${h(o.id)} de ${h(meta.first || '')} (${h(meta.email || '?')}) est annulée chez Print API. À vérifier dans le tableau de bord Print API.</p>` });
  }
  return res.status(200).json({ received: true, status: o.status });
};
