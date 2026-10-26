// Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
const https = require('https');
const crypto = require('crypto');
const { rateLimit } = require('../_lib/security');

function getSession(id) {
  return new Promise(resolve => {
    if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id) || !process.env.STRIPE_SECRET_KEY) return resolve(null);
    const req = https.get({ hostname: 'api.stripe.com', path: `/v1/checkout/sessions/${id}`, timeout: 6000,
      headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(null); } });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
  });
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).end();
  if (!rateLimit(req, 'order', 30, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  const id = new URLSearchParams((req.url || '').split('?')[1] || '').get('session_id') || '';
  const s = await getSession(id);
  if (!s || !s.id) return res.status(404).json({ paid: false });
  const m = s.metadata || {};
  // Google Avis clients : même numéro que l'email de confirmation (webhook.js), date au plus tard du délai annoncé
  const d = new Date((s.created || Date.now() / 1000) * 1000);
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const prodigi = ['CH', 'LU', 'MC'].includes(m.addr_country) && !String(m.options || '').trim() || !m.pa_cover;
  let jours = prodigi ? 12 : m.addr_country === 'FR' ? 8 : 10;        // jours ouvrés : 6 à 8 en France, un peu plus ailleurs, 10 à 12 chez Prodigi
  const liv = new Date(d);
  while (jours > 0) { liv.setDate(liv.getDate() + 1); if (liv.getDay() % 6) jours--; }
  return res.json({
    paid: s.payment_status === 'paid',
    firstName: String(m.first_name || String(m.name || '').trim().split(' ')[0]).slice(0, 40),
    pages: String(m.pages || '').slice(0, 3),
    price: typeof s.amount_total === 'number' ? (s.amount_total / 100).toFixed(2).replace('.', ',') : '',
    format: m.format === 'pdf' ? 'pdf' : 'print',
    email: String((s.customer_details && s.customer_details.email) || s.customer_email || '').slice(0, 120),
    order: `NOUST-${ymd}-${crypto.createHash('sha1').update(s.id).digest('hex').slice(0, 5).toUpperCase()}`,
    country: /^[A-Z]{2}$/.test(m.addr_country || '') ? m.addr_country : '',
    delivery: liv.toISOString().slice(0, 10),
  });
};
