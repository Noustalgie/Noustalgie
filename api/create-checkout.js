const https = require('https');

function stripePost(endpoint, params) {
  const body = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request({
      hostname: 'api.stripe.com', path: '/v1/' + endpoint, method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': buf.length
      }
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch(e) { resolve(d); } });
    });
    req.on('error', reject); req.write(buf); req.end();
  });
}

// GRILLE DE PRIX OFFICIELLE (source de verite, cote serveur)
// Le prix N'EST JAMAIS pris depuis le client : il est recalcule ici.
const PRICES = {
  20: { pdf: 14.99, print: 39.99 },
  30: { pdf: 19.99, print: 49.99 },
  50: { pdf: 24.99, print: 69.99 },
};

// CODES PROMO (valides cote serveur)
const PROMOS = {
  'ANTOINE34': { discount: 100, type: 'free' },
  'ANTOINE2':  { discount: 100, type: 'free' },
  'ANTOINE3':  { discount: 100, type: 'free' },
  'ANTOINE4':  { discount: 100, type: 'free' },
  'ANTOINE5':  { discount: 100, type: 'free' },
  'ANTOINE6':  { discount: 100, type: 'free' },
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY manquante dans les variables Vercel' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { name, email, address, pages, names, style, pdfUrl, format, promoCode } = body;

  // URL du site en dur (ne JAMAIS utiliser VERCEL_URL qui donne l'URL technique du deploiement)
  const SITE_URL = 'https://noustalgie.fr';

  const pagesNum = parseInt(pages, 10);
  if (!PRICES[pagesNum]) {
    return res.status(400).json({ error: 'Format de pages invalide.' });
  }
  const fmt = (format === 'pdf') ? 'pdf' : 'print';

  let priceEuros = PRICES[pagesNum][fmt];

  let appliedPromo = '';
  if (promoCode) {
    const promo = PROMOS[String(promoCode).toUpperCase()];
    if (promo) {
      appliedPromo = String(promoCode).toUpperCase();
      if (promo.type === 'free') {
        priceEuros = 0.50;
      } else if (promo.discount) {
        priceEuros = Math.max(0.50, +(priceEuros * (1 - promo.discount / 100)).toFixed(2));
      }
    }
  }

  if (!(priceEuros >= 0.50 && priceEuros <= 200)) {
    return res.status(400).json({ error: 'Prix calcule invalide.' });
  }

  const cents = Math.round(priceEuros * 100);
  const priceStr = priceEuros.toFixed(2);

  try {
    const session = await stripePost('checkout/sessions', {
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'eur',
      'line_items[0][price_data][product_data][name]': `Album Noustalgie - ${pagesNum} pages`,
      'line_items[0][price_data][product_data][description]': `Album "${names || ''}" - ${fmt === 'pdf' ? 'PDF' : 'Livre imprime'}`,
      'line_items[0][price_data][unit_amount]': cents,
      'line_items[0][quantity]': '1',
      'mode': 'payment',
      'customer_email': email,
      'success_url': `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name || '')}&pages=${pagesNum}&price=${priceStr}&pdf_url=${encodeURIComponent(pdfUrl || '')}`,
      'cancel_url': `${SITE_URL}/cancel`,
      'metadata[name]': name || '',
      'metadata[email]': email || '',
      'metadata[address]': address || '',
      'metadata[pages]': String(pagesNum),
      'metadata[names]': names || '',
      'metadata[style]': style || '',
      'metadata[pdf_url]': pdfUrl || '',
      'metadata[format]': fmt,
      'metadata[price]': priceStr,
      'metadata[promo]': appliedPromo,
    });

    if (session.url) {
      return res.json({ url: session.url });
    } else {
      throw new Error(session.error?.message || JSON.stringify(session));
    }
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
