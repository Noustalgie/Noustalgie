# Carte de public/index.html

Générée automatiquement (8633 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1729 : <style> (131 Ko)
- lignes 1730-1749 : <script type="application/ld+json"> (1 Ko)
- lignes 1750-1837 : <script type="application/ld+json"> (4 Ko)
- lignes 2379-4543 : <script> (182 Ko)
- lignes 4544-5869 : <script> (122 Ko)
- lignes 5870-8607 : <script> (231 Ko)
- lignes 8608-8630 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  678  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  820  FORCE FINALE : champs texte éditeur toujours sombres
  830  PANNEAUX EDITEUR : fond noir uniforme
  866  v1.1 — accessibilité & confort
  873  Noustalgie v2 — éditeur d'album
  975  v2.2 — édition au doigt
 1003  v3.3 — album : lien, format, photos, glisser-déposer, suivi
 1031  v2.2 — système de design du site
 1081  v2.3 — boutons pilule
 1090  v2.3 — galerie de vraies pages
 1105  v2.3 — garanties
 1111  v2.3 — tarifs actionnables
 1115  v2.3 — barre d'action mobile
 1128  v2.4 — hero : couverture du livre fermé
 1136  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1155  v2.5 — sélecteur de langue
 1165  v2.5 — pages d'information
 1207  v2.6 — « Comment ça marche »
 1239  v2.7 — « Comment ça marche » en frise éditoriale
 1259  v3 — indications sous les questions
 1260  v4 — livre 3D
 1284  v4 — tarifs : épaisseur réelle
 1288  v4 — aperçu en direct
 1299  v4 — photos
 1309  v4 — génération vivante
 1319  v4 — récapitulatif de commande
 1327  v4 — étapes
 1335  v4 — apparition au défilement et page tournée
 1345  v4.3 — suggestions d'adresse
 1359  v4.5 — message d'import
 1369  v4.7 — correctifs téléphone
 1385  v4.8 — édition évidente
 1404  v5.2 — photos non transmises par l'iPhone
 1415  v5.4 — lisibilité
 1420  v5.5 — finitions demandées
 1446  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1624  galerie d'accueil : lien vers l'album d'exemple complet
 1718  Fond du site (choix de Gabin) : le couple dans la montagne, flouté dans le fichier même et voilé, fixe derrièr
 4871  Style Magazine : le livre comme un magazine de couple
 6045  1. Import des photos : une version écran + une version impression
 6335  2. Génération : histoire + légendes à partir des photos
 6647  3. Éditeur
 7055  4. Sauvegarde locale (IndexedDB : photos comprises)
 7090  5. Impression : photos en pleine résolution + PDF hébergé
 7267  6. Paiement
 8172  1. Livre 3D réutilisable
 8269  2. Aperçu en direct pendant la création (ordinateur)
 8303  3. Photos : date de prise de vue, couverture, glisser-déposer
 8405  4. Génération vivante : leurs photos se posent dans un livre
 8431  5. Récapitulatif de commande avec LEUR couverture
 8459  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1865  <header>
 1866  <nav class="ed-nav">
 1888  <main id="main" tabindex="-1">
 1890  <section class="ed-hero">
 1899  <div class="nst-demo" id="nstDemo"
 1905  <section class="nst-how nst-frise" id="how">
 1919  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1941  <section class="ed-price" id="pricing">
 1974  <section class="section app-section" id="app">
 2001  <div class="panel active" id="panel0"
 2086  <div class="panel" id="panel1"
 2127  <div class="panel" id="panel2"
 2153  <div class="panel" id="panel3"
 2154  <div id="nstEd"
 2181  <div class="panel" id="panel4"
 2183  <div id="payForm"
 2261  <section class="ed-faq-section" id="faq">
 2309  <footer>
 2358  <div class="legal-overlay" id="legalOverlay"
 2364  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2384  LANGS.fr
 2471  LANGS.en
 2558  LANGS.de
 2645  LANGS.es
 2732  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2823  toggleLangMenu
 2824  pickLang
 2826  setLang
 2865  highlightPal
 2885  selectPricing
 2900  onSlider
 2913  onInAppSlider
 2936  animNum
 2942  toggleCmp
 2961  saveDraft
 2980  restoreDraft
 2987  set
 2995  clearDraft
 3019  goTab
 3058  edPickPrice
 3064  toggleFaq
 3065  startApp
 3070  addPhotosFromEditor
 3103  ensureConvertible
 3121  detectFocalY
 3141  showUploadLoader
 3153  hideUploadLoader
 3157  addPhotos
 3165  processBatch
 3202  getMinPhotos
 3206  renderPhotos
 3222  removePhoto
 3228  openMsgModal
 3229  closeMsgModal
 3230  saveMsgModal
 3235  selStyle
 3240  log
 3250  setProgress
 3261  api
 3291  runGeneration
 3523  renderBookPreview
 3533  pg
 3540  _take
 3551  pickIdx
 3557  ph
 3558  imgT
 3567  img
 3576  wantTall
 3577  wantSquare
 3578  wantWide
 3983  avRender
 4020  reapplyTexts
 4021  avBuildThumbs
 4034  avNext
 4035  avPrev
 4042  toggleEditor
 4043  edTab
 4044  refreshEditor
 4045  refreshTextFields
 4073  estRows
 4082  liveText
 4095  setActiveSlot
 4096  edSelectPhoto
 4097  updateFilter
 4098  updateCrop
 4099  updateZoom
 4100  toggleBW
 4101  applySlotEditsToDOM
 4105  saveTextStyle
 4106  updateTextStyle
 4107  toggleTextStyle
 4108  setTextSize
 4118  applyTextStylesToDOM
 4119  edSelectLayout
 4120  applyEdit
 4121  applyLayoutOverride
 4122  applyTextLive
 4123  resetEdit
 4127  initCropGestures
 4131  editorOpen
 4132  curSlot
 4140  snapshotPage
 4141  undoEdit
 4143  openFullPreview
 4150  base64ToBlob
 4162  fetchWithTimeout
 4177  processPayment
 4276  generateAlbumPDF
 4283  compressPhotoForPdf
 4347  generateAlbumPDF_UNUSED
 4414  applyPromo
 4435  selectFormat
 4457  updateFormatPrices
 4471  generateFinalPDF
 4488  addPage
 4514  openLegal
 4515  closeLegal
 4554  clamp
 4600  curLang
 4607  themeKey
 4608  theme
 4609  photos
 4614  printSrc
 4626  faceSpan
 4629  autoPos
 4634  fit
 4637  L
 4660  cropCost
 4675  slot
 4700  tx
 4707  fit
 4708  orientOf
 4875  MT
 4877  mix
 4888  MONTHS
 4892  svgHeart
 4893  svgHeartLine
 4894  svgCurl
 4895  tape
 4897  polaroid
 4904  barcode
 4913  heartMap
 4925  wordGrid
 4927  rnd
 4953  folio
 4969  col
 4973  seal
 5082  ic
 5147  mark
 5269  fmtCoord
 5273  k3Line
 5280  yearPhotos
 5291  kmBetween
 5296  villesT
 5303  planMagazine
 5385  again
 5386  freshOr
 5387  pick
 5391  mk
 5399  L
 5489  renderPage
 5510  tierOf
 5511  photoPageCount
 5512  minPhotos
 5515  distribute
 5531  pickLayout
 5548  chooseLayout
 5561  mkPage
 5565  plan
 5601  tag
 5604  takePhoto
 5675  pairOf
 5677  relayout
 5683  makeSpread
 5701  unmakeSpread
 5717  syncSpread
 5725  fixSpreads
 5765  loadDetector
 5770  go
 5780  loadImg
 5784  saliency
 5811  subjectFromFaces
 5820  analyze
 5846  analyzeAll
 6018  t
 6039  lang
 6040  nPagesSel
 6041  promo
 6046  loadImage
 6048  toJpeg
 6070  was
 6087  pickerBack
 6103  showPickHelp
 6112  close
 6134  within
 6135  decodeFile
 6165  hdBlob
 6175  importFile
 6196  toast
 6209  geom
 6214  prepThumb
 6220  prepFull
 6226  dropPhoto
 6232  tile
 6241  pump
 6269  pump2
 6289  addPhotos
 6322  renderPhotos
 6341  browserTag
 6342  callAI
 6370  thumb
 6372  coupleInfo
 6386  mqParts
 6391  magAnswers
 6410  fetchCarte
 6420  fetchVilles
 6432  storyPrompt
 6471  magFacts
 6481  magazinePrompt
 6503  cleanMag
 6504  s
 6516  captionPhotos
 6538  defaultStory
 6573  runGeneration
 6637  showIssue
 6650  isWide
 6651  snap
 6653  H
 6654  commit
 6655  restore
 6656  undo
 6657  redo
 6658  updUndo
 6663  visible
 6671  mountPage
 6676  scaleHost
 6685  drawStage
 6699  drawThumb
 6703  drawStrip
 6710  markStrip
 6716  drawThemes
 6721  revealStage
 6727  drawAll
 6728  refreshPage
 6730  afterSlotEdit
 6737  go
 6738  step
 6743  highlightSel
 6753  drawTools
 6803  rewrite
 6820  swapPhoto
 6831  movePage
 6841  bindEditor
 7014  openReader
 7017  draw
 7021  close
 7023  next
 7039  renderBookPreview
 7057  idb
 7058  idbSet
 7059  idbGet
 7060  idbDel
 7061  saveLocal
 7067  offerResume
 7091  fullBlob
 7109  dataUrlToBlob
 7110  uploadPhotos
 7112  todo
 7118  worker
 7143  nstBake
 7200  docHtml
 7208  printHtml
 7209  innerHtml
 7211  spineStyle
 7215  spineText
 7216  defaultSpine
 7217  coverHtml
 7225  generateAlbumPDF
 7231  gen
 7243  doc
 7244  tries
 7277  processPayment
 7317  goTab
 7344  lang
 7354  img
 7379  stop
 7410  upd
 7436  apply
 7455  T
 7456  nm
 7457  renderQuiz
 7463  mark
 7469  save
 7516  mail
 7663  backLbl
 7668  toc
 7675  show
 7682  openLegal
 7690  hideLegal
 7691  closeLegal
 7719  cur
 7728  paint
 7753  lang
 7758  applyUI
 7765  setLang
 7785  syncStory
 7819  ensureStoryFor
 7835  recompose
 7849  addInput
 7868  removePhoto
 7921  saveLink
 7943  openFromLink
 7953  set
 7971  trHide
 7973  trackOverlay
 7981  close
 8018  ouvrir
 8044  ekLabel
 8055  drawEbar
 8080  coach
 8086  done
 8092  goTab
 8101  draw
 8129  payLabel
 8140  highlightPal
 8145  setLang
 8160  lang
 8173  spineColors
 8200  sampleCover
 8219  auto
 8220  build
 8227  name
 8253  build
 8262  nst70
 8282  names
 8283  renderLive
 8296  flowMode
 8305  exifDate
 8315  readAscii
 8316  scan
 8333  addPhotos
 8342  remap
 8343  applyOrder
 8356  movePhoto
 8359  sortByDate
 8368  renderPhotosPlus
 8407  startGenAnim
 8419  tick
 8427  stopGenAnim
 8429  runGeneration
 8432  renderSummary
 8445  syncPrice
 8455  goTab
 8477  setLang
 8494  lang
 8525  applyText
 8534  fromFrance
 8542  fromOSM
 8561  close
 8562  render
 8570  pick
 8578  search
 8614  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
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
- api/create-checkout.js (145 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (85 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (24 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (251 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
