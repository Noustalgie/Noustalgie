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

  const { name, email, address, pages, price, names, style } = req.body;
  const SITE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  try {
    const cents = Math.round(parseFloat(price) * 100);
    const session = await stripePost('checkout/sessions', {
      'payment_method_types[]': 'card',
      'line_items[0][price_data][currency]': 'eur',
      'line_items[0][price_data][product_data][name]': `Album Noustalgie — ${pages} pages`,
      'line_items[0][price_data][product_data][description]': `Album "${names}" · ${style} · Impression CEWE`,
      'line_items[0][price_data][unit_amount]': cents,
      'line_items[0][quantity]': '1',
      'mode': 'payment',
      'customer_email': email,
      'success_url': `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}&pages=${pages}&price=${price}&pdf_url=${encodeURIComponent(req.body.pdfUrl||'')}` ,
      'cancel_url': `${SITE_URL}/cancel`,
      'metadata[name]': name,
      'metadata[email]': email,
      'metadata[address]': address || '',
      'metadata[pages]': pages,
      'metadata[names]': names,
      'metadata[style]': style,
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
