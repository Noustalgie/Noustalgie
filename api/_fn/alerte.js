// /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte,
// pour corriger avant que d'autres clients tombent dessus. Limité par adresse IP, aucune donnée de paiement.
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, escapeHtml: h, parseBody } = require('../_lib/security');

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
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'alerte', 6, 10 * 60 * 1000)) return res.status(429).json({ ok: false });
  const b = parseBody(req) || {};
  const c = (v, n) => String(v == null ? '' : v).slice(0, n);
  const lignes = [['Étape', c(b.etape, 40)], ['Erreur', c(b.erreur, 500)], ['Pages (album / choisies)', `${c(b.pagesAlbum, 4)} / ${c(b.pages, 4)}`],
    ['Format', c(b.format, 10)], ['Style', c(b.style, 40)], ['Options', c(b.options, 120)], ['Pays', c(b.pays, 4)], ['Langue', c(b.langue, 4)],
    ['Photos', c(b.photos, 6)], ['Client', c(b.email, 120)], ['Navigateur', c(b.ua, 300)]];
  console.error('alerte paiement:', c(b.etape, 40), c(b.erreur, 300));
  if (process.env.NOTIFY_EMAIL) await sendEmail({ to: process.env.NOTIFY_EMAIL, subject: `⚠️ Paiement bloqué : ${c(b.erreur, 80) || 'erreur inconnue'}`,
    html: `<h2>Un client n'a pas pu payer</h2><table>${lignes.map(([k, v]) => `<tr><td style="padding:2px 12px 2px 0;color:#666">${h(k)}</td><td>${h(v)}</td></tr>`).join('')}</table><p>Le client n'a pas été débité.</p>` });
  return res.status(200).json({ ok: true });
};
