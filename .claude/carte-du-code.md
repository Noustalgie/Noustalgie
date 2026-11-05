# Carte de public/index.html

Générée automatiquement (9023 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2419-4591 : <script> (189 Ko)
- lignes 4592-5917 : <script> (122 Ko)
- lignes 5918-8982 : <script> (266 Ko)
- lignes 8983-9020 : <script> (3 Ko)

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
 4919  Style Magazine : le livre comme un magazine de couple
 6108  1. Import des photos : une version écran + une version impression
 6417  2. Génération : histoire + légendes à partir des photos
 6733  3. Éditeur
 7140  4. Sauvegarde locale (IndexedDB : photos comprises)
 7214  5. Impression : photos en pleine résolution + PDF hébergé
 7454  6. Paiement
 8513  1. Livre 3D réutilisable
 8634  2. Aperçu en direct pendant la création (ordinateur)
 8668  3. Photos : date de prise de vue, couverture, glisser-déposer
 8770  4. Génération vivante : leurs photos se posent dans un livre
 8796  5. Récapitulatif de commande avec LEUR couverture
 8834  6. Finitions : apparition au défilement, page tournée

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
 4748  tx
 4755  fit
 4756  orientOf
 4923  MT
 4925  mix
 4936  MONTHS
 4940  svgHeart
 4941  svgHeartLine
 4942  svgCurl
 4943  tape
 4945  polaroid
 4952  barcode
 4961  heartMap
 4973  wordGrid
 4975  rnd
 5001  folio
 5017  col
 5021  seal
 5130  ic
 5195  mark
 5317  fmtCoord
 5321  k3Line
 5328  yearPhotos
 5339  kmBetween
 5344  villesT
 5351  planMagazine
 5433  again
 5434  freshOr
 5435  pick
 5439  mk
 5447  L
 5537  renderPage
 5558  tierOf
 5559  photoPageCount
 5560  minPhotos
 5563  distribute
 5579  pickLayout
 5596  chooseLayout
 5609  mkPage
 5613  plan
 5649  tag
 5652  takePhoto
 5723  pairOf
 5725  relayout
 5731  makeSpread
 5749  unmakeSpread
 5765  syncSpread
 5773  fixSpreads
 5813  loadDetector
 5818  go
 5828  loadImg
 5832  saliency
 5859  subjectFromFaces
 5868  analyze
 5894  analyzeAll
 6081  t
 6102  lang
 6103  nPagesSel
 6104  promo
 6109  loadImage
 6111  toJpeg
 6133  was
 6150  pickerBack
 6166  showPickHelp
 6175  close
 6197  within
 6198  decodeFile
 6228  hdBlob
 6238  importFile
 6259  toast
 6272  geom
 6277  prepThumb
 6283  prepFull
 6289  dropPhoto
 6295  tile
 6304  pump
 6332  pump2
 6352  addPhotos
 6385  renderPhotos
 6398  drawUp36
 6423  browserTag
 6424  callAI
 6452  thumb
 6454  coupleInfo
 6468  mqParts
 6473  magAnswers
 6492  fetchCarte
 6502  fetchVilles
 6514  storyPrompt
 6553  magFacts
 6563  magazinePrompt
 6585  cleanMag
 6586  s
 6598  captionPhotos
 6620  defaultStory
 6655  runGeneration
 6723  showIssue
 6736  isWide
 6737  snap
 6739  H
 6740  commit
 6741  restore
 6742  undo
 6743  redo
 6744  updUndo
 6749  visible
 6757  mountPage
 6762  scaleHost
 6771  drawStage
 6785  drawThumb
 6789  drawStrip
 6796  markStrip
 6802  drawThemes
 6807  revealStage
 6813  drawAll
 6814  refreshPage
 6816  afterSlotEdit
 6823  go
 6824  step
 6829  highlightSel
 6839  drawTools
 6890  rewrite
 6907  swapPhoto
 6916  movePage
 6926  bindEditor
 7099  openReader
 7102  draw
 7106  close
 7108  next
 7124  renderBookPreview
 7142  idb
 7143  idbSet
 7144  idbGet
 7145  idbDel
 7146  saveLocal
 7152  offerResume
 7189  proposerMagazine
 7215  fullBlob
 7233  dataUrlToBlob
 7234  uploadPhotos
 7237  todo
 7243  worker
 7269  nstBake
 7327  docHtml
 7336  printHtml
 7337  innerHtml
 7339  spineStyle
 7343  spineText
 7344  defaultSpine
 7345  coverHtml
 7361  paInnerHtml
 7368  paSheet
 7376  paCoverHtml
 7386  optSlot
 7392  afficheHtml
 7400  cadreHtml
 7404  aimantHtml
 7405  generateAlbumPDF
 7415  gen
 7422  doc
 7423  tries
 7466  processPayment
 7524  goTab
 7551  lang
 7561  img
 7586  stop
 7617  upd
 7643  apply
 7662  T
 7663  nm
 7664  renderQuiz
 7670  mark
 7676  save
 7723  mail
 7878  backLbl
 7883  toc
 7890  show
 7897  openLegal
 7905  hideLegal
 7906  closeLegal
 7934  cur
 7943  paint
 7968  lang
 7973  applyUI
 7980  setLang
 8000  syncStory
 8034  ensureStoryFor
 8050  recompose
 8064  addInput
 8093  removePhoto
 8110  selectPricing
 8157  saveLink
 8179  openFromLink
 8189  set
 8207  trHide
 8209  trackOverlay
 8217  close
 8256  ouvrir
 8282  ekLabel
 8293  drawEbar
 8318  coach
 8324  done
 8330  goTab
 8339  draw
 8367  payLabel
 8409  optTotal
 8411  drawOpts
 8436  fillOptImgs
 8449  pickOptPhoto
 8472  selectFormat
 8481  highlightPal
 8486  setLang
 8501  lang
 8514  spineColors
 8541  sampleCover
 8560  auto
 8561  build
 8568  name
 8584  words
 8591  apply
 8618  build
 8627  nst70
 8647  names
 8648  renderLive
 8661  flowMode
 8670  exifDate
 8680  readAscii
 8681  scan
 8698  addPhotos
 8707  remap
 8708  applyOrder
 8721  movePhoto
 8724  sortByDate
 8733  renderPhotosPlus
 8772  startGenAnim
 8784  tick
 8792  stopGenAnim
 8794  runGeneration
 8799  noel
 8803  fill
 8806  renderSummary
 8819  syncPrice
 8830  goTab
 8852  setLang
 8869  lang
 8900  applyText
 8909  fromFrance
 8917  fromOSM
 8936  close
 8937  render
 8945  pick
 8953  search
 8998  etape

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
