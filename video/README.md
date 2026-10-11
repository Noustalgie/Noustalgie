# Vidéo TikTok Noustalgie

Vidéo verticale de présentation du site (1080 × 1920, 60 i/s, 48 s), en motion design,
avec une bande-son originale synthétisée et calée sur l'image (120 BPM).

## Déroulé

| Temps | Scène | Message |
|---|---|---|
| 0–4 s | Accroche | « 12 847 photos dans ton téléphone… et 0 album. » |
| 4–8 s | Promesse | « Et si votre histoire devenait un vrai livre ? », arrivée du livre 3D |
| 8–14 s | Étape 1 | Formulaire du duo puis import des photos dans l'appli |
| 14–22 s | Étape 2 | L'histoire s'écrit lettre par lettre, mur de pages, « bulletin météo de notre amour » |
| 22–28 s | Étape 3 | Aperçu gratuit, légende et mise en page modifiées, « Tu paies seulement si tu adores » |
| 28–32,5 s | Drop | Le livre s'ouvre, les pages défilent sur le tempo (styles Nuit, Galerie, Argentique, Encre) |
| 32,5–36 s | Livraison | Le livre tombe dans un carton 3D, sceau, trajet jusqu'à la maison, livraison offerte |
| 36–40 s | Occasions | « Le cadeau parfait pour… » Saint-Valentin, 1 an, anniversaire, mariage, Noël, dire je t'aime |
| 40–43 s | Prix | Aperçu 100 % gratuit, formules 24 / 36 / 50 pages (39,99 € / 49,99 € / 69,99 €) |
| 43–48 s | Fin | Logo, livre, bouton noustalgie.fr, « lien en bio » |

## Fabrication

- `index.html` + `src/` : la composition (GSAP). Une timeline en pause pilote tout ;
  `window.__seek(t)` affiche l'instant `t`, ce qui rend le rendu image par image déterministe.
- `src/scenes/*.js` : une scène par fichier, avec ses repères sonores (`sfx(...)`).
- `tools/gen-photos.js` + `tools/scenes.js` : les « photos » de l'album, dessinées au canvas
  (silhouettes, paysages). Aucune photo réelle n'est utilisée.
- `tools/gen-pages.js` : les pages d'album sont rendues par le vrai moteur du site
  (`NA.renderPage` de `public/index.html`), avec ces photos.
- `tools/audio.py` : musique et effets sonores synthétisés (numpy, scipy, pedalboard),
  mixés à −14 LUFS.
- `tools/render.js` : capture Chromium image par image puis encodage ffmpeg (H.264 + AAC).

## Refaire la vidéo

```bash
cd video
npm install
pip install numpy scipy soundfile pedalboard pyloudnorm pillow
npm run assets      # photos procédurales, pages d'album, vignettes
npm run cues        # repères sonores → out/cues.json
npm run audio       # out/audio.wav, out/sfx_only.wav, out/music_only.wav
npm run render      # out/frames/ puis out/noustalgie-tiktok.mp4
```

Contrôle rapide d'instants précis : `npm run snap -- 6.5,28.2,44` (captures dans `out/snaps/`).
Aperçu dans un navigateur : `npm run preview` puis ouvrir `/index.html?play` ou `/index.html?t=28`.

Pour utiliser de vraies photos, remplacer les fichiers de `assets/photos/` (mêmes noms),
puis relancer `npm run pages`, `python3 tools/thumbs.py` et `npm run render`.
