# Carte de public/index.html

Générée automatiquement (8945 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1652 : <style> (137 Ko)
- lignes 1653-1726 : <script type="application/ld+json"> (2 Ko)
- lignes 1727-1830 : <script type="application/ld+json"> (6 Ko)
- lignes 2395-4567 : <script> (189 Ko)
- lignes 4568-5893 : <script> (122 Ko)
- lignes 5894-8904 : <script> (260 Ko)
- lignes 8905-8942 : <script> (3 Ko)

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
 4895  Style Magazine : le livre comme un magazine de couple
 6074  1. Import des photos : une version écran + une version impression
 6364  2. Génération : histoire + légendes à partir des photos
 6676  3. Éditeur
 7083  4. Sauvegarde locale (IndexedDB : photos comprises)
 7136  5. Impression : photos en pleine résolution + PDF hébergé
 7376  6. Paiement
 8435  1. Livre 3D réutilisable
 8556  2. Aperçu en direct pendant la création (ordinateur)
 8590  3. Photos : date de prise de vue, couverture, glisser-déposer
 8692  4. Génération vivante : leurs photos se posent dans un livre
 8718  5. Récapitulatif de commande avec LEUR couverture
 8756  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1859  <header>
 1860  <nav class="ed-nav">
 1882  <main id="main" tabindex="-1">
 1884  <section class="ed-hero">
 1893  <div class="nst-demo" id="nstDemo"
 1899  <section class="nst-how nst-frise" id="how">
 1913  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1936  <section class="ed-price" id="pricing">
 1973  <section class="section app-section" id="app">
 2000  <div class="panel active" id="panel0"
 2086  <div class="panel" id="panel1"
 2131  <div class="panel" id="panel2"
 2157  <div class="panel" id="panel3"
 2158  <div id="nstEd"
 2185  <div class="panel" id="panel4"
 2187  <div id="payForm"
 2268  <section class="ed-faq-section" id="faq">
 2324  <footer>
 2374  <div class="legal-overlay" id="legalOverlay"
 2380  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2400  LANGS.fr
 2488  LANGS.en
 2576  LANGS.de
 2664  LANGS.es
 2752  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2844  toggleLangMenu
 2845  pickLang
 2847  setLang
 2886  highlightPal
 2906  selectPricing
 2921  onSlider
 2934  onInAppSlider
 2957  animNum
 2963  toggleCmp
 2982  saveDraft
 3001  restoreDraft
 3008  set
 3016  clearDraft
 3040  goTab
 3079  edPickPrice
 3085  toggleFaq
 3086  startApp
 3091  addPhotosFromEditor
 3124  ensureConvertible
 3142  detectFocalY
 3162  showUploadLoader
 3174  hideUploadLoader
 3178  addPhotos
 3186  processBatch
 3223  getMinPhotos
 3227  renderPhotos
 3243  removePhoto
 3249  openMsgModal
 3250  closeMsgModal
 3251  saveMsgModal
 3256  selStyle
 3261  log
 3271  setProgress
 3282  api
 3312  runGeneration
 3544  renderBookPreview
 3554  pg
 3561  _take
 3572  pickIdx
 3578  ph
 3579  imgT
 3588  img
 3597  wantTall
 3598  wantSquare
 3599  wantWide
 4004  avRender
 4041  reapplyTexts
 4042  avBuildThumbs
 4055  avNext
 4056  avPrev
 4063  toggleEditor
 4064  edTab
 4065  refreshEditor
 4066  refreshTextFields
 4094  estRows
 4103  liveText
 4116  setActiveSlot
 4117  edSelectPhoto
 4118  updateFilter
 4119  updateCrop
 4120  updateZoom
 4121  toggleBW
 4122  applySlotEditsToDOM
 4126  saveTextStyle
 4127  updateTextStyle
 4128  toggleTextStyle
 4129  setTextSize
 4139  applyTextStylesToDOM
 4140  edSelectLayout
 4141  applyEdit
 4142  applyLayoutOverride
 4143  applyTextLive
 4144  resetEdit
 4148  initCropGestures
 4152  editorOpen
 4153  curSlot
 4161  snapshotPage
 4162  undoEdit
 4164  openFullPreview
 4171  base64ToBlob
 4183  fetchWithTimeout
 4198  processPayment
 4297  generateAlbumPDF
 4304  compressPhotoForPdf
 4368  generateAlbumPDF_UNUSED
 4435  applyPromo
 4456  selectFormat
 4478  updateFormatPrices
 4492  generateFinalPDF
 4509  addPage
 4535  openLegal
 4536  closeLegal
 4578  clamp
 4624  curLang
 4631  themeKey
 4632  theme
 4633  photos
 4638  printSrc
 4650  faceSpan
 4653  autoPos
 4658  fit
 4661  L
 4684  cropCost
 4699  slot
 4724  tx
 4731  fit
 4732  orientOf
 4899  MT
 4901  mix
 4912  MONTHS
 4916  svgHeart
 4917  svgHeartLine
 4918  svgCurl
 4919  tape
 4921  polaroid
 4928  barcode
 4937  heartMap
 4949  wordGrid
 4951  rnd
 4977  folio
 4993  col
 4997  seal
 5106  ic
 5171  mark
 5293  fmtCoord
 5297  k3Line
 5304  yearPhotos
 5315  kmBetween
 5320  villesT
 5327  planMagazine
 5409  again
 5410  freshOr
 5411  pick
 5415  mk
 5423  L
 5513  renderPage
 5534  tierOf
 5535  photoPageCount
 5536  minPhotos
 5539  distribute
 5555  pickLayout
 5572  chooseLayout
 5585  mkPage
 5589  plan
 5625  tag
 5628  takePhoto
 5699  pairOf
 5701  relayout
 5707  makeSpread
 5725  unmakeSpread
 5741  syncSpread
 5749  fixSpreads
 5789  loadDetector
 5794  go
 5804  loadImg
 5808  saliency
 5835  subjectFromFaces
 5844  analyze
 5870  analyzeAll
 6047  t
 6068  lang
 6069  nPagesSel
 6070  promo
 6075  loadImage
 6077  toJpeg
 6099  was
 6116  pickerBack
 6132  showPickHelp
 6141  close
 6163  within
 6164  decodeFile
 6194  hdBlob
 6204  importFile
 6225  toast
 6238  geom
 6243  prepThumb
 6249  prepFull
 6255  dropPhoto
 6261  tile
 6270  pump
 6298  pump2
 6318  addPhotos
 6351  renderPhotos
 6370  browserTag
 6371  callAI
 6399  thumb
 6401  coupleInfo
 6415  mqParts
 6420  magAnswers
 6439  fetchCarte
 6449  fetchVilles
 6461  storyPrompt
 6500  magFacts
 6510  magazinePrompt
 6532  cleanMag
 6533  s
 6545  captionPhotos
 6567  defaultStory
 6602  runGeneration
 6666  showIssue
 6679  isWide
 6680  snap
 6682  H
 6683  commit
 6684  restore
 6685  undo
 6686  redo
 6687  updUndo
 6692  visible
 6700  mountPage
 6705  scaleHost
 6714  drawStage
 6728  drawThumb
 6732  drawStrip
 6739  markStrip
 6745  drawThemes
 6750  revealStage
 6756  drawAll
 6757  refreshPage
 6759  afterSlotEdit
 6766  go
 6767  step
 6772  highlightSel
 6782  drawTools
 6833  rewrite
 6850  swapPhoto
 6859  movePage
 6869  bindEditor
 7042  openReader
 7045  draw
 7049  close
 7051  next
 7067  renderBookPreview
 7085  idb
 7086  idbSet
 7087  idbGet
 7088  idbDel
 7089  saveLocal
 7095  offerResume
 7137  fullBlob
 7155  dataUrlToBlob
 7156  uploadPhotos
 7159  todo
 7165  worker
 7191  nstBake
 7249  docHtml
 7258  printHtml
 7259  innerHtml
 7261  spineStyle
 7265  spineText
 7266  defaultSpine
 7267  coverHtml
 7283  paInnerHtml
 7290  paSheet
 7298  paCoverHtml
 7308  optSlot
 7314  afficheHtml
 7322  cadreHtml
 7326  aimantHtml
 7327  generateAlbumPDF
 7337  gen
 7344  doc
 7345  tries
 7388  processPayment
 7446  goTab
 7473  lang
 7483  img
 7508  stop
 7539  upd
 7565  apply
 7584  T
 7585  nm
 7586  renderQuiz
 7592  mark
 7598  save
 7645  mail
 7800  backLbl
 7805  toc
 7812  show
 7819  openLegal
 7827  hideLegal
 7828  closeLegal
 7856  cur
 7865  paint
 7890  lang
 7895  applyUI
 7902  setLang
 7922  syncStory
 7956  ensureStoryFor
 7972  recompose
 7986  addInput
 8015  removePhoto
 8032  selectPricing
 8079  saveLink
 8101  openFromLink
 8111  set
 8129  trHide
 8131  trackOverlay
 8139  close
 8178  ouvrir
 8204  ekLabel
 8215  drawEbar
 8240  coach
 8246  done
 8252  goTab
 8261  draw
 8289  payLabel
 8331  optTotal
 8333  drawOpts
 8358  fillOptImgs
 8371  pickOptPhoto
 8394  selectFormat
 8403  highlightPal
 8408  setLang
 8423  lang
 8436  spineColors
 8463  sampleCover
 8482  auto
 8483  build
 8490  name
 8506  words
 8513  apply
 8540  build
 8549  nst70
 8569  names
 8570  renderLive
 8583  flowMode
 8592  exifDate
 8602  readAscii
 8603  scan
 8620  addPhotos
 8629  remap
 8630  applyOrder
 8643  movePhoto
 8646  sortByDate
 8655  renderPhotosPlus
 8694  startGenAnim
 8706  tick
 8714  stopGenAnim
 8716  runGeneration
 8721  noel
 8725  fill
 8728  renderSummary
 8741  syncPrice
 8752  goTab
 8774  setLang
 8791  lang
 8822  applyText
 8831  fromFrance
 8839  fromOSM
 8858  close
 8859  render
 8867  pick
 8875  search
 8920  etape

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
