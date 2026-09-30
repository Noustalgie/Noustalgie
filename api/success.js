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
    ['Produit', isPdf ? 'Album numérique (PDF)' : 'Livre imprimé 21 × 21 cm, couverture rigide'],
    ['Pages', pages ? `${pages} pages` : ''],
    ['Montant payé', price ? `${price} €` : ''],
    [isPdf ? 'Envoi' : 'Livraison estimée', isPdf ? 'Par email, dans quelques minutes' : 'Environ 10 à 12 jours'],
  ].filter(r => r[1]);
  const steps = isPdf
    ? [`Votre album est envoyé à ${email || 'votre adresse email'}.`, 'Téléchargez-le depuis le lien reçu (valable 14 jours).', 'Imprimez-le, partagez-le, gardez-le.']
    : ['Votre album part à l’impression chez notre imprimeur partenaire.', 'Vous recevez le numéro de suivi par email dès l’expédition.', 'Livraison chez vous en 10 à 12 jours environ.'];
  const title = paid ? `Merci${firstName ? ' ' + firstName : ''}, <em>c’est commandé</em>` : 'Merci pour votre commande';
  const sub = paid
    ? `Un email de confirmation vient de partir${email ? ' à <b>' + email + '</b>' : ''}. Gardez-le : il contient votre numéro de commande.`
    : 'Si votre paiement a bien été validé, vous recevrez un email de confirmation dans quelques minutes. Sinon, écrivez-nous à contact@noustalgie.fr.';
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><meta name="robots" content="noindex"/>
<title>Commande confirmée — Noustalgie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:#fbfaf7;color:#1c1a18;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:calc(2rem + env(safe-area-inset-top)) 1.25rem calc(2rem + env(safe-area-inset-bottom));-webkit-font-smoothing:antialiased}
.box{max-width:500px;width:100%}
.logo{font:400 22px 'Playfair Display',Georgia,serif;margin-bottom:2.2rem;display:block;color:#1c1a18;text-decoration:none}
.logo em{font-style:italic}
.ok{width:46px;height:46px;border-radius:50%;background:#1c1a18;color:#fff;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem}
h1{font:400 clamp(2rem,6vw,2.6rem)/1.12 'Playfair Display',Georgia,serif;margin-bottom:1rem}
h1 em{font-style:italic}
.sub{color:#5f5a54;line-height:1.7;font-size:.97rem;margin-bottom:1.8rem}
.sub b{color:#1c1a18;font-weight:500}
.card{background:#fff;border:1px solid #e4dfd7;border-radius:18px;padding:.4rem 1.25rem;margin-bottom:1.8rem}
.row{display:flex;justify-content:space-between;gap:1rem;padding:.85rem 0;border-bottom:1px solid #eee9e2;font-size:.92rem}
.row:last-child{border-bottom:0}
.row span{color:#5f5a54}.row b{font-weight:500;text-align:right}
.eb{font:500 11px 'Inter',sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#77726b;margin-bottom:.9rem}
ol{list-style:none;margin-bottom:2rem;counter-reset:s}
li{counter-increment:s;display:flex;gap:.9rem;align-items:flex-start;padding:.45rem 0;color:#2b2926;line-height:1.55;font-size:.95rem}
li::before{content:counter(s);flex:0 0 26px;height:26px;border-radius:50%;border:1px solid #d9d4cc;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:500;background:#fff}
.btns{display:flex;flex-wrap:wrap;gap:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:999px;font:500 15px 'Inter',sans-serif;text-decoration:none}
.btn.dark{background:#1c1a18;color:#fff}.btn.line{border:1px solid #1c1a18;color:#1c1a18}
.help{margin-top:1.8rem;font-size:.85rem;color:#77726b}.help a{color:#1c1a18}
@media(max-width:480px){.btn{flex:1 1 100%}}
</style></head><body><main class="box">
<a class="logo" href="/">Nous<em>talgie</em></a>
${paid ? '<div class="ok" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></div>' : ''}
<h1>${title}</h1>
<p class="sub">${sub}</p>
${rows.length ? `<div class="card">${rows.map(r => `<div class="row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>` : ''}
<p class="eb">La suite</p>
<ol>${steps.map(x => `<li>${x}</li>`).join('')}</ol>
<div class="btns"><a class="btn dark" href="/">Retour à l’accueil</a>${isPdf ? '' : '<a class="btn line" href="/#suivi">Suivre ma commande</a>'}</div>
<p class="help">Une question ? <a href="mailto:contact@noustalgie.fr">contact@noustalgie.fr</a></p>
</main>
${paid ? `<script>
// Commande payée : l'album en cours est effacé de l'appareil (le site ne proposera plus de le « reprendre »)
try { var r = indexedDB.open('noustalgie', 1); r.onsuccess = function () { try { var d = r.result; if (d.objectStoreNames.contains('kv')) { d.transaction('kv', 'readwrite').objectStore('kv').delete('album'); } } catch (e) {} }; } catch (e) {}
try { localStorage.removeItem('nst_log'); } catch (e) {}
</script>` : ''}
</body></html>`;
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
