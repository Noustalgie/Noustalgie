# Carte de public/index.html

Générée automatiquement (7487 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-151 : <script type="application/ld+json"> (3 Ko)
- lignes 156-1589 : <style> (120 Ko)
- lignes 1590-1609 : <script type="application/ld+json"> (1 Ko)
- lignes 1610-1697 : <script type="application/ld+json"> (4 Ko)
- lignes 2174-4333 : <script> (173 Ko)
- lignes 4334-5018 : <script> (44 Ko)
- lignes 5019-7464 : <script> (203 Ko)
- lignes 7465-7484 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  645  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  787  FORCE FINALE : champs texte éditeur toujours sombres
  797  PANNEAUX EDITEUR : fond noir uniforme
  833  v1.1 — accessibilité & confort
  840  Noustalgie v2 — éditeur d'album
  942  v2.2 — édition au doigt
  970  v3.3 — album : lien, format, photos, glisser-déposer, suivi
  998  v2.2 — système de design du site
 1048  v2.3 — boutons pilule
 1057  v2.3 — galerie de vraies pages
 1070  v2.3 — garanties
 1076  v2.3 — tarifs actionnables
 1080  v2.3 — barre d'action mobile
 1093  v2.4 — hero : couverture du livre fermé
 1101  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1120  v2.5 — sélecteur de langue
 1130  v2.5 — pages d'information
 1172  v2.6 — « Comment ça marche »
 1204  v2.7 — « Comment ça marche » en frise éditoriale
 1224  v3 — indications sous les questions
 1227  v4 — livre 3D
 1251  v4 — tarifs : épaisseur réelle
 1255  v4 — aperçu en direct
 1266  v4 — photos
 1276  v4 — génération vivante
 1286  v4 — récapitulatif de commande
 1294  v4 — étapes
 1302  v4 — apparition au défilement et page tournée
 1312  v4.3 — suggestions d'adresse
 1326  v4.5 — message d'import
 1336  v4.7 — correctifs téléphone
 1352  v4.8 — édition évidente
 1371  v5.2 — photos non transmises par l'iPhone
 1380  v5.4 — lisibilité
 1385  v5.5 — finitions demandées
 1411  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 5194  1. Import des photos : une version écran + une version impression
 5456  2. Génération : histoire + légendes à partir des photos
 5721  3. Éditeur
 6126  4. Sauvegarde locale (IndexedDB : photos comprises)
 6161  5. Impression : photos en pleine résolution + PDF hébergé
 6262  6. Paiement
 7060  1. Livre 3D réutilisable
 7126  2. Aperçu en direct pendant la création (ordinateur)
 7160  3. Photos : date de prise de vue, couverture, glisser-déposer
 7262  4. Génération vivante : leurs photos se posent dans un livre
 7288  5. Récapitulatif de commande avec LEUR couverture
 7316  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1725  <nav class="ed-nav">
 1747  <section class="ed-hero">
 1756  <div class="nst-demo" id="nstDemo"
 1762  <section class="nst-how nst-frise" id="how">
 1783  <section class="ed-price" id="pricing">
 1816  <section class="section app-section" id="app">
 1843  <div class="panel active" id="panel0"
 1885  <div class="panel" id="panel1"
 1926  <div class="panel" id="panel2"
 1952  <div class="panel" id="panel3"
 1953  <div id="nstEd"
 1980  <div class="panel" id="panel4"
 1982  <div id="payForm"
 2060  <section class="ed-faq-section" id="faq">
 2107  <footer>
 2153  <div class="legal-overlay" id="legalOverlay"
 2159  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2179  LANGS.fr
 2265  LANGS.en
 2351  LANGS.de
 2437  LANGS.es
 2523  LANGS.pt

## Fonctions

 2613  toggleLangMenu
 2614  pickLang
 2616  setLang
 2655  highlightPal
 2675  selectPricing
 2690  onSlider
 2703  onInAppSlider
 2726  animNum
 2732  toggleCmp
 2751  saveDraft
 2770  restoreDraft
 2777  set
 2785  clearDraft
 2809  goTab
 2848  edPickPrice
 2854  toggleFaq
 2855  startApp
 2860  addPhotosFromEditor
 2893  ensureConvertible
 2911  detectFocalY
 2931  showUploadLoader
 2943  hideUploadLoader
 2947  addPhotos
 2955  processBatch
 2992  getMinPhotos
 2996  renderPhotos
 3012  removePhoto
 3018  openMsgModal
 3019  closeMsgModal
 3020  saveMsgModal
 3025  selStyle
 3030  log
 3040  setProgress
 3051  api
 3081  runGeneration
 3313  renderBookPreview
 3323  pg
 3330  _take
 3341  pickIdx
 3347  ph
 3348  imgT
 3357  img
 3366  wantTall
 3367  wantSquare
 3368  wantWide
 3773  avRender
 3810  reapplyTexts
 3811  avBuildThumbs
 3824  avNext
 3825  avPrev
 3832  toggleEditor
 3833  edTab
 3834  refreshEditor
 3835  refreshTextFields
 3863  estRows
 3872  liveText
 3885  setActiveSlot
 3886  edSelectPhoto
 3887  updateFilter
 3888  updateCrop
 3889  updateZoom
 3890  toggleBW
 3891  applySlotEditsToDOM
 3895  saveTextStyle
 3896  updateTextStyle
 3897  toggleTextStyle
 3898  setTextSize
 3908  applyTextStylesToDOM
 3909  edSelectLayout
 3910  applyEdit
 3911  applyLayoutOverride
 3912  applyTextLive
 3913  resetEdit
 3917  initCropGestures
 3921  editorOpen
 3922  curSlot
 3930  snapshotPage
 3931  undoEdit
 3933  openFullPreview
 3940  base64ToBlob
 3952  fetchWithTimeout
 3967  processPayment
 4066  generateAlbumPDF
 4073  compressPhotoForPdf
 4137  generateAlbumPDF_UNUSED
 4204  applyPromo
 4225  selectFormat
 4247  updateFormatPrices
 4261  generateFinalPDF
 4278  addPage
 4304  openLegal
 4305  closeLegal
 4344  clamp
 4381  curLang
 4388  themeKey
 4389  theme
 4390  photos
 4392  printSrc
 4404  faceSpan
 4407  autoPos
 4412  fit
 4415  L
 4438  cropCost
 4450  slot
 4469  tx
 4476  fit
 4477  orientOf
 4641  renderPage
 4660  tierOf
 4661  photoPageCount
 4662  minPhotos
 4665  distribute
 4681  pickLayout
 4698  chooseLayout
 4711  mkPage
 4715  plan
 4751  tag
 4754  takePhoto
 4825  pairOf
 4827  relayout
 4833  makeSpread
 4851  unmakeSpread
 4867  syncSpread
 4875  fixSpreads
 4914  loadDetector
 4919  go
 4929  loadImg
 4933  saliency
 4960  subjectFromFaces
 4969  analyze
 4995  analyzeAll
 5167  t
 5188  lang
 5189  nPagesSel
 5190  promo
 5195  loadImage
 5197  toJpeg
 5219  was
 5233  pickerBack
 5243  showPickHelp
 5248  close
 5262  within
 5263  decodeFile
 5293  hdBlob
 5303  importFile
 5324  toast
 5337  geom
 5342  prepThumb
 5348  prepFull
 5354  dropPhoto
 5360  tile
 5369  pump
 5396  pump2
 5416  addPhotos
 5443  renderPhotos
 5462  browserTag
 5463  callAI
 5491  thumb
 5493  coupleInfo
 5508  storyPrompt
 5555  keywords
 5564  missingAnswers
 5573  repairStory
 5591  captionPhotos
 5613  defaultStory
 5648  runGeneration
 5711  showIssue
 5723  isWide
 5724  snap
 5726  H
 5727  commit
 5728  restore
 5729  undo
 5730  redo
 5731  updUndo
 5736  visible
 5744  mountPage
 5749  scaleHost
 5758  drawStage
 5772  drawThumb
 5776  drawStrip
 5783  markStrip
 5789  drawThemes
 5794  revealStage
 5800  drawAll
 5801  refreshPage
 5803  afterSlotEdit
 5810  go
 5811  step
 5816  highlightSel
 5826  drawTools
 5876  rewrite
 5893  swapPhoto
 5904  movePage
 5914  bindEditor
 6085  openReader
 6088  draw
 6092  close
 6094  next
 6110  renderBookPreview
 6128  idb
 6129  idbSet
 6130  idbGet
 6131  idbDel
 6132  saveLocal
 6138  offerResume
 6162  fullBlob
 6180  dataUrlToBlob
 6181  uploadPhotos
 6183  todo
 6189  worker
 6212  docHtml
 6218  printHtml
 6219  innerHtml
 6221  spineStyle
 6225  spineText
 6226  defaultSpine
 6227  coverHtml
 6235  generateAlbumPDF
 6241  gen
 6272  processPayment
 6312  goTab
 6339  lang
 6342  pg
 6377  upd
 6403  apply
 6432  mail
 6581  toc
 6588  show
 6594  openLegal
 6600  closeLegal
 6630  cur
 6639  paint
 6664  lang
 6669  applyUI
 6676  setLang
 6694  syncStory
 6724  ensureStoryFor
 6740  recompose
 6754  addInput
 6773  removePhoto
 6826  saveLink
 6848  openFromLink
 6858  set
 6875  trackOverlay
 6883  close
 6919  ouvrir
 6943  drawEbar
 6968  coach
 6974  done
 6980  goTab
 6989  draw
 7017  payLabel
 7028  highlightPal
 7033  setLang
 7048  lang
 7061  spineColors
 7101  name
 7103  auto
 7139  names
 7140  renderLive
 7153  flowMode
 7162  exifDate
 7172  readAscii
 7173  scan
 7190  addPhotos
 7199  remap
 7200  applyOrder
 7213  movePhoto
 7216  sortByDate
 7225  renderPhotosPlus
 7264  startGenAnim
 7276  tick
 7284  stopGenAnim
 7286  runGeneration
 7289  renderSummary
 7302  syncPrice
 7312  goTab
 7334  setLang
 7351  lang
 7382  applyText
 7391  fromFrance
 7399  fromOSM
 7418  close
 7419  render
 7427  pick
 7435  search
 7471  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (15 lignes) 
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (42 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (144 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (82 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (23 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (249 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
