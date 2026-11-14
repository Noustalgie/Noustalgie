// api/_lib/cadeau.js — cartes cadeaux (49,99 €, soit un livre imprimé de 36 pages livré)
// Chaque carte est un bon de réduction Stripe (coupon) à usage unique, valable un an : Stripe tient le compte des
// cartes utilisées et des dates limites, sans base de données. Le code est tiré de la session de paiement de la carte
// (HMAC avec CLOUDINARY_API_SECRET, comme les codes de relance) : un nouvel envoi de Stripe redonne le même code.
const https = require('https');
const crypto = require('crypto');

const CADEAU_CENTS = 4999;                         // même prix que le livre de 36 pages (create-checkout.js, PRICES[36].print)
const DUREE_JOURS = 365;                           // validité annoncée sur la carte, la page et les CGV
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';     // sans I, L, O ni U, comme les codes de relance

function stripe(method, path, params) {
  const body = params ? new URLSearchParams(params).toString() : '';
  return new Promise(resolve => {
    if (!process.env.STRIPE_SECRET_KEY) return resolve({ status: 0, body: null });
    const req = https.request({ hostname: 'api.stripe.com', path: '/v1/' + path, method, timeout: 10000,
      headers: Object.assign({ Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY },
        body ? { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) } : {}) }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j }); });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: null }); });
    req.on('error', () => resolve({ status: 0, body: null }));
    if (body) req.write(body);
    req.end();
  });
}

// CADEAU + 8 caractères (identifiant du coupon chez Stripe) ; affiché « CADEAU-XXXX-XXXX »
function codeCadeau(sessionId) {
  const h = crypto.createHmac('sha256', 'nst-cadeau:' + (process.env.CLOUDINARY_API_SECRET || '')).update(String(sessionId)).digest();
  let s = ''; for (let i = 0; i < 8; i++) s += B32[h[i] % 32];
  return 'CADEAU' + s;
}
const affiche = id => id.slice(0, 6) + '-' + id.slice(6, 10) + '-' + id.slice(10);
// Saisie tolérante : espaces, tirets, minuscules, O tapé pour 0, I ou L pour 1
function normaliser(input) {
  const c = String(input || '').toUpperCase().replace(/[\s\-_.]/g, '');
  if (!/^CADEAU[0-9A-Z]{8}$/.test(c)) return null;
  return 'CADEAU' + c.slice(6).replace(/O/g, '0').replace(/[IL]/g, '1');
}

// Crée le coupon de la carte s'il n'existe pas encore (appelé par le webhook et par la page de remerciement)
async function assurerCarte(session) {
  const id = codeCadeau(session.id);
  let r = await stripe('GET', 'coupons/' + id);
  if (r.status === 200 && r.body && r.body.id) return { id, coupon: r.body };
  const fin = Math.floor((session.created || Date.now() / 1000) + DUREE_JOURS * 86400);
  r = await stripe('POST', 'coupons', {
    id, name: 'Carte cadeau', amount_off: String(CADEAU_CENTS), currency: 'eur', duration: 'once',
    max_redemptions: '1', redeem_by: String(fin), 'metadata[type]': 'cadeau', 'metadata[session]': session.id,
  });
  if (r.status === 200 && r.body && r.body.id) return { id, coupon: r.body };
  // Deux créations en même temps (webhook et page de remerciement) : la seconde trouve celle de la première
  const again = await stripe('GET', 'coupons/' + id);
  if (again.status === 200 && again.body && again.body.id) return { id, coupon: again.body };
  console.error('Carte cadeau : coupon non créé', r.status, JSON.stringify(r.body).slice(0, 300));
  return { id: null, erreur: (r.body && r.body.error && r.body.error.message) || 'Stripe injoignable' };
}

// Vérifie un code saisi au paiement de l'album
async function lireCarte(input) {
  const id = normaliser(input);
  if (!id) return null;
  const r = await stripe('GET', 'coupons/' + id);
  if (r.status === 404) return { valid: false, error: 'Code invalide.' };
  const c = r.body;
  if (r.status !== 200 || !c || !c.id) return { valid: false, error: 'Vérification impossible pour le moment, réessayez dans un instant.' };
  if (!c.metadata || c.metadata.type !== 'cadeau' || c.currency !== 'eur' || !c.amount_off) return { valid: false, error: 'Code invalide.' };
  if (!c.valid) return { valid: false, error: c.max_redemptions && c.times_redeemed >= c.max_redemptions ? 'Cette carte cadeau a déjà été utilisée.' : 'Cette carte cadeau a expiré.' };
  return { valid: true, code: id, type: 'cadeau', amount: c.amount_off / 100, coupon: id };
}

module.exports = { stripe, codeCadeau, affiche, normaliser, assurerCarte, lireCarte, CADEAU_CENTS, DUREE_JOURS };
