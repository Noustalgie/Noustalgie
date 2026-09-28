// api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');

const SKU = 'BOOK-FE-8_3-SQ-HARD-G';
const COUNTRIES = ['FR', 'BE', 'LU', 'MC', 'CH', 'DE', 'AT', 'NL', 'ES', 'PT', 'IT', 'IE'];
const cache = new Map();

function prodigiSpine(pages, country) {
  const buf = Buffer.from(JSON.stringify({ sku: SKU, destinationCountryCode: country, numberOfPages: pages }));
  return new Promise(resolve => {
    const req = https.request({ hostname: 'api.prodigi.com', path: '/v4.0/products/spine', method: 'POST', timeout: 12000,
      headers: { 'X-API-Key': process.env.PRODIGI_API_KEY, 'Content-Type': 'application/json', 'Content-Length': buf.length } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { const j = JSON.parse(d); resolve(j && j.spineInfo && j.spineInfo.widthMm > 0 ? j.spineInfo.widthMm : null); } catch (e) { resolve(null); } });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
    req.write(buf); req.end();
  });
}

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'spine', 20, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
  if (!process.env.PRODIGI_API_KEY) return res.status(500).json({ error: 'Configuration incomplète.' });
  const { pages, country } = parseBody(req);
  const n = parseInt(pages, 10), c = String(country || '').toUpperCase();
  if (![24, 36, 50].includes(n) || !COUNTRIES.includes(c)) return res.status(400).json({ error: 'Paramètres invalides.' });
  const key = n + c;
  if (!cache.has(key)) { const w = await prodigiSpine(n, c); if (w) cache.set(key, w); }
  const widthMm = cache.get(key) || null;
  return res.json({ widthMm });
};
