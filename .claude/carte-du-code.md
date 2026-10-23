# Carte de public/index.html

Générée automatiquement (8622 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (6 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1613 : <style> (133 Ko)
- lignes 1614-1683 : <script type="application/ld+json"> (2 Ko)
- lignes 1684-1779 : <script type="application/ld+json"> (6 Ko)
- lignes 2326-4495 : <script> (185 Ko)
- lignes 4496-5821 : <script> (122 Ko)
- lignes 5822-8593 : <script> (236 Ko)
- lignes 8594-8619 : <script> (2 Ko)

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
 4823  Style Magazine : le livre comme un magazine de couple
 5997  1. Import des photos : une version écran + une version impression
 6287  2. Génération : histoire + légendes à partir des photos
 6599  3. Éditeur
 7007  4. Sauvegarde locale (IndexedDB : photos comprises)
 7042  5. Impression : photos en pleine résolution + PDF hébergé
 7219  6. Paiement
 8124  1. Livre 3D réutilisable
 8245  2. Aperçu en direct pendant la création (ordinateur)
 8279  3. Photos : date de prise de vue, couverture, glisser-déposer
 8381  4. Génération vivante : leurs photos se posent dans un livre
 8407  5. Récapitulatif de commande avec LEUR couverture
 8445  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1807  <header>
 1808  <nav class="ed-nav">
 1830  <main id="main" tabindex="-1">
 1832  <section class="ed-hero">
 1841  <div class="nst-demo" id="nstDemo"
 1847  <section class="nst-how nst-frise" id="how">
 1861  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1884  <section class="ed-price" id="pricing">
 1917  <section class="section app-section" id="app">
 1944  <div class="panel active" id="panel0"
 2029  <div class="panel" id="panel1"
 2070  <div class="panel" id="panel2"
 2096  <div class="panel" id="panel3"
 2097  <div id="nstEd"
 2124  <div class="panel" id="panel4"
 2126  <div id="payForm"
 2204  <section class="ed-faq-section" id="faq">
 2256  <footer>
 2305  <div class="legal-overlay" id="legalOverlay"
 2311  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2331  LANGS.fr
 2419  LANGS.en
 2507  LANGS.de
 2595  LANGS.es
 2683  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2775  toggleLangMenu
 2776  pickLang
 2778  setLang
 2817  highlightPal
 2837  selectPricing
 2852  onSlider
 2865  onInAppSlider
 2888  animNum
 2894  toggleCmp
 2913  saveDraft
 2932  restoreDraft
 2939  set
 2947  clearDraft
 2971  goTab
 3010  edPickPrice
 3016  toggleFaq
 3017  startApp
 3022  addPhotosFromEditor
 3055  ensureConvertible
 3073  detectFocalY
 3093  showUploadLoader
 3105  hideUploadLoader
 3109  addPhotos
 3117  processBatch
 3154  getMinPhotos
 3158  renderPhotos
 3174  removePhoto
 3180  openMsgModal
 3181  closeMsgModal
 3182  saveMsgModal
 3187  selStyle
 3192  log
 3202  setProgress
 3213  api
 3243  runGeneration
 3475  renderBookPreview
 3485  pg
 3492  _take
 3503  pickIdx
 3509  ph
 3510  imgT
 3519  img
 3528  wantTall
 3529  wantSquare
 3530  wantWide
 3935  avRender
 3972  reapplyTexts
 3973  avBuildThumbs
 3986  avNext
 3987  avPrev
 3994  toggleEditor
 3995  edTab
 3996  refreshEditor
 3997  refreshTextFields
 4025  estRows
 4034  liveText
 4047  setActiveSlot
 4048  edSelectPhoto
 4049  updateFilter
 4050  updateCrop
 4051  updateZoom
 4052  toggleBW
 4053  applySlotEditsToDOM
 4057  saveTextStyle
 4058  updateTextStyle
 4059  toggleTextStyle
 4060  setTextSize
 4070  applyTextStylesToDOM
 4071  edSelectLayout
 4072  applyEdit
 4073  applyLayoutOverride
 4074  applyTextLive
 4075  resetEdit
 4079  initCropGestures
 4083  editorOpen
 4084  curSlot
 4092  snapshotPage
 4093  undoEdit
 4095  openFullPreview
 4102  base64ToBlob
 4114  fetchWithTimeout
 4129  processPayment
 4228  generateAlbumPDF
 4235  compressPhotoForPdf
 4299  generateAlbumPDF_UNUSED
 4366  applyPromo
 4387  selectFormat
 4409  updateFormatPrices
 4423  generateFinalPDF
 4440  addPage
 4466  openLegal
 4467  closeLegal
 4506  clamp
 4552  curLang
 4559  themeKey
 4560  theme
 4561  photos
 4566  printSrc
 4578  faceSpan
 4581  autoPos
 4586  fit
 4589  L
 4612  cropCost
 4627  slot
 4652  tx
 4659  fit
 4660  orientOf
 4827  MT
 4829  mix
 4840  MONTHS
 4844  svgHeart
 4845  svgHeartLine
 4846  svgCurl
 4847  tape
 4849  polaroid
 4856  barcode
 4865  heartMap
 4877  wordGrid
 4879  rnd
 4905  folio
 4921  col
 4925  seal
 5034  ic
 5099  mark
 5221  fmtCoord
 5225  k3Line
 5232  yearPhotos
 5243  kmBetween
 5248  villesT
 5255  planMagazine
 5337  again
 5338  freshOr
 5339  pick
 5343  mk
 5351  L
 5441  renderPage
 5462  tierOf
 5463  photoPageCount
 5464  minPhotos
 5467  distribute
 5483  pickLayout
 5500  chooseLayout
 5513  mkPage
 5517  plan
 5553  tag
 5556  takePhoto
 5627  pairOf
 5629  relayout
 5635  makeSpread
 5653  unmakeSpread
 5669  syncSpread
 5677  fixSpreads
 5717  loadDetector
 5722  go
 5732  loadImg
 5736  saliency
 5763  subjectFromFaces
 5772  analyze
 5798  analyzeAll
 5970  t
 5991  lang
 5992  nPagesSel
 5993  promo
 5998  loadImage
 6000  toJpeg
 6022  was
 6039  pickerBack
 6055  showPickHelp
 6064  close
 6086  within
 6087  decodeFile
 6117  hdBlob
 6127  importFile
 6148  toast
 6161  geom
 6166  prepThumb
 6172  prepFull
 6178  dropPhoto
 6184  tile
 6193  pump
 6221  pump2
 6241  addPhotos
 6274  renderPhotos
 6293  browserTag
 6294  callAI
 6322  thumb
 6324  coupleInfo
 6338  mqParts
 6343  magAnswers
 6362  fetchCarte
 6372  fetchVilles
 6384  storyPrompt
 6423  magFacts
 6433  magazinePrompt
 6455  cleanMag
 6456  s
 6468  captionPhotos
 6490  defaultStory
 6525  runGeneration
 6589  showIssue
 6602  isWide
 6603  snap
 6605  H
 6606  commit
 6607  restore
 6608  undo
 6609  redo
 6610  updUndo
 6615  visible
 6623  mountPage
 6628  scaleHost
 6637  drawStage
 6651  drawThumb
 6655  drawStrip
 6662  markStrip
 6668  drawThemes
 6673  revealStage
 6679  drawAll
 6680  refreshPage
 6682  afterSlotEdit
 6689  go
 6690  step
 6695  highlightSel
 6705  drawTools
 6755  rewrite
 6772  swapPhoto
 6783  movePage
 6793  bindEditor
 6966  openReader
 6969  draw
 6973  close
 6975  next
 6991  renderBookPreview
 7009  idb
 7010  idbSet
 7011  idbGet
 7012  idbDel
 7013  saveLocal
 7019  offerResume
 7043  fullBlob
 7061  dataUrlToBlob
 7062  uploadPhotos
 7064  todo
 7070  worker
 7095  nstBake
 7152  docHtml
 7160  printHtml
 7161  innerHtml
 7163  spineStyle
 7167  spineText
 7168  defaultSpine
 7169  coverHtml
 7177  generateAlbumPDF
 7183  gen
 7195  doc
 7196  tries
 7229  processPayment
 7269  goTab
 7296  lang
 7306  img
 7331  stop
 7362  upd
 7388  apply
 7407  T
 7408  nm
 7409  renderQuiz
 7415  mark
 7421  save
 7468  mail
 7615  backLbl
 7620  toc
 7627  show
 7634  openLegal
 7642  hideLegal
 7643  closeLegal
 7671  cur
 7680  paint
 7705  lang
 7710  applyUI
 7717  setLang
 7737  syncStory
 7771  ensureStoryFor
 7787  recompose
 7801  addInput
 7820  removePhoto
 7873  saveLink
 7895  openFromLink
 7905  set
 7923  trHide
 7925  trackOverlay
 7933  close
 7970  ouvrir
 7996  ekLabel
 8007  drawEbar
 8032  coach
 8038  done
 8044  goTab
 8053  draw
 8081  payLabel
 8092  highlightPal
 8097  setLang
 8112  lang
 8125  spineColors
 8152  sampleCover
 8171  auto
 8172  build
 8179  name
 8195  words
 8202  apply
 8229  build
 8238  nst70
 8258  names
 8259  renderLive
 8272  flowMode
 8281  exifDate
 8291  readAscii
 8292  scan
 8309  addPhotos
 8318  remap
 8319  applyOrder
 8332  movePhoto
 8335  sortByDate
 8344  renderPhotosPlus
 8383  startGenAnim
 8395  tick
 8403  stopGenAnim
 8405  runGeneration
 8410  noel
 8414  fill
 8417  renderSummary
 8430  syncPrice
 8441  goTab
 8463  setLang
 8480  lang
 8511  applyText
 8520  fromFrance
 8528  fromOSM
 8547  close
 8548  render
 8556  pick
 8564  search
 8600  etape

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
