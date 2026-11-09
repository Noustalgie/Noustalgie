# Carte de public/index.html

Générée automatiquement (9036 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2419-4591 : <script> (189 Ko)
- lignes 4592-5930 : <script> (124 Ko)
- lignes 5931-8995 : <script> (266 Ko)
- lignes 8996-9033 : <script> (3 Ko)

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
 4931  Style Magazine : le livre comme un magazine de couple
 6121  1. Import des photos : une version écran + une version impression
 6430  2. Génération : histoire + légendes à partir des photos
 6746  3. Éditeur
 7153  4. Sauvegarde locale (IndexedDB : photos comprises)
 7227  5. Impression : photos en pleine résolution + PDF hébergé
 7467  6. Paiement
 8526  1. Livre 3D réutilisable
 8647  2. Aperçu en direct pendant la création (ordinateur)
 8681  3. Photos : date de prise de vue, couverture, glisser-déposer
 8783  4. Génération vivante : leurs photos se posent dans un livre
 8809  5. Récapitulatif de commande avec LEUR couverture
 8847  6. Finitions : apparition au défilement, page tournée

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
 4762  haut
 4768  orientOf
 4935  MT
 4937  mix
 4948  MONTHS
 4952  svgHeart
 4953  svgHeartLine
 4954  svgCurl
 4955  tape
 4957  polaroid
 4964  barcode
 4973  heartMap
 4985  wordGrid
 4987  rnd
 5013  folio
 5029  col
 5033  seal
 5142  ic
 5207  mark
 5330  fmtCoord
 5334  k3Line
 5341  yearPhotos
 5352  kmBetween
 5357  villesT
 5364  planMagazine
 5446  again
 5447  freshOr
 5448  pick
 5452  mk
 5460  L
 5550  renderPage
 5571  tierOf
 5572  photoPageCount
 5573  minPhotos
 5576  distribute
 5592  pickLayout
 5609  chooseLayout
 5622  mkPage
 5626  plan
 5662  tag
 5665  takePhoto
 5736  pairOf
 5738  relayout
 5744  makeSpread
 5762  unmakeSpread
 5778  syncSpread
 5786  fixSpreads
 5826  loadDetector
 5831  go
 5841  loadImg
 5845  saliency
 5872  subjectFromFaces
 5881  analyze
 5907  analyzeAll
 6094  t
 6115  lang
 6116  nPagesSel
 6117  promo
 6122  loadImage
 6124  toJpeg
 6146  was
 6163  pickerBack
 6179  showPickHelp
 6188  close
 6210  within
 6211  decodeFile
 6241  hdBlob
 6251  importFile
 6272  toast
 6285  geom
 6290  prepThumb
 6296  prepFull
 6302  dropPhoto
 6308  tile
 6317  pump
 6345  pump2
 6365  addPhotos
 6398  renderPhotos
 6411  drawUp36
 6436  browserTag
 6437  callAI
 6465  thumb
 6467  coupleInfo
 6481  mqParts
 6486  magAnswers
 6505  fetchCarte
 6515  fetchVilles
 6527  storyPrompt
 6566  magFacts
 6576  magazinePrompt
 6598  cleanMag
 6599  s
 6611  captionPhotos
 6633  defaultStory
 6668  runGeneration
 6736  showIssue
 6749  isWide
 6750  snap
 6752  H
 6753  commit
 6754  restore
 6755  undo
 6756  redo
 6757  updUndo
 6762  visible
 6770  mountPage
 6775  scaleHost
 6784  drawStage
 6798  drawThumb
 6802  drawStrip
 6809  markStrip
 6815  drawThemes
 6820  revealStage
 6826  drawAll
 6827  refreshPage
 6829  afterSlotEdit
 6836  go
 6837  step
 6842  highlightSel
 6852  drawTools
 6903  rewrite
 6920  swapPhoto
 6929  movePage
 6939  bindEditor
 7112  openReader
 7115  draw
 7119  close
 7121  next
 7137  renderBookPreview
 7155  idb
 7156  idbSet
 7157  idbGet
 7158  idbDel
 7159  saveLocal
 7165  offerResume
 7202  proposerMagazine
 7228  fullBlob
 7246  dataUrlToBlob
 7247  uploadPhotos
 7250  todo
 7256  worker
 7282  nstBake
 7340  docHtml
 7349  printHtml
 7350  innerHtml
 7352  spineStyle
 7356  spineText
 7357  defaultSpine
 7358  coverHtml
 7374  paInnerHtml
 7381  paSheet
 7389  paCoverHtml
 7399  optSlot
 7405  afficheHtml
 7413  cadreHtml
 7417  aimantHtml
 7418  generateAlbumPDF
 7428  gen
 7435  doc
 7436  tries
 7479  processPayment
 7537  goTab
 7564  lang
 7574  img
 7599  stop
 7630  upd
 7656  apply
 7675  T
 7676  nm
 7677  renderQuiz
 7683  mark
 7689  save
 7736  mail
 7891  backLbl
 7896  toc
 7903  show
 7910  openLegal
 7918  hideLegal
 7919  closeLegal
 7947  cur
 7956  paint
 7981  lang
 7986  applyUI
 7993  setLang
 8013  syncStory
 8047  ensureStoryFor
 8063  recompose
 8077  addInput
 8106  removePhoto
 8123  selectPricing
 8170  saveLink
 8192  openFromLink
 8202  set
 8220  trHide
 8222  trackOverlay
 8230  close
 8269  ouvrir
 8295  ekLabel
 8306  drawEbar
 8331  coach
 8337  done
 8343  goTab
 8352  draw
 8380  payLabel
 8422  optTotal
 8424  drawOpts
 8449  fillOptImgs
 8462  pickOptPhoto
 8485  selectFormat
 8494  highlightPal
 8499  setLang
 8514  lang
 8527  spineColors
 8554  sampleCover
 8573  auto
 8574  build
 8581  name
 8597  words
 8604  apply
 8631  build
 8640  nst70
 8660  names
 8661  renderLive
 8674  flowMode
 8683  exifDate
 8693  readAscii
 8694  scan
 8711  addPhotos
 8720  remap
 8721  applyOrder
 8734  movePhoto
 8737  sortByDate
 8746  renderPhotosPlus
 8785  startGenAnim
 8797  tick
 8805  stopGenAnim
 8807  runGeneration
 8812  noel
 8816  fill
 8819  renderSummary
 8832  syncPrice
 8843  goTab
 8865  setLang
 8882  lang
 8913  applyText
 8922  fromFrance
 8930  fromOSM
 8949  close
 8950  render
 8958  pick
 8966  search
 9011  etape

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
