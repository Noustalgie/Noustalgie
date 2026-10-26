// Essai de bout en bout (branche d'essai, jamais en production) : fichiers fabriqués par PDFShift d'après le HTML réel du site
// (capturé au clic « Payer », album de 36 pages + 4 options), session Stripe réelle jamais payée puis expirée, code du webhook,
// commande dans l'environnement de TEST Print API (rien n'est imprimé).
const https = require('https');
const crypto = require('crypto');
const { Readable } = require('stream');
const CAP = require('./e2e-capture.json');
const PA = require('../_lib/printapi');

const run = (handler, req) => new Promise(resolve => {
  const res = { c: 200, setHeader() {}, status(c) { this.c = c; return this; },
    json(j) { resolve({ code: this.c, j }); }, send(s) { resolve({ code: this.c, s }); }, end() { resolve({ code: this.c }); } };
  Promise.resolve().then(() => handler(req, res)).catch(e => resolve({ code: 'exception', e: String(e && e.stack || e) }));
});
const headers = () => ({ origin: 'https://noustalgie.fr', 'x-forwarded-for': 'e2e-' + crypto.randomBytes(4).toString('hex') });

function stripe(method, path) {
  return new Promise(resolve => {
    const r = https.request({ hostname: 'api.stripe.com', path, method, timeout: 20000,
      headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': 0 } }, x => {
      let d = ''; x.on('data', c => d += c); x.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve({ raw: d.slice(0, 300) }); } });
    });
    r.on('error', e => resolve({ err: e.message })); r.on('timeout', () => { r.destroy(); resolve({ err: 'timeout' }); }); r.end();
  });
}

module.exports = async (req, res) => {
  if (process.env.VERCEL_ENV === 'production') return res.status(404).json({ error: 'Not found' });
  const q = req.query || {};
  if (q.e2e === 'pdf') {                                    // ?e2e=pdf&k=full|pa-cover|pa-inner|affiche|cadre
    const b = CAP.pdf.find(x => (x.kind || 'full') === q.k);
    if (!b) return res.status(400).json({ error: 'k inconnu' });
    const t0 = Date.now();
    const r = await run(require('../generate-pdf'), { method: 'POST', headers: headers(), body: b });
    return res.status(200).json({ k: q.k, ms: Date.now() - t0, ...r });
  }
  if (q.e2e === 'checkout') {                               // ?e2e=checkout&r={"full":{url,proof},"pa-cover":…}
    const R = JSON.parse(q.r);
    const body = Object.assign({}, CAP.checkout, { pdfUrl: R.full.url, pdfProof: R.full.proof, files: {} });
    for (const k of ['pa-cover', 'pa-inner', 'affiche', 'cadre', 'aimant']) if (R[k]) body.files[k] = R[k];
    const r = await run(require('../create-checkout'), { method: 'POST', headers: headers(), body });
    const sid = r.j && r.j.url && (/(cs_(?:live|test)_[A-Za-z0-9]+)/.exec(r.j.url) || [])[1];
    return res.status(200).json({ ...r, sid });
  }
  if (q.e2e === 'webhook') {                                // ?e2e=webhook&s=cs_… : événement « payé » signé comme Stripe, puis session expirée
    const s = await stripe('GET', `/v1/checkout/sessions/${encodeURIComponent(q.s)}`);
    if (!s || !s.id) return res.status(200).json({ erreur: 'session', s });
    s.payment_status = 'paid';
    const raw = JSON.stringify({ id: 'evt_essai_' + Date.now(), type: 'checkout.session.completed', data: { object: s } });
    const t = Math.floor(Date.now() / 1000);
    const sig = crypto.createHmac('sha256', process.env.STRIPE_WEBHOOK_SECRET).update(`${t}.${raw}`, 'utf8').digest('hex');
    const rq = Readable.from([raw]); rq.method = 'POST'; rq.headers = { 'stripe-signature': `t=${t},v1=${sig}` };
    const r = await run(require('../webhook'), rq);
    const exp = await stripe('POST', `/v1/checkout/sessions/${encodeURIComponent(q.s)}/expire`);
    return res.status(200).json({ ...r, sessionExpiree: exp && (exp.status || exp.error), hote: PA.host(), montant: s.amount_total, metadata: s.metadata });
  }
  if (q.e2e === 'lire') {                                   // ?e2e=lire&id=NOUST-… : la commande telle que Print API l'a reçue
    return res.status(200).json({ commande: await PA.getOrder(String(q.id)) });
  }
  return res.status(400).json({ error: 'e2e=pdf|checkout|webhook|lire' });
};
