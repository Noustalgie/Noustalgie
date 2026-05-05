const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const OPENAI_API_KEY    = process.env.OPENAI_API_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const NOTIFY_EMAIL      = 'ton@email.fr';
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;

const MIME = {
  '.html':'text/html;charset=utf-8','.css':'text/css',
  '.js':'application/javascript','.json':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'
};

function stripePost(endpoint, params) {
  const body = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const buf = Buffer.from(body);
    const req = https.request({
      hostname:'api.stripe.com', path:'/v1/'+endpoint, method:'POST',
      headers:{
        'Authorization':'Bearer '+STRIPE_SECRET_KEY,
        'Content-Type':'application/x-www-form-urlencoded',
        'Content-Length':buf.length
      }
    }, r => {
      let d=''; r.on('data',c=>d+=c);
      r.on('end',()=>{try{resolve(JSON.parse(d));}catch(e){resolve(d);}});
    });
    req.on('error',reject); req.write(buf); req.end();
  });
}

async function sendEmail({to,subject,html}) {
  const RESEND = process.env.RESEND_API_KEY||'';
  if(!RESEND){console.log(`📧 Email non envoyé (pas de clé Resend) : ${to}`);return;}
  const buf = Buffer.from(JSON.stringify({from:'Noustalgie <commandes@noustalgie.fr>',to,subject,html}));
  const req = https.request({hostname:'api.resend.com',path:'/emails',method:'POST',
    headers:{'Authorization':'Bearer '+RESEND,'Content-Type':'application/json','Content-Length':buf.length}
  },r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>console.log('📧 Email envoyé →',to,r.statusCode));});
  req.on('error',e=>console.error('Email error:',e.message));
  req.write(buf); req.end();
}

const ORDERS_FILE = path.join(__dirname,'commandes.json');
function saveOrder(order) {
  let orders=[];
  try{orders=JSON.parse(fs.readFileSync(ORDERS_FILE,'utf8'));}catch(e){}
  orders.push({...order,date:new Date().toISOString()});
  fs.writeFileSync(ORDERS_FILE,JSON.stringify(orders,null,2));
  console.log(`\n  💾  Nouvelle commande #${orders.length} : ${order.name} — ${order.price}€\n`);
}

function successPage(name,pages,price) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Commande confirmée — Noustalgie</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}.box{max-width:480px;width:100%;text-align:center;}.ico{font-size:3rem;margin-bottom:1.5rem;}h1{font-family:'Playfair Display',serif;font-size:2rem;font-weight:400;margin-bottom:.5rem;}h1 em{color:#c9a05a;font-style:italic;}.sub{font-family:'Playfair Display',serif;font-size:.9375rem;font-style:italic;color:rgba(242,235,224,.5);line-height:1.75;margin-bottom:2rem;}.card{background:#1c1610;border:1px solid rgba(201,160,90,.18);border-radius:10px;padding:1.5rem;margin-bottom:2rem;text-align:left;}.card-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(210,175,120,.08);font-size:.875rem;}.card-row:last-child{border-bottom:none;}.label{color:rgba(242,235,224,.45);font-size:.8125rem;}.val{font-weight:500;}.steps{display:flex;flex-direction:column;gap:10px;margin-bottom:2rem;text-align:left;}.step{display:flex;align-items:flex-start;gap:12px;font-size:.875rem;color:rgba(242,235,224,.65);}.step-n{width:22px;height:22px;border-radius:50%;background:rgba(201,160,90,.15);border:1px solid rgba(201,160,90,.3);color:#c9a05a;font-size:.6875rem;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0;}.btn{display:inline-block;padding:13px 32px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;}</style>
</head><body><div class="box">
<div class="ico">🎉</div>
<h1>Commande<br><em>confirmée !</em></h1>
<p class="sub">Merci ${name||''}  — votre livre est en cours de préparation.<br>Vous allez recevoir un email de confirmation.</p>
<div class="card">
<div class="card-row"><span class="label">Produit</span><span class="val">Album Premium Noustalgie</span></div>
<div class="card-row"><span class="label">Pages</span><span class="val">${pages||30} pages</span></div>
<div class="card-row"><span class="label">Montant payé</span><span class="val">${price||'39,99'} €</span></div>
<div class="card-row"><span class="label">Livraison</span><span class="val">5 à 7 jours ouvrés</span></div>
</div>
<div class="steps">
<div class="step"><div class="step-n">1</div>Votre album est en cours d'impression chez CEWE sur papier photo professionnel.</div>
<div class="step"><div class="step-n">2</div>Un email de suivi avec numéro de tracking vous sera envoyé.</div>
<div class="step"><div class="step-n">3</div>Livraison à votre adresse en 5 à 7 jours ouvrés.</div>
</div>
<a href="/" class="btn">← Retour au site</a>
</div></body></html>`;
}

function cancelPage() {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/><title>Annulé — Noustalgie</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}.box{max-width:420px;text-align:center;}.ico{font-size:2.5rem;margin-bottom:1.5rem;}h1{font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:400;margin-bottom:.75rem;}p{font-family:'Playfair Display',serif;font-size:.9375rem;font-style:italic;color:rgba(242,235,224,.5);margin-bottom:2rem;line-height:1.65;}.btn{display:inline-block;padding:13px 32px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;}</style>
</head><body><div class="box"><div class="ico">↩</div><h1>Paiement annulé</h1>
<p>Aucun montant prélevé. Votre aperçu est toujours disponible.</p>
<a href="/" class="btn">← Retour à l'aperçu</a>
</div></body></html>`;
}

const server = http.createServer(async (req,res) => {
  const url = req.url.split('?')[0];

  if(req.method==='OPTIONS'){
    res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
    return res.end();
  }

  if(req.method==='POST'&&(url==='/api/chat'||url==='/api/dalle')){
    let body=''; req.on('data',c=>body+=c);
    req.on('end',()=>{
      try{
        const payload=JSON.parse(body);
        const ep=url==='/api/dalle'?'/v1/images/generations':'/v1/chat/completions';
        const buf=Buffer.from(JSON.stringify(payload));
        const r=https.request({hostname:'api.openai.com',path:ep,method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+OPENAI_API_KEY,'Content-Length':buf.length}
        },r2=>{res.writeHead(r2.statusCode,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});r2.pipe(res);});
        r.on('error',e=>{res.writeHead(500);res.end(JSON.stringify({error:{message:e.message}}));});
        r.write(buf);r.end();
      }catch(e){res.writeHead(400);res.end('Bad request');}
    });
    return;
  }

  if(req.method==='POST'&&url==='/api/create-checkout'){
    let body=''; req.on('data',c=>body+=c);
    req.on('end',async()=>{
      try{
        const {name,email,address,pages,price,names,style}=JSON.parse(body);
        if(!STRIPE_SECRET_KEY||STRIPE_SECRET_KEY.includes('METS_TA_CLE')){
          res.writeHead(400,{'Content-Type':'application/json'});
          return res.end(JSON.stringify({error:'Stripe non configuré. Ajoute ta STRIPE_SECRET_KEY dans server.js'}));
        }
        const cents=Math.round(parseFloat(price)*100);
        const session=await stripePost('checkout/sessions',{
          'payment_method_types[]':'card',
          'line_items[0][price_data][currency]':'eur',
          'line_items[0][price_data][product_data][name]':`Album Noustalgie — ${pages} pages`,
          'line_items[0][price_data][product_data][description]':`Album photo "${names}" · ${style} · Impression CEWE`,
          'line_items[0][price_data][unit_amount]':cents,
          'line_items[0][quantity]':'1',
          'mode':'payment',
          'customer_email':email,
          'success_url':`${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}&name=${encodeURIComponent(name)}&pages=${pages}&price=${price}`,
          'cancel_url':`${SITE_URL}/cancel`,
          'metadata[name]':name,'metadata[email]':email,
          'metadata[address]':address||'','metadata[pages]':pages,
          'metadata[names]':names,'metadata[style]':style,
        });
        if(session.url){
          res.writeHead(200,{'Content-Type':'application/json'});
          res.end(JSON.stringify({url:session.url}));
        } else {
          throw new Error(session.error?.message||JSON.stringify(session));
        }
      }catch(e){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({error:e.message}));
      }
    });
    return;
  }

  if(req.method==='GET'&&url==='/success'){
    const p=new URLSearchParams(req.url.split('?')[1]||'');
    const sessionId=p.get('session_id')||'';
    const name=p.get('name')||'';
    const pages=p.get('pages')||'30';
    const price=p.get('price')||'39.99';

    if(sessionId&&STRIPE_SECRET_KEY&&!STRIPE_SECRET_KEY.includes('METS_TA_CLE')){
      try{
        await new Promise(resolve=>{
          https.get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
            {headers:{'Authorization':'Bearer '+STRIPE_SECRET_KEY}},
          r=>{
            let d='';r.on('data',c=>d+=c);
            r.on('end',()=>{
              try{
                const s=JSON.parse(d);
                const email=s.customer_email||s.customer_details?.email||'';
                const address=s.metadata?.address||'';
                const names=s.metadata?.names||'';
                const style=s.metadata?.style||'';
                saveOrder({name,email,address,pages,price,names,style,sessionId});
                sendEmail({to:NOTIFY_EMAIL,subject:`🎉 Commande Noustalgie — ${name} — ${price}€`,
                  html:`<h2>Nouvelle commande !</h2><p><b>Client :</b> ${name} (${email})</p><p><b>Couple :</b> ${names}</p><p><b>Style :</b> ${style}</p><p><b>Pages :</b> ${pages}</p><p><b>Montant :</b> ${price}€</p><p><b>Adresse :</b> ${address}</p><p>👉 <a href="https://dashboard.stripe.com">Voir sur Stripe</a></p>`
                });
                if(email) sendEmail({to:email,subject:`Votre livre Noustalgie est en préparation ♥`,
                  html:`<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;"><h1 style="color:#c9a05a;">Noustalgie</h1><h2>Bonjour ${name} ♥</h2><p>Votre commande est confirmée. Votre livre <b>${names}</b> (${pages} pages · ${style}) est en cours d'impression.</p><p style="color:#888;margin-top:1rem;">Livraison en 5 à 7 jours ouvrés. Montant : ${price}€</p><p style="margin-top:1rem;">Merci !<br><b>L'équipe Noustalgie</b></p></div>`
                });
              }catch(e){console.error(e.message);}
              resolve();
            });
          }).on('error',e=>{console.error(e);resolve();});
        });
      }catch(e){console.error(e.message);}
    }

    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    return res.end(successPage(name,pages,parseFloat(price).toFixed(2).replace('.',',')));
  }

  if(req.method==='GET'&&url==='/cancel'){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    return res.end(cancelPage());
  }

  const fp=path.join(__dirname,'public',url==='/'?'/index.html':url);
  fs.readFile(fp,(err,data)=>{
    if(err){res.writeHead(404);return res.end('Not found');}
    res.writeHead(200,{'Content-Type':MIME[path.extname(fp)]||'text/plain'});
    res.end(data);
  });
});

server.listen(PORT,()=>{
  console.log(`\n  💝  Noustalgie — http://localhost:${PORT}`);
  console.log(`\n  OpenAI : ${OPENAI_API_KEY.includes('METS_TA_CLE')?'⚠️  Non configuré':'✅ Configuré'}`);
  console.log(`  Stripe : ${STRIPE_SECRET_KEY.includes('METS_TA_CLE')?'⚠️  Non configuré':'✅ Configuré'}`);
  console.log(`  Emails : ${process.env.RESEND_API_KEY?'✅ Configuré':'⚠️  Non configuré (optionnel pour l\'instant)'}\n`);
});
