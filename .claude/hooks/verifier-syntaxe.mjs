#!/usr/bin/env node
// Crochet PostToolUse : après chaque modification, vérifie que le site ne peut pas casser à cause d'une faute de syntaxe.
// - public/index.html : chaque <script> en ligne est compilé (sans être exécuté), chaque JSON-LD est lu, les accolades du CSS sont comptées.
// - api/**/*.js : le fichier est compilé.
// Code de sortie 2 = erreur renvoyée à Claude pour correction immédiate.
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

let input = '';
process.stdin.on('data', c => (input += c));
process.stdin.on('end', () => {
  let file = '';
  try {
    const j = JSON.parse(input || '{}');
    file = (j.tool_input && (j.tool_input.file_path || j.tool_input.path)) || (j.tool_response && j.tool_response.filePath) || '';
  } catch { process.exit(0); }
  if (!file) process.exit(0);
  const errors = [];
  try {
    if (/public\/index\.html$/.test(file)) {
      const s = readFileSync(file, 'utf8');
      const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
      let m, i = 0;
      while ((m = re.exec(s))) {
        i++;
        const line = s.slice(0, m.index).split('\n').length;
        if (/ld\+json/.test(m[1])) {
          try { JSON.parse(m[2]); } catch (e) { errors.push(`JSON-LD n°${i} (ligne ${line}) : ${e.message}`); }
          continue;
        }
        try { new vm.Script(m[2], { filename: `index.html, script n°${i} (commence ligne ${line})` }); }
        catch (e) { errors.push(`Script n°${i} (commence ligne ${line}) : ${e.message}`); }
      }
      const a = s.indexOf('<style>'), b = s.indexOf('</style>');
      if (a !== -1 && b > a) {
        const css = s.slice(a, b).replace(/\/\*[\s\S]*?\*\//g, '');
        const o = (css.match(/\{/g) || []).length, c = (css.match(/\}/g) || []).length;
        if (o !== c) errors.push(`CSS du <head> déséquilibré : ${o} « { » pour ${c} « } »`);
      }
    } else if (/\/api\/.*\.js$/.test(file)) {
      new vm.Script(readFileSync(file, 'utf8'), { filename: file });
    }
  } catch (e) { errors.push(`${file} : ${e.message}`); }
  if (errors.length) {
    process.stderr.write('Vérification de syntaxe en échec, le site casserait en production :\n- ' + errors.join('\n- ') + '\n');
    process.exit(2);
  }
  // index.html modifié et valide : la carte des numéros de ligne est remise à jour, sans bruit
  if (/public\/index\.html$/.test(file)) {
    try {
      const carte = new URL('../../outils/carte-du-code.mjs', import.meta.url);
      execFileSync(process.execPath, [fileURLToPath(carte)], { stdio: 'ignore', timeout: 20000 });
    } catch { /* la carte est un confort : son échec ne bloque jamais */ }
  }
  process.exit(0);
});
