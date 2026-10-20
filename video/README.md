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

## Magazine : album vitrine, slides et « Avant / après »

L'album d'exemple « Léa & Hugo » au style Magazine (24 pages, les 13 vraies photos de `public/img/exemple`,
le vrai plan de Lille renvoyé par `/api/carte`) est décrit dans `mag/vitrine.json`.

```bash
python3 tools/mag-pages.py          # pages rendues par le vrai moteur du site → out/mag/pages/page-01…24.jpg (1588 px)
                                    # + pano-g/pano-d.jpg : la double page paysage des slides (clé « pano » de vitrine.json)
python3 tools/mag-pages.py --theme seventies   # les mêmes pages en style Années 70 → out/mag/pages-seventies/
node tools/mag-slides.js            # 11 slides TikTok, livre 3D sur la table → out/mag/slides/ (1080 × 1920)
node tools/mag-plats.js             # les mêmes slides, pages à plat sur fond clair → out/mag/plats/
node tools/render.js --page mag/index.html --cues --cuesfile cues-mag.json
python3 tools/audio_mag.py          # musique (120 BPM) + bruitage → out/audio-mag.wav (+ -music, -sfx)
node tools/render.js --page mag/index.html --fps 30 --workers 4 --frames out/frames-mag \
  --audio out/audio-mag.wav --out mag-avant-apres.mp4
```

`mag/` : film de 22 s. 0–4 s la pellicule du téléphone (« Avant »), 4 s le drop et le magazine imprimé
(« Après »), une page par temps, gros plans en alternance, 18 s carte finale (noustalgie.fr, aperçu gratuit,
livré en 10 à 12 jours). Textes en TikTok Sans (licence OFL, `assets/fonts/TikTokSans-OFL.txt`).
`out/audio-mag-sfx.wav` contient le bruitage seul, pour poser un son tendance TikTok par-dessus.

### Carrousel « photos » (comme le carrousel TikTok de référence)

L'album rigide 21 × 21 photographié ouvert sur une table en bois miel, coin de tapis en jute au sol, lumière de
fenêtre : rendu Blender Cycles (lancer de rayons), puis légendes blanches cernées de noir avec émojis.
Remplace `tools/mag-plats.js` (pages à plat sur fond clair), gardé pour mémoire.

```bash
python3.11 -m venv ~/blender-venv && ~/blender-venv/bin/pip install bpy==5.0.1 pillow numpy   # Blender en module Python (une fois)
python3 tools/decor.py              # textures du bois et du jute, couleurs calées sur les photos de référence → out/mag/decor/
node tools/mag-ecran.js             # écran du téléphone de la dernière photo (accueil du site en mobile)
~/blender-venv/bin/python tools/mag-photos.py [--only 3,4] [--draft]   # photos 2 à 13 → out/mag/photos/ (≈ 4 min chacune)
node tools/mag-legendes.js          # carrousel final → out/mag/carrousel/01…13.jpg (+ sans-texte/, + 01-copain/01-copine : autres accroches)
```

Slide 6 : la double page paysage (photo recadrée par `cadre` dans `vitrine.json` pour garder le couple hors de la pliure).
Slide 12 : la double page de la slide 3 en style Années 70 (pages de `out/mag/pages-seventies`).
Carrousel d'octobre 2026 (13 slides) : nouveaux angles par rapport au précédent (TikTok pénalise les images republiées),
accroche « Idée cadeau Couple » avec l'étiquette « Pour Noël », et deux variantes pour republier le même carrousel
(« pour ton copain », « pour ta copine »). La date de Noël de la slide 13 suit `NOEL` de `public/index.html`.
L'écran du téléphone (slide 13) prend les vraies polices du site (comme `outils/rendu.py`), sinon la couverture du haut de page est fausse.
La slide 1 (accroche) reprend la photo `photo-portee.jpg` (le couple de la couverture) avec des autocollants en Lilita One et Gochi Hand
(licence OFL, `assets/fonts/LilitaOne-GochiHand-OFL.txt`). Les cadrages, l'exposition et la teinte du bois se
règlent en tête de `tools/mag-photos.py` (`SHOTS`, `EXPO`) et de `tools/decor.py` (`WOOD_GAIN`).

Les photos d'album du site (`public/img/exemple/album-*.jpg`, 1200 × 1200) et les fonds des images de partage
sortent du même décor :

```bash
~/blender-venv/bin/python tools/mag-photos.py --site [--only album-pages]   # → out/mag/site/ (cadrages : SITE_SHOTS)
cp out/mag/site/album-*.jpg ../public/img/exemple/
node tools/og.js out/mag/site/og-fond.jpg ../public/img/exemple/og-noustalgie.jpg "L’album photo <em>qui raconte votre histoire</em>" "Vos photos, votre histoire écrite, un vrai livre relié. Aperçu gratuit avant de commander." --panneau
node tools/og.js out/mag/site/og-exemple-fond.jpg ../public/img/exemple/og-exemple-album.jpg "Un exemple d’album, <em>page après page</em>" "Les 24 pages de l’album de Léa et Hugo, au style Magazine." --panneau
```

Quand une de ces images change, changer aussi son `alt` et ses légendes (`figcaption`) dans toutes les pages de `public/`.
