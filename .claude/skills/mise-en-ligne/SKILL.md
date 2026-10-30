---
name: mise-en-ligne
description: Publier une modification de noustalgie.fr de bout en bout (branche, vérifications, PR GitHub, aperçu Vercel, fusion, contrôle en production). À utiliser quand Gabin demande de mettre en ligne, déployer, publier ou pousser une modification du site.
---

# Mettre en ligne une modification de noustalgie.fr

Dépôt : `Noustalgie/Noustalgie` (branche `main` = production sur Vercel). Ne fusionner que ce que Gabin a demandé de mettre en ligne.

## 1. Partir de main à jour

```bash
git fetch origin && git checkout main && git pull --ff-only
git checkout -b <nom-court-en-francais>
```

## 2. Vérifier avant de committer

```bash
python3 outils/verifier-site.py
```
Tout doit afficher OK : syntaxe (scripts, JSON-LD, CSS, api/), aucune erreur JavaScript sur ordinateur et mobile, pas de défilement horizontal, sections et menu présents, français identique après un aller-retour de langue, formulaire de paiement (nom de famille, téléphone, données envoyées), aucun tiret cadratin visible. Le travail peut être confié à l'agent `verificateur` (Haiku, moins cher).

Si la modification touche l'album, l'éditeur, l'étape Commander, le paiement ou `api/` (generate-pdf, create-checkout, options, prix) :
```bash
python3 outils/parcours-commande.py
```
Joue la commande comme un client sur 24 cas (formats, styles, options, pays, langues, code promo, format changé après la composition, téléphone) avec le vrai code serveur, PDFShift/Stripe/Print API simulés. Tous les cas doivent être OK : un échec est un client bloqué ou mal facturé. Un nouveau bug trouvé chez un client devient un nouveau cas dans la liste `CAS`.

Si la modification touche le questionnaire, l'import des photos, la création de l'album, l'éditeur, l'étape Commander ou le retour depuis Stripe :
```bash
python3 outils/parcours-client.py > /tmp/parcours-client.txt 2>&1; tail -20 /tmp/parcours-client.txt
```
Le parcours entier en vrais clics, sur téléphone et ordinateur (12 cas, environ 15 minutes) : questionnaire, vraies photos, création par l'IA (simulée, et en panne), aperçu, formulaire, options, paiement, retour depuis Stripe (bouton Précédent et page « Paiement annulé »), photo refusée par le réseau, client allemand. `--cas N` pour un seul cas, `--captures DIR` pour voir chaque étape. Ne pas couper la sortie avec `| head`.

Si la modification est visuelle : `python3 outils/rendu.py --sortie /tmp/rendu` puis regarder les tranches `/tmp/rendu_1440_part*.png` et `/tmp/rendu_390_part*.png`.

## 3. Committer et ouvrir la PR

```bash
git add -A && git commit -m "<résumé en français>"
git push -u origin HEAD
gh api repos/Noustalgie/Noustalgie/pulls -f title="<titre>" -f head="<branche>" -f base=main -f body="<ce qui change, comment c'est vérifié>"
```

## 4. Attendre l'aperçu Vercel

```bash
SHA=$(git rev-parse HEAD)
gh api repos/Noustalgie/Noustalgie/commits/$SHA/status --jq '.state, (.statuses[] | .context + " " + .state + " " + .target_url)'
```
Attendre `success`. En cas d'échec, lire le journal du déploiement avant toute autre chose.

## 5. Fusionner puis contrôler la production

```bash
gh api -X PUT repos/Noustalgie/Noustalgie/pulls/<numéro>/merge -f merge_method=squash
gh api repos/Noustalgie/Noustalgie/commits/main/status --jq '.state'
```
Quand l'état de `main` passe à `success`, la modification est en ligne.

## 6. Prévenir Gabin

Une ou deux phrases : ce qui est en ligne, ce qu'il peut vérifier. Lui rappeler de faire `git pull` dans `~/Desktop/noustalgie-github` avant sa prochaine modification locale.

Pièges : la suppression des branches distantes peut être refusée depuis le bac à sable (sans gravité) ; ne jamais forcer un push sur `main`.
