# Carte de public/index.html

Générée automatiquement (9114 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2419-4591 : <script> (189 Ko)
- lignes 4592-5962 : <script> (127 Ko)
- lignes 5963-9073 : <script> (271 Ko)
- lignes 9074-9111 : <script> (3 Ko)

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
 4963  Style Magazine : le livre comme un magazine de couple
 6158  1. Import des photos : une version écran + une version impression
 6467  2. Génération : histoire + légendes à partir des photos
 6785  3. Éditeur
 7192  4. Sauvegarde locale (IndexedDB : photos comprises)
 7266  5. Impression : photos en pleine résolution + PDF hébergé
 7506  6. Paiement
 8604  1. Livre 3D réutilisable
 8725  2. Aperçu en direct pendant la création (ordinateur)
 8759  3. Photos : date de prise de vue, couverture, glisser-déposer
 8861  4. Génération vivante : leurs photos se posent dans un livre
 8887  5. Récapitulatif de commande avec LEUR couverture
 8925  6. Finitions : apparition au défilement, page tournée

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
 2398  <div class="legal-overlay" id="legalOverlay"
 2404  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2424  LANGS.fr
 2512  LANGS.en
 2600  LANGS.de
 2688  LANGS.es
 2776  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2868  toggleLangMenu
 2869  pickLang
 2871  setLang
 2910  highlightPal
 2930  selectPricing
 2945  onSlider
 2958  onInAppSlider
 2981  animNum
 2987  toggleCmp
 3006  saveDraft
 3025  restoreDraft
 3032  set
 3040  clearDraft
 3064  goTab
 3103  edPickPrice
 3109  toggleFaq
 3110  startApp
 3115  addPhotosFromEditor
 3148  ensureConvertible
 3166  detectFocalY
 3186  showUploadLoader
 3198  hideUploadLoader
 3202  addPhotos
 3210  processBatch
 3247  getMinPhotos
 3251  renderPhotos
 3267  removePhoto
 3273  openMsgModal
 3274  closeMsgModal
 3275  saveMsgModal
 3280  selStyle
 3285  log
 3295  setProgress
 3306  api
 3336  runGeneration
 3568  renderBookPreview
 3578  pg
 3585  _take
 3596  pickIdx
 3602  ph
 3603  imgT
 3612  img
 3621  wantTall
 3622  wantSquare
 3623  wantWide
 4028  avRender
 4065  reapplyTexts
 4066  avBuildThumbs
 4079  avNext
 4080  avPrev
 4087  toggleEditor
 4088  edTab
 4089  refreshEditor
 4090  refreshTextFields
 4118  estRows
 4127  liveText
 4140  setActiveSlot
 4141  edSelectPhoto
 4142  updateFilter
 4143  updateCrop
 4144  updateZoom
 4145  toggleBW
 4146  applySlotEditsToDOM
 4150  saveTextStyle
 4151  updateTextStyle
 4152  toggleTextStyle
 4153  setTextSize
 4163  applyTextStylesToDOM
 4164  edSelectLayout
 4165  applyEdit
 4166  applyLayoutOverride
 4167  applyTextLive
 4168  resetEdit
 4172  initCropGestures
 4176  editorOpen
 4177  curSlot
 4185  snapshotPage
 4186  undoEdit
 4188  openFullPreview
 4195  base64ToBlob
 4207  fetchWithTimeout
 4222  processPayment
 4321  generateAlbumPDF
 4328  compressPhotoForPdf
 4392  generateAlbumPDF_UNUSED
 4459  applyPromo
 4480  selectFormat
 4502  updateFormatPrices
 4516  generateFinalPDF
 4533  addPage
 4559  openLegal
 4560  closeLegal
 4602  clamp
 4648  curLang
 4655  themeKey
 4656  theme
 4657  photos
 4662  printSrc
 4674  faceSpan
 4677  autoPos
 4682  fit
 4685  L
 4708  cropCost
 4723  slot
 4756  joli
 4777  coeur
 4780  tx
 4787  fit
 4794  haut
 4800  orientOf
 4967  MT
 4969  mix
 4980  MONTHS
 4984  svgHeart
 4985  svgHeartLine
 4986  svgCurl
 4987  tape
 4989  polaroid
 4996  barcode
 5005  heartMap
 5017  wordGrid
 5019  rnd
 5045  folio
 5061  col
 5065  seal
 5174  ic
 5239  mark
 5362  fmtCoord
 5366  k3Line
 5373  yearPhotos
 5384  kmBetween
 5389  villesT
 5396  planMagazine
 5478  again
 5479  freshOr
 5480  pick
 5484  mk
 5492  L
 5582  renderPage
 5603  tierOf
 5604  photoPageCount
 5605  minPhotos
 5608  distribute
 5624  pickLayout
 5641  chooseLayout
 5654  mkPage
 5658  plan
 5694  tag
 5697  takePhoto
 5768  pairOf
 5770  relayout
 5776  makeSpread
 5794  unmakeSpread
 5810  syncSpread
 5818  fixSpreads
 5858  loadDetector
 5863  go
 5873  loadImg
 5877  saliency
 5904  subjectFromFaces
 5913  analyze
 5939  analyzeAll
 6131  t
 6152  lang
 6153  nPagesSel
 6154  promo
 6159  loadImage
 6161  toJpeg
 6183  was
 6200  pickerBack
 6216  showPickHelp
 6225  close
 6247  within
 6248  decodeFile
 6278  hdBlob
 6288  importFile
 6309  toast
 6322  geom
 6327  prepThumb
 6333  prepFull
 6339  dropPhoto
 6345  tile
 6354  pump
 6382  pump2
 6402  addPhotos
 6435  renderPhotos
 6448  drawUp36
 6473  browserTag
 6474  callAI
 6502  thumb
 6504  coupleInfo
 6520  mqParts
 6525  magAnswers
 6544  fetchCarte
 6554  fetchVilles
 6566  storyPrompt
 6605  magFacts
 6615  magazinePrompt
 6637  cleanMag
 6638  s
 6650  captionPhotos
 6672  defaultStory
 6707  runGeneration
 6775  showIssue
 6788  isWide
 6789  snap
 6791  H
 6792  commit
 6793  restore
 6794  undo
 6795  redo
 6796  updUndo
 6801  visible
 6809  mountPage
 6814  scaleHost
 6823  drawStage
 6837  drawThumb
 6841  drawStrip
 6848  markStrip
 6854  drawThemes
 6859  revealStage
 6865  drawAll
 6866  refreshPage
 6868  afterSlotEdit
 6875  go
 6876  step
 6881  highlightSel
 6891  drawTools
 6942  rewrite
 6959  swapPhoto
 6968  movePage
 6978  bindEditor
 7151  openReader
 7154  draw
 7158  close
 7160  next
 7176  renderBookPreview
 7194  idb
 7195  idbSet
 7196  idbGet
 7197  idbDel
 7198  saveLocal
 7204  offerResume
 7241  proposerMagazine
 7267  fullBlob
 7285  dataUrlToBlob
 7286  uploadPhotos
 7289  todo
 7295  worker
 7321  nstBake
 7379  docHtml
 7388  printHtml
 7389  innerHtml
 7391  spineStyle
 7395  spineText
 7396  defaultSpine
 7397  coverHtml
 7413  paInnerHtml
 7420  paSheet
 7428  paCoverHtml
 7438  optSlot
 7444  afficheHtml
 7452  cadreHtml
 7456  aimantHtml
 7457  generateAlbumPDF
 7467  gen
 7474  doc
 7475  tries
 7518  processPayment
 7576  goTab
 7603  lang
 7613  img
 7638  stop
 7669  upd
 7695  apply
 7714  T
 7715  nm
 7716  renderQuiz
 7722  mark
 7728  save
 7775  mail
 7930  backLbl
 7935  toc
 7942  show
 7949  openLegal
 7957  hideLegal
 7958  closeLegal
 7986  cur
 7995  paint
 8020  lang
 8025  applyUI
 8032  setLang
 8054  syncStory
 8088  ensureStoryFor
 8104  recompose
 8118  addInput
 8147  removePhoto
 8164  selectPricing
 8215  fixTexts
 8248  saveLink
 8270  openFromLink
 8280  set
 8298  trHide
 8300  trackOverlay
 8308  close
 8347  ouvrir
 8373  ekLabel
 8384  drawEbar
 8409  coach
 8415  done
 8421  goTab
 8430  draw
 8458  payLabel
 8500  optTotal
 8502  drawOpts
 8527  fillOptImgs
 8540  pickOptPhoto
 8563  selectFormat
 8572  highlightPal
 8577  setLang
 8592  lang
 8605  spineColors
 8632  sampleCover
 8651  auto
 8652  build
 8659  name
 8675  words
 8682  apply
 8709  build
 8718  nst70
 8738  names
 8739  renderLive
 8752  flowMode
 8761  exifDate
 8771  readAscii
 8772  scan
 8789  addPhotos
 8798  remap
 8799  applyOrder
 8812  movePhoto
 8815  sortByDate
 8824  renderPhotosPlus
 8863  startGenAnim
 8875  tick
 8883  stopGenAnim
 8885  runGeneration
 8890  noel
 8894  fill
 8897  renderSummary
 8910  syncPrice
 8921  goTab
 8943  setLang
 8960  lang
 8991  applyText
 9000  fromFrance
 9008  fromOSM
 9027  close
 9028  render
 9036  pick
 9044  search
 9089  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (58 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (50 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (28 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
