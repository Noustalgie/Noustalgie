#!/usr/bin/env node
// Crochet PreToolUse : bloque les modifications qui seraient perdues ou cassantes, avant qu'elles soient faites.
// - public/{mentions-legales,cgv,confidentialite}/index.html : pages générées, réécrites à chaque déploiement.
// Code de sortie 2 = modification refusée, le message est renvoyé à Claude.
let input = '';
process.stdin.on('data', c => (input += c));
process.stdin.on('end', () => {
  let file = '';
  try {
    const j = JSON.parse(input || '{}');
    file = (j.tool_input && (j.tool_input.file_path || j.tool_input.path)) || '';
  } catch { process.exit(0); }
  if (/public\/(mentions-legales|cgv|confidentialite)\/index\.html$/.test(file)) {
    console.error('Page générée : ne pas la modifier à la main (elle serait écrasée au prochain déploiement). '
      + 'Modifier le texte de la fenêtre « Informations légales » dans public/index.html (objet PAGES), '
      + 'puis lancer : node outils/pages-legales.mjs');
    process.exit(2);
  }
  process.exit(0);
});
