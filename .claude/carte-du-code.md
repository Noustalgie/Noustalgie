# Carte de public/index.html

Générée automatiquement (9125 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2423-4595 : <script> (189 Ko)
- lignes 4596-5966 : <script> (127 Ko)
- lignes 5967-9084 : <script> (272 Ko)
- lignes 9085-9122 : <script> (3 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  543  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  685  FORCE FINALE : champs texte éditeur toujours sombres
  695  PANNEAUX EDITEUR : fond noir uniforme
  731  v1.1 — accessibilité & confort
  738  Noustalgie v2 — éditeur d'album
  840  v2.2 — édition au doigt
  868  v3.3 — album : lien, format, photos, glisser-déposer, suivi
  896  v2.2 — système de design du site
  946  v2.3 — boutons pilule
  955  v2.3 — galerie de vraies pages
  970  v2.3 — garanties
  976  v2.3 — tarifs actionnables
  980  v2.3 — barre d'action mobile
  993  v2.4 — hero : couverture du livre fermé
 1001  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1020  v2.5 — sélecteur de langue
 1030  v2.5 — pages d'information
 1072  v2.6 — « Comment ça marche »
 1104  v2.7 — « Comment ça marche » en frise éditoriale
 1124  v3 — indications sous les questions
 1125  v4 — livre 3D
 1149  v4 — tarifs : épaisseur réelle
 1153  v4 — aperçu en direct
 1164  v4 — photos
 1174  v4 — génération vivante
 1184  v4 — récapitulatif de commande
 1192  v4 — étapes
 1200  v4 — apparition au défilement et page tournée
 1210  v4.3 — suggestions d'adresse
 1224  v4.5 — message d'import
 1234  v4.7 — correctifs téléphone
 1250  v4.8 — édition évidente
 1269  v5.2 — photos non transmises par l'iPhone
 1280  v5.4 — lisibilité
 1285  v5.5 — finitions demandées
 1311  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1489  galerie d'accueil : lien vers l'album d'exemple complet
 1583  Fond du site (choix de Gabin) : le couple dans la montagne, flouté dans le fichier même et voilé, fixe derrièr
 4967  Style Magazine : le livre comme un magazine de couple
 6162  1. Import des photos : une version écran + une version impression
 6471  2. Génération : histoire + légendes à partir des photos
 6789  3. Éditeur
 7196  4. Sauvegarde locale (IndexedDB : photos comprises)
 7270  5. Impression : photos en pleine résolution + PDF hébergé
 7510  6. Paiement
 8615  1. Livre 3D réutilisable
 8736  2. Aperçu en direct pendant la création (ordinateur)
 8770  3. Photos : date de prise de vue, couverture, glisser-déposer
 8872  4. Génération vivante : leurs photos se posent dans un livre
 8898  5. Récapitulatif de commande avec LEUR couverture
 8936  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1879  <header>
 1880  <nav class="ed-nav">
 1902  <main id="main" tabindex="-1">
 1904  <section class="ed-hero">
 1913  <div class="nst-demo" id="nstDemo"
 1919  <section class="nst-how nst-frise" id="how">
 1933  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1956  <section class="ed-price" id="pricing">
 1993  <section class="section app-section" id="app">
 2020  <div class="panel active" id="panel0"
 2106  <div class="panel" id="panel1"
 2151  <div class="panel" id="panel2"
 2177  <div class="panel" id="panel3"
 2178  <div id="nstEd"
 2205  <div class="panel" id="panel4"
 2207  <div id="payForm"
 2288  <section class="ed-faq-section" id="faq">
 2344  <footer>
 2402  <div class="legal-overlay" id="legalOverlay"
 2408  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2428  LANGS.fr
 2516  LANGS.en
 2604  LANGS.de
 2692  LANGS.es
 2780  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2872  toggleLangMenu
 2873  pickLang
 2875  setLang
 2914  highlightPal
 2934  selectPricing
 2949  onSlider
 2962  onInAppSlider
 2985  animNum
 2991  toggleCmp
 3010  saveDraft
 3029  restoreDraft
 3036  set
 3044  clearDraft
 3068  goTab
 3107  edPickPrice
 3113  toggleFaq
 3114  startApp
 3119  addPhotosFromEditor
 3152  ensureConvertible
 3170  detectFocalY
 3190  showUploadLoader
 3202  hideUploadLoader
 3206  addPhotos
 3214  processBatch
 3251  getMinPhotos
 3255  renderPhotos
 3271  removePhoto
 3277  openMsgModal
 3278  closeMsgModal
 3279  saveMsgModal
 3284  selStyle
 3289  log
 3299  setProgress
 3310  api
 3340  runGeneration
 3572  renderBookPreview
 3582  pg
 3589  _take
 3600  pickIdx
 3606  ph
 3607  imgT
 3616  img
 3625  wantTall
 3626  wantSquare
 3627  wantWide
 4032  avRender
 4069  reapplyTexts
 4070  avBuildThumbs
 4083  avNext
 4084  avPrev
 4091  toggleEditor
 4092  edTab
 4093  refreshEditor
 4094  refreshTextFields
 4122  estRows
 4131  liveText
 4144  setActiveSlot
 4145  edSelectPhoto
 4146  updateFilter
 4147  updateCrop
 4148  updateZoom
 4149  toggleBW
 4150  applySlotEditsToDOM
 4154  saveTextStyle
 4155  updateTextStyle
 4156  toggleTextStyle
 4157  setTextSize
 4167  applyTextStylesToDOM
 4168  edSelectLayout
 4169  applyEdit
 4170  applyLayoutOverride
 4171  applyTextLive
 4172  resetEdit
 4176  initCropGestures
 4180  editorOpen
 4181  curSlot
 4189  snapshotPage
 4190  undoEdit
 4192  openFullPreview
 4199  base64ToBlob
 4211  fetchWithTimeout
 4226  processPayment
 4325  generateAlbumPDF
 4332  compressPhotoForPdf
 4396  generateAlbumPDF_UNUSED
 4463  applyPromo
 4484  selectFormat
 4506  updateFormatPrices
 4520  generateFinalPDF
 4537  addPage
 4563  openLegal
 4564  closeLegal
 4606  clamp
 4652  curLang
 4659  themeKey
 4660  theme
 4661  photos
 4666  printSrc
 4678  faceSpan
 4681  autoPos
 4686  fit
 4689  L
 4712  cropCost
 4727  slot
 4760  joli
 4781  coeur
 4784  tx
 4791  fit
 4798  haut
 4804  orientOf
 4971  MT
 4973  mix
 4984  MONTHS
 4988  svgHeart
 4989  svgHeartLine
 4990  svgCurl
 4991  tape
 4993  polaroid
 5000  barcode
 5009  heartMap
 5021  wordGrid
 5023  rnd
 5049  folio
 5065  col
 5069  seal
 5178  ic
 5243  mark
 5366  fmtCoord
 5370  k3Line
 5377  yearPhotos
 5388  kmBetween
 5393  villesT
 5400  planMagazine
 5482  again
 5483  freshOr
 5484  pick
 5488  mk
 5496  L
 5586  renderPage
 5607  tierOf
 5608  photoPageCount
 5609  minPhotos
 5612  distribute
 5628  pickLayout
 5645  chooseLayout
 5658  mkPage
 5662  plan
 5698  tag
 5701  takePhoto
 5772  pairOf
 5774  relayout
 5780  makeSpread
 5798  unmakeSpread
 5814  syncSpread
 5822  fixSpreads
 5862  loadDetector
 5867  go
 5877  loadImg
 5881  saliency
 5908  subjectFromFaces
 5917  analyze
 5943  analyzeAll
 6135  t
 6156  lang
 6157  nPagesSel
 6158  promo
 6163  loadImage
 6165  toJpeg
 6187  was
 6204  pickerBack
 6220  showPickHelp
 6229  close
 6251  within
 6252  decodeFile
 6282  hdBlob
 6292  importFile
 6313  toast
 6326  geom
 6331  prepThumb
 6337  prepFull
 6343  dropPhoto
 6349  tile
 6358  pump
 6386  pump2
 6406  addPhotos
 6439  renderPhotos
 6452  drawUp36
 6477  browserTag
 6478  callAI
 6506  thumb
 6508  coupleInfo
 6524  mqParts
 6529  magAnswers
 6548  fetchCarte
 6558  fetchVilles
 6570  storyPrompt
 6609  magFacts
 6619  magazinePrompt
 6641  cleanMag
 6642  s
 6654  captionPhotos
 6676  defaultStory
 6711  runGeneration
 6779  showIssue
 6792  isWide
 6793  snap
 6795  H
 6796  commit
 6797  restore
 6798  undo
 6799  redo
 6800  updUndo
 6805  visible
 6813  mountPage
 6818  scaleHost
 6827  drawStage
 6841  drawThumb
 6845  drawStrip
 6852  markStrip
 6858  drawThemes
 6863  revealStage
 6869  drawAll
 6870  refreshPage
 6872  afterSlotEdit
 6879  go
 6880  step
 6885  highlightSel
 6895  drawTools
 6946  rewrite
 6963  swapPhoto
 6972  movePage
 6982  bindEditor
 7155  openReader
 7158  draw
 7162  close
 7164  next
 7180  renderBookPreview
 7198  idb
 7199  idbSet
 7200  idbGet
 7201  idbDel
 7202  saveLocal
 7208  offerResume
 7245  proposerMagazine
 7271  fullBlob
 7289  dataUrlToBlob
 7290  uploadPhotos
 7293  todo
 7299  worker
 7325  nstBake
 7383  docHtml
 7392  printHtml
 7393  innerHtml
 7395  spineStyle
 7399  spineText
 7400  defaultSpine
 7401  coverHtml
 7417  paInnerHtml
 7424  paSheet
 7432  paCoverHtml
 7442  optSlot
 7448  afficheHtml
 7456  cadreHtml
 7460  aimantHtml
 7461  generateAlbumPDF
 7471  gen
 7478  doc
 7479  tries
 7522  processPayment
 7580  goTab
 7607  lang
 7617  img
 7642  stop
 7673  upd
 7699  apply
 7718  T
 7719  nm
 7720  renderQuiz
 7726  mark
 7732  save
 7779  mail
 7941  backLbl
 7946  toc
 7953  show
 7960  openLegal
 7968  hideLegal
 7969  closeLegal
 7997  cur
 8006  paint
 8031  lang
 8036  applyUI
 8043  setLang
 8065  syncStory
 8099  ensureStoryFor
 8115  recompose
 8129  addInput
 8158  removePhoto
 8175  selectPricing
 8226  fixTexts
 8259  saveLink
 8281  openFromLink
 8291  set
 8309  trHide
 8311  trackOverlay
 8319  close
 8358  ouvrir
 8384  ekLabel
 8395  drawEbar
 8420  coach
 8426  done
 8432  goTab
 8441  draw
 8469  payLabel
 8511  optTotal
 8513  drawOpts
 8538  fillOptImgs
 8551  pickOptPhoto
 8574  selectFormat
 8583  highlightPal
 8588  setLang
 8603  lang
 8616  spineColors
 8643  sampleCover
 8662  auto
 8663  build
 8670  name
 8686  words
 8693  apply
 8720  build
 8729  nst70
 8749  names
 8750  renderLive
 8763  flowMode
 8772  exifDate
 8782  readAscii
 8783  scan
 8800  addPhotos
 8809  remap
 8810  applyOrder
 8823  movePhoto
 8826  sortByDate
 8835  renderPhotosPlus
 8874  startGenAnim
 8886  tick
 8894  stopGenAnim
 8896  runGeneration
 8901  noel
 8905  fill
 8908  renderSummary
 8921  syncPrice
 8932  goTab
 8954  setLang
 8971  lang
 9002  applyText
 9011  fromFrance
 9019  fromOSM
 9038  close
 9039  render
 9047  pick
 9055  search
 9100  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (50 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (29 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (299 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
