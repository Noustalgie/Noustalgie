# Carte de public/index.html

Générée automatiquement (8532 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1714 : <style> (129 Ko)
- lignes 1715-1734 : <script type="application/ld+json"> (1 Ko)
- lignes 1735-1822 : <script type="application/ld+json"> (4 Ko)
- lignes 2364-4528 : <script> (182 Ko)
- lignes 4529-5844 : <script> (121 Ko)
- lignes 5845-8506 : <script> (226 Ko)
- lignes 8507-8529 : <script> (1 Ko)

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
 4849  Style Magazine : le livre comme un magazine de couple
 6020  1. Import des photos : une version écran + une version impression
 6310  2. Génération : histoire + légendes à partir des photos
 6622  3. Éditeur
 7030  4. Sauvegarde locale (IndexedDB : photos comprises)
 7065  5. Impression : photos en pleine résolution + PDF hébergé
 7166  6. Paiement
 8071  1. Livre 3D réutilisable
 8168  2. Aperçu en direct pendant la création (ordinateur)
 8202  3. Photos : date de prise de vue, couverture, glisser-déposer
 8304  4. Génération vivante : leurs photos se posent dans un livre
 8330  5. Récapitulatif de commande avec LEUR couverture
 8358  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1850  <header>
 1851  <nav class="ed-nav">
 1873  <main id="main" tabindex="-1">
 1875  <section class="ed-hero">
 1884  <div class="nst-demo" id="nstDemo"
 1890  <section class="nst-how nst-frise" id="how">
 1904  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1926  <section class="ed-price" id="pricing">
 1959  <section class="section app-section" id="app">
 1986  <div class="panel active" id="panel0"
 2071  <div class="panel" id="panel1"
 2112  <div class="panel" id="panel2"
 2138  <div class="panel" id="panel3"
 2139  <div id="nstEd"
 2166  <div class="panel" id="panel4"
 2168  <div id="payForm"
 2246  <section class="ed-faq-section" id="faq">
 2294  <footer>
 2343  <div class="legal-overlay" id="legalOverlay"
 2349  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2369  LANGS.fr
 2456  LANGS.en
 2543  LANGS.de
 2630  LANGS.es
 2717  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2808  toggleLangMenu
 2809  pickLang
 2811  setLang
 2850  highlightPal
 2870  selectPricing
 2885  onSlider
 2898  onInAppSlider
 2921  animNum
 2927  toggleCmp
 2946  saveDraft
 2965  restoreDraft
 2972  set
 2980  clearDraft
 3004  goTab
 3043  edPickPrice
 3049  toggleFaq
 3050  startApp
 3055  addPhotosFromEditor
 3088  ensureConvertible
 3106  detectFocalY
 3126  showUploadLoader
 3138  hideUploadLoader
 3142  addPhotos
 3150  processBatch
 3187  getMinPhotos
 3191  renderPhotos
 3207  removePhoto
 3213  openMsgModal
 3214  closeMsgModal
 3215  saveMsgModal
 3220  selStyle
 3225  log
 3235  setProgress
 3246  api
 3276  runGeneration
 3508  renderBookPreview
 3518  pg
 3525  _take
 3536  pickIdx
 3542  ph
 3543  imgT
 3552  img
 3561  wantTall
 3562  wantSquare
 3563  wantWide
 3968  avRender
 4005  reapplyTexts
 4006  avBuildThumbs
 4019  avNext
 4020  avPrev
 4027  toggleEditor
 4028  edTab
 4029  refreshEditor
 4030  refreshTextFields
 4058  estRows
 4067  liveText
 4080  setActiveSlot
 4081  edSelectPhoto
 4082  updateFilter
 4083  updateCrop
 4084  updateZoom
 4085  toggleBW
 4086  applySlotEditsToDOM
 4090  saveTextStyle
 4091  updateTextStyle
 4092  toggleTextStyle
 4093  setTextSize
 4103  applyTextStylesToDOM
 4104  edSelectLayout
 4105  applyEdit
 4106  applyLayoutOverride
 4107  applyTextLive
 4108  resetEdit
 4112  initCropGestures
 4116  editorOpen
 4117  curSlot
 4125  snapshotPage
 4126  undoEdit
 4128  openFullPreview
 4135  base64ToBlob
 4147  fetchWithTimeout
 4162  processPayment
 4261  generateAlbumPDF
 4268  compressPhotoForPdf
 4332  generateAlbumPDF_UNUSED
 4399  applyPromo
 4420  selectFormat
 4442  updateFormatPrices
 4456  generateFinalPDF
 4473  addPage
 4499  openLegal
 4500  closeLegal
 4539  clamp
 4585  curLang
 4592  themeKey
 4593  theme
 4594  photos
 4596  printSrc
 4608  faceSpan
 4611  autoPos
 4616  fit
 4619  L
 4642  cropCost
 4657  slot
 4678  tx
 4685  fit
 4686  orientOf
 4853  MT
 4855  mix
 4866  MONTHS
 4870  svgHeart
 4871  svgHeartLine
 4872  svgCurl
 4873  tape
 4875  polaroid
 4882  barcode
 4891  heartMap
 4903  wordGrid
 4905  rnd
 4931  folio
 4947  col
 4951  seal
 5060  ic
 5125  mark
 5247  fmtCoord
 5251  k3Line
 5258  yearPhotos
 5269  kmBetween
 5274  villesT
 5281  planMagazine
 5363  again
 5364  freshOr
 5365  pick
 5369  mk
 5377  L
 5467  renderPage
 5486  tierOf
 5487  photoPageCount
 5488  minPhotos
 5491  distribute
 5507  pickLayout
 5524  chooseLayout
 5537  mkPage
 5541  plan
 5577  tag
 5580  takePhoto
 5651  pairOf
 5653  relayout
 5659  makeSpread
 5677  unmakeSpread
 5693  syncSpread
 5701  fixSpreads
 5740  loadDetector
 5745  go
 5755  loadImg
 5759  saliency
 5786  subjectFromFaces
 5795  analyze
 5821  analyzeAll
 5993  t
 6014  lang
 6015  nPagesSel
 6016  promo
 6021  loadImage
 6023  toJpeg
 6045  was
 6062  pickerBack
 6078  showPickHelp
 6087  close
 6109  within
 6110  decodeFile
 6140  hdBlob
 6150  importFile
 6171  toast
 6184  geom
 6189  prepThumb
 6195  prepFull
 6201  dropPhoto
 6207  tile
 6216  pump
 6244  pump2
 6264  addPhotos
 6297  renderPhotos
 6316  browserTag
 6317  callAI
 6345  thumb
 6347  coupleInfo
 6361  mqParts
 6366  magAnswers
 6385  fetchCarte
 6395  fetchVilles
 6407  storyPrompt
 6446  magFacts
 6456  magazinePrompt
 6478  cleanMag
 6479  s
 6491  captionPhotos
 6513  defaultStory
 6548  runGeneration
 6612  showIssue
 6625  isWide
 6626  snap
 6628  H
 6629  commit
 6630  restore
 6631  undo
 6632  redo
 6633  updUndo
 6638  visible
 6646  mountPage
 6651  scaleHost
 6660  drawStage
 6674  drawThumb
 6678  drawStrip
 6685  markStrip
 6691  drawThemes
 6696  revealStage
 6702  drawAll
 6703  refreshPage
 6705  afterSlotEdit
 6712  go
 6713  step
 6718  highlightSel
 6728  drawTools
 6778  rewrite
 6795  swapPhoto
 6806  movePage
 6816  bindEditor
 6989  openReader
 6992  draw
 6996  close
 6998  next
 7014  renderBookPreview
 7032  idb
 7033  idbSet
 7034  idbGet
 7035  idbDel
 7036  saveLocal
 7042  offerResume
 7066  fullBlob
 7084  dataUrlToBlob
 7085  uploadPhotos
 7087  todo
 7093  worker
 7116  docHtml
 7122  printHtml
 7123  innerHtml
 7125  spineStyle
 7129  spineText
 7130  defaultSpine
 7131  coverHtml
 7139  generateAlbumPDF
 7145  gen
 7176  processPayment
 7216  goTab
 7243  lang
 7253  img
 7278  stop
 7309  upd
 7335  apply
 7354  T
 7355  nm
 7356  renderQuiz
 7362  mark
 7368  save
 7415  mail
 7562  backLbl
 7567  toc
 7574  show
 7581  openLegal
 7589  hideLegal
 7590  closeLegal
 7618  cur
 7627  paint
 7652  lang
 7657  applyUI
 7664  setLang
 7684  syncStory
 7718  ensureStoryFor
 7734  recompose
 7748  addInput
 7767  removePhoto
 7820  saveLink
 7842  openFromLink
 7852  set
 7870  trHide
 7872  trackOverlay
 7880  close
 7917  ouvrir
 7943  ekLabel
 7954  drawEbar
 7979  coach
 7985  done
 7991  goTab
 8000  draw
 8028  payLabel
 8039  highlightPal
 8044  setLang
 8059  lang
 8072  spineColors
 8099  sampleCover
 8118  auto
 8119  build
 8126  name
 8152  build
 8161  nst70
 8181  names
 8182  renderLive
 8195  flowMode
 8204  exifDate
 8214  readAscii
 8215  scan
 8232  addPhotos
 8241  remap
 8242  applyOrder
 8255  movePhoto
 8258  sortByDate
 8267  renderPhotosPlus
 8306  startGenAnim
 8318  tick
 8326  stopGenAnim
 8328  runGeneration
 8331  renderSummary
 8344  syncPrice
 8354  goTab
 8376  setLang
 8393  lang
 8424  applyText
 8433  fromFrance
 8441  fromOSM
 8460  close
 8461  render
 8469  pick
 8477  search
 8513  etape

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
