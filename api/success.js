const https = require('https');

async function sendEmail({ to, subject, html }) {
  const RESEND = process.env.RESEND_API_KEY;
  if (!RESEND) { console.log('Email non envoyé (pas de RESEND_API_KEY):', to); return; }
  const buf = Buffer.from(JSON.stringify({ from: 'Noustalgie <contact@noustalgie.fr>', to, subject, html }));
  return new Promise(resolve => {
    const req = https.request({
      hostname: 'api.resend.com', path: '/emails', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + RESEND, 'Content-Type': 'application/json', 'Content-Length': buf.length }
    }, r => { let d=''; r.on('data',c=>d+=c); r.on('end',()=>{ console.log('Email →',to,r.statusCode); resolve(); }); });
    req.on('error', e => { console.error('Email error:', e.message); resolve(); });
    req.write(buf); req.end();
  });
}

async function createProdigiOrder({ pdfUrl, name, email, address, stripeSessionId }) {
  if (!process.env.PRODIGI_API_KEY) {
    console.log('⚠️ PRODIGI_API_KEY manquante — commande non créée automatiquement');
    return null;
  }
  if (!pdfUrl) { console.log('⚠️ Pas de PDF URL — commande Prodigi ignorée'); return null; }

  // Parse adresse
  const parts = (address || '').split(',').map(s => s.trim());
  const line1 = parts[0] || '';
  let postalCode = '', city = '', country = 'FR';
  if (parts[1]) {
    const m = parts[1].match(/^(\d{5})\s+(.+)$/);
    if (m) { postalCode = m[1]; city = m[2]; } else { city = parts[1]; }
  }
  if (parts[2]) { const c = parts[2].toUpperCase(); country = c.includes('BELG')?'BE':c.includes('SUISS')?'CH':'FR'; }

  const nameParts = (name||'').trim().split(' ');
  const orderPayload = {
    merchantReference: `NOUST-${stripeSessionId||Date.now()}`,
    shippingMethod: 'Budget',
    idempotencyKey: `noustalgie-${stripeSessionId||Date.now()}`,
    recipient: {
      name: name,
      email: email,
      address: { line1, postalOrZipCode: postalCode||'75001', countryCode: country, townOrCity: city||'Paris', isBusiness: false }
    },
    items: [{
      merchantReference: `album-${Date.now()}`,
      sku: 'BOOK-FE-8_3-SQ-HARD-G',
      copies: 1,
      sizing: 'fillPrintArea',
      assets: [{ printArea: 'default', url: pdfUrl }]
    }]
  };

  return new Promise((resolve) => {
    const buf = Buffer.from(JSON.stringify(orderPayload));
    const req = https.request({
      hostname: 'api.prodigi.com', path: '/v4.0/orders', method: 'POST',
      headers: { 'X-API-Key': process.env.PRODIGI_API_KEY, 'Content-Type': 'application/json', 'Content-Length': buf.length }
    }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        try {
          const body = JSON.parse(d);
          const orderId = body?.order?.id || body?.id;
          if (r.statusCode < 300) { console.log(`✅ Commande Prodigi : ${orderId}`); resolve(orderId); }
          else { console.error(`❌ Prodigi ${r.statusCode}:`, d.slice(0,200)); resolve(null); }
        } catch(e) { console.error('Prodigi parse error:', e.message); resolve(null); }
      });
    });
    req.on('error', e => { console.error('Prodigi error:', e.message); resolve(null); });
    req.write(buf); req.end();
  });
}

function successHTML(name, pages, price, prodigiOrderId) {
  const hasOrder = prodigiOrderId ? true : false;
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Commande confirmée — Noustalgie</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}.box{max-width:480px;width:100%;text-align:center;}.ico{font-size:3rem;margin-bottom:1.5rem;}h1{font-family:'Playfair Display',serif;font-size:2rem;font-weight:400;margin-bottom:.5rem;}h1 em{color:#c9a05a;font-style:italic;}.sub{font-family:'Playfair Display',serif;font-size:.9375rem;font-style:italic;color:rgba(242,235,224,.5);line-height:1.75;margin-bottom:2rem;}.card{background:#1c1610;border:1px solid rgba(201,160,90,.18);border-radius:10px;padding:1.5rem;margin-bottom:2rem;text-align:left;}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(210,175,120,.08);font-size:.875rem;}.row:last-child{border-bottom:none;}.lbl{color:rgba(242,235,224,.45);font-size:.8125rem;}.val{font-weight:500;}.steps{display:flex;flex-direction:column;gap:10px;margin-bottom:2rem;text-align:left;}.step{display:flex;align-items:flex-start;gap:12px;font-size:.875rem;color:rgba(242,235,224,.65);}.sn{width:22px;height:22px;border-radius:50%;background:${hasOrder?'rgba(126,200,160,.15)':'rgba(201,160,90,.15)'};border:1px solid ${hasOrder?'rgba(126,200,160,.3)':'rgba(201,160,90,.3)'};color:${hasOrder?'#7ec8a0':'#c9a05a'};font-size:.6875rem;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}.btn{display:inline-block;padding:13px 32px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;}.badge{display:inline-block;background:rgba(126,200,160,.1);border:1px solid rgba(126,200,160,.3);color:#7ec8a0;border-radius:20px;padding:4px 12px;font-size:.75rem;letter-spacing:.08em;margin-bottom:1.5rem;}</style>
</head><body><div class="box">
<div class="ico">🎉</div>
${hasOrder?'<div class="badge">✓ Commande envoyée à l\'imprimeur</div>':''}
<h1>Commande<br><em>confirmée !</em></h1>
<p class="sub">Merci ${name} — votre livre est${hasOrder?' en cours d\'impression':" confirmé"}.<br>Un email de confirmation vous a été envoyé.</p>
<div class="card">
<div class="row"><span class="lbl">Produit</span><span class="val">Album Premium Noustalgie</span></div>
<div class="row"><span class="lbl">Format</span><span class="val">Carré 21×21cm · Couverture rigide</span></div>
<div class="row"><span class="lbl">Pages</span><span class="val">${pages} pages</span></div>
<div class="row"><span class="lbl">Montant payé</span><span class="val">${price} €</span></div>
<div class="row"><span class="lbl">Livraison estimée</span><span class="val">${hasOrder?'3 à 5 jours ouvrés':'5 à 7 jours ouvrés'}</span></div>
${prodigiOrderId?`<div class="row"><span class="lbl">N° commande</span><span class="val" style="font-size:.75rem;color:rgba(242,235,224,.4);">${prodigiOrderId}</span></div>`:''}
</div>
<div class="steps">
<div class="step"><div class="sn">${hasOrder?'✓':'1'}</div>${hasOrder?'Votre album est en cours d\'impression professionnelle chez notre imprimeur partenaire.':'Votre album va être envoyé en impression professionnelle.'}</div>
<div class="step"><div class="sn">${hasOrder?'✓':'2'}</div>Un email de suivi avec numéro de tracking vous sera envoyé à l'expédition.</div>
<div class="step"><div class="sn">3</div>Livraison à votre adresse en ${hasOrder?'3-5':'5-7'} jours ouvrés.</div>
</div>
<a href="/" class="btn">← Créer un autre album</a>
</div></body></html>`;
}

module.exports = async (req, res) => {
  const p = new URLSearchParams(req.url.split('?')[1] || '');
  const sessionId = p.get('session_id') || '';
  const name  = p.get('name')  || '';
  const pages = p.get('pages') || '30';
  const price = p.get('price') || '39.99';
  const pdfUrl = p.get('pdf_url') || '';

  let prodigiOrderId = null;
  let email = '', address = '', names = '', style = '';

  if (sessionId && process.env.STRIPE_SECRET_KEY) {
    try {
      await new Promise(resolve => {
        https.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
          { headers: { 'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY } },
          r => {
            let d = ''; r.on('data', c => d += c);
            r.on('end', async () => {
              try {
                const s = JSON.parse(d);
                email   = s.customer_email || s.customer_details?.email || '';
                address = s.metadata?.address || '';
                names   = s.metadata?.names   || '';
                style   = s.metadata?.style   || '';
                const metaPdfUrl = s.metadata?.pdf_url || pdfUrl;
                const format = s.metadata?.format || 'print';

                // Si PDF seulement — envoyer le lien PDF au client par email
                if(format === 'pdf' && metaPdfUrl && email) {
                  sendEmail({
                    to: email,
                    subject: `Votre PDF Noustalgie est prêt ♥`,
                    html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#333;">
                      <h1 style="color:#c9a05a;">Noustalgie</h1>
                      <h2>Bonjour ${name} ♥</h2>
                      <p>Votre album PDF <b>${names}</b> est prêt ! Cliquez sur le bouton ci-dessous pour le télécharger.</p>
                      <div style="text-align:center;margin:2rem 0;">
                        <a href="${metaPdfUrl}" style="background:#c9a05a;color:#0e0b09;padding:14px 28px;border-radius:4px;text-decoration:none;font-weight:600;font-size:14px;">Télécharger mon album PDF ↓</a>
                      </div>
                      <p style="color:#888;font-size:12px;">Ce lien est valide 14 jours.</p>
                      <p style="margin-top:1.5rem;">Merci ! ♥<br><b>L'équipe Noustalgie</b></p>
                    </div>`
                  });
                }

                console.log(`✅ Paiement confirmé : ${name} (${email}) — ${pages}p — ${price}€`);

                // Créer la commande Prodigi automatiquement
                if (metaPdfUrl) {
                  prodigiOrderId = await createProdigiOrder({
                    pdfUrl: metaPdfUrl, name, email, address, stripeSessionId: sessionId
                  });
                }

                // Email propriétaire
                const NOTIFY = process.env.NOTIFY_EMAIL;
                if (NOTIFY) {
                  await sendEmail({
                    to: NOTIFY,
                    subject: `🎉 Commande Noustalgie — ${name} — ${price}€${prodigiOrderId?' ✅ Prodigi envoyé':''}`,
                    html: `<h2>Nouvelle commande !</h2>
                      <p><b>Client :</b> ${name} (${email})</p>
                      <p><b>Couple :</b> ${names}</p><p><b>Style :</b> ${style}</p>
                      <p><b>Pages :</b> ${pages}</p><p><b>Montant :</b> ${price}€</p>
                      <p><b>Adresse :</b> ${address}</p>
                      <p><b>PDF URL :</b> ${metaPdfUrl||'Non disponible'}</p>
                      ${prodigiOrderId?`<p style="color:green"><b>✅ Commande Prodigi : ${prodigiOrderId}</b></p>`:'<p style="color:orange"><b>⚠️ Commande Prodigi non créée automatiquement (PRODIGI_API_KEY manquante ou PDF manquant)</b></p>'}
                      <p><a href="https://dashboard.stripe.com">Voir sur Stripe</a></p>`
                  });
                }

                // Email client
                if (email) {
                  await sendEmail({
                    to: email,
                    subject: `Votre livre Noustalgie est en préparation ♥`,
                    html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#333;">
                      <h1 style="color:#c9a05a;">Noustalgie</h1>
                      <h2>Bonjour ${name} ♥</h2>
                      <p>Votre commande est confirmée. Votre livre <b>${names}</b> est en cours d'impression.</p>
                      <table style="width:100%;margin:1rem 0;border-collapse:collapse;">
                        <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Format</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">Carré 21×21cm · Couverture rigide</td></tr>
                        <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Pages</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">${pages}</td></tr>
                        <tr><td style="padding:8px 0;color:#888;border-bottom:1px solid #eee;">Montant</td><td style="padding:8px 0;font-weight:bold;border-bottom:1px solid #eee;">${price}€</td></tr>
                        <tr><td style="padding:8px 0;color:#888;">Livraison</td><td style="padding:8px 0;font-weight:bold;">3 à 5 jours ouvrés</td></tr>
                      </table>
                      <p style="color:#888;font-size:13px;">Vous recevrez un email de suivi à l'expédition avec le numéro de tracking.</p>
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
  return res.status(200).send(successHTML(name, pages, priceFormatted, prodigiOrderId));
};
