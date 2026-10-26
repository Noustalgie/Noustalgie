// /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, livraison par pays).
// Jeton : variable SANTE_JETON. Lecture seule : aucune commande n'est créée.
const crypto = require('crypto');
const PA = require('../_lib/printapi');

const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

module.exports = async (req, res) => {
  const J = process.env.SANTE_JETON;
  if (!J || !same((req.query && req.query.jeton) || '', J)) return res.status(401).json({ error: 'Unauthorized' });
  const out = { hote: PA.host(), configure: PA.configured() };
  try {
    const t = await PA.token();
    out.oauth = true;
    const produit = async id => { const r = await PA.call('GET', `/v2/products/${id}`, null, t); return r.status === 200 && r.body ? r.body : { erreur: r.status }; };
    const livre = await produit(PA.BOOK);
    const box = ((livre.options || []).find(o => o.id === 'storage_box') || { choices: [] }).choices.find(c => c.value === 'yes');
    out.livre = { cout: livre.cost, coffret: box ? box.cost : null, delais: livre.productionTimes };
    out.objets = {};
    for (const [k, id] of Object.entries(PA.EXTRAS)) { const p = await produit(id); out.objets[k] = p.cost || p; }
    const pays = String((req.query && req.query.pays) || 'FR').split(',').filter(c => /^[A-Z]{2}$/.test(c)).slice(0, 20);
    out.livraison = {};
    await Promise.all(pays.map(async c => {
      const q = await PA.call('POST', '/v2/shipping/quote', { country: c, items: [{ productId: PA.BOOK, quantity: 1, pageCount: PA.innerCount(36) }] }, t);
      out.livraison[c] = q.status === 200 && q.body ? q.body : { erreur: q.status, detail: String(q.raw).slice(0, 200) };
    }));
  } catch (e) { out.oauth = false; out.erreur = e.message; }
  return res.status(200).json(out);
};
