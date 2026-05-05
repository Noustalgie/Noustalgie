#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log('\n');
console.log('  ╔══════════════════════════════════════╗');
console.log('  ║     Noustalgie — Configuration       ║');
console.log('  ╚══════════════════════════════════════╝');
console.log('\n  Colle ta clé API OpenAI ci-dessous.');
console.log('  Elle commence par sk-proj- ou sk-');
console.log('  Tu la trouves sur platform.openai.com/api-keys\n');

rl.question('  Ta clé API : ', (key) => {
  key = key.trim();

  if (!key.startsWith('sk-')) {
    console.log('\n  ❌ Cette clé ne semble pas valide.');
    console.log('  Elle doit commencer par sk- ou sk-proj-\n');
    rl.close();
    return;
  }

  const serverPath = path.join(__dirname, 'server.js');
  let content = fs.readFileSync(serverPath, 'utf8');

  // Remplace la clé quelle que soit sa valeur actuelle
  content = content.replace(
    /const OPENAI_API_KEY = '.*?';/,
    `const OPENAI_API_KEY = '${key}';`
  );

  fs.writeFileSync(serverPath, content);

  console.log('\n  ✅ Clé API enregistrée avec succès !');
  console.log('\n  Lance maintenant le site avec :');
  console.log('  node server.js\n');

  rl.close();
});
