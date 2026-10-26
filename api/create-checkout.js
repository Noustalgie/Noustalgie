// api/create-checkout.js — création de la session Stripe
// Le prix N'EST JAMAIS pris depuis le client : il est recalculé ici.
const https = require('https');
const { isAllowedOrigin, applyCors, rateLimit, parseBody } = require('./_lib/security');
const { checkPromo } = require('./_lib/promo');
const { checkProof } = require('./_lib/cloudinary');
const PA = require('./_lib/printapi');

// Pays livrés (codes ISO) : Prodigi a besoin du code pays exact
const COUNTRIES = ['FR', 'BE', 'LU', 'MC', 'CH', 'DE', 'AT', 'NL', 'ES', 'PT', 'IT', 'IE'];

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
// Options du livre imprimé (Print API), mêmes prix que sur le site. L'affiche, le cadre et l'aimant ont chacun leur fichier d'impression.
const OPTIONS = {
  coffret: { price: 9.99, name: 'Coffret cadeau', desc: 'Le livre livré dans une boîte cadeau rigide' },
  express: { price: 4.99, name: 'Fabrication express', desc: 'Fabriqué en priorité, expédié un jour ouvré plus tôt' },
  affiche: { price: 14.99, name: 'Affiche 30 × 40 cm', desc: 'La couverture de votre album en affiche, dans le même colis', file: true },
  cadre: { price: 19.99, name: 'Petit cadre photo 15 × 15 cm', desc: 'Votre photo de couverture sur céramique, support en bois, dans le même colis', file: true },
  aimant: { price: 12.99, name: 'Aimant photo 5 × 5 cm', desc: 'Votre photo de couverture sur un petit carreau en céramique aimanté, dans le même colis', file: true },
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

  const { name, firstName, lastName, phone, email, address, addr, pages, names, style, pdfUrl, pdfProof, format, promoCode, spine, album, options, files } = parseBody(req);
  const rem = album && album.reminder && album.reminder.id && checkProof(String(album.reminder.id), 'reminder', album.reminder.sig) ? String(album.reminder.id) : '';

  if (!email || !EMAIL_RE.test(String(email))) return res.status(400).json({ error: 'Email invalide.' });

  let pagesNum = parseInt(pages, 10);
  if (LEGACY[pagesNum]) pagesNum = LEGACY[pagesNum];
  if (!PRICES[pagesNum]) return res.status(400).json({ error: 'Format de pages invalide.' });

  const fmt = format === 'pdf' ? 'pdf' : 'print';
  // Le PDF doit avoir été généré par notre serveur, avec exactement le nombre de pages payé
  if (!pdfUrl || !checkProof(String(pdfUrl), pagesNum, pdfProof)) return res.status(400).json({ error: 'Le fichier de votre album n’est pas valide. Rechargez l’aperçu et réessayez.' });
  // Version avec tranche imprimée : facultative, retenue seulement si les deux fichiers sont prouvés
  let S = null;
  if (spine && spine.coverUrl && spine.innerUrl && checkProof(String(spine.coverUrl), `cover:${pagesNum}`, spine.coverProof) && checkProof(String(spine.innerUrl), `inner:${pagesNum}`, spine.innerProof)) {
    S = { cover: String(spine.coverUrl), inner: String(spine.innerUrl), mm: Number(spine.widthMm) || '' };
  }
  // Fichiers Print API (couverture d'un seul tenant + pages intérieures, affiche, cadre) : retenus seulement s'ils sont prouvés
  const F = files && typeof files === 'object' ? files : {};
  const proved = k => F[k] && F[k].url && checkProof(String(F[k].url), `${k}:${pagesNum}`, F[k].proof) ? String(F[k].url) : '';
  const paCover = proved('pa-cover'), paInner = proved('pa-inner');
  const opts = fmt === 'print' && Array.isArray(options) ? [...new Set(options.map(String))].filter(k => Object.prototype.hasOwnProperty.call(OPTIONS, k)) : [];
  if (opts.length && !(PA.configured() && paCover && paInner)) return res.status(400).json({ error: 'Les options ne sont pas disponibles pour le moment. Retirez-les pour commander.' });
  const optFile = {};
  for (const k of opts) if (OPTIONS[k].file && !(optFile[k] = proved(k))) return res.status(400).json({ error: 'Le fichier de votre option n’est pas valide. Rechargez l’aperçu et réessayez.' });
  // Adresse structurée, transmise telle quelle à l'imprimeur
  const A = addr && typeof addr === 'object' ? {
    line1: cut(addr.line1, 100).trim(), line2: cut(addr.line2, 100).trim(),
    postal: cut(addr.postal, 16).trim(), city: cut(addr.city, 80).trim(), country: String(addr.country || '').toUpperCase(),
  } : null;
  // Destinataire : prénom + nom (exigés par le transporteur sur l'étiquette).
  // Compatibilité : une ancienne page n'envoie que « name » ; on le découpe s'il contient prénom et nom.
  const clean = s => cut(s, 80).replace(/\s+/g, ' ').trim();
  let first = clean(firstName), last = clean(lastName);
  if (!first && !last) {
    const parts = clean(name).split(' ').filter(Boolean);
    first = parts.shift() || ''; last = parts.join(' ');
  }
  const fullName = [first, last].filter(Boolean).join(' ');
  if (!first) return res.status(400).json({ error: 'Merci d’indiquer votre prénom.' });
  // Téléphone : facultatif côté serveur (anciennes pages), mais nettoyé et vérifié s'il est fourni
  const tel = String(phone || '').replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '').slice(0, 16);
  const telOk = tel.replace(/\D/g, '').length >= 8 && tel.replace(/\D/g, '').length <= 15;
  if (fmt === 'print') {
    if (!last) return res.status(400).json({ error: 'Merci d’indiquer votre nom de famille : il doit figurer sur le colis. Rechargez la page si le champ « Nom » n’apparaît pas.' });
    if (phone && !telOk) return res.status(400).json({ error: 'Le numéro de téléphone semble invalide.' });
    if (!A || A.line1.length < 3 || A.postal.length < 3 || A.city.length < 2) return res.status(400).json({ error: 'Adresse de livraison incomplète.' });
    if (!COUNTRIES.includes(A.country)) return res.status(400).json({ error: 'Nous ne livrons pas encore ce pays.' });
  }

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

  // Le code promo ne porte que sur l'album ; les options s'ajoutent à leur prix
  const cents = Math.round(priceEuros * 100);
  const total = priceEuros + opts.reduce((t, k) => t + OPTIONS[k].price, 0);
  const priceStr = total.toFixed(2);
  const meta = {
    name: cut(fullName, 200), first_name: first, last_name: last, phone: fmt === 'print' && telOk ? tel : '',
    email: cut(email, 200), address: cut(address, 480), pages: String(pagesNum),
    reminder_id: cut(rem, 100),
    cover_url: S ? cut(S.cover, 480) : '', inner_url: S ? cut(S.inner, 480) : '', spine_mm: S ? String(S.mm) : '',
    addr_line1: A ? A.line1 : '', addr_line2: A ? A.line2 : '', addr_postal: A ? A.postal : '', addr_city: A ? A.city : '', addr_country: A ? A.country : '',
    names: cut(names, 200), style: cut(style, 100), pdf_url: cut(pdfUrl, 480), format: fmt, price: priceStr, promo: appliedPromo,
    options: opts.join(','), pa_cover: cut(paCover, 480), pa_inner: cut(paInner, 480), affiche_url: cut(optFile.affiche || '', 480), cadre_url: cut(optFile.cadre || '', 480), aimant_url: cut(optFile.aimant || '', 480),
  };
  // Moyens de paiement : ceux activés dans le tableau de bord Stripe (carte, Apple Pay, Google Pay, PayPal, paiement en plusieurs
  // fois Klarna…), que Stripe filtre selon le montant et le pays. Un paiement confirmé plus tard passe par async_payment_succeeded (webhook).
  const params = {
    'line_items[0][price_data][currency]': 'eur',
    'line_items[0][price_data][product_data][name]': `Album Noustalgie · ${pagesNum} pages`,
    'line_items[0][price_data][product_data][description]': `${fmt === 'pdf' ? 'Album numérique (PDF)' : 'Livre imprimé 21×21 cm, couverture rigide, livraison incluse'}${names ? ' · ' + cut(names, 120) : ''}`,
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
  opts.forEach((k, i) => {
    const L = `line_items[${i + 1}]`;
    params[`${L}[price_data][currency]`] = 'eur';
    params[`${L}[price_data][product_data][name]`] = OPTIONS[k].name;
    params[`${L}[price_data][product_data][description]`] = OPTIONS[k].desc;
    params[`${L}[price_data][unit_amount]`] = Math.round(OPTIONS[k].price * 100);
    params[`${L}[quantity]`] = '1';
  });
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
