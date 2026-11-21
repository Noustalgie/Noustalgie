// /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, livraison par pays).
// &commande=NOUST-… : état d'une commande chez Print API (statut, fichiers acceptés ou non), sans les coordonnées du client.
// Jeton : variable SANTE_JETON. Lecture seule : aucune commande n'est créée.
const crypto = require('crypto');
const PA = require('../_lib/printapi');

const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

// &produits=boek_hc_a4_sta,… : fiches produit Print API (gabarits des fichiers, options comme le coffret, prix, délais)
// et devis de livraison en France ; « * » liste les identifiants des livres. &prodigi=SKU,… : fiches produit Prodigi.
const fiches = async (q) => {
  const out = {}, ids = s => String(s || '').split(',').map(x => x.trim()).filter(x => /^[A-Za-z0-9_*-]{1,48}$/.test(x)).slice(0, 12);
  const pa = ids(q.produits), pd = ids(q.prodigi);
  if (pa.length) {
    const t = await PA.token();
    out.printapi = {};
    for (const id of pa) {
      if (id === '*') { const r = await PA.call('GET', '/v2/products', null, t); out.printapi['*'] = r.status === 200 && Array.isArray(r.body) ? r.body.map(p => p.id).filter(x => /boek|book/i.test(x)) : { erreur: r.status, detail: String(r.raw).slice(0, 300) }; continue; }
      const r = await PA.call('GET', `/v2/products/${id}`, null, t);
      const q2 = await PA.call('POST', '/v2/shipping/quote', { country: 'FR', items: [{ productId: id, quantity: 1, pageCount: 34 }] }, t);
      out.printapi[id] = { fiche: r.status === 200 ? r.body : { erreur: r.status, detail: String(r.raw).slice(0, 300) }, livraisonFR: q2.status === 200 ? q2.body : { erreur: q2.status } };
    }
  }
  if (pd.length && process.env.PRODIGI_API_KEY) {
    out.prodigi = {};
    for (const sku of pd) {
      out.prodigi[sku] = await new Promise(resolve => {
        const r = require('https').request({ hostname: 'api.prodigi.com', path: `/v4.0/products/${encodeURIComponent(sku)}`, method: 'GET', timeout: 15000, headers: { 'X-API-Key': process.env.PRODIGI_API_KEY } }, rs => {
          let d = ''; rs.on('data', c => d += c); rs.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ erreur: rs.statusCode }); } });
        });
        r.on('timeout', () => { r.destroy(); resolve({ erreur: 'timeout' }); }); r.on('error', e => resolve({ erreur: e.message })); r.end();
      });
    }
  }
  return out;
};

module.exports = async (req, res) => {
  const J = process.env.SANTE_JETON, q = req.query || {};
  if (!J || !same(q.jeton || '', J)) return res.status(401).json({ error: 'Unauthorized' });
  if (q.produits || q.prodigi) {
    try { return res.status(200).json(Object.assign({ hote: PA.host() }, await fiches(q))); } catch (e) { return res.status(502).json({ erreur: e.message }); }
  }
  const out = { hote: PA.host(), configure: PA.configured() };
  const ref = String((req.query && req.query.commande) || '');
  if (/^NOUST-\d{6}-[A-Z0-9]{5}(-R\d?)?$/.test(ref)) {
    try {
      const o = await PA.getOrder(ref);
      if (!o) return res.status(404).json({ erreur: 'Commande inconnue chez Print API' });
      delete o.shipping; delete o.customer; delete o.metadata; delete o.email;   // pas de données personnelles dans la réponse
      return res.status(200).json(Object.assign(out, { commande: o }));
    } catch (e) { return res.status(502).json({ erreur: e.message }); }
  }
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
