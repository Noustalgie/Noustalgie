// api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
// Format : "CODE1:free,CODE2:20,CODE3:10"  (free = album offert à 0,50€, nombre = % de remise)
// Usage unique : un code déjà utilisé dans un paiement réussi est refusé (recherche Stripe).
const https = require('https');

function loadPromos() {
  const raw = process.env.PROMO_CODES || '';
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
  const code = String(input || '').trim().toUpperCase();
  if (!code) return { valid: false, error: 'Code manquant.' };
  const promo = loadPromos()[code];
  if (!promo) return { valid: false, error: 'Code invalide.' };
  if (await isAlreadyUsed(code)) return { valid: false, error: 'Ce code a déjà été utilisé.' };
  return { valid: true, code, type: promo.type, discount: promo.discount };
}

module.exports = { checkPromo };
