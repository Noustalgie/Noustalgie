# Carte de public/index.html

Générée automatiquement (9129 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2427-4599 : <script> (189 Ko)
- lignes 4600-5970 : <script> (127 Ko)
- lignes 5971-9088 : <script> (272 Ko)
- lignes 9089-9126 : <script> (3 Ko)

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
 4971  Style Magazine : le livre comme un magazine de couple
 6166  1. Import des photos : une version écran + une version impression
 6475  2. Génération : histoire + légendes à partir des photos
 6793  3. Éditeur
 7200  4. Sauvegarde locale (IndexedDB : photos comprises)
 7274  5. Impression : photos en pleine résolution + PDF hébergé
 7514  6. Paiement
 8619  1. Livre 3D réutilisable
 8740  2. Aperçu en direct pendant la création (ordinateur)
 8774  3. Photos : date de prise de vue, couverture, glisser-déposer
 8876  4. Génération vivante : leurs photos se posent dans un livre
 8902  5. Récapitulatif de commande avec LEUR couverture
 8940  6. Finitions : apparition au défilement, page tournée

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
 2406  <div class="legal-overlay" id="legalOverlay"
 2412  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2432  LANGS.fr
 2520  LANGS.en
 2608  LANGS.de
 2696  LANGS.es
 2784  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2876  toggleLangMenu
 2877  pickLang
 2879  setLang
 2918  highlightPal
 2938  selectPricing
 2953  onSlider
 2966  onInAppSlider
 2989  animNum
 2995  toggleCmp
 3014  saveDraft
 3033  restoreDraft
 3040  set
 3048  clearDraft
 3072  goTab
 3111  edPickPrice
 3117  toggleFaq
 3118  startApp
 3123  addPhotosFromEditor
 3156  ensureConvertible
 3174  detectFocalY
 3194  showUploadLoader
 3206  hideUploadLoader
 3210  addPhotos
 3218  processBatch
 3255  getMinPhotos
 3259  renderPhotos
 3275  removePhoto
 3281  openMsgModal
 3282  closeMsgModal
 3283  saveMsgModal
 3288  selStyle
 3293  log
 3303  setProgress
 3314  api
 3344  runGeneration
 3576  renderBookPreview
 3586  pg
 3593  _take
 3604  pickIdx
 3610  ph
 3611  imgT
 3620  img
 3629  wantTall
 3630  wantSquare
 3631  wantWide
 4036  avRender
 4073  reapplyTexts
 4074  avBuildThumbs
 4087  avNext
 4088  avPrev
 4095  toggleEditor
 4096  edTab
 4097  refreshEditor
 4098  refreshTextFields
 4126  estRows
 4135  liveText
 4148  setActiveSlot
 4149  edSelectPhoto
 4150  updateFilter
 4151  updateCrop
 4152  updateZoom
 4153  toggleBW
 4154  applySlotEditsToDOM
 4158  saveTextStyle
 4159  updateTextStyle
 4160  toggleTextStyle
 4161  setTextSize
 4171  applyTextStylesToDOM
 4172  edSelectLayout
 4173  applyEdit
 4174  applyLayoutOverride
 4175  applyTextLive
 4176  resetEdit
 4180  initCropGestures
 4184  editorOpen
 4185  curSlot
 4193  snapshotPage
 4194  undoEdit
 4196  openFullPreview
 4203  base64ToBlob
 4215  fetchWithTimeout
 4230  processPayment
 4329  generateAlbumPDF
 4336  compressPhotoForPdf
 4400  generateAlbumPDF_UNUSED
 4467  applyPromo
 4488  selectFormat
 4510  updateFormatPrices
 4524  generateFinalPDF
 4541  addPage
 4567  openLegal
 4568  closeLegal
 4610  clamp
 4656  curLang
 4663  themeKey
 4664  theme
 4665  photos
 4670  printSrc
 4682  faceSpan
 4685  autoPos
 4690  fit
 4693  L
 4716  cropCost
 4731  slot
 4764  joli
 4785  coeur
 4788  tx
 4795  fit
 4802  haut
 4808  orientOf
 4975  MT
 4977  mix
 4988  MONTHS
 4992  svgHeart
 4993  svgHeartLine
 4994  svgCurl
 4995  tape
 4997  polaroid
 5004  barcode
 5013  heartMap
 5025  wordGrid
 5027  rnd
 5053  folio
 5069  col
 5073  seal
 5182  ic
 5247  mark
 5370  fmtCoord
 5374  k3Line
 5381  yearPhotos
 5392  kmBetween
 5397  villesT
 5404  planMagazine
 5486  again
 5487  freshOr
 5488  pick
 5492  mk
 5500  L
 5590  renderPage
 5611  tierOf
 5612  photoPageCount
 5613  minPhotos
 5616  distribute
 5632  pickLayout
 5649  chooseLayout
 5662  mkPage
 5666  plan
 5702  tag
 5705  takePhoto
 5776  pairOf
 5778  relayout
 5784  makeSpread
 5802  unmakeSpread
 5818  syncSpread
 5826  fixSpreads
 5866  loadDetector
 5871  go
 5881  loadImg
 5885  saliency
 5912  subjectFromFaces
 5921  analyze
 5947  analyzeAll
 6139  t
 6160  lang
 6161  nPagesSel
 6162  promo
 6167  loadImage
 6169  toJpeg
 6191  was
 6208  pickerBack
 6224  showPickHelp
 6233  close
 6255  within
 6256  decodeFile
 6286  hdBlob
 6296  importFile
 6317  toast
 6330  geom
 6335  prepThumb
 6341  prepFull
 6347  dropPhoto
 6353  tile
 6362  pump
 6390  pump2
 6410  addPhotos
 6443  renderPhotos
 6456  drawUp36
 6481  browserTag
 6482  callAI
 6510  thumb
 6512  coupleInfo
 6528  mqParts
 6533  magAnswers
 6552  fetchCarte
 6562  fetchVilles
 6574  storyPrompt
 6613  magFacts
 6623  magazinePrompt
 6645  cleanMag
 6646  s
 6658  captionPhotos
 6680  defaultStory
 6715  runGeneration
 6783  showIssue
 6796  isWide
 6797  snap
 6799  H
 6800  commit
 6801  restore
 6802  undo
 6803  redo
 6804  updUndo
 6809  visible
 6817  mountPage
 6822  scaleHost
 6831  drawStage
 6845  drawThumb
 6849  drawStrip
 6856  markStrip
 6862  drawThemes
 6867  revealStage
 6873  drawAll
 6874  refreshPage
 6876  afterSlotEdit
 6883  go
 6884  step
 6889  highlightSel
 6899  drawTools
 6950  rewrite
 6967  swapPhoto
 6976  movePage
 6986  bindEditor
 7159  openReader
 7162  draw
 7166  close
 7168  next
 7184  renderBookPreview
 7202  idb
 7203  idbSet
 7204  idbGet
 7205  idbDel
 7206  saveLocal
 7212  offerResume
 7249  proposerMagazine
 7275  fullBlob
 7293  dataUrlToBlob
 7294  uploadPhotos
 7297  todo
 7303  worker
 7329  nstBake
 7387  docHtml
 7396  printHtml
 7397  innerHtml
 7399  spineStyle
 7403  spineText
 7404  defaultSpine
 7405  coverHtml
 7421  paInnerHtml
 7428  paSheet
 7436  paCoverHtml
 7446  optSlot
 7452  afficheHtml
 7460  cadreHtml
 7464  aimantHtml
 7465  generateAlbumPDF
 7475  gen
 7482  doc
 7483  tries
 7526  processPayment
 7584  goTab
 7611  lang
 7621  img
 7646  stop
 7677  upd
 7703  apply
 7722  T
 7723  nm
 7724  renderQuiz
 7730  mark
 7736  save
 7783  mail
 7945  backLbl
 7950  toc
 7957  show
 7964  openLegal
 7972  hideLegal
 7973  closeLegal
 8001  cur
 8010  paint
 8035  lang
 8040  applyUI
 8047  setLang
 8069  syncStory
 8103  ensureStoryFor
 8119  recompose
 8133  addInput
 8162  removePhoto
 8179  selectPricing
 8230  fixTexts
 8263  saveLink
 8285  openFromLink
 8295  set
 8313  trHide
 8315  trackOverlay
 8323  close
 8362  ouvrir
 8388  ekLabel
 8399  drawEbar
 8424  coach
 8430  done
 8436  goTab
 8445  draw
 8473  payLabel
 8515  optTotal
 8517  drawOpts
 8542  fillOptImgs
 8555  pickOptPhoto
 8578  selectFormat
 8587  highlightPal
 8592  setLang
 8607  lang
 8620  spineColors
 8647  sampleCover
 8666  auto
 8667  build
 8674  name
 8690  words
 8697  apply
 8724  build
 8733  nst70
 8753  names
 8754  renderLive
 8767  flowMode
 8776  exifDate
 8786  readAscii
 8787  scan
 8804  addPhotos
 8813  remap
 8814  applyOrder
 8827  movePhoto
 8830  sortByDate
 8839  renderPhotosPlus
 8878  startGenAnim
 8890  tick
 8898  stopGenAnim
 8900  runGeneration
 8905  noel
 8909  fill
 8912  renderSummary
 8925  syncPrice
 8936  goTab
 8958  setLang
 8975  lang
 9006  applyText
 9015  fromFrance
 9023  fromOSM
 9042  close
 9043  render
 9051  pick
 9059  search
 9104  etape

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
