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

- Syntaxe (le crochet le fait après chaque modification ; à la main) :
  ```bash
  echo '{"tool_input":{"file_path":"public/index.html"}}' | node .claude/hooks/verifier-syntaxe.mjs && echo OK
  for f in api/*.js api/_fn/*.js api/_lib/*.js; do node --check "$f" || echo "ERREUR $f"; done
  ```
- Rendu : servir `public/` (`python3 -m http.server 8771 -d public`), ouvrir la page sur ordinateur (1440 px) et mobile (390 px), vérifier qu'aucune erreur n'apparaît dans `window.__nstErrs`.
- Textes : si un texte français a changé, il est modifié **dans le HTML statique et dans `LANGS.fr`** ; contrôler qu'un aller-retour `setLang('en')` puis `setLang('fr')` ne change rien à l'écran.
- Paiement : si `processPayment`, `api/create-checkout.js` ou `api/webhook.js` ont bougé, tester le formulaire (nom de famille obligatoire, téléphone valide) sans appeler Stripe.

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
