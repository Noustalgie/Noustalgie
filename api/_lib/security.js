// api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
const ALLOWED_ORIGINS = [
  'https://noustalgie.fr',
  'https://www.noustalgie.fr',
  'https://noustalgie.vercel.app',
];
// Previews Vercel du projet (noustalgie-xxxx-noustalgies-projects.vercel.app)
const PREVIEW_RE = /^https:\/\/noustalgie-[a-z0-9-]+-noustalgies-projects\.vercel\.app$/;

function originOf(req) {
  const o = req.headers['origin'];
  if (o) return o;
  const ref = req.headers['referer'] || '';
  try { return new URL(ref).origin; } catch (e) { return ''; }
}

function isAllowedOrigin(req) {
  const o = originOf(req);
  return ALLOWED_ORIGINS.includes(o) || PREVIEW_RE.test(o);
}

// CORS strict : on ne renvoie l'origine que si elle est autorisée
function applyCors(req, res, methods = 'POST, OPTIONS') {
  const o = originOf(req);
  if (ALLOWED_ORIGINS.includes(o) || PREVIEW_RE.test(o)) {
    res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Rate-limit en mémoire (par instance serverless — protection "best effort")
const buckets = new Map();
function rateLimit(req, key, max, windowMs) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const id = key + ':' + ip;
  const now = Date.now();
  const b = buckets.get(id);
  if (!b || now - b.start > windowMs) { buckets.set(id, { start: now, count: 1 }); return true; }
  b.count++;
  if (buckets.size > 5000) buckets.clear();
  return b.count <= max;
}

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return req.body;
}

module.exports = { isAllowedOrigin, applyCors, rateLimit, escapeHtml, parseBody };
