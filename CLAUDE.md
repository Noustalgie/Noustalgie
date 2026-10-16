# Noustalgie : mémoire du projet

Site noustalgie.fr : albums photo de couple, composés en ligne puis imprimés et livrés (Prodigi).
Gabin parle français, préfère que le travail soit fait plutôt qu'expliqué, ton direct.

## Façon de travailler

- Réfléchir avant de coder : dire ses hypothèses ; s'il y a deux lectures possibles d'une demande, le dire au lieu de choisir en silence.
- Le plus simple qui marche : rien de plus que ce qui est demandé, pas d'abstraction pour un seul usage.
- Modifications chirurgicales : ne toucher que ce que la demande exige, garder le style existant, signaler le code mort sans le supprimer.
- Objectif vérifiable : transformer la demande en contrôle (« corriger le bug » → reproduire, corriger, montrer que ça passe) et ne rien annoncer comme fait sans preuve (skill `verification-before-completion`). Un bug : skill `systematic-debugging`, la cause avant la correction.
- Chaque erreur qui a coûté du temps devient une ligne de « Règles qui ont déjà coûté cher », pour ne pas la refaire.
(Inspiré des consignes « karpathy-skills », licence MIT.)

## Lire moins, dépenser moins

- Ne jamais lire `public/index.html` en entier : ouvrir `.claude/carte-du-code.md` (plan avec numéros de ligne, régénéré automatiquement), puis Read avec `offset`/`limit`.
- Limiter les sorties : `grep -n -m 20`, `| head -40`, `| tail -20`.
- Confier le travail mécanique aux agents moins chers du dépôt : `explorateur` (Haiku, trouver où est quelque chose), `verificateur` (Haiku, lancer les contrôles), `traducteur` (Sonnet, les quatre autres langues).

## Carte du code

- `public/index.html` : tout le site en un seul fichier (~585 Ko).
  - Un grand bloc `<style>` dans le `<head>` : couches successives v1 → v6. **Toute nouvelle règle CSS va juste avant le PREMIER `</style>`** (jamais le dernier : il peut tomber dans une chaîne JavaScript et casser le site).
  - Le bloc « v6 · Direction artistique » (fin du CSS) porte les règles de design actuelles.
  - Trois gros scripts en fin de page : textes multilingues (`LANGS.fr/en/de/es/pt`), moteur d'album, éditeur, paiement.
  - En production seulement, l'étape de construction Vercel (`outils/preparer-production.mjs`) sort ce `<style>` et ces scripts dans `/assets` (noms hachés, cache d'un an). On continue de modifier le fichier unique ; rien à faire à la main.
- `api/` : fonctions Vercel. `create-checkout.js` (Stripe, **les prix sont recalculés ici** et doivent correspondre au site : 24/36/50 pages), `webhook.js` (commande Prodigi après paiement), `generate-pdf.js` (HTML de l'album → PDF via PDFShift), `chat.js` (textes par OpenAI), `tools.js` + `_fn/` (promo, suivi, annulation, upload…), `cleanup.js` (cron).
- `vercel.json` : réécritures, redirections, en-têtes de sécurité (CSP : polices uniquement via Google Fonts).
- `outils/` : `verifier-site.py` (tous les contrôles avant mise en ligne), `rendu.py` (captures fidèles sans réseau), `carte-du-code.mjs` (plan de index.html), `audit-seo.py`, `preparer-production.mjs` (construction Vercel), `pages-legales.mjs`.
- Pages `/mentions-legales`, `/cgv`, `/confidentialite` : générées à partir de la fenêtre « Informations légales » de index.html. Ne pas les modifier à la main : changer le texte dans index.html puis lancer `node outils/pages-legales.mjs` (la construction Vercel le refait de toute façon).
- `video/` : films TikTok (rendu image par image dans Chromium, voir `video/package.json`). `video/oui` = « Le plus beau oui » (livre 3D, 38 s) ; son moteur sert aussi aux visuels du site (`node tools/oui-still.js` en mode studio, `node tools/og.js` pour les images de partage). Les rendus lourds vont dans `video/out/` (ignoré par git).
- Variables d'environnement (sur Vercel, jamais dans le code) : STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, PRODIGI_API_KEY, RESEND_API_KEY, NOTIFY_EMAIL, CLOUDINARY_*, PDFSHIFT_API_KEY, OPENAI_API_KEY, PROMO_CODES, CRON_SECRET.

## Règles qui ont déjà coûté cher

- Le texte français existe **deux fois** : dans le HTML statique et dans `LANGS.fr`. Ils doivent rester identiques, sinon un aller-retour de langue (FR → EN → FR) remplace le texte affiché. Modifier les deux ; `outils/verifier-site.py` contrôle l'aller-retour.
- Les thèmes d'album utilisent Playfair Display, Libre Baskerville, Cormorant Garamond et Inter : ces polices doivent rester chargées même si l'interface ne s'en sert plus. La tranche imprimée utilise Inter en millimètres : ne pas y toucher.
- `#previewActions` et `#avThumbs` peuvent se retrouver hors des panneaux : vérifier en console, masquer via `goTab`.
- Prodigi n'a pas de livraison en point relais : livraison à domicile uniquement. Le nom de famille et le téléphone sont obligatoires sur l'étiquette.
- Délai réel de livraison : 10 à 12 jours. Ne jamais écrire 3-5 ou 5-7 jours.
- Les chaînes `testi*` du dictionnaire sont des témoignages inventés : ne jamais les afficher.
- Vouvoiement partout côté client. Espace insécable avant `? ! : ;` en français.
- `.vercelignore` suit la syntaxe de `.gitignore` : un motif sans `/` au début vaut à tous les niveaux. `video` excluait aussi `public/video/` (le film de /exemple-album) ; écrire `/video`.
- Après « Ajouter » dans le sélecteur de photos, Safari fait convertir chaque photo en JPEG par l'iPhone avant de les transmettre : plusieurs secondes sans aucun signal, et aucun site ne peut l'éviter (`accept` n'y change rien). Ne jamais conclure « photos non transmises » tant que le navigateur n'a pas signalé d'annulation : la pastille « Préparation de vos photos… » couvre cette attente.

## Référencement (SEO)

- `python3 outils/audit-seo.py [--mots]` : audit statique équivalent à Semrush (titres, descriptions, liens, données structurées, en-têtes de cache, mots-clés). À relancer après toute modification de `public/`, viser 0 erreur.
- Pages guides : `/guides.css?v=…` est en cache un an ; quand `guides.css` change, changer la valeur de `?v=` dans toutes les pages. Titres ≤ 60 caractères, descriptions ≤ 158.
- Photos de haut de page et données Article : fichiers locaux de `/img/exemple/`, jamais de lien vers Unsplash. Toute nouvelle page : l'ajouter au plan du site, à `llms.txt` et à `/guides`.
- jsPDF et heic2any se chargent à la demande (`nstLoadLib`, en tête de `index.html`), pas avec la page d'accueil.

## Direction artistique (choix de Gabin : éditorial noir et blanc, boutons pilule)

- Titres : Playfair Display (comme les albums). Interface : Hanken Grotesk. Le logo du menu reste en Times New Roman gras.
- Un seul accent : l'encre `#1c1a18`. Gris chauds `#5f5a54` / `#e4dfd7`. Pas de nouvelle couleur sans accord.
- Formes : boutons pilule, champs 12 px, cartes 20 px, livres et pages à angles vifs.
- Pas de tiret cadratin (—) dans les textes visibles, pas d'étiquette en capitales au-dessus de chaque titre.
- Skills de design dans `.claude/skills/` : `design-taste-frontend` et `redesign-existing-projects` (Taste Skill, licence MIT). Les lire avant tout travail visuel.

## Mise en ligne

Utiliser le skill `/mise-en-ligne` (branche → vérifications → PR → aperçu Vercel → fusion → contrôle en production).
Crochets (`.claude/settings.json`) :
- `verifier-syntaxe.mjs` vérifie la syntaxe de `index.html` et des fichiers `api/` après chaque modification, et remet la carte du code à jour ;
- `garde-fous.mjs` refuse les modifications à la main des pages légales générées ;
- `session-start.sh` installe, au début de chaque session web, ce qu'il faut pour les contrôles et les films (Playwright 1.56 pour le Chromium préinstallé, Pillow, paquets audio, `video/node_modules`, polices).

Aperçus Vercel depuis une session web : `curl` est bloqué, lire les pages avec l'outil `web_fetch_vercel_url` du connecteur Vercel. Jamais un gros fichier (vidéo) avec cet outil, il fait planter le connecteur : vérifier l'affiche ou un petit fichier du même dossier.

## Tester en local

```bash
python3 outils/verifier-site.py        # contrôles complets, code de sortie 1 si un échoue
python3 outils/rendu.py --sortie /tmp/rendu   # captures 1440 et 390 px (polices réelles, photos de substitution)
node outils/preparer-production.mjs --sortie /tmp/construit && python3 outils/verifier-site.py --dossier /tmp/construit   # version découpée, comme en production
```
Les appels `/api/*` échouent en local, c'est normal.
