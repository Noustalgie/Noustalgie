// /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
// POST { de, pour, message, email }       → session de paiement Stripe de la carte (49,99 €), renvoie { url }
// GET  ?session_id=cs_…                    → la carte une fois payée (code, prénoms, message, date limite), pour /carte-cadeau/merci
// GET  ?jeton=SANTE_JETON&essai=1          → contrôle en production sans rien vendre : crée un bon d'essai, ouvre une session
//                                            à 0 € avec ce bon (jamais payée), puis expire la session et supprime le bon.
const crypto = require('crypto');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('../_lib/security');
const C = require('../_lib/cadeau');

const SITE_URL = 'https://noustalgie.fr';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const propre = (s, n) => String(s || '').replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n);
const same = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };

async function essai(res) {
  const out = {};
  const id = 'CADEAU' + 'ESSAI' + crypto.randomBytes(2).toString('hex').toUpperCase().slice(0, 3).replace(/[ILOU]/g, '0');
  const c = await C.stripe('POST', 'coupons', { id, name: 'Carte cadeau (essai)', amount_off: String(C.CADEAU_CENTS), currency: 'eur', duration: 'once',
    max_redemptions: '1', redeem_by: String(Math.floor(Date.now() / 1000) + 3600), 'metadata[type]': 'essai' });
  out.bon = c.status === 200 ? 'créé' : `refusé (${c.status}) ${c.body && c.body.error ? c.body.error.message : ''}`;
  if (c.status === 200) {
    const s = await C.stripe('POST', 'checkout/sessions', {
      'line_items[0][price_data][currency]': 'eur', 'line_items[0][price_data][product_data][name]': 'Essai carte cadeau (jamais payé)',
      'line_items[0][price_data][unit_amount]': String(C.CADEAU_CENTS), 'line_items[0][quantity]': '1', mode: 'payment', locale: 'fr',
      'discounts[0][coupon]': id, success_url: SITE_URL + '/', cancel_url: SITE_URL + '/', 'metadata[type]': 'essai',
    });
    out.session = s.status === 200 && s.body ? { total: s.body.amount_total, statut_paiement: s.body.payment_status, url: !!s.body.url } : `refusée (${s.status}) ${s.body && s.body.error ? s.body.error.message : ''}`;
    if (s.status === 200 && s.body && s.body.id) { const e = await C.stripe('POST', `checkout/sessions/${s.body.id}/expire`); out.session_expiree = e.status === 200; }
    const lu = await C.lireCarte(id);
    out.lecture = lu && lu.error ? lu.error : lu;                            // « Code invalide. » attendu : un bon d'essai n'est pas une carte
    const d = await C.stripe('DELETE', 'coupons/' + id);
    out.bon_supprime = d.status === 200;
  }
  out.ok = out.bon === 'créé' && out.session && out.session.total === 0 && out.session.url === true && out.bon_supprime === true;
  return res.json(out);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  const q = req.query || {};

  if (req.method === 'GET') {
    if (q.essai) {
      const J = process.env.SANTE_JETON;
      if (!J || !same(q.jeton || '', J)) return res.status(401).json({ error: 'Unauthorized' });
      return essai(res);
    }
    if (!rateLimit(req, 'cadeau-voir', 30, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de demandes.' });
    const id = String(q.session_id || '');
    if (!/^cs_[A-Za-z0-9_]+$/.test(id)) return res.status(404).json({ paid: false });
    const r = await C.stripe('GET', 'checkout/sessions/' + id);
    const s = r.body;
    if (r.status !== 200 || !s || !s.id || !s.metadata || s.metadata.type !== 'cadeau') return res.status(404).json({ paid: false });
    if (s.payment_status !== 'paid') return res.json({ paid: false });
    const carte = await C.assurerCarte(s);
    if (!carte.id) return res.status(502).json({ paid: true, error: 'Votre carte est payée, son code se prépare. Rechargez la page dans un instant.' });
    const fin = new Date(((s.created || Date.now() / 1000) + C.DUREE_JOURS * 86400) * 1000).toISOString().slice(0, 10);
    return res.json({ paid: true, code: C.affiche(carte.id), de: s.metadata.de || '', pour: s.metadata.pour || '', message: s.metadata.message || '', fin,
      prix: typeof s.amount_total === 'number' ? (s.amount_total / 100).toFixed(2) : '49.99',
      email: String((s.customer_details && s.customer_details.email) || s.customer_email || '').slice(0, 120),
      utilisee: !!(carte.coupon && carte.coupon.times_redeemed) });
  }

  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'cadeau', 10, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de tentatives, réessayez dans quelques minutes.' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Configuration de paiement incomplète.' });
  const b = parseBody(req);
  const email = propre(b.email, 200), de = propre(b.de, 60), pour = propre(b.pour, 80), message = propre(b.message, 300);
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Merci d’indiquer une adresse email valide : la carte y sera envoyée.' });
  if (!pour) return res.status(400).json({ error: 'Merci d’indiquer à qui vous offrez la carte.' });
  const r = await C.stripe('POST', 'checkout/sessions', {
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][product_data][name]': 'Carte cadeau Noustalgie',
    'line_items[0][price_data][product_data][description]': `Pour ${pour} · un livre photo de 36 pages, imprimé et livré · valable un an`,
    'line_items[0][price_data][unit_amount]': String(C.CADEAU_CENTS),
    'line_items[0][quantity]': '1',
    mode: 'payment', locale: 'fr', customer_email: email,
    success_url: `${SITE_URL}/carte-cadeau/merci?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/carte-cadeau`,
    'metadata[type]': 'cadeau', 'metadata[de]': de, 'metadata[pour]': pour, 'metadata[message]': message, 'metadata[email]': email,
    'payment_intent_data[metadata][type]': 'cadeau', 'payment_intent_data[description]': 'Carte cadeau Noustalgie',
  });
  if (r.status === 200 && r.body && r.body.url) return res.json({ url: r.body.url });
  console.error('Carte cadeau, Stripe :', r.status, JSON.stringify(r.body).slice(0, 300));
  return res.status(502).json({ error: 'Le paiement n’a pas pu être initialisé. Réessayez dans un instant.' });
};
