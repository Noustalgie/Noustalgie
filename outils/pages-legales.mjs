#!/usr/bin/env node
// Pages légales statiques (/mentions-legales, /cgv, /confidentialite), générées à partir du texte de la fenêtre
// « Informations légales » de public/index.html : il n'y a qu'une seule source. Après toute modification de ce texte :
//   node outils/pages-legales.mjs            → réécrit les trois pages dans public/
// L'étape de construction Vercel (outils/preparer-production.mjs) les régénère aussi à chaque déploiement.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const NB = ' ';

const PAGES = {
  mentions: {
    slug: 'mentions-legales', nom: 'Mentions légales', titre: 'Mentions légales | Noustalgie',
    desc: `Mentions légales de noustalgie.fr${NB}: éditeur du site, hébergement, propriété intellectuelle et contact.`,
  },
  cgv: {
    slug: 'cgv', nom: 'Conditions générales de vente', titre: 'Conditions générales de vente | Noustalgie',
    desc: `Conditions générales de vente de Noustalgie${NB}: prix, commande et aperçu, paiement, livraison, droit de rétractation et garanties légales.`,
  },
  confidentialite: {
    slug: 'confidentialite', nom: 'Politique de confidentialité', titre: 'Politique de confidentialité | Noustalgie',
    desc: `Politique de confidentialité de Noustalgie${NB}: données collectées, parcours de vos photos, prestataires, durées de conservation et vos droits.`,
  },
};

/* Lit l'objet PAGES (et sa configuration) dans le script de index.html, sans navigateur */
function lireTextes(html) {
  const a = html.indexOf('const CFG = {');
  const b = html.indexOf('/* ── Affichage : onglets', a);
  if (a < 0 || b < 0) throw new Error('Textes légaux introuvables dans index.html (repères « const CFG = { » et « Affichage : onglets »)');
  return vm.runInNewContext(html.slice(a, b) + '\n;PAGES', { encodeURIComponent });
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Adapte le HTML de la fenêtre à une page autonome */
function adapter(html, avecSommaire) {
  let h = html.trim()
    .replace(/<p class="lg-eyebrow">[\s\S]*?<\/p>\s*/g, '')                       // pas d'étiquette au-dessus du titre
    .replace(/<a href="#" data-lg="(mentions|cgv|confidentialite)">/g, (m, k) => `<a href="/${PAGES[k].slug}">`)
    .replace(/<a href="#" data-lg="contact">/g, '<a href="mailto:contact@noustalgie.fr">')
    .replace(/<div class="lg-table">/g, '<div class="lg-table" tabindex="0" role="region" aria-label="Tableau, défilement horizontal">');   // atteignable au clavier sur mobile
  if (avecSommaire) {
    const titres = [...h.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)];
    if (titres.length) {
      const sommaire = `<nav class="lg-toc" aria-label="Sommaire"><p>Sommaire</p><ol>${titres.map(([, id, t]) => `<li><a href="#${id}">${t.replace(/^\d+\.\s*/, '')}</a></li>`).join('')}</ol></nav>`;
      h = h.replace(/(<p class="lg-maj">[\s\S]*?<\/p>)/, `$1\n${sommaire}`);
    }
  }
  return h;
}

function page(cle, meta, contenu, css) {
  const url = `https://noustalgie.fr/${meta.slug}`;
  const fil = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Noustalgie', item: 'https://noustalgie.fr/' },
    { '@type': 'ListItem', position: 2, name: meta.nom, item: url }] };
  const autres = Object.entries(PAGES).filter(([k]) => k !== cle).map(([, p]) => `<li><a href="/${p.slug}">${p.nom}</a></li>`).join('\n');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${meta.titre}</title>
<meta name="description" content="${esc(meta.desc)}"/>
<link rel="canonical" href="${url}"/>
<meta property="og:type" content="website"/>
<meta property="og:site_name" content="Noustalgie"/>
<meta property="og:locale" content="fr_FR"/>
<meta property="og:title" content="${esc(meta.titre)}"/>
<meta property="og:description" content="${esc(meta.desc)}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:image" content="https://noustalgie.fr/img/exemple/og-noustalgie.jpg"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="theme-color" content="#ffffff"/>
<meta name="color-scheme" content="light"/>
<link rel="icon" href="/favicon.ico" sizes="48x48"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="${css}"/>
<script type="application/ld+json">${JSON.stringify(fil)}</script>
<script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
<header class="g-nav"><a class="g-logo" href="/">Noustalgie</a><a class="g-cta" href="/#app">Composer mon album</a></header>
<main class="g-wrap">
<a class="g-back" href="/" onclick="if(document.referrer.indexOf(location.origin+'/')===0&&history.length>1){history.back();return false}">← Retour</a>
<nav class="g-crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a> / ${meta.nom}</nav>
<article class="g-body g-legal">
${contenu}
</article>
<nav class="g-more" aria-label="Autres informations légales">
<h2>Informations légales</h2>
<ul>
${autres}
<li><a href="/guides">Tous nos guides</a></li>
</ul>
</nav>
</main>
<footer class="g-foot"><div class="g-wrap"><span>© 2026 Noustalgie. Tous droits réservés.</span><nav aria-label="Informations"><a href="/guides">Guides</a><a href="/exemple-album">Exemple d'album</a><a href="/mentions-legales">Mentions légales</a><a href="/cgv">CGV</a><a href="/confidentialite">Confidentialité</a><a href="mailto:contact@noustalgie.fr">contact@noustalgie.fr</a></nav></div></footer>
</body>
</html>
`;
}

export function pagesLegales(dossier = path.join(RACINE, 'public')) {
  const html = fs.readFileSync(path.join(dossier, 'index.html'), 'utf8');
  const textes = lireTextes(html);
  const guides = fs.readFileSync(path.join(dossier, 'guides', 'index.html'), 'utf8');
  const css = (guides.match(/href="(\/guides\.css[^"]*)"/) || [, '/guides.css'])[1];   // même version de feuille de style que les guides
  const faits = [];
  for (const [cle, meta] of Object.entries(PAGES)) {
    if (!textes[cle] || !textes[cle].html) throw new Error(`Texte légal « ${cle} » absent de index.html`);
    const f = path.join(dossier, meta.slug, 'index.html');
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, page(cle, meta, adapter(textes[cle].html, !!textes[cle].toc), css));
    faits.push(f);
  }
  return faits;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  for (const f of pagesLegales()) console.log('écrit', path.relative(RACINE, f));
}
