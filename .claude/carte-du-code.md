# Carte de public/index.html

Générée automatiquement (8986 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1661 : <style> (138 Ko)
- lignes 1662-1735 : <script type="application/ld+json"> (2 Ko)
- lignes 1736-1839 : <script type="application/ld+json"> (6 Ko)
- lignes 2408-4580 : <script> (189 Ko)
- lignes 4581-5906 : <script> (122 Ko)
- lignes 5907-8945 : <script> (263 Ko)
- lignes 8946-8983 : <script> (3 Ko)

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
 4908  Style Magazine : le livre comme un magazine de couple
 6092  1. Import des photos : une version écran + une version impression
 6401  2. Génération : histoire + légendes à partir des photos
 6717  3. Éditeur
 7124  4. Sauvegarde locale (IndexedDB : photos comprises)
 7177  5. Impression : photos en pleine résolution + PDF hébergé
 7417  6. Paiement
 8476  1. Livre 3D réutilisable
 8597  2. Aperçu en direct pendant la création (ordinateur)
 8631  3. Photos : date de prise de vue, couverture, glisser-déposer
 8733  4. Génération vivante : leurs photos se posent dans un livre
 8759  5. Récapitulatif de commande avec LEUR couverture
 8797  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1868  <header>
 1869  <nav class="ed-nav">
 1891  <main id="main" tabindex="-1">
 1893  <section class="ed-hero">
 1902  <div class="nst-demo" id="nstDemo"
 1908  <section class="nst-how nst-frise" id="how">
 1922  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1945  <section class="ed-price" id="pricing">
 1982  <section class="section app-section" id="app">
 2009  <div class="panel active" id="panel0"
 2095  <div class="panel" id="panel1"
 2140  <div class="panel" id="panel2"
 2166  <div class="panel" id="panel3"
 2167  <div id="nstEd"
 2194  <div class="panel" id="panel4"
 2196  <div id="payForm"
 2277  <section class="ed-faq-section" id="faq">
 2333  <footer>
 2387  <div class="legal-overlay" id="legalOverlay"
 2393  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2413  LANGS.fr
 2501  LANGS.en
 2589  LANGS.de
 2677  LANGS.es
 2765  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2857  toggleLangMenu
 2858  pickLang
 2860  setLang
 2899  highlightPal
 2919  selectPricing
 2934  onSlider
 2947  onInAppSlider
 2970  animNum
 2976  toggleCmp
 2995  saveDraft
 3014  restoreDraft
 3021  set
 3029  clearDraft
 3053  goTab
 3092  edPickPrice
 3098  toggleFaq
 3099  startApp
 3104  addPhotosFromEditor
 3137  ensureConvertible
 3155  detectFocalY
 3175  showUploadLoader
 3187  hideUploadLoader
 3191  addPhotos
 3199  processBatch
 3236  getMinPhotos
 3240  renderPhotos
 3256  removePhoto
 3262  openMsgModal
 3263  closeMsgModal
 3264  saveMsgModal
 3269  selStyle
 3274  log
 3284  setProgress
 3295  api
 3325  runGeneration
 3557  renderBookPreview
 3567  pg
 3574  _take
 3585  pickIdx
 3591  ph
 3592  imgT
 3601  img
 3610  wantTall
 3611  wantSquare
 3612  wantWide
 4017  avRender
 4054  reapplyTexts
 4055  avBuildThumbs
 4068  avNext
 4069  avPrev
 4076  toggleEditor
 4077  edTab
 4078  refreshEditor
 4079  refreshTextFields
 4107  estRows
 4116  liveText
 4129  setActiveSlot
 4130  edSelectPhoto
 4131  updateFilter
 4132  updateCrop
 4133  updateZoom
 4134  toggleBW
 4135  applySlotEditsToDOM
 4139  saveTextStyle
 4140  updateTextStyle
 4141  toggleTextStyle
 4142  setTextSize
 4152  applyTextStylesToDOM
 4153  edSelectLayout
 4154  applyEdit
 4155  applyLayoutOverride
 4156  applyTextLive
 4157  resetEdit
 4161  initCropGestures
 4165  editorOpen
 4166  curSlot
 4174  snapshotPage
 4175  undoEdit
 4177  openFullPreview
 4184  base64ToBlob
 4196  fetchWithTimeout
 4211  processPayment
 4310  generateAlbumPDF
 4317  compressPhotoForPdf
 4381  generateAlbumPDF_UNUSED
 4448  applyPromo
 4469  selectFormat
 4491  updateFormatPrices
 4505  generateFinalPDF
 4522  addPage
 4548  openLegal
 4549  closeLegal
 4591  clamp
 4637  curLang
 4644  themeKey
 4645  theme
 4646  photos
 4651  printSrc
 4663  faceSpan
 4666  autoPos
 4671  fit
 4674  L
 4697  cropCost
 4712  slot
 4737  tx
 4744  fit
 4745  orientOf
 4912  MT
 4914  mix
 4925  MONTHS
 4929  svgHeart
 4930  svgHeartLine
 4931  svgCurl
 4932  tape
 4934  polaroid
 4941  barcode
 4950  heartMap
 4962  wordGrid
 4964  rnd
 4990  folio
 5006  col
 5010  seal
 5119  ic
 5184  mark
 5306  fmtCoord
 5310  k3Line
 5317  yearPhotos
 5328  kmBetween
 5333  villesT
 5340  planMagazine
 5422  again
 5423  freshOr
 5424  pick
 5428  mk
 5436  L
 5526  renderPage
 5547  tierOf
 5548  photoPageCount
 5549  minPhotos
 5552  distribute
 5568  pickLayout
 5585  chooseLayout
 5598  mkPage
 5602  plan
 5638  tag
 5641  takePhoto
 5712  pairOf
 5714  relayout
 5720  makeSpread
 5738  unmakeSpread
 5754  syncSpread
 5762  fixSpreads
 5802  loadDetector
 5807  go
 5817  loadImg
 5821  saliency
 5848  subjectFromFaces
 5857  analyze
 5883  analyzeAll
 6065  t
 6086  lang
 6087  nPagesSel
 6088  promo
 6093  loadImage
 6095  toJpeg
 6117  was
 6134  pickerBack
 6150  showPickHelp
 6159  close
 6181  within
 6182  decodeFile
 6212  hdBlob
 6222  importFile
 6243  toast
 6256  geom
 6261  prepThumb
 6267  prepFull
 6273  dropPhoto
 6279  tile
 6288  pump
 6316  pump2
 6336  addPhotos
 6369  renderPhotos
 6382  drawUp36
 6407  browserTag
 6408  callAI
 6436  thumb
 6438  coupleInfo
 6452  mqParts
 6457  magAnswers
 6476  fetchCarte
 6486  fetchVilles
 6498  storyPrompt
 6537  magFacts
 6547  magazinePrompt
 6569  cleanMag
 6570  s
 6582  captionPhotos
 6604  defaultStory
 6639  runGeneration
 6707  showIssue
 6720  isWide
 6721  snap
 6723  H
 6724  commit
 6725  restore
 6726  undo
 6727  redo
 6728  updUndo
 6733  visible
 6741  mountPage
 6746  scaleHost
 6755  drawStage
 6769  drawThumb
 6773  drawStrip
 6780  markStrip
 6786  drawThemes
 6791  revealStage
 6797  drawAll
 6798  refreshPage
 6800  afterSlotEdit
 6807  go
 6808  step
 6813  highlightSel
 6823  drawTools
 6874  rewrite
 6891  swapPhoto
 6900  movePage
 6910  bindEditor
 7083  openReader
 7086  draw
 7090  close
 7092  next
 7108  renderBookPreview
 7126  idb
 7127  idbSet
 7128  idbGet
 7129  idbDel
 7130  saveLocal
 7136  offerResume
 7178  fullBlob
 7196  dataUrlToBlob
 7197  uploadPhotos
 7200  todo
 7206  worker
 7232  nstBake
 7290  docHtml
 7299  printHtml
 7300  innerHtml
 7302  spineStyle
 7306  spineText
 7307  defaultSpine
 7308  coverHtml
 7324  paInnerHtml
 7331  paSheet
 7339  paCoverHtml
 7349  optSlot
 7355  afficheHtml
 7363  cadreHtml
 7367  aimantHtml
 7368  generateAlbumPDF
 7378  gen
 7385  doc
 7386  tries
 7429  processPayment
 7487  goTab
 7514  lang
 7524  img
 7549  stop
 7580  upd
 7606  apply
 7625  T
 7626  nm
 7627  renderQuiz
 7633  mark
 7639  save
 7686  mail
 7841  backLbl
 7846  toc
 7853  show
 7860  openLegal
 7868  hideLegal
 7869  closeLegal
 7897  cur
 7906  paint
 7931  lang
 7936  applyUI
 7943  setLang
 7963  syncStory
 7997  ensureStoryFor
 8013  recompose
 8027  addInput
 8056  removePhoto
 8073  selectPricing
 8120  saveLink
 8142  openFromLink
 8152  set
 8170  trHide
 8172  trackOverlay
 8180  close
 8219  ouvrir
 8245  ekLabel
 8256  drawEbar
 8281  coach
 8287  done
 8293  goTab
 8302  draw
 8330  payLabel
 8372  optTotal
 8374  drawOpts
 8399  fillOptImgs
 8412  pickOptPhoto
 8435  selectFormat
 8444  highlightPal
 8449  setLang
 8464  lang
 8477  spineColors
 8504  sampleCover
 8523  auto
 8524  build
 8531  name
 8547  words
 8554  apply
 8581  build
 8590  nst70
 8610  names
 8611  renderLive
 8624  flowMode
 8633  exifDate
 8643  readAscii
 8644  scan
 8661  addPhotos
 8670  remap
 8671  applyOrder
 8684  movePhoto
 8687  sortByDate
 8696  renderPhotosPlus
 8735  startGenAnim
 8747  tick
 8755  stopGenAnim
 8757  runGeneration
 8762  noel
 8766  fill
 8769  renderSummary
 8782  syncPrice
 8793  goTab
 8815  setLang
 8832  lang
 8863  applyText
 8872  fromFrance
 8880  fromOSM
 8899  close
 8900  render
 8908  pick
 8916  search
 8961  etape

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
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (28 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
