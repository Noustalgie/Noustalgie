// Essai (branche de test, jamais en production) : coût réel Prodigi du livre, d'après les commandes passées et l'API de devis.
const https = require('https');
const SKU = 'BOOK-FE-8_3-SQ-HARD-G';
function call(method, path, body) {
  return new Promise(resolve => {
    const buf = body ? Buffer.from(JSON.stringify(body)) : null;
    const req = https.request({ hostname: 'api.prodigi.com', path, method, timeout: 20000,
      headers: Object.assign({ 'X-API-Key': process.env.PRODIGI_API_KEY }, buf ? { 'Content-Type': 'application/json', 'Content-Length': buf.length } : {}) }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j || d.slice(0, 800) }); });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: 'timeout' }); });
    req.on('error', e => resolve({ status: 0, body: e.message }));
    if (buf) req.write(buf); req.end();
  });
}
module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ error: 'Not found' });
  const out = {};
  if (req.query && req.query.printapi) {                               // ?printapi=1 : prix Print API (compte de test)
    const pa = (method, path, body, token, form) => new Promise(resolve => {
      const buf = body ? Buffer.from(form ? body : JSON.stringify(body)) : null;
      const r2 = https.request({ hostname: 'test.printapi.nl', path, method, timeout: 20000, headers: Object.assign({ Accept: 'application/json' },
        token ? { Authorization: 'Bearer ' + token } : {}, buf ? { 'Content-Type': form ? 'application/x-www-form-urlencoded' : 'application/json', 'Content-Length': buf.length } : {}) }, r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j || d.slice(0, 600) }); });
      });
      r2.on('timeout', () => { r2.destroy(); resolve({ status: 0, body: 'timeout' }); }); r2.on('error', e => resolve({ status: 0, body: e.message }));
      if (buf) r2.write(buf); r2.end();
    });
    const t = await pa('POST', '/v2/oauth', `grant_type=client_credentials&client_id=${encodeURIComponent(process.env.PRINTAPI_CLIENT_ID)}&client_secret=${encodeURIComponent(process.env.PRINTAPI_SECRET)}`, null, true);
    const token = t.body && t.body.access_token;
    if (!token) return res.status(200).json({ etape: 'oauth', t });
    if (req.query.doc) {                                               // &doc=1 : pages de documentation Print API (texte)
      const get = u => new Promise(resolve => {
        const r2 = https.get(u, { timeout: 20000, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/json' } }, r => {
          let d = ''; r.on('data', c => d += c); r.on('end', () => resolve({ status: r.statusCode, loc: r.headers.location, texte: d.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 30000) }));
        });
        r2.on('timeout', () => { r2.destroy(); resolve({ status: 0 }); }); r2.on('error', e => resolve({ status: 0, err: e.message }));
      });
      for (const u of String(req.query.doc).split(',')) out[u] = await get(u);
      return res.status(200).json(out);
    }
    if (req.query.cherche) {                                           // &cherche=regex : produits dont l'id ou le nom correspond
      const tous = [];
      for (let off = 0; off < 700; off += 50) {
        const pg = await pa('GET', `/v2/products?offset=${off}&limit=50`, null, token);
        const r = pg.body && pg.body.results; if (!r || !r.length) break; tous.push(...r);
      }
      const re = new RegExp(req.query.cherche, 'i');
      out.trouve = tous.filter(x => re.test(x.id + ' ' + x.name)).map(x => x.id + ' | ' + x.name);
      if (req.query.brut) out.exemple = tous[0];
      return res.status(200).json(out);
    }
    if (req.query.ids) {                                               // &ids=a,b : détail et devis France d'objets sans pages
      out.objets = [];
      for (const pid of String(req.query.ids).split(',')) {
        const d = await pa('GET', `/v2/products/${pid}`, null, token);
        const q = await pa('POST', '/v2/shipping/quote', { country: 'FR', items: [{ productId: pid, quantity: 1 }] }, token);
        out.objets.push({ id: pid, produit: d.body, devis: q.body });
      }
      return res.status(200).json(out);
    }
    if (req.query.panier) {                                            // &panier=json : devis d'un panier complet (livre + objets)
      out.devis = await pa('POST', '/v2/shipping/quote', JSON.parse(req.query.panier), token);
      return res.status(200).json(out);
    }
    const id = req.query.id;
    if (!id) {
      const tous = [];
      for (let off = 0; off < 700; off += 50) {
        const pg = await pa('GET', `/v2/products?offset=${off}&limit=50`, null, token);
        const r = pg.body && pg.body.results; if (!r || !r.length) break; tous.push(...r);
      }
      out.livres = tous.filter(x => /boek|book|magazine|tijdschrift/i.test(x.name) && !/agenda|kartonnen/i.test(x.name)).map(x => x.id + ' | ' + x.name);
    }
    if (id) {
      const d = await pa('GET', `/v2/products/${id}`, null, token);
      out.produit = d.body;
      out.devis = [];
      for (const pages of [24, 36, 50]) for (const pays of ['FR', 'BE']) {
        const q = await pa('POST', '/v2/shipping/quote', { country: pays, items: [{ productId: id, quantity: 1, pageCount: pages }] }, token);
        out.devis.push({ pays, pages, status: q.status, reponse: q.body });
      }
    }
    return res.status(200).json(out);
  }
  if (req.query && req.query.sonde) {                                  // ?sonde=1 : quels autres livres Prodigi existent, et leur prix livré en France
    const cands = ['BOOK-FE-8_3-SQ-SOFT-G', 'BOOK-FE-8_3-SQ-SOFT-M', 'BOOK-FE-8_3-SQ-HARD-M', 'BOOK-FE-A4-P-HARD-G', 'BOOK-FE-A4-P-SOFT-G', 'BOOK-FE-A4-L-HARD-G',
      'BOOK-FE-A5-P-SOFT-G', 'BOOK-FE-11_7-SQ-HARD-G', 'BOOK-FE-11_8-SQ-HARD-G', 'BOOK-LF-8_3-SQ-HARD', 'BOOK-LF-8_3-SQ-HARD-M', 'BOOK-LF-8-SQ-HARD',
      'MAG-A4-P', 'BOOK-MAG-A4', 'BOOK-FE-A4-P-SADDLE', 'GLOBAL-MAG-A4', 'BOOK-FE-6_3-SQ-SOFT-G', 'BOOK-FE-6_3-SQ-HARD-G', 'BOOK-FE-8-SQ-HARD-G'];
    out.sonde = [];
    for (const sku of cands) {
      const p = await call('GET', `/v4.0/products/${sku}`);
      if (!(p.status < 300 && p.body && p.body.product)) { out.sonde.push({ sku, existe: false }); continue; }
      const pr = p.body.product, r = { sku, existe: true, description: pr.description, zones: Object.keys(pr.printAreas || {}), variantes: (pr.variants || []).length };
      for (const pages of [24, 36]) {
        const q = await call('POST', '/v4.0/quotes', { shippingMethod: 'Budget', destinationCountryCode: 'FR', currencyCode: 'EUR',
          items: [{ sku, copies: 1, attributes: {}, assets: [{ printArea: 'default', pageCount: pages }] }] });
        const qs = q.body && q.body.quotes && q.body.quotes[0];
        r['p' + pages] = qs ? { article: qs.costSummary.items.amount, port: qs.costSummary.shipping.amount, ttc: qs.costSummary.totalCost.amount, depuis: qs.shipments && qs.shipments[0] && qs.shipments[0].fulfillmentLocation }
          : (q.body && (q.body.outcome || JSON.stringify(q.body).slice(0, 200)));
      }
      out.sonde.push(r);
    }
    return res.status(200).json(out);
  }
  const o = await call('GET', '/v4.0/orders?top=5');
  out.commandes = o.body && o.body.orders ? o.body.orders.map(x => ({ id: x.id, cree: x.created, pays: x.recipient && x.recipient.address && x.recipient.address.countryCode,
    livraison: x.shippingMethod, statut: x.status && x.status.stage, charges: x.charges })) : o;
  out.devis = [];
  for (const pays of ['FR', 'BE']) for (const methode of ['Budget', 'Standard', 'Express']) for (const pages of [24, 36, 50]) {
    const q = await call('POST', '/v4.0/quotes', { shippingMethod: methode, destinationCountryCode: pays, currencyCode: 'EUR',
      items: [{ sku: SKU, copies: 1, attributes: {}, assets: [{ printArea: 'default', pageCount: pages }] }] });
    const qs = q.body && q.body.quotes && q.body.quotes[0];
    out.devis.push(qs ? { pays, methode, pages, total: qs.costSummary, livraison: qs.shipments && qs.shipments.map(s => ({ cout: s.cost, depuis: s.fulfillmentLocation, transporteur: s.carrier })) }
      : { pays, methode, pages, erreur: q.status, detail: q.body });
  }
  res.status(200).json(out);
};
