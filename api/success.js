const https = require('https');

async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) { console.log('Email non envoyé (pas de RESEND_API_KEY):', to); return; }
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <commandes@noustalgie.fr>', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length }
    }, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{console.log('Email →',to,r.statusCode);resolve();}); });
    req.on('error', e => { console.error('Email error:', e.message); resolve(); });
    req.write(buf); req.end();
  });
}

function successHTML(name, pages, price) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Commande confirmée — Noustalgie</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}.box{max-width:480px;width:100%;text-align:center;}.ico{font-size:3rem;margin-bottom:1.5rem;}h1{font-family:'Playfair Display',serif;font-size:2rem;font-weight:400;margin-bottom:.5rem;}h1 em{color:#c9a05a;font-style:italic;}.sub{font-family:'Playfair Display',serif;font-size:.9375rem;font-style:italic;color:rgba(242,235,224,.5);line-height:1.75;margin-bottom:2rem;}.card{background:#1c1610;border:1px solid rgba(201,160,90,.18);border-radius:10px;padding:1.5rem;margin-bottom:2rem;text-align:left;}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(210,175,120,.08);font-size:.875rem;}.row:last-child{border-bottom:none;}.lbl{color:rgba(242,235,224,.45);font-size:.8125rem;}.val{font-weight:500;}.steps{display:flex;flex-direction:column;gap:10px;margin-bottom:2rem;text-align:left;}.step{display:flex;align-items:flex-start;gap:12px;font-size:.875rem;color:rgba(242,235,224,.65);}.sn{width:22px;height:22px;border-radius:50%;background:rgba(201,160,90,.15);border:1px solid rgba(201,160,90,.3);color:#c9a05a;font-size:.6875rem;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}.btn{display:inline-block;padding:13px 32px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;}</style>
</head><body><div class="box">
<div class="ico">🎉</div>
<h1>Commande<br><em>confirmée !</em></h1>
<p class="sub">Merci ${name} — votre livre est en cours de préparation.<br>Un email de confirmation vous a été envoyé.</p>
<div class="card">
<div class="row"><span class="lbl">Produit</span><span class="val">Album Premium Noustalgie</span></div>
<div class="row"><span class="lbl">Pages</span><span class="val">${pages} pages</span></div>
<div class="row"><span class="lbl">Montant payé</span><span class="val">${price} €</span></div>
<div class="row"><span class="lbl">Livraison</span><span class="val">5 à 7 jours ouvrés</span></div>
</div>
<div class="steps">
<div class="step"><div class="sn">1</div>Votre album est en cours d'impression chez CEWE sur papier photo professionnel.</div>
<div class="step"><div class="sn">2</div>Un email de suivi avec le numéro de tracking vous sera envoyé.</div>
<div class="step"><div class="sn">3</div>Livraison à votre adresse en 5 à 7 jours ouvrés.</div>
</div>
<a href="/" class="btn">← Retour au site</a>
</div></body></html>`;
}

module.exports = async (req, res) => {
  const params = new URLSearchParams(req.url.split('?')[1] || '');
  const sessionId = params.get('session_id') || '';
  const name  = params.get('name')  || '';
  const pages = params.get('pages') || '30';
  const price = params.get('price') || '39.99';

  // Récupérer détails Stripe + envoyer emails
  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      await new Promise(resolve => {
        https.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
          headers: { 'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY }
        }, r => {
          let d = ''; r.on('data', c => d += c);
          r.on('end', async () => {
            try {
              const s = JSON.parse(d);
              const email   = s.customer_email || s.customer_details?.email || '';
              const address = s.metadata?.address || '';
              const names   = s.metadata?.names   || '';
              const style   = s.metadata?.style   || '';

              console.log(`✅ Commande confirmée : ${name} (${email}) — ${pages} pages — ${price}€`);

              // Email propriétaire
              const NOTIFY = process.env.NOTIFY_EMAIL;
              if (NOTIFY) {
                await sendEmail({
                  to: NOTIFY,
                  subject: `🎉 Nouvelle commande — ${name} — ${price}€`,
                  html: `<h2>Nouvelle commande Noustalgie !</h2>
                    <p><b>Client :</b> ${name} (${email})</p>
                    <p><b>Couple :</b> ${names}</p>
                    <p><b>Style :</b> ${style}</p>
                    <p><b>Pages :</b> ${pages}</p>
                    <p><b>Montant :</b> ${price}€</p>
                    <p><b>Adresse :</b> ${address}</p>
                    <p><b>Session Stripe :</b> ${sessionId}</p>
                    <hr/>
                    <p>👉 <a href="https://dashboard.stripe.com">Voir sur Stripe</a></p>
                    <p>📦 À commander chez CEWE avec le PDF.</p>`
                });
              }

              // Email client
              if (email) {
                await sendEmail({
                  to: email,
                  subject: `Votre livre Noustalgie est en préparation ♥`,
                  html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#333;">
                    <h1 style="color:#c9a05a;font-family:Georgia,serif;">Noustalgie</h1>
                    <h2>Bonjour ${name} ♥</h2>
                    <p>Votre commande est confirmée. Votre livre <b>${names}</b> est en cours d'impression.</p>
                    <table style="width:100%;margin:1rem 0;border-collapse:collapse;">
                      <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Album</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">${pages} pages · ${style}</td></tr>
                      <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Montant</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">${price}€</td></tr>
                      <tr><td style="padding:8px 0;color:#888;">Livraison</td><td style="padding:8px 0;font-weight:bold;">5 à 7 jours ouvrés</td></tr>
                    </table>
                    <p style="color:#888;font-size:13px;">Vous recevrez un email de suivi à l'expédition.</p>
                    <p style="margin-top:1.5rem;">Merci pour votre confiance 🎉<br><b>L'équipe Noustalgie</b></p>
                  </div>`
                });
              }
            } catch(e) { console.error(e.message); }
            resolve();
          });
        }).on('error', e => { console.error(e.message); resolve(); });
      });
    } catch(e) { console.error(e.message); }
  }

  const priceFormatted = parseFloat(price).toFixed(2).replace('.', ',');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(successHTML(name, pages, priceFormatted));
};
