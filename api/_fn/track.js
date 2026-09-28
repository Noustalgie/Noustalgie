// api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('../_lib/security');
const REF = /^NOUST-\d{6}-[A-Z0-9]{5}$/;

function prodigi(path) {
  return new Promise(resolve => {
    const req = https.request({ hostname: 'api.prodigi.com', path, method: 'GET', timeout: 15000, headers: { 'X-API-Key': process.env.PRODIGI_API_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(null); } });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null)); req.end();
  });
}

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'track', 15, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de tentatives, réessayez plus tard.' });
  if (!process.env.PRODIGI_API_KEY) return res.status(500).json({ error: 'Configuration incomplète.' });
  const { ref, email } = parseBody(req);
  const R = String(ref || '').trim().toUpperCase(), E = String(email || '').trim().toLowerCase();
  if (!REF.test(R) || !E.includes('@')) return res.status(400).json({ error: 'Vérifiez le numéro de commande et l’email.' });
  const j = await prodigi(`/v4.0/orders?merchantReferences=${encodeURIComponent(R)}&top=1`);
  const o = j && Array.isArray(j.orders) ? j.orders[0] : null;
  // Même réponse que la commande n'existe pas ou que l'email ne correspond pas (pas d'information divulguée)
  if (!o || String(o.recipient && o.recipient.email || '').toLowerCase() !== E) return res.status(404).json({ error: 'Aucune commande ne correspond à ce numéro et cet email.' });
  const st = o.status || {}, d = st.details || {};
  let step = 1;                                                     // 1 reçue · 2 en fabrication · 3 expédiée
  if (['InProgress', 'Complete'].includes(d.inProduction) || ['InProgress', 'Complete'].includes(d.allocateProductionLocation)) step = 2;
  if (['InProgress', 'Complete'].includes(d.shipping) || (o.shipments || []).some(s => s.status === 'Shipped' || (s.tracking && s.tracking.number))) step = 3;
  const cancelled = st.stage === 'Cancelled';
  const shipments = (o.shipments || []).map(s => ({
    carrier: s.carrier && s.carrier.name || '', number: s.tracking && s.tracking.number || '',
    url: s.tracking && /^https:\/\//.test(s.tracking.url || '') ? s.tracking.url : '', date: s.dispatchDate || '',
  }));
  return res.json({ ref: R, created: o.created || '', step, cancelled, shipments, city: o.recipient && o.recipient.address && o.recipient.address.townOrCity || '' });
};
