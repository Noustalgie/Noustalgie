// api/success.js — page de confirmation après paiement
// Aucune action de production ici : tout est géré par le webhook Stripe (api/webhook.js).
// Les infos affichées viennent de Stripe (pas de l'URL) et sont échappées.
const https = require('https');
const { escapeHtml } = require('./_lib/security');

function getSession(id) {
  return new Promise(resolve => {
    if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id) || !process.env.STRIPE_SECRET_KEY) return resolve(null);
    https.get({ hostname: 'api.stripe.com', path: `/v1/checkout/sessions/${id}`, headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

function page({ firstName, pages, price, format, email, paid }) {
  const isPdf = format === 'pdf';
  const rows = [
    ['Produit', isPdf ? 'Album numérique (PDF)' : 'Livre imprimé 21×21 cm, couverture rigide'],
    ['Pages', `${pages} pages`],
    ['Montant payé', `${price} €`],
    [isPdf ? 'Envoi' : 'Livraison estimée', isPdf ? 'Par email, dans quelques minutes' : 'Environ 10 à 12 jours'],
  ];
  const steps = isPdf
    ? ['Votre album est envoyé à ' + email + '.', 'Téléchargez-le depuis le lien reçu (valable 14 jours).', 'Imprimez-le, partagez-le, gardez-le.']
    : ['Votre album part à l’impression dans notre atelier partenaire.', 'Vous recevez le numéro de suivi par email dès l’expédition.', 'Livraison à votre porte en 10 à 12 jours environ.'];
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="robots" content="noindex"/>
<title>Commande confirmée — Noustalgie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem 1.25rem;-webkit-font-smoothing:antialiased}
.box{max-width:480px;width:100%}
h1{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:clamp(2rem,6vw,2.6rem);line-height:1.1;margin-bottom:1rem}
h1 em{color:#c9a05a}
.sub{color:rgba(242,235,224,.62);line-height:1.7;font-size:.95rem;margin-bottom:2rem}
.card{border:1px solid rgba(210,175,120,.2);border-radius:4px;padding:.5rem 1.25rem;margin-bottom:2rem}
.row{display:flex;justify-content:space-between;gap:1rem;padding:.8rem 0;border-bottom:1px solid rgba(210,175,120,.1);font-size:.875rem}
.row:last-child{border-bottom:none}.lbl{color:rgba(242,235,224,.45)}.val{text-align:right}
ol{list-style:none;counter-reset:s;margin-bottom:2.25rem}
li{counter-increment:s;display:flex;gap:.9rem;align-items:baseline;color:rgba(242,235,224,.72);font-size:.9rem;line-height:1.6;padding:.35rem 0}
li::before{content:counter(s);font-family:'Playfair Display',Georgia,serif;color:#c9a05a;font-size:1.1rem;min-width:1rem}
.btn{display:inline-block;padding:14px 28px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.8rem;font-weight:600;letter-spacing:.04em}
.btn:focus-visible{outline:2px solid #f5d898;outline-offset:3px}
.help{margin-top:1.5rem;font-size:.8rem;color:rgba(242,235,224,.4)}.help a{color:rgba(242,235,224,.7)}
</style></head><body><main class="box">
<h1>${paid ? 'Merci' : 'Commande reçue'}${firstName ? `, <em>${firstName}</em>` : ''}</h1>
<p class="sub">${paid ? 'Votre paiement est confirmé. Un email récapitulatif vient de vous être envoyé — pensez à regarder dans les spams s’il n’arrive pas.' : 'Nous vérifions votre paiement. Vous recevrez un email de confirmation dans quelques minutes.'}</p>
${pages ? `<div class="card">${rows.map(([l, v]) => `<div class="row"><span class="lbl">${l}</span><span class="val">${v}</span></div>`).join('')}</div>` : ''}
<ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>
<a href="/" class="btn">Créer un autre album</a>
<p class="help">Une question ? <a href="mailto:contact@noustalgie.fr">contact@noustalgie.fr</a></p>
</main></body></html>`;
}

module.exports = async (req, res) => {
  const qs = new URLSearchParams((req.url || '').split('?')[1] || '');
  const s = await getSession(qs.get('session_id') || '');
  const m = (s && s.metadata) || {};
  const price = s && typeof s.amount_total === 'number' ? (s.amount_total / 100).toFixed(2).replace('.', ',') : '';
  const html = page({
    firstName: escapeHtml(String(m.name || '').trim().split(' ')[0]),
    pages: escapeHtml(m.pages || ''),
    price: escapeHtml(price),
    format: m.format === 'pdf' ? 'pdf' : 'print',
    email: escapeHtml(s ? (s.customer_details?.email || s.customer_email || '') : ''),
    paid: !!(s && s.payment_status === 'paid'),
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).send(html);
};
