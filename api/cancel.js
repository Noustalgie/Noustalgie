module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Annulé — Noustalgie</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#0e0b09;color:#f2ebe0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}.box{max-width:420px;width:100%;text-align:center;}.ico{font-size:2.5rem;margin-bottom:1.5rem;}h1{font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:400;margin-bottom:.75rem;}p{font-family:'Playfair Display',serif;font-size:.9375rem;font-style:italic;color:rgba(242,235,224,.5);margin-bottom:2rem;line-height:1.65;}.btn{display:inline-block;padding:13px 32px;background:#c9a05a;color:#0e0b09;border-radius:2px;text-decoration:none;font-size:.75rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;}</style>
</head><body><div class="box">
<div class="ico">↩</div>
<h1>Paiement annulé</h1>
<p>Aucun montant n'a été prélevé.<br>Votre aperçu est toujours disponible — revenez quand vous voulez.</p>
<a href="/" class="btn">← Retour à l'aperçu</a>
</div></body></html>`);
};
