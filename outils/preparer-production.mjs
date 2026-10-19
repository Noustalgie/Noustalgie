#!/usr/bin/env node
// Étape de construction Vercel (vercel.json → "buildCommand") :
//   1. régénère les pages légales à partir du texte de index.html (outils/pages-legales.mjs) ;
//   2. sort le grand <style> et les gros scripts de index.html dans /assets (noms hachés, cache d'un an),
//      pour que la page d'accueil servie soit légère (rapport texte/HTML, cache entre deux visites) ;
//   3. minimise ces fichiers avec esbuild (dépendance de développement : `npm install` à la racine).
//      Les noms globaux (onclick="goTab(1)"…) sont gardés : esbuild ne renomme pas le niveau supérieur d'un script classique.
// Le fichier source reste unique : on continue de modifier public/index.html comme avant ; seule la copie
// déployée est découpée. Sur Vercel (VERCEL=1) le travail se fait dans public/ ; en local, dans une copie :
//   node outils/preparer-production.mjs --sortie /tmp/construit
//   python3 outils/verifier-site.py --dossier /tmp/construit     (mêmes contrôles sur la version découpée)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { pagesLegales } from './pages-legales.mjs';

const RACINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SEUIL = 4096;   // les petits scripts du <head> (erreurs, chargement à la demande) restent dans la page

const empreinte = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 10);

// esbuild absent (dépôt cloné sans `npm install`) : en local on prévient et on garde les fichiers lisibles ; sur Vercel on s'arrête
let esbuild = null;
try { esbuild = await import('esbuild'); } catch (e) {
  if (process.env.VERCEL) throw new Error('esbuild introuvable : la construction doit minimiser le CSS et le JavaScript');
  console.warn('esbuild introuvable (npm install) : fichiers non minimisés');
}
export const minimiser = (code, loader) => (esbuild ? esbuild.transformSync(code, { loader, minify: true, legalComments: 'none', charset: 'utf8' }).code : code);

export function decouper(html) {
  const fichiers = [];
  // 1. la feuille de style du <head> (le premier </style> ferme la vraie balise ; les suivants sont dans des chaînes JS)
  const finTete = html.indexOf('</head>');
  const a = html.indexOf('<style>');
  if (a < 0 || a > finTete) throw new Error('<style> du <head> introuvable');
  const b = html.indexOf('</style>', a);
  const css = minimiser(html.slice(a + 7, b), 'css');
  const nomCss = `/assets/accueil.${empreinte(css)}.css`;
  fichiers.push([nomCss, css]);
  html = html.slice(0, a) + `<link rel="stylesheet" href="${nomCss}"/>` + html.slice(b + 8);

  // 2. les scripts en ligne classiques (sans src ni type), au-delà du seuil, chacun dans son fichier, à la même place
  let out = '', i = 0, n = 0;
  for (;;) {
    const o = html.indexOf('<script', i);
    if (o < 0) { out += html.slice(i); break; }
    const finOuv = html.indexOf('>', o);
    const ferme = html.indexOf('</script>', finOuv);
    if (finOuv < 0 || ferme < 0) throw new Error('balise <script> non fermée');
    const ouv = html.slice(o, finOuv + 1), code = html.slice(finOuv + 1, ferme);
    out += html.slice(i, o);
    if (ouv === '<script>' && code.length > SEUIL) {
      const js = minimiser(code, 'js');
      const nom = `/assets/accueil-${++n}.${empreinte(js)}.js`;
      fichiers.push([nom, js]);
      out += `<script src="${nom}"></script>`;
    } else out += ouv + code + '</script>';
    i = ferme + 9;
  }
  return { html: out, fichiers };
}

export function preparer(dossier) {
  pagesLegales(dossier);
  const f = path.join(dossier, 'index.html');
  const avant = fs.readFileSync(f, 'utf8');
  const { html, fichiers } = decouper(avant);
  fs.mkdirSync(path.join(dossier, 'assets'), { recursive: true });
  for (const [nom, contenu] of fichiers) fs.writeFileSync(path.join(dossier, nom), contenu);
  fs.writeFileSync(f, html);
  return { avant: Buffer.byteLength(avant), apres: Buffer.byteLength(html), fichiers: fichiers.map(([nom, c]) => [nom, Buffer.byteLength(c)]) };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const i = process.argv.indexOf('--sortie');
  let dossier;
  if (i > 0 && process.argv[i + 1]) {
    dossier = path.resolve(process.argv[i + 1]);
    fs.rmSync(dossier, { recursive: true, force: true });
    fs.cpSync(path.join(RACINE, 'public'), dossier, { recursive: true });
  } else if (process.env.VERCEL) {
    dossier = path.join(RACINE, 'public');
  } else {
    console.error('Refus : en local, la page source ne doit pas être découpée. Utilisez --sortie <dossier>.');
    process.exit(1);
  }
  const r = preparer(dossier);
  console.log(`index.html : ${Math.round(r.avant / 1024)} Ko → ${Math.round(r.apres / 1024)} Ko`);
  for (const [nom, t] of r.fichiers) console.log(`  ${nom} (${Math.round(t / 1024)} Ko)`);
  console.log(`dossier : ${path.relative(process.cwd(), dossier) || '.'}`);
}
