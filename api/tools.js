// api/tools.js — petites routes regroupées en une seule fonction
// (l'offre Vercel Hobby limite un déploiement à 12 fonctions serveur).
// Les adresses publiques restent les mêmes grâce aux « rewrites » de vercel.json.
const H = {
  promo: require('./_fn/promo'),
  'sign-upload': require('./_fn/sign-upload'),
  spine: require('./_fn/spine'),
  album: require('./_fn/album'),
  track: require('./_fn/track'),
  cancel: require('./_fn/cancel'),
  order: require('./_fn/order'),
};
const ALIAS = { 'order-status': 'track' };

module.exports = (req, res) => {
  let fn = String((req.query && req.query.fn) || '');
  if (!fn) { const m = String(req.url || '').match(/^\/(?:api\/)?([a-z-]+)/); if (m && m[1] !== 'tools') fn = m[1]; }
  fn = ALIAS[fn] || fn;
  const h = Object.prototype.hasOwnProperty.call(H, fn) ? H[fn] : null;
  if (!h) return res.status(404).json({ error: 'Not found' });
  return h(req, res);
};
