# Carte de public/index.html

Générée automatiquement (8535 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1717 : <style> (129 Ko)
- lignes 1718-1737 : <script type="application/ld+json"> (1 Ko)
- lignes 1738-1825 : <script type="application/ld+json"> (4 Ko)
- lignes 2367-4531 : <script> (182 Ko)
- lignes 4532-5847 : <script> (121 Ko)
- lignes 5848-8509 : <script> (226 Ko)
- lignes 8510-8532 : <script> (1 Ko)

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
 4852  Style Magazine : le livre comme un magazine de couple
 6023  1. Import des photos : une version écran + une version impression
 6313  2. Génération : histoire + légendes à partir des photos
 6625  3. Éditeur
 7033  4. Sauvegarde locale (IndexedDB : photos comprises)
 7068  5. Impression : photos en pleine résolution + PDF hébergé
 7169  6. Paiement
 8074  1. Livre 3D réutilisable
 8171  2. Aperçu en direct pendant la création (ordinateur)
 8205  3. Photos : date de prise de vue, couverture, glisser-déposer
 8307  4. Génération vivante : leurs photos se posent dans un livre
 8333  5. Récapitulatif de commande avec LEUR couverture
 8361  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1853  <header>
 1854  <nav class="ed-nav">
 1876  <main id="main" tabindex="-1">
 1878  <section class="ed-hero">
 1887  <div class="nst-demo" id="nstDemo"
 1893  <section class="nst-how nst-frise" id="how">
 1907  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1929  <section class="ed-price" id="pricing">
 1962  <section class="section app-section" id="app">
 1989  <div class="panel active" id="panel0"
 2074  <div class="panel" id="panel1"
 2115  <div class="panel" id="panel2"
 2141  <div class="panel" id="panel3"
 2142  <div id="nstEd"
 2169  <div class="panel" id="panel4"
 2171  <div id="payForm"
 2249  <section class="ed-faq-section" id="faq">
 2297  <footer>
 2346  <div class="legal-overlay" id="legalOverlay"
 2352  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2372  LANGS.fr
 2459  LANGS.en
 2546  LANGS.de
 2633  LANGS.es
 2720  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2811  toggleLangMenu
 2812  pickLang
 2814  setLang
 2853  highlightPal
 2873  selectPricing
 2888  onSlider
 2901  onInAppSlider
 2924  animNum
 2930  toggleCmp
 2949  saveDraft
 2968  restoreDraft
 2975  set
 2983  clearDraft
 3007  goTab
 3046  edPickPrice
 3052  toggleFaq
 3053  startApp
 3058  addPhotosFromEditor
 3091  ensureConvertible
 3109  detectFocalY
 3129  showUploadLoader
 3141  hideUploadLoader
 3145  addPhotos
 3153  processBatch
 3190  getMinPhotos
 3194  renderPhotos
 3210  removePhoto
 3216  openMsgModal
 3217  closeMsgModal
 3218  saveMsgModal
 3223  selStyle
 3228  log
 3238  setProgress
 3249  api
 3279  runGeneration
 3511  renderBookPreview
 3521  pg
 3528  _take
 3539  pickIdx
 3545  ph
 3546  imgT
 3555  img
 3564  wantTall
 3565  wantSquare
 3566  wantWide
 3971  avRender
 4008  reapplyTexts
 4009  avBuildThumbs
 4022  avNext
 4023  avPrev
 4030  toggleEditor
 4031  edTab
 4032  refreshEditor
 4033  refreshTextFields
 4061  estRows
 4070  liveText
 4083  setActiveSlot
 4084  edSelectPhoto
 4085  updateFilter
 4086  updateCrop
 4087  updateZoom
 4088  toggleBW
 4089  applySlotEditsToDOM
 4093  saveTextStyle
 4094  updateTextStyle
 4095  toggleTextStyle
 4096  setTextSize
 4106  applyTextStylesToDOM
 4107  edSelectLayout
 4108  applyEdit
 4109  applyLayoutOverride
 4110  applyTextLive
 4111  resetEdit
 4115  initCropGestures
 4119  editorOpen
 4120  curSlot
 4128  snapshotPage
 4129  undoEdit
 4131  openFullPreview
 4138  base64ToBlob
 4150  fetchWithTimeout
 4165  processPayment
 4264  generateAlbumPDF
 4271  compressPhotoForPdf
 4335  generateAlbumPDF_UNUSED
 4402  applyPromo
 4423  selectFormat
 4445  updateFormatPrices
 4459  generateFinalPDF
 4476  addPage
 4502  openLegal
 4503  closeLegal
 4542  clamp
 4588  curLang
 4595  themeKey
 4596  theme
 4597  photos
 4599  printSrc
 4611  faceSpan
 4614  autoPos
 4619  fit
 4622  L
 4645  cropCost
 4660  slot
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
 5489  tierOf
 5490  photoPageCount
 5491  minPhotos
 5494  distribute
 5510  pickLayout
 5527  chooseLayout
 5540  mkPage
 5544  plan
 5580  tag
 5583  takePhoto
 5654  pairOf
 5656  relayout
 5662  makeSpread
 5680  unmakeSpread
 5696  syncSpread
 5704  fixSpreads
 5743  loadDetector
 5748  go
 5758  loadImg
 5762  saliency
 5789  subjectFromFaces
 5798  analyze
 5824  analyzeAll
 5996  t
 6017  lang
 6018  nPagesSel
 6019  promo
 6024  loadImage
 6026  toJpeg
 6048  was
 6065  pickerBack
 6081  showPickHelp
 6090  close
 6112  within
 6113  decodeFile
 6143  hdBlob
 6153  importFile
 6174  toast
 6187  geom
 6192  prepThumb
 6198  prepFull
 6204  dropPhoto
 6210  tile
 6219  pump
 6247  pump2
 6267  addPhotos
 6300  renderPhotos
 6319  browserTag
 6320  callAI
 6348  thumb
 6350  coupleInfo
 6364  mqParts
 6369  magAnswers
 6388  fetchCarte
 6398  fetchVilles
 6410  storyPrompt
 6449  magFacts
 6459  magazinePrompt
 6481  cleanMag
 6482  s
 6494  captionPhotos
 6516  defaultStory
 6551  runGeneration
 6615  showIssue
 6628  isWide
 6629  snap
 6631  H
 6632  commit
 6633  restore
 6634  undo
 6635  redo
 6636  updUndo
 6641  visible
 6649  mountPage
 6654  scaleHost
 6663  drawStage
 6677  drawThumb
 6681  drawStrip
 6688  markStrip
 6694  drawThemes
 6699  revealStage
 6705  drawAll
 6706  refreshPage
 6708  afterSlotEdit
 6715  go
 6716  step
 6721  highlightSel
 6731  drawTools
 6781  rewrite
 6798  swapPhoto
 6809  movePage
 6819  bindEditor
 6992  openReader
 6995  draw
 6999  close
 7001  next
 7017  renderBookPreview
 7035  idb
 7036  idbSet
 7037  idbGet
 7038  idbDel
 7039  saveLocal
 7045  offerResume
 7069  fullBlob
 7087  dataUrlToBlob
 7088  uploadPhotos
 7090  todo
 7096  worker
 7119  docHtml
 7125  printHtml
 7126  innerHtml
 7128  spineStyle
 7132  spineText
 7133  defaultSpine
 7134  coverHtml
 7142  generateAlbumPDF
 7148  gen
 7179  processPayment
 7219  goTab
 7246  lang
 7256  img
 7281  stop
 7312  upd
 7338  apply
 7357  T
 7358  nm
 7359  renderQuiz
 7365  mark
 7371  save
 7418  mail
 7565  backLbl
 7570  toc
 7577  show
 7584  openLegal
 7592  hideLegal
 7593  closeLegal
 7621  cur
 7630  paint
 7655  lang
 7660  applyUI
 7667  setLang
 7687  syncStory
 7721  ensureStoryFor
 7737  recompose
 7751  addInput
 7770  removePhoto
 7823  saveLink
 7845  openFromLink
 7855  set
 7873  trHide
 7875  trackOverlay
 7883  close
 7920  ouvrir
 7946  ekLabel
 7957  drawEbar
 7982  coach
 7988  done
 7994  goTab
 8003  draw
 8031  payLabel
 8042  highlightPal
 8047  setLang
 8062  lang
 8075  spineColors
 8102  sampleCover
 8121  auto
 8122  build
 8129  name
 8155  build
 8164  nst70
 8184  names
 8185  renderLive
 8198  flowMode
 8207  exifDate
 8217  readAscii
 8218  scan
 8235  addPhotos
 8244  remap
 8245  applyOrder
 8258  movePhoto
 8261  sortByDate
 8270  renderPhotosPlus
 8309  startGenAnim
 8321  tick
 8329  stopGenAnim
 8331  runGeneration
 8334  renderSummary
 8347  syncPrice
 8357  goTab
 8379  setLang
 8396  lang
 8427  applyText
 8436  fromFrance
 8444  fromOSM
 8463  close
 8464  render
 8472  pick
 8480  search
 8516  etape

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
- api/create-checkout.js (144 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (82 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (24 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (249 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
