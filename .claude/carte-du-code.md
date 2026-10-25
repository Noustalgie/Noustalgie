# Carte de public/index.html

Générée automatiquement (8761 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1623 : <style> (134 Ko)
- lignes 1624-1696 : <script type="application/ld+json"> (2 Ko)
- lignes 1697-1800 : <script type="application/ld+json"> (6 Ko)
- lignes 2352-4524 : <script> (188 Ko)
- lignes 4525-5850 : <script> (122 Ko)
- lignes 5851-8732 : <script> (246 Ko)
- lignes 8733-8758 : <script> (2 Ko)

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
 4852  Style Magazine : le livre comme un magazine de couple
 6026  1. Import des photos : une version écran + une version impression
 6316  2. Génération : histoire + légendes à partir des photos
 6628  3. Éditeur
 7036  4. Sauvegarde locale (IndexedDB : photos comprises)
 7071  5. Impression : photos en pleine résolution + PDF hébergé
 7295  6. Paiement
 8263  1. Livre 3D réutilisable
 8384  2. Aperçu en direct pendant la création (ordinateur)
 8418  3. Photos : date de prise de vue, couverture, glisser-déposer
 8520  4. Génération vivante : leurs photos se posent dans un livre
 8546  5. Récapitulatif de commande avec LEUR couverture
 8584  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1828  <header>
 1829  <nav class="ed-nav">
 1851  <main id="main" tabindex="-1">
 1853  <section class="ed-hero">
 1862  <div class="nst-demo" id="nstDemo"
 1868  <section class="nst-how nst-frise" id="how">
 1882  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1905  <section class="ed-price" id="pricing">
 1938  <section class="section app-section" id="app">
 1965  <div class="panel active" id="panel0"
 2050  <div class="panel" id="panel1"
 2091  <div class="panel" id="panel2"
 2117  <div class="panel" id="panel3"
 2118  <div id="nstEd"
 2145  <div class="panel" id="panel4"
 2147  <div id="payForm"
 2225  <section class="ed-faq-section" id="faq">
 2281  <footer>
 2331  <div class="legal-overlay" id="legalOverlay"
 2337  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2357  LANGS.fr
 2445  LANGS.en
 2533  LANGS.de
 2621  LANGS.es
 2709  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2801  toggleLangMenu
 2802  pickLang
 2804  setLang
 2843  highlightPal
 2863  selectPricing
 2878  onSlider
 2891  onInAppSlider
 2914  animNum
 2920  toggleCmp
 2939  saveDraft
 2958  restoreDraft
 2965  set
 2973  clearDraft
 2997  goTab
 3036  edPickPrice
 3042  toggleFaq
 3043  startApp
 3048  addPhotosFromEditor
 3081  ensureConvertible
 3099  detectFocalY
 3119  showUploadLoader
 3131  hideUploadLoader
 3135  addPhotos
 3143  processBatch
 3180  getMinPhotos
 3184  renderPhotos
 3200  removePhoto
 3206  openMsgModal
 3207  closeMsgModal
 3208  saveMsgModal
 3213  selStyle
 3218  log
 3228  setProgress
 3239  api
 3269  runGeneration
 3501  renderBookPreview
 3511  pg
 3518  _take
 3529  pickIdx
 3535  ph
 3536  imgT
 3545  img
 3554  wantTall
 3555  wantSquare
 3556  wantWide
 3961  avRender
 3998  reapplyTexts
 3999  avBuildThumbs
 4012  avNext
 4013  avPrev
 4020  toggleEditor
 4021  edTab
 4022  refreshEditor
 4023  refreshTextFields
 4051  estRows
 4060  liveText
 4073  setActiveSlot
 4074  edSelectPhoto
 4075  updateFilter
 4076  updateCrop
 4077  updateZoom
 4078  toggleBW
 4079  applySlotEditsToDOM
 4083  saveTextStyle
 4084  updateTextStyle
 4085  toggleTextStyle
 4086  setTextSize
 4096  applyTextStylesToDOM
 4097  edSelectLayout
 4098  applyEdit
 4099  applyLayoutOverride
 4100  applyTextLive
 4101  resetEdit
 4105  initCropGestures
 4109  editorOpen
 4110  curSlot
 4118  snapshotPage
 4119  undoEdit
 4121  openFullPreview
 4128  base64ToBlob
 4140  fetchWithTimeout
 4155  processPayment
 4254  generateAlbumPDF
 4261  compressPhotoForPdf
 4325  generateAlbumPDF_UNUSED
 4392  applyPromo
 4413  selectFormat
 4435  updateFormatPrices
 4449  generateFinalPDF
 4466  addPage
 4492  openLegal
 4493  closeLegal
 4535  clamp
 4581  curLang
 4588  themeKey
 4589  theme
 4590  photos
 4595  printSrc
 4607  faceSpan
 4610  autoPos
 4615  fit
 4618  L
 4641  cropCost
 4656  slot
 4681  tx
 4688  fit
 4689  orientOf
 4856  MT
 4858  mix
 4869  MONTHS
 4873  svgHeart
 4874  svgHeartLine
 4875  svgCurl
 4876  tape
 4878  polaroid
 4885  barcode
 4894  heartMap
 4906  wordGrid
 4908  rnd
 4934  folio
 4950  col
 4954  seal
 5063  ic
 5128  mark
 5250  fmtCoord
 5254  k3Line
 5261  yearPhotos
 5272  kmBetween
 5277  villesT
 5284  planMagazine
 5366  again
 5367  freshOr
 5368  pick
 5372  mk
 5380  L
 5470  renderPage
 5491  tierOf
 5492  photoPageCount
 5493  minPhotos
 5496  distribute
 5512  pickLayout
 5529  chooseLayout
 5542  mkPage
 5546  plan
 5582  tag
 5585  takePhoto
 5656  pairOf
 5658  relayout
 5664  makeSpread
 5682  unmakeSpread
 5698  syncSpread
 5706  fixSpreads
 5746  loadDetector
 5751  go
 5761  loadImg
 5765  saliency
 5792  subjectFromFaces
 5801  analyze
 5827  analyzeAll
 5999  t
 6020  lang
 6021  nPagesSel
 6022  promo
 6027  loadImage
 6029  toJpeg
 6051  was
 6068  pickerBack
 6084  showPickHelp
 6093  close
 6115  within
 6116  decodeFile
 6146  hdBlob
 6156  importFile
 6177  toast
 6190  geom
 6195  prepThumb
 6201  prepFull
 6207  dropPhoto
 6213  tile
 6222  pump
 6250  pump2
 6270  addPhotos
 6303  renderPhotos
 6322  browserTag
 6323  callAI
 6351  thumb
 6353  coupleInfo
 6367  mqParts
 6372  magAnswers
 6391  fetchCarte
 6401  fetchVilles
 6413  storyPrompt
 6452  magFacts
 6462  magazinePrompt
 6484  cleanMag
 6485  s
 6497  captionPhotos
 6519  defaultStory
 6554  runGeneration
 6618  showIssue
 6631  isWide
 6632  snap
 6634  H
 6635  commit
 6636  restore
 6637  undo
 6638  redo
 6639  updUndo
 6644  visible
 6652  mountPage
 6657  scaleHost
 6666  drawStage
 6680  drawThumb
 6684  drawStrip
 6691  markStrip
 6697  drawThemes
 6702  revealStage
 6708  drawAll
 6709  refreshPage
 6711  afterSlotEdit
 6718  go
 6719  step
 6724  highlightSel
 6734  drawTools
 6784  rewrite
 6801  swapPhoto
 6812  movePage
 6822  bindEditor
 6995  openReader
 6998  draw
 7002  close
 7004  next
 7020  renderBookPreview
 7038  idb
 7039  idbSet
 7040  idbGet
 7041  idbDel
 7042  saveLocal
 7048  offerResume
 7072  fullBlob
 7090  dataUrlToBlob
 7091  uploadPhotos
 7093  todo
 7099  worker
 7124  nstBake
 7182  docHtml
 7191  printHtml
 7192  innerHtml
 7194  spineStyle
 7198  spineText
 7199  defaultSpine
 7200  coverHtml
 7216  paInnerHtml
 7223  paSheet
 7231  paCoverHtml
 7241  afficheHtml
 7248  cadreHtml
 7253  generateAlbumPDF
 7259  gen
 7266  doc
 7267  tries
 7305  processPayment
 7346  goTab
 7373  lang
 7383  img
 7408  stop
 7439  upd
 7465  apply
 7484  T
 7485  nm
 7486  renderQuiz
 7492  mark
 7498  save
 7545  mail
 7700  backLbl
 7705  toc
 7712  show
 7719  openLegal
 7727  hideLegal
 7728  closeLegal
 7756  cur
 7765  paint
 7790  lang
 7795  applyUI
 7802  setLang
 7822  syncStory
 7856  ensureStoryFor
 7872  recompose
 7886  addInput
 7905  removePhoto
 7958  saveLink
 7980  openFromLink
 7990  set
 8008  trHide
 8010  trackOverlay
 8018  close
 8057  ouvrir
 8083  ekLabel
 8094  drawEbar
 8119  coach
 8125  done
 8131  goTab
 8140  draw
 8168  payLabel
 8199  optTotal
 8201  drawOpts
 8222  selectFormat
 8231  highlightPal
 8236  setLang
 8251  lang
 8264  spineColors
 8291  sampleCover
 8310  auto
 8311  build
 8318  name
 8334  words
 8341  apply
 8368  build
 8377  nst70
 8397  names
 8398  renderLive
 8411  flowMode
 8420  exifDate
 8430  readAscii
 8431  scan
 8448  addPhotos
 8457  remap
 8458  applyOrder
 8471  movePhoto
 8474  sortByDate
 8483  renderPhotosPlus
 8522  startGenAnim
 8534  tick
 8542  stopGenAnim
 8544  runGeneration
 8549  noel
 8553  fill
 8556  renderSummary
 8569  syncPrice
 8580  goTab
 8602  setLang
 8619  lang
 8650  applyText
 8659  fromFrance
 8667  fromOSM
 8686  close
 8687  render
 8695  pick
 8703  search
 8739  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (53 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (54 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (172 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (100 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (26 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (286 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
