# Noustalgie : mémoire du projet

Site noustalgie.fr : albums photo de couple, composés en ligne puis imprimés et livrés (Prodigi).
Gabin parle français, préfère que le travail soit fait plutôt qu'expliqué, ton direct.

## Carte du code

- `public/index.html` : tout le site en un seul fichier (~585 Ko).
  - Un grand bloc `<style>` dans le `<head>` : couches successives v1 → v6. **Toute nouvelle règle CSS va juste avant le PREMIER `</style>`** (jamais le dernier : il peut tomber dans une chaîne JavaScript et casser le site).
  - Le bloc « v6 · Direction artistique » (fin du CSS) porte les règles de design actuelles.
  - Trois gros scripts en fin de page : textes multilingues (`LANGS.fr/en/de/es/pt`), moteur d'album, éditeur, paiement.
- `api/` : fonctions Vercel. `create-checkout.js` (Stripe, **les prix sont recalculés ici** et doivent correspondre au site : 24/36/50 pages), `webhook.js` (commande Prodigi après paiement), `generate-pdf.js` (HTML de l'album → PDF via PDFShift), `chat.js` (textes par OpenAI), `tools.js` + `_fn/` (promo, suivi, annulation, upload…), `cleanup.js` (cron).
- `vercel.json` : réécritures, redirections, en-têtes de sécurité (CSP : polices uniquement via Google Fonts).
- Variables d'environnement (sur Vercel, jamais dans le code) : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PRODIGI_API_KEY, RESEND_API_KEY, NOTIFY_EMAIL, CLOUDINARY_*, PDFSHIFT_API_KEY, OPENAI_API_KEY, PROMO_CODES, CRON_SECRET.

## Règles qui ont déjà coûté cher

- Le texte français existe **deux fois** : dans le HTML statique et dans `LANGS.fr`. Ils doivent rester identiques, sinon un aller-retour de langue (FR → EN → FR) remplace le texte affiché. Modifier les deux, puis vérifier avec un aller-retour `setLang`.
- Les thèmes d'album utilisent Playfair Display, Libre Baskerville, Cormorant Garamond et Inter : ces polices doivent rester chargées même si l'interface ne s'en sert plus. La tranche imprimée utilise Inter en millimètres : ne pas y toucher.
- `#previewActions` et `#avThumbs` peuvent se retrouver hors des panneaux : vérifier en console, masquer via `goTab`.
- Prodigi n'a pas de livraison en point relais : livraison à domicile uniquement. Le nom de famille et le téléphone sont obligatoires sur l'étiquette.
- Délai réel de livraison : 10 à 12 jours. Ne jamais écrire 3-5 ou 5-7 jours.
- Les chaînes `testi*` du dictionnaire sont des témoignages inventés : ne jamais les afficher.
- Vouvoiement partout côté client. Espace insécable avant `? ! : ;` en français.

## Direction artistique (choix de Gabin : éditorial noir et blanc, boutons pilule)

- Titres : Playfair Display (comme les albums). Interface : Hanken Grotesk. Le logo du menu reste en Times New Roman gras.
- Un seul accent : l'encre `#1c1a18`. Gris chauds `#5f5a54` / `#e4dfd7`. Pas de nouvelle couleur sans accord.
- Formes : boutons pilule, champs 12 px, cartes 20 px, livres et pages à angles vifs.
- Pas de tiret cadratin (—) dans les textes visibles, pas d'étiquette en capitales au-dessus de chaque titre.
- Skills de design installés dans `.claude/skills/` : `design-taste-frontend` et `redesign-existing-projects` (Taste Skill, licence MIT). Les lire avant tout travail visuel.

## Mise en ligne

Utiliser le skill `/mise-en-ligne` (branche → vérifications → PR → aperçu Vercel → fusion → contrôle en production).
Le crochet `.claude/hooks/verifier-syntaxe.mjs` vérifie automatiquement la syntaxe de `index.html` et des fichiers `api/` après chaque modification.

## Tester en local

```bash
python3 -m http.server 8771 -d public   # puis http://127.0.0.1:8771/
```
Les appels `/api/*` échouent en local, c'est normal. Pour une capture fidèle dans un bac à sable sans réseau, servir les polices depuis `@fontsource` et remplacer les photos Unsplash.
