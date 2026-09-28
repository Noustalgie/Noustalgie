// api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('../_lib/security');
const { checkPromo } = require('../_lib/promo');

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ valid: false, error: 'Origine non autorisée.' });
  // Anti force brute : 10 essais / 10 min par IP
  if (!rateLimit(req, 'promo', 10, 10 * 60 * 1000)) {
    return res.status(429).json({ valid: false, error: 'Trop d’essais. Réessayez plus tard.' });
  }
  const { code } = parseBody(req);
  const r = await checkPromo(code);
  if (!r.valid) return res.json({ valid: false, error: r.error });
  return res.json({ valid: true, discount: r.discount, type: r.type });
};
