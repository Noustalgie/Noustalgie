module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><meta name="robots" content="noindex"/>
<title>Paiement annulé | Noustalgie</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:#fbfaf7;color:#1c1a18;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:calc(2rem + env(safe-area-inset-top)) 1.25rem calc(2rem + env(safe-area-inset-bottom));-webkit-font-smoothing:antialiased}
.box{max-width:500px;width:100%}
.logo{font:400 22px 'Playfair Display',Georgia,serif;margin-bottom:2.2rem;display:block;color:#1c1a18;text-decoration:none}
.logo em{font-style:italic}
h1{font:400 clamp(2rem,6vw,2.6rem)/1.12 'Playfair Display',Georgia,serif;margin-bottom:1rem}
h1 em{font-style:italic}
.sub{color:#5f5a54;line-height:1.7;font-size:.97rem;margin-bottom:1.8rem}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:0 26px;border-radius:999px;font:500 15px 'Inter',sans-serif;text-decoration:none;background:#1c1a18;color:#fff}
.help{margin-top:1.8rem;font-size:.85rem;color:#77726b}.help a{color:#1c1a18}
@media(max-width:480px){.btn{width:100%}}
</style></head><body><main class="box">
<a class="logo" href="/">Nous<em>talgie</em></a>
<h1>Paiement <em>annulé</em></h1>
<p class="sub">Aucun montant n’a été prélevé. Votre aperçu est toujours disponible : revenez quand vous voulez.</p>
<a class="btn" href="/#app">Retour à l’aperçu</a>
<p class="help">Une question ? <a href="mailto:contact@noustalgie.fr">contact@noustalgie.fr</a></p>
</main></body></html>`);
};
