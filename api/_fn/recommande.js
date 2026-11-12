// /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
// Repasse chez Print API la commande d'une session Stripe payée, avec un fichier corrigé.
// Print API ne remplace pas le fichier d'une commande en cours : il l'annule (Marko, 9 novembre 2026, commande de Nahuel).
// Un numéro annulé ne se réutilise pas : la nouvelle commande prend le numéro d'origine suivi de « -R ».
// Le suivi (track.js) et les avis d'expédition (printapi-hook.js) la retrouvent ; l'email du client reste dans ses métadonnées.
// essai=1 : montre ce qui serait envoyé, sans rien créer. Sinon POST obligatoire. Jeton : SANTE_JETON.
// Pas de lecture préalable du numéro « -R » : un numéro inconnu fait envoyer par Print API un rapport d'erreur par email.
const https = require('https');
const crypto = require('crypto');
const PA = require('../_lib/printapi');
const { printApiPayload, createPrintApiOrder } = require('../webhook');

const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const FICHIER = /^https:\/\/res\.cloudinary\.com\/daxkn7pyb\/raw\/upload\/[\w\/.-]+\.pdf$/;

function getSession(id) {
  return new Promise(resolve => {
    if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(id) || !process.env.STRIPE_SECRET_KEY) return resolve(null);
    const req = https.request({ hostname: 'api.stripe.com', path: `/v1/checkout/sessions/${id}`, method: 'GET', timeout: 10000,
      headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(null); } });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null)); req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const q = req.query || {};
  const J = process.env.SANTE_JETON;
  if (!J || !same(q.jeton || '', J)) return res.status(401).json({ error: 'Unauthorized' });
  const essai = q.essai === '1';
  if (!essai && req.method !== 'POST') return res.status(405).json({ erreur: 'POST pour commander, essai=1 pour voir sans commander' });
  if (!PA.configured()) return res.status(503).json({ erreur: 'Print API non configuré' });
  const s = await getSession(String(q.session || ''));
  if (!s || !s.id) return res.status(404).json({ erreur: 'Session Stripe introuvable' });
  if (s.payment_status !== 'paid') return res.status(409).json({ erreur: 'Session non payée' });
  const m = Object.assign({}, s.metadata || {});
  if (m.format !== 'print') return res.status(409).json({ erreur: 'Commande sans livre imprimé' });
  for (const [k, champ] of [['contenu', 'pa_inner'], ['couverture', 'pa_cover']]) {
    if (!q[k]) continue;
    if (!FICHIER.test(String(q[k]))) return res.status(400).json({ erreur: `Adresse refusée pour ${k} (fichier PDF de noustalgie sur Cloudinary attendu)` });
    m[champ] = String(q[k]);
  }
  if (!m.pa_cover || !m.pa_inner || !m.addr_line1) return res.status(409).json({ erreur: 'Fichiers ou adresse Print API absents de la session' });
  // Même numéro que webhook.js, suivi de -R
  const d = new Date((s.created || 0) * 1000);
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const ref = `NOUST-${ymd}-${crypto.createHash('sha1').update(s.id).digest('hex').slice(0, 5).toUpperCase()}`;
  const name = m.name || (s.customer_details && s.customer_details.name) || '';
  const args = { m, name, phone: m.phone || (s.customer_details && s.customer_details.phone) || '',
    email: (s.customer_details && s.customer_details.email) || s.customer_email || m.email || '',
    first: m.first_name || String(name).trim().split(' ')[0], names: m.names || '', orderNumber: `${ref}-R`, pages: m.pages || '36' };
  if (essai) {
    const { opts, payload } = printApiPayload(args);
    return res.json({ essai: true, ref, id: payload.id, hote: PA.host(), productionSpeed: payload.productionSpeed, options: opts,
      items: payload.items, livraison: { ville: payload.shipping.address.city, pays: payload.shipping.address.country, telephone: !!payload.shipping.address.phone } });
  }
  const r = await createPrintApiOrder(args);
  if (!r.id) return res.status(502).json({ erreur: global.__lastPrinterError || 'Commande non créée' });
  return res.json({ ref, id: r.id, options: r.opts, note: r.note || '' });
};
