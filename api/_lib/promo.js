// api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
// Format : "CODE1:free,CODE2:20,CODE3:10"  (free = album offert à 0,50€, nombre = % de remise)
// PROMO_CODES_EXTRA, même format : codes personnels des relances (ajoutés sans toucher aux codes existants).
// Usage unique : un code déjà utilisé dans un paiement réussi est refusé (recherche Stripe).
const https = require('https');
const crypto = require('crypto');
const { lireCarte } = require('./cadeau');

// Codes de la relance automatique (email programmé 3 jours après l'enregistrement d'un album, api/_fn/album.js) :
// ALBUM- + date limite (3 caractères) + empreinte de l'album (3) + signature (4), vérifiés sans liste ni base de données.
const RELANCE_PCT = 10;                          // remise offerte par l'email de relance
const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';   // base 32 sans I, L, O ni U (lecture sans ambiguïté)
const JOUR0 = Date.UTC(2026, 0, 1), JOUR = 86400000;
const enB32 = (n, len) => { let s = ''; for (let i = 0; i < len; i++) { s = B32[n % 32] + s; n = Math.floor(n / 32); } return s; };
const deB32 = s => [...s].reduce((n, c) => n * 32 + B32.indexOf(c), 0);
const signeRelance = txt => enB32(parseInt(crypto.createHmac('sha256', 'nst-relance:' + (process.env.CLOUDINARY_API_SECRET || '')).update(txt).digest('hex').slice(0, 5), 16) % (32 ** 4), 4);
// Valable jusqu'à 10 jours après l'enregistrement, soit 7 jours après l'email
function codeRelance(albumId, maintenant = Date.now()) {
  const fin = enB32(Math.floor((maintenant - JOUR0) / JOUR) + 10, 3);
  const empreinte = enB32(parseInt(crypto.createHash('sha256').update(String(albumId)).digest('hex').slice(0, 4), 16) % (32 ** 3), 3);
  return `ALBUM-${fin}${empreinte}${signeRelance(fin + empreinte)}`;
}
function lireRelance(code) {
  const m = /^ALBUM-([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})$/.exec(code);
  if (!m || !process.env.CLOUDINARY_API_SECRET || /[ILOU]/.test(m[1] + m[2] + m[3])) return null;
  const a = Buffer.from(signeRelance(m[1] + m[2])), b = Buffer.from(m[3]);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Math.floor((Date.now() - JOUR0) / JOUR) > deB32(m[1])) return { expire: true };
  return { type: 'percent', discount: RELANCE_PCT };
}
// Saisie tolérante : O tapé pour 0, I ou L pour 1, dans la partie après « ALBUM- »
const normaliser = c => /^ALBUM-/.test(c) ? 'ALBUM-' + c.slice(6).replace(/O/g, '0').replace(/[IL]/g, '1') : c;

function loadPromos() {
  const raw = [process.env.PROMO_CODES, process.env.PROMO_CODES_EXTRA].filter(Boolean).join(',');
  const map = {};
  raw.split(',').map(s => s.trim()).filter(Boolean).forEach(entry => {
    const [code, val] = entry.split(':').map(s => (s || '').trim());
    if (!code) return;
    const C = code.toUpperCase();
    if (!val || val.toLowerCase() === 'free') map[C] = { type: 'free', discount: 100 };
    else {
      const pct = Math.max(1, Math.min(100, parseInt(val, 10) || 0));
      map[C] = pct >= 100 ? { type: 'free', discount: 100 } : { type: 'percent', discount: pct };
    }
  });
  return map;
}

function stripeGet(path) {
  return new Promise((resolve) => {
    https.get({ hostname: 'api.stripe.com', path, headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

async function isAlreadyUsed(code) {
  if (!process.env.STRIPE_SECRET_KEY) return false;
  const q = encodeURIComponent(`metadata['promo']:'${code}' AND status:'succeeded'`);
  const r = await stripeGet(`/v1/payment_intents/search?query=${q}&limit=1`);
  return !!(r && Array.isArray(r.data) && r.data.length > 0);
}

// Retourne { valid, code, type, discount } ou { valid:false, error }
async function checkPromo(input) {
  const code = normaliser(String(input || '').trim().toUpperCase());
  if (!code) return { valid: false, error: 'Code manquant.' };
  let promo = loadPromos()[code];
  // Carte cadeau (CADEAU-XXXX-XXXX) : un bon Stripe à usage unique, vérifié chez Stripe (api/_lib/cadeau.js)
  if (!promo && /^CADEAU/.test(code.replace(/[\s\-_.]/g, ''))) return (await lireCarte(code)) || { valid: false, error: 'Code invalide.' };
  if (!promo) {
    const r = lireRelance(code);
    if (r && r.expire) return { valid: false, error: 'Ce code a expiré.' };
    promo = r;
  }
  if (!promo) return { valid: false, error: 'Code invalide.' };
  if (await isAlreadyUsed(code)) return { valid: false, error: 'Ce code a déjà été utilisé.' };
  return { valid: true, code, type: promo.type, discount: promo.discount };
}

module.exports = { checkPromo, codeRelance, RELANCE_PCT };
