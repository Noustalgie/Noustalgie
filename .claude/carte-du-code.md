# Carte de public/index.html

Générée automatiquement (9070 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

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
- lignes 5963-9029 : <script> (266 Ko)
- lignes 9030-9067 : <script> (3 Ko)

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
 6153  1. Import des photos : une version écran + une version impression
 6462  2. Génération : histoire + légendes à partir des photos
 6780  3. Éditeur
 7187  4. Sauvegarde locale (IndexedDB : photos comprises)
 7261  5. Impression : photos en pleine résolution + PDF hébergé
 7501  6. Paiement
 8560  1. Livre 3D réutilisable
 8681  2. Aperçu en direct pendant la création (ordinateur)
 8715  3. Photos : date de prise de vue, couverture, glisser-déposer
 8817  4. Génération vivante : leurs photos se posent dans un livre
 8843  5. Récapitulatif de commande avec LEUR couverture
 8881  6. Finitions : apparition au défilement, page tournée

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
 6126  t
 6147  lang
 6148  nPagesSel
 6149  promo
 6154  loadImage
 6156  toJpeg
 6178  was
 6195  pickerBack
 6211  showPickHelp
 6220  close
 6242  within
 6243  decodeFile
 6273  hdBlob
 6283  importFile
 6304  toast
 6317  geom
 6322  prepThumb
 6328  prepFull
 6334  dropPhoto
 6340  tile
 6349  pump
 6377  pump2
 6397  addPhotos
 6430  renderPhotos
 6443  drawUp36
 6468  browserTag
 6469  callAI
 6497  thumb
 6499  coupleInfo
 6515  mqParts
 6520  magAnswers
 6539  fetchCarte
 6549  fetchVilles
 6561  storyPrompt
 6600  magFacts
 6610  magazinePrompt
 6632  cleanMag
 6633  s
 6645  captionPhotos
 6667  defaultStory
 6702  runGeneration
 6770  showIssue
 6783  isWide
 6784  snap
 6786  H
 6787  commit
 6788  restore
 6789  undo
 6790  redo
 6791  updUndo
 6796  visible
 6804  mountPage
 6809  scaleHost
 6818  drawStage
 6832  drawThumb
 6836  drawStrip
 6843  markStrip
 6849  drawThemes
 6854  revealStage
 6860  drawAll
 6861  refreshPage
 6863  afterSlotEdit
 6870  go
 6871  step
 6876  highlightSel
 6886  drawTools
 6937  rewrite
 6954  swapPhoto
 6963  movePage
 6973  bindEditor
 7146  openReader
 7149  draw
 7153  close
 7155  next
 7171  renderBookPreview
 7189  idb
 7190  idbSet
 7191  idbGet
 7192  idbDel
 7193  saveLocal
 7199  offerResume
 7236  proposerMagazine
 7262  fullBlob
 7280  dataUrlToBlob
 7281  uploadPhotos
 7284  todo
 7290  worker
 7316  nstBake
 7374  docHtml
 7383  printHtml
 7384  innerHtml
 7386  spineStyle
 7390  spineText
 7391  defaultSpine
 7392  coverHtml
 7408  paInnerHtml
 7415  paSheet
 7423  paCoverHtml
 7433  optSlot
 7439  afficheHtml
 7447  cadreHtml
 7451  aimantHtml
 7452  generateAlbumPDF
 7462  gen
 7469  doc
 7470  tries
 7513  processPayment
 7571  goTab
 7598  lang
 7608  img
 7633  stop
 7664  upd
 7690  apply
 7709  T
 7710  nm
 7711  renderQuiz
 7717  mark
 7723  save
 7770  mail
 7925  backLbl
 7930  toc
 7937  show
 7944  openLegal
 7952  hideLegal
 7953  closeLegal
 7981  cur
 7990  paint
 8015  lang
 8020  applyUI
 8027  setLang
 8047  syncStory
 8081  ensureStoryFor
 8097  recompose
 8111  addInput
 8140  removePhoto
 8157  selectPricing
 8204  saveLink
 8226  openFromLink
 8236  set
 8254  trHide
 8256  trackOverlay
 8264  close
 8303  ouvrir
 8329  ekLabel
 8340  drawEbar
 8365  coach
 8371  done
 8377  goTab
 8386  draw
 8414  payLabel
 8456  optTotal
 8458  drawOpts
 8483  fillOptImgs
 8496  pickOptPhoto
 8519  selectFormat
 8528  highlightPal
 8533  setLang
 8548  lang
 8561  spineColors
 8588  sampleCover
 8607  auto
 8608  build
 8615  name
 8631  words
 8638  apply
 8665  build
 8674  nst70
 8694  names
 8695  renderLive
 8708  flowMode
 8717  exifDate
 8727  readAscii
 8728  scan
 8745  addPhotos
 8754  remap
 8755  applyOrder
 8768  movePhoto
 8771  sortByDate
 8780  renderPhotosPlus
 8819  startGenAnim
 8831  tick
 8839  stopGenAnim
 8841  runGeneration
 8846  noel
 8850  fill
 8853  renderSummary
 8866  syncPrice
 8877  goTab
 8899  setLang
 8916  lang
 8947  applyText
 8956  fromFrance
 8964  fromOSM
 8983  close
 8984  render
 8992  pick
 9000  search
 9045  etape

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
