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
