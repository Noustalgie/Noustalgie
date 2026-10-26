// api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
// que le client revienne ou non sur le site.
const https = require('https');
const crypto = require('crypto');
const { escapeHtml: h } = require('./_lib/security');
const PA = require('./_lib/printapi');

async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) { console.log('Email non envoyé (pas de RESEND_API_KEY):', to); return; }
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', reply_to: 'contact@noustalgie.fr', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { Authorization: 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length },
    }, r => { r.on('data', () => {}); r.on('end', () => { console.log('Email →', to, r.statusCode); resolve(); }); });
    req.on('error', e => { console.error('Email error:', e.message); resolve(); });
    req.write(buf); req.end();
  });
}

// Pays de livraison (Europe + Suisse) à partir du texte saisi
const COUNTRIES = [
  ['BE', /BELG/], ['CH', /SUIS|SWITZ|SCHWEIZ|SVIZZ/], ['LU', /LUXEM/], ['MC', /MONACO/],
  ['DE', /ALLEM|GERMAN|DEUTSCH/], ['ES', /ESPAG|SPAIN|ESPAÑA|ESPANA/], ['IT', /ITAL/],
  ['PT', /PORTUG/], ['NL', /PAYS-BAS|PAYS BAS|NETHERL|NEDERL|HOLLAN/], ['AT', /AUTRICH|AUSTRI|ÖSTERR/],
  ['IE', /IRLAND|IRELAND/], ['GB', /ROYAUME|UNITED KINGDOM|\bUK\b|ANGLET/], ['CA', /CANAD/],
  ['FR', /FRANCE/],
];
function detectCountry(text) {
  const t = String(text || '').toUpperCase();
  for (const [code, re] of COUNTRIES) if (re.test(t)) return code;
  return 'FR';
}

const SKU = 'BOOK-FE-8_3-SQ-HARD-G';
function prodigiCall(method, path, payload) {
  return new Promise(resolve => {
    const buf = payload ? Buffer.from(JSON.stringify(payload)) : null;
    const req = https.request({ hostname: 'api.prodigi.com', path, method, timeout: 20000,
      headers: Object.assign({ 'X-API-Key': process.env.PRODIGI_API_KEY }, buf ? { 'Content-Type': 'application/json', 'Content-Length': buf.length } : {}) }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { let j = null; try { j = JSON.parse(d); } catch (e) {} resolve({ status: r.statusCode, body: j, raw: d }); });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: null, raw: 'timeout' }); });
    req.on('error', e => resolve({ status: 0, body: null, raw: 'réseau: ' + e.message }));
    if (buf) req.write(buf); req.end();
  });
}
// Zone d'impression « couverture » du produit (lue dans la fiche produit Prodigi)
let coverAreaCache;
async function coverPrintArea() {
  if (coverAreaCache !== undefined) return coverAreaCache;
  const r = await prodigiCall('GET', `/v4.0/products/${SKU}`);
  const areas = r.body && r.body.product && r.body.product.printAreas ? Object.keys(r.body.product.printAreas) : [];
  coverAreaCache = areas.find(a => /cover/i.test(a)) || areas.find(a => a !== 'default') || null;
  return coverAreaCache;
}
async function postOrderOnce(payload) {
  const r = await prodigiCall('POST', '/v4.0/orders', payload);
  const id = r.body && (r.body.order && r.body.order.id || r.body.id);
  if (r.status && r.status < 300 && id) return { id, outcome: r.body.outcome || '' };
  return { id: null, status: r.status, err: `HTTP ${r.status} — ${String(r.raw).slice(0, 500)}` };
}
// Le téléphone aide le transporteur, mais ne doit jamais bloquer une commande :
// si Prodigi refuse explicitement la requête (HTTP 400), on renvoie une fois sans numéro.
// (Jamais de nouvel envoi sur un délai dépassé ou une erreur serveur : la commande a pu être créée.)
async function postOrder(payload) {
  const r = await postOrderOnce(payload);
  if (r.id || r.status !== 400 || !payload.recipient || !payload.recipient.phoneNumber) return r;
  const { phoneNumber, ...recipient } = payload.recipient;
  console.warn('Prodigi a refusé la commande avec téléphone, nouvel essai sans :', r.err);
  const r2 = await postOrderOnce({ ...payload, recipient, idempotencyKey: payload.idempotencyKey + '-sanstel' });
  if (r2.id) r2.outcome = (r2.outcome ? r2.outcome + ' · ' : '') + 'envoyée sans téléphone';
  return r2;
}

async function createProdigiOrder({ pdfUrl, name, phone, email, address, addr, stripeSessionId, orderNumber, pages, spine }) {
  if (!process.env.PRODIGI_API_KEY) { global.__lastProdigiError = 'PRODIGI_API_KEY manquante'; return { id: null }; }
  if (!pdfUrl) { global.__lastProdigiError = 'Pas de PDF'; return { id: null }; }
  const structured = addr && addr.line1 && addr.postal && addr.city && addr.country;
  const parts = (address || '').split(',').map(s => s.trim()).filter(Boolean);
  let postalCode = '', city = '', postalIdx = -1;
  for (let i = 0; i < parts.length; i++) {
    const m = parts[i].match(/^([A-Z]{0,2}-?\d{4,5}(?:\s?[A-Z]{2})?)\s+(.+)$/i);
    if (m) { postalCode = m[1]; city = m[2]; postalIdx = i; break; }
  }
  const addressParts = postalIdx >= 0 ? parts.slice(0, postalIdx) : parts.slice(0, Math.max(1, parts.length - 1));
  const line1 = addressParts.join(', ') || (parts[0] || '');
  const country = detectCountry(postalIdx >= 0 ? parts.slice(postalIdx + 1).join(' ') : parts[parts.length - 1]);
  const recipientAddress = structured
    ? { line1: addr.line1, line2: addr.line2 || undefined, postalOrZipCode: addr.postal, countryCode: addr.country, townOrCity: addr.city, isBusiness: false }
    : { line1, postalOrZipCode: postalCode, countryCode: country, townOrCity: city, isBusiness: false };
  const n = parseInt(pages, 10) || 36;
  // callbackUrl : Prodigi nous prévient à chaque étape (expédition → email de suivi au client)
  const recipient = Object.assign({ name, email }, phone ? { phoneNumber: phone } : {}, { address: recipientAddress });
  const base = { merchantReference: orderNumber, shippingMethod: 'Budget', callbackUrl: 'https://noustalgie.fr/api/prodigi-webhook', recipient };
  const item = assets => [{ merchantReference: `album-${stripeSessionId}`, sku: SKU, copies: 1, sizing: 'fillPrintArea', assets }];
  let note = '';

  // 1) Livre avec tranche imprimée : couverture (dos + tranche + face) + pages intérieures
  if (spine && spine.cover && spine.inner && n - 2 < 24) note = 'Tranche non proposée : 24 pages intérieures minimum chez Prodigi (album de ' + n + ' pages).';
  else if (spine && spine.cover && spine.inner) {
    const area = await coverPrintArea();
    if (area) {
      const r = await postOrder({ ...base, idempotencyKey: `noustalgie-${stripeSessionId}-spine`,
        items: item([{ printArea: area, url: spine.cover }, { printArea: 'default', url: spine.inner, pageCount: n - 2 }]) });
      if (r.id) { console.log(`Commande Prodigi (tranche) : ${r.id}`); return { id: r.id, spine: true, note: r.outcome && r.outcome !== 'Created' ? `Statut Prodigi : ${r.outcome}` : '' }; }
      note = `Tranche non acceptée par Prodigi, commande standard envoyée à la place. Détail : ${r.err}`;
    } else note = 'Zone « couverture » absente de la fiche produit Prodigi : commande standard envoyée.';
    console.warn(note);
  }
  // 2) Format historique (déjà validé en production) : un seul PDF, couverture et dos compris
  const r = await postOrder({ ...base, idempotencyKey: `noustalgie-${stripeSessionId}`, items: item([{ printArea: 'default', url: pdfUrl, pageCount: n }]) });
  if (r.id) { console.log(`Commande Prodigi : ${r.id}`); return { id: r.id, spine: false, note }; }
  global.__lastProdigiError = r.err + (note ? ` | ${note}` : '');
  console.error(global.__lastProdigiError);
  return { id: null, note };
}

// Print API : livre (couverture d'un seul tenant + pages intérieures) et objets choisis, dans un seul colis.
// Notre numéro de commande sert d'identifiant chez Print API : un événement Stripe renvoyé ne crée pas de doublon.
const OPT_NAMES = { coffret: 'Coffret cadeau', express: 'Fabrication express', affiche: 'Affiche 30 × 40 cm', cadre: 'Petit cadre photo 15 × 15 cm', aimant: 'Aimant photo 5 × 5 cm' };
async function createPrintApiOrder({ m, name, phone, email, first, names, orderNumber, pages }) {
  const opts = String(m.options || '').split(',').filter(k => OPT_NAMES[k]);
  const items = [{ id: 'album', productId: PA.BOOK, pageCount: PA.innerCount(parseInt(pages, 10) || 36), quantity: 1,
    files: { content: m.pa_inner, cover: m.pa_cover }, options: opts.includes('coffret') ? [{ id: 'storage_box', value: 'yes' }] : [] }];
  if (opts.includes('affiche') && m.affiche_url) items.push({ id: 'affiche', productId: PA.EXTRAS.affiche, quantity: 1, files: { content: m.affiche_url } });
  if (opts.includes('cadre') && m.cadre_url) items.push({ id: 'cadre', productId: PA.EXTRAS.cadre, quantity: 1, files: { content: m.cadre_url } });
  if (opts.includes('aimant') && m.aimant_url) items.push({ id: 'aimant', productId: PA.EXTRAS.aimant, quantity: 1, files: { content: m.aimant_url } });
  const address = Object.assign({ name, line1: m.addr_line1 }, m.addr_line2 ? { line2: m.addr_line2 } : {},
    { postCode: m.addr_postal, city: m.addr_city, country: m.addr_country }, phone ? { phone } : {});
  // L'email du client reste chez nous (métadonnées) : Print API n'écrit jamais au client, le suivi part de noustalgie.fr
  const payload = { id: orderNumber, productionSpeed: opts.includes('express') ? 'Express' : 'Standard', items, shipping: { address },
    metadata: JSON.stringify({ email, first, names: String(names || '').slice(0, 200) }) };
  try {
    const r = await PA.postOrder(payload);
    if (r.order) { console.log(`Commande Print API : ${r.order.id}`); return { id: r.order.id, opts }; }
    // Commande déjà créée par un premier passage de cet événement ?
    const deja = await PA.getOrder(orderNumber);
    if (deja) return { id: deja.id, opts, note: 'Commande déjà créée lors d’un premier envoi de Stripe.' };
    global.__lastPrinterError = r.err;
  } catch (e) { global.__lastPrinterError = e.message; }
  console.error('Print API :', global.__lastPrinterError);
  return { id: null, opts };
}

function verifyStripeSignature(rawBody, sigHeader, secret) {
  if (!secret || !sigHeader) return false;
  try {
    const parts = {};
    sigHeader.split(',').forEach(kv => { const i = kv.indexOf('='); parts[kv.slice(0, i)] = kv.slice(i + 1); });
    const t = parts.t, v1 = parts.v1;
    if (!t || !v1) return false;
    // Refuse les événements de plus de 5 minutes (anti-rejeu)
    if (Math.abs(Date.now() / 1000 - parseInt(t, 10)) > 300) return false;
    const expected = crypto.createHmac('sha256', secret).update(`${t}.${rawBody}`, 'utf8').digest('hex');
    const a = Buffer.from(expected), b = Buffer.from(v1);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (e) { return false; }
}

function readRawBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', c => data += c);
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(''));
  });
}

// Gabarit email commun, aux couleurs du site (papier clair, encre, bouton pilule : comme l'email « Recevoir le lien »)
const mail = (title, inner) => `<div style="background:#f6f4f0;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
<div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e4dfd7;border-radius:14px;padding:32px 28px;color:#1c1a18;">
<div style="font-size:20px;margin-bottom:24px;">Nous<em>talgie</em></div>
<h2 style="font-weight:400;font-size:24px;margin:0 0 16px;">${title}</h2>
<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#5f5a54;">${inner}</div>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#8b857d;margin-top:28px;">Une question ? Répondez simplement à cet email.</p>
</div></div>`;
const btn = (href, label) => `<div style="margin:24px 0;"><a href="${h(href)}" style="background:#1c1a18;color:#ffffff;padding:14px 26px;border-radius:999px;text-decoration:none;font-family:Arial,sans-serif;font-size:15px;display:inline-block;">${label}</a></div>`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const WH_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!WH_SECRET) { console.error('STRIPE_WEBHOOK_SECRET manquant — webhook refusé'); return res.status(500).send('Not configured'); }

  const rawBody = await readRawBody(req);
  if (!verifyStripeSignature(rawBody, req.headers['stripe-signature'], WH_SECRET)) {
    console.error('Signature webhook invalide');
    return res.status(400).send('Invalid signature');
  }

  let event;
  try { event = JSON.parse(rawBody); } catch (e) { return res.status(400).send('Invalid JSON'); }
  // Paiement immédiat (carte, Apple Pay, PayPal, Klarna…) : « completed » déjà payé. Paiement confirmé plus tard
  // (prélèvement SEPA…) : « completed » non payé, ignoré, puis « async_payment_succeeded » une fois l'argent reçu.
  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') return res.status(200).json({ received: true, ignored: event.type });

  const session = event.data.object;
  if (session.payment_status !== 'paid') return res.status(200).json({ received: true, ignored: 'unpaid' });

  const m = session.metadata || {};
  const name = m.name || session.customer_details?.name || '';
  const email = session.customer_details?.email || session.customer_email || m.email || '';
  const address = m.address || '';
  const names = m.names || '';
  const pages = m.pages || '36';
  const price = typeof session.amount_total === 'number' ? (session.amount_total / 100).toFixed(2) : (m.price || '');
  const format = m.format === 'pdf' ? 'pdf' : 'print';
  const pdfUrl = m.pdf_url || '';
  const phone = m.phone || session.customer_details?.phone || '';
  const first = m.first_name || String(name).trim().split(' ')[0];

  // Numéro de commande stable (dérivé de la session → identique si Stripe renvoie l'événement)
  const d = new Date((session.created || Date.now() / 1000) * 1000);
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  const orderNumber = `NOUST-${ymd}-${crypto.createHash('sha1').update(session.id).digest('hex').slice(0, 5).toUpperCase()}`;

  let prodigiOrderId = null, prodigi = { id: null, note: '' }, printer = 'Prodigi';
  // Commande payée : la relance « album en attente » n'a plus lieu d'être
  if (m.reminder_id && process.env.RESEND_API_KEY) {
    await new Promise(resolve => {
      const q = https.request({ hostname: 'api.resend.com', path: `/emails/${encodeURIComponent(m.reminder_id)}/cancel`, method: 'POST', timeout: 8000,
        headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY } }, r => { r.on('data', () => {}); r.on('end', resolve); });
      q.on('error', resolve); q.on('timeout', () => { q.destroy(); resolve(); }); q.end();
    });
  }
  try {
    if (format === 'pdf' && pdfUrl && email) {
      await sendEmail({
        to: email,
        subject: 'Votre album Noustalgie est prêt ♥',
        html: mail(`Bonjour ${h(first)},`, `<p>Votre album <b>${h(names)}</b> est prêt.</p>${btn(pdfUrl, 'Télécharger mon album (PDF)')}<p style="color:#8b857d;font-size:12px;">Lien valable 14 jours : pensez à l’enregistrer. N° de commande : ${orderNumber}</p>`),
      });
    }

    // Print API dès que ses clés sont en place et que la page a fourni ses fichiers ; sinon Prodigi, comme avant.
    // Suisse, Luxembourg, Monaco : la livraison Print API y coûte 22 à 32 € (Prodigi : 8 à 15 €), Prodigi imprime donc le livre sans option.
    const cherPA = ['CH', 'LU', 'MC'].includes(m.addr_country) && !String(m.options || '').trim();
    const viaPA = format === 'print' && PA.configured() && !cherPA && m.pa_cover && m.pa_inner && m.addr_line1 && m.addr_postal && m.addr_city && m.addr_country;
    if (viaPA) {
      printer = 'Print API';
      prodigi = await createPrintApiOrder({ m, name, phone, email, first, names, orderNumber, pages });
      prodigiOrderId = prodigi.id;
    } else if (format === 'print' && pdfUrl) {
      const addr = { line1: m.addr_line1, line2: m.addr_line2, postal: m.addr_postal, city: m.addr_city, country: m.addr_country };
      const spine = m.cover_url && m.inner_url ? { cover: m.cover_url, inner: m.inner_url } : null;
      prodigi = await createProdigiOrder({ pdfUrl, name, phone, email, address, addr, stripeSessionId: session.id, orderNumber, pages, spine });
      prodigiOrderId = prodigi.id;
    }
    const optList = (prodigi.opts || []).map(k => OPT_NAMES[k]);

    const NOTIFY = process.env.NOTIFY_EMAIL;
    if (NOTIFY) {
      // Fichiers Print API dans l'alerte : de quoi passer la commande à la main dans le portail
      const paFiles = [['Couverture', m.pa_cover], ['Pages intérieures', m.pa_inner], ['Affiche', m.affiche_url], ['Cadre', m.cadre_url], ['Aimant', m.aimant_url]]
        .filter(f => f[1]).map(([n, u]) => `<a href="${h(u)}">${n}</a>`).join(' · ');
      const warn = (format === 'print' && !prodigiOrderId)
        ? `<p style="color:#e07070"><b>⚠️ Commande ${printer} NON créée — à traiter manuellement !</b><br><small>${h((printer === 'Prodigi' ? global.__lastProdigiError : global.__lastPrinterError) || 'aucune erreur capturée')}</small>${printer === 'Print API' && paFiles ? `<br><small>Fichiers Print API : ${paFiles}</small>` : ''}</p>` : '';
      await sendEmail({
        to: NOTIFY,
        subject: `🎉 ${orderNumber} — ${first} — ${price}€${prodigiOrderId ? ` ✅ ${printer}` : format === 'print' ? ' ⚠️ À TRAITER' : ''}`,
        html: `<h2>Nouvelle commande</h2>
          <p><b>N° :</b> ${orderNumber}<br><b>Client :</b> ${h(name)} (${h(email)})<br><b>Couple :</b> ${h(names)}</p>
          <p><b>Format :</b> ${format} · <b>Pages :</b> ${h(pages)} · <b>Montant :</b> ${h(price)}€${m.promo ? ` · <b>Promo :</b> ${h(m.promo)}` : ''}</p>
          ${optList.length ? `<p><b>Options :</b> ${h(optList.join(', '))}</p>` : ''}
          <p><b>Destinataire :</b> ${h(name || '—')}${phone ? ` · <b>Tél :</b> ${h(phone)}` : ''}<br><b>Adresse :</b> ${h(address || '(PDF)')}</p>
          <p><b>PDF :</b> ${pdfUrl ? `<a href="${h(pdfUrl)}">ouvrir</a>` : 'Non disponible'}</p>
          ${prodigiOrderId ? `<p style="color:green"><b>✅ ${printer} : ${h(prodigiOrderId)}</b> — ${printer === 'Print API' ? `tranche imprimée${PA.host() === 'test.printapi.nl' ? ' (environnement de TEST : rien ne sera imprimé)' : ''}` : prodigi.spine ? `tranche imprimée (${h(m.spine_mm)} mm)` : 'tranche unie'}</p>` : warn}
          ${prodigi.note ? `<p style="color:#9a6b12"><small>${h(prodigi.note)}</small></p>` : ''}
          <p><a href="https://dashboard.stripe.com/payments">Voir Stripe</a></p>`,
      });
    }

    if (format === 'print' && email) {
      await sendEmail({
        to: email,
        subject: 'Votre livre Noustalgie part à l’impression ♥',
        html: mail(`Bonjour ${h(first)},`, `<p>Votre commande est confirmée : le livre <b>${h(names)}</b> part à l’impression.</p>
          <p>N° de commande : <b style="color:#1c1a18;">${orderNumber}</b><br>Format : 21×21 cm, couverture rigide, ${h(pages)} pages${optList.length ? `<br>Avec : ${h(optList.join(', '))}` : ''}<br>Livraison estimée : ${printer === 'Prodigi' ? '10 à 12 jours' : '6 à 8 jours ouvrés'} environ</p>
          <p>Vous recevrez le numéro de suivi par email dès l’expédition.</p>${btn('https://noustalgie.fr/#suivi', 'Suivre ma commande')}`),
      });
    }
  } catch (e) {
    console.error('Erreur traitement webhook:', e.message);
  }
  return res.status(200).json({ received: true, orderNumber, printer, printerOrderId: prodigiOrderId });
};

module.exports.config = { api: { bodyParser: false } };
