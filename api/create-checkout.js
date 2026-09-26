// api/create-checkout.js — création de la session Stripe
// Le prix N'EST JAMAIS pris depuis le client : il est recalculé ici.
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');
const { checkPromo } = require('./_lib/promo');

function stripePost(endpoint, params) {
  const body = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request({
      hostname: 'api.stripe.com', path: '/v1/' + endpoint, method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': buf.length,
      },
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(d); } });
    });
    req.on('error', reject); req.write(buf); req.end();
  });
}

// GRILLE DE PRIX OFFICIELLE — doit correspondre aux paliers du site (24 / 36 / 50 pages)
const PRICES = {
  24: { pdf: 14.99, print: 39.99 },
  36: { pdf: 19.99, print: 49.99 },
  50: { pdf: 24.99, print: 69.99 },
};
// Anciens paliers (compatibilité si une vieille page est encore en cache chez un client)
const LEGACY = { 20: 24, 30: 36 };

const SITE_URL = 'https://noustalgie.fr';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const cut = (s, n) => String(s || '').slice(0, n); // Stripe limite les métadonnées à 500 caractères

module.exports = async (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();
  if (!isAllowedOrigin(req)) return res.status(403).json({ error: 'Origine non autorisée.' });
  if (!rateLimit(req, 'checkout', 20, 10 * 60 * 1000)) return res.status(429).json({ error: 'Trop de tentatives, réessayez dans quelques minutes.' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Configuration de paiement incomplète.' });

  const { name, email, address, pages, names, style, pdfUrl, format, promoCode } = parseBody(req);

  if (!email || !EMAIL_RE.test(String(email))) return res.status(400).json({ error: 'Email invalide.' });

  let pagesNum = parseInt(pages, 10);
  if (LEGACY[pagesNum]) pagesNum = LEGACY[pagesNum];
  if (!PRICES[pagesNum]) return res.status(400).json({ error: 'Format de pages invalide.' });

  const fmt = format === 'pdf' ? 'pdf' : 'print';
  if (fmt === 'print' && String(address || '').trim().length < 8) return res.status(400).json({ error: 'Adresse de livraison manquante.' });
  if (pdfUrl && !/^https:\/\//.test(String(pdfUrl))) return res.status(400).json({ error: 'Fichier album invalide.' });

  let priceEuros = PRICES[pagesNum][fmt];
  let appliedPromo = '';
  if (promoCode) {
    const promo = await checkPromo(promoCode);
    if (!promo.valid) return res.status(400).json({ error: promo.error });
    appliedPromo = promo.code;
    priceEuros = promo.type === 'free'
      ? 0.50
      : Math.max(0.50, +(priceEuros * (1 - promo.discount / 100)).toFixed(2));
  }
  if (!(priceEuros >= 0.50 && priceEuros <= 200)) return res.status(400).json({ error: 'Prix calculé invalide.' });

  const cents = Math.round(priceEuros * 100);
  const priceStr = priceEuros.toFixed(2);
  const meta = {
    name: cut(name, 200), email: cut(email, 200), address: cut(address, 480), pages: String(pagesNum),
    names: cut(names, 200), style: cut(style, 100), pdf_url: cut(pdfUrl, 480), format: fmt, price: priceStr, promo: appliedPromo,
  };
  const params = {
    'payment_method_types[]': 'card',
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][product_data][name]': `Album Noustalgie · ${pagesNum} pages`,
    'line_items[0][price_data][product_data][description]': `${fmt === 'pdf' ? 'Album numérique (PDF)' : 'Livre imprimé 21×21 cm, couverture rigide, livraison incluse'}${names ? ' — ' + cut(names, 120) : ''}`,
    'line_items[0][price_data][unit_amount]': cents,
    'line_items[0][quantity]': '1',
    mode: 'payment',
    locale: 'fr',
    customer_email: email,
    success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/cancel`,
    // Le code promo est aussi posé sur le PaymentIntent pour pouvoir vérifier l'usage unique
    'payment_intent_data[metadata][promo]': appliedPromo,
    'payment_intent_data[metadata][pages]': String(pagesNum),
    'payment_intent_data[metadata][format]': fmt,
  };
  Object.entries(meta).forEach(([k, v]) => { params[`metadata[${k}]`] = v; });

  try {
    const session = await stripePost('checkout/sessions', params);
    if (session && session.url) return res.json({ url: session.url });
    console.error('Stripe error:', JSON.stringify(session).slice(0, 300));
    return res.status(502).json({ error: 'Le paiement n’a pas pu être initialisé.' });
  } catch (e) {
    console.error('Stripe network error:', e.message);
    return res.status(502).json({ error: 'Le paiement n’a pas pu être initialisé.' });
  }
};
