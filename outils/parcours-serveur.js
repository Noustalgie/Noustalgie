// Serveur de test du parcours de commande : les vraies fonctions api/generate-pdf.js et api/create-checkout.js,
// avec PDFShift, Cloudinary, Stripe et Print API simulés (aucun appel réseau, aucune commande).
// Lancé par outils/parcours-commande.py ; écrit son port sur la sortie standard.
const http = require('http'), https = require('https'), path = require('path'), { EventEmitter } = require('events');
const R = path.join(__dirname, '..') + '/';
Object.assign(process.env, { CLOUDINARY_CLOUD_NAME: 'daxkn7pyb', CLOUDINARY_API_KEY: 'k', CLOUDINARY_API_SECRET: 'secret-parcours', PDFSHIFT_API_KEY: 'p',
  STRIPE_SECRET_KEY: 'sk_test', PRINTAPI_CLIENT_ID: 'c', PRINTAPI_SECRET: 's', PROMO_CODES: 'MOITIE:50' });
delete process.env.NOTIFY_EMAIL; delete process.env.RESEND_API_KEY;

let dernierStripe = null, n = 0;
https.request = (opts, cb) => {
  const req = new EventEmitter(); let body = '';
  req.write = b => { body += b; }; req.setTimeout = () => {}; req.destroy = () => {};
  req.end = () => setImmediate(() => {
    let out = {}, status = 200;
    if (opts.hostname === 'api.pdfshift.io') out = { url: `https://pdfshift.example/${++n}.pdf`, filesize: 4000000 };
    else if (opts.hostname === 'api.cloudinary.com') { const id = new URLSearchParams(body).get('public_id'); out = { secure_url: `https://res.cloudinary.com/daxkn7pyb/raw/upload/v1/noustalgie/pdf/${id}` }; }
    else if (opts.hostname === 'api.stripe.com') { dernierStripe = Object.fromEntries(new URLSearchParams(body)); out = { id: 'cs_test_parcours', url: 'https://checkout.stripe.com/c/pay/cs_test_parcours' }; }
    else if (/printapi/.test(opts.hostname)) out = opts.path === '/v2/oauth' ? { access_token: 't', expires_in: 14400 } : {};
    const res = new EventEmitter(); res.statusCode = status; res.headers = {}; res.resume = () => {};
    cb(res); res.emit('data', Buffer.from(JSON.stringify(out))); res.emit('end');
  });
  return req;
};
https.get = (o, cb) => { const r = https.request(Object.assign({ method: 'GET' }, o), cb); r.end(); return r; };

const H = { '/api/generate-pdf': require(R + 'api/generate-pdf.js'), '/api/create-checkout': require(R + 'api/create-checkout.js'), '/api/promo': require(R + 'api/tools.js') };
const alertes = [];
http.createServer((rq, rs) => {
  let data = ''; rq.on('data', c => data += c); rq.on('end', () => {
    const u = new URL(rq.url, 'http://x'), envoyer = (code, j) => { rs.writeHead(code, { 'Content-Type': 'application/json' }); rs.end(JSON.stringify(j)); };
    if (u.pathname === '/__dernier') { const d = { stripe: dernierStripe, alertes: alertes.splice(0) }; dernierStripe = null; return envoyer(200, d); }
    let body = {}; try { body = JSON.parse(data || '{}'); } catch (e) {}
    if (u.searchParams.get('fn') === 'alerte') { alertes.push(body); return envoyer(200, { ok: true }); }
    const h = H[u.pathname]; if (!h) return envoyer(200, {});
    const req = { method: rq.method, headers: { origin: 'https://noustalgie.fr', 'x-forwarded-for': '10.0.' + (++n % 250) + '.1' }, body, query: Object.fromEntries(u.searchParams), url: rq.url };
    if (u.pathname === '/api/promo') req.query.fn = 'promo';
    const res = { code: 200, setHeader() {}, status(c) { this.code = c; return this; }, json(j) { envoyer(this.code, j); return this; }, end() { rs.writeHead(this.code); rs.end(); return this; }, send(t) { rs.writeHead(this.code); rs.end(String(t)); return this; } };
    Promise.resolve(h(req, res)).catch(e => envoyer(500, { error: e.message }));
  });
}).listen(0, '127.0.0.1', function () { console.log(this.address().port); });
