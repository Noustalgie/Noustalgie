#!/usr/bin/env node
// Génère .claude/carte-du-code.md : le plan de public/index.html (~585 Ko) avec les numéros de ligne,
// pour aller droit à la bonne zone (Read avec offset/limit) au lieu de parcourir le fichier.
// Usage : node outils/carte-du-code.mjs   (le crochet de syntaxe la régénère après chaque modification de index.html)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const racine = join(dirname(fileURLToPath(import.meta.url)), '..');
const fichier = join(racine, 'public', 'index.html');
const L = readFileSync(fichier, 'utf8').split('\n');
const out = [];
const ligne = i => String(i + 1).padStart(5);
const court = s => s.replace(/\s+/g, ' ').trim().slice(0, 110);

out.push('# Carte de public/index.html', '', `Générée automatiquement (${L.length} lignes). Ouvrir une zone : Read avec offset = numéro de ligne.`, '');

// Blocs <style> et <script> : découpés comme le fait le navigateur (le premier </script> ferme le script)
out.push('## Blocs', '');
const texte = L.join('\n');
const ligneDe = pos => texte.slice(0, pos).split('\n').length;
const blocs = [];
for (const m of texte.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
  if (!/\bsrc=/.test(m[1])) blocs.push({ debut: m.index, fin: m.index + m[0].length, nom: `<script${m[1] ? ' ' + court(m[1]) : ''}>` });
}
const dansScript = pos => blocs.some(b => pos >= b.debut && pos < b.fin);
for (const m of texte.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)) {
  if (!dansScript(m.index)) blocs.push({ debut: m.index, fin: m.index + m[0].length, nom: '<style>' });
}
blocs.sort((a, b) => a.debut - b.debut).forEach(b => {
  const kio = Math.round((b.fin - b.debut) / 1024);
  out.push(`- lignes ${ligneDe(b.debut)}-${ligneDe(b.fin)} : ${b.nom} (${kio} Ko)`);
});

// Couches CSS et grands titres de section (commentaires ═══)
out.push('', '## Couches CSS et sections de script (commentaires « ═══ »)', '');
L.forEach((l, i) => {
  const m = l.match(/(?:\/\*|\/\/|<!--)\s*═+\s*(.*?)\s*═*\s*(?:\*\/|-->)?$/);
  if (m && m[1] && !/^═*$/.test(m[1])) out.push(`${ligne(i)}  ${court(m[1])}`);
});

// Sections HTML avec identifiant
out.push('', '## HTML : sections et zones clés', '');
L.forEach((l, i) => {
  const m = l.match(/<(section|nav|footer|header|main)\b[^>]*?(?:id="([^"]+)")?[^>]*>/) || l.match(/<div\b[^>]*\bid="(panel\d|payForm|app|nstEd|nstDemo|legalOverlay|msgModal)"/);
  if (m) out.push(`${ligne(i)}  ${court(m[0])}`);
});

// Dictionnaires de langue
out.push('', '## Dictionnaires de langue (LANGS)', '');
L.forEach((l, i) => { if (/^\s{2,4}(fr|en|de|es|pt): \{\s*$/.test(l)) out.push(`${ligne(i)}  LANGS.${l.trim().slice(0, 2)}`); });

// Fonctions nommées
out.push('', '## Fonctions', '');
const vues = new Set();
L.forEach((l, i) => {
  const r = [/^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/, /^\s*window\.([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?function/, /^\s*(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/];
  for (const re of r) {
    const m = l.match(re);
    if (m && !vues.has(m[1] + i)) { vues.add(m[1] + i); out.push(`${ligne(i)}  ${m[1]}`); break; }
  }
});

// Fichiers api/
out.push('', '## api/', '');
const parcourir = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? parcourir(p) : [p]; });
for (const p of parcourir(join(racine, 'api')).filter(p => p.endsWith('.js')).sort()) {
  const t = readFileSync(p, 'utf8').split('\n');
  const premier = t.find(x => x.trim().startsWith('//')) || '';
  out.push(`- ${relative(racine, p)} (${t.length} lignes) ${court(premier.replace(/^\s*\/\/\s*/, ''))}`);
}

writeFileSync(join(racine, '.claude', 'carte-du-code.md'), out.join('\n') + '\n');
console.log(`.claude/carte-du-code.md : ${out.length} lignes`);
