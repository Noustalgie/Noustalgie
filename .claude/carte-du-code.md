# Carte de public/index.html

Générée automatiquement (8949 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1652 : <style> (137 Ko)
- lignes 1653-1726 : <script type="application/ld+json"> (2 Ko)
- lignes 1727-1830 : <script type="application/ld+json"> (6 Ko)
- lignes 2399-4571 : <script> (189 Ko)
- lignes 4572-5897 : <script> (122 Ko)
- lignes 5898-8908 : <script> (260 Ko)
- lignes 8909-8946 : <script> (3 Ko)

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
 4899  Style Magazine : le livre comme un magazine de couple
 6078  1. Import des photos : une version écran + une version impression
 6368  2. Génération : histoire + légendes à partir des photos
 6680  3. Éditeur
 7087  4. Sauvegarde locale (IndexedDB : photos comprises)
 7140  5. Impression : photos en pleine résolution + PDF hébergé
 7380  6. Paiement
 8439  1. Livre 3D réutilisable
 8560  2. Aperçu en direct pendant la création (ordinateur)
 8594  3. Photos : date de prise de vue, couverture, glisser-déposer
 8696  4. Génération vivante : leurs photos se posent dans un livre
 8722  5. Récapitulatif de commande avec LEUR couverture
 8760  6. Finitions : apparition au défilement, page tournée

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
 2378  <div class="legal-overlay" id="legalOverlay"
 2384  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2404  LANGS.fr
 2492  LANGS.en
 2580  LANGS.de
 2668  LANGS.es
 2756  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2848  toggleLangMenu
 2849  pickLang
 2851  setLang
 2890  highlightPal
 2910  selectPricing
 2925  onSlider
 2938  onInAppSlider
 2961  animNum
 2967  toggleCmp
 2986  saveDraft
 3005  restoreDraft
 3012  set
 3020  clearDraft
 3044  goTab
 3083  edPickPrice
 3089  toggleFaq
 3090  startApp
 3095  addPhotosFromEditor
 3128  ensureConvertible
 3146  detectFocalY
 3166  showUploadLoader
 3178  hideUploadLoader
 3182  addPhotos
 3190  processBatch
 3227  getMinPhotos
 3231  renderPhotos
 3247  removePhoto
 3253  openMsgModal
 3254  closeMsgModal
 3255  saveMsgModal
 3260  selStyle
 3265  log
 3275  setProgress
 3286  api
 3316  runGeneration
 3548  renderBookPreview
 3558  pg
 3565  _take
 3576  pickIdx
 3582  ph
 3583  imgT
 3592  img
 3601  wantTall
 3602  wantSquare
 3603  wantWide
 4008  avRender
 4045  reapplyTexts
 4046  avBuildThumbs
 4059  avNext
 4060  avPrev
 4067  toggleEditor
 4068  edTab
 4069  refreshEditor
 4070  refreshTextFields
 4098  estRows
 4107  liveText
 4120  setActiveSlot
 4121  edSelectPhoto
 4122  updateFilter
 4123  updateCrop
 4124  updateZoom
 4125  toggleBW
 4126  applySlotEditsToDOM
 4130  saveTextStyle
 4131  updateTextStyle
 4132  toggleTextStyle
 4133  setTextSize
 4143  applyTextStylesToDOM
 4144  edSelectLayout
 4145  applyEdit
 4146  applyLayoutOverride
 4147  applyTextLive
 4148  resetEdit
 4152  initCropGestures
 4156  editorOpen
 4157  curSlot
 4165  snapshotPage
 4166  undoEdit
 4168  openFullPreview
 4175  base64ToBlob
 4187  fetchWithTimeout
 4202  processPayment
 4301  generateAlbumPDF
 4308  compressPhotoForPdf
 4372  generateAlbumPDF_UNUSED
 4439  applyPromo
 4460  selectFormat
 4482  updateFormatPrices
 4496  generateFinalPDF
 4513  addPage
 4539  openLegal
 4540  closeLegal
 4582  clamp
 4628  curLang
 4635  themeKey
 4636  theme
 4637  photos
 4642  printSrc
 4654  faceSpan
 4657  autoPos
 4662  fit
 4665  L
 4688  cropCost
 4703  slot
 4728  tx
 4735  fit
 4736  orientOf
 4903  MT
 4905  mix
 4916  MONTHS
 4920  svgHeart
 4921  svgHeartLine
 4922  svgCurl
 4923  tape
 4925  polaroid
 4932  barcode
 4941  heartMap
 4953  wordGrid
 4955  rnd
 4981  folio
 4997  col
 5001  seal
 5110  ic
 5175  mark
 5297  fmtCoord
 5301  k3Line
 5308  yearPhotos
 5319  kmBetween
 5324  villesT
 5331  planMagazine
 5413  again
 5414  freshOr
 5415  pick
 5419  mk
 5427  L
 5517  renderPage
 5538  tierOf
 5539  photoPageCount
 5540  minPhotos
 5543  distribute
 5559  pickLayout
 5576  chooseLayout
 5589  mkPage
 5593  plan
 5629  tag
 5632  takePhoto
 5703  pairOf
 5705  relayout
 5711  makeSpread
 5729  unmakeSpread
 5745  syncSpread
 5753  fixSpreads
 5793  loadDetector
 5798  go
 5808  loadImg
 5812  saliency
 5839  subjectFromFaces
 5848  analyze
 5874  analyzeAll
 6051  t
 6072  lang
 6073  nPagesSel
 6074  promo
 6079  loadImage
 6081  toJpeg
 6103  was
 6120  pickerBack
 6136  showPickHelp
 6145  close
 6167  within
 6168  decodeFile
 6198  hdBlob
 6208  importFile
 6229  toast
 6242  geom
 6247  prepThumb
 6253  prepFull
 6259  dropPhoto
 6265  tile
 6274  pump
 6302  pump2
 6322  addPhotos
 6355  renderPhotos
 6374  browserTag
 6375  callAI
 6403  thumb
 6405  coupleInfo
 6419  mqParts
 6424  magAnswers
 6443  fetchCarte
 6453  fetchVilles
 6465  storyPrompt
 6504  magFacts
 6514  magazinePrompt
 6536  cleanMag
 6537  s
 6549  captionPhotos
 6571  defaultStory
 6606  runGeneration
 6670  showIssue
 6683  isWide
 6684  snap
 6686  H
 6687  commit
 6688  restore
 6689  undo
 6690  redo
 6691  updUndo
 6696  visible
 6704  mountPage
 6709  scaleHost
 6718  drawStage
 6732  drawThumb
 6736  drawStrip
 6743  markStrip
 6749  drawThemes
 6754  revealStage
 6760  drawAll
 6761  refreshPage
 6763  afterSlotEdit
 6770  go
 6771  step
 6776  highlightSel
 6786  drawTools
 6837  rewrite
 6854  swapPhoto
 6863  movePage
 6873  bindEditor
 7046  openReader
 7049  draw
 7053  close
 7055  next
 7071  renderBookPreview
 7089  idb
 7090  idbSet
 7091  idbGet
 7092  idbDel
 7093  saveLocal
 7099  offerResume
 7141  fullBlob
 7159  dataUrlToBlob
 7160  uploadPhotos
 7163  todo
 7169  worker
 7195  nstBake
 7253  docHtml
 7262  printHtml
 7263  innerHtml
 7265  spineStyle
 7269  spineText
 7270  defaultSpine
 7271  coverHtml
 7287  paInnerHtml
 7294  paSheet
 7302  paCoverHtml
 7312  optSlot
 7318  afficheHtml
 7326  cadreHtml
 7330  aimantHtml
 7331  generateAlbumPDF
 7341  gen
 7348  doc
 7349  tries
 7392  processPayment
 7450  goTab
 7477  lang
 7487  img
 7512  stop
 7543  upd
 7569  apply
 7588  T
 7589  nm
 7590  renderQuiz
 7596  mark
 7602  save
 7649  mail
 7804  backLbl
 7809  toc
 7816  show
 7823  openLegal
 7831  hideLegal
 7832  closeLegal
 7860  cur
 7869  paint
 7894  lang
 7899  applyUI
 7906  setLang
 7926  syncStory
 7960  ensureStoryFor
 7976  recompose
 7990  addInput
 8019  removePhoto
 8036  selectPricing
 8083  saveLink
 8105  openFromLink
 8115  set
 8133  trHide
 8135  trackOverlay
 8143  close
 8182  ouvrir
 8208  ekLabel
 8219  drawEbar
 8244  coach
 8250  done
 8256  goTab
 8265  draw
 8293  payLabel
 8335  optTotal
 8337  drawOpts
 8362  fillOptImgs
 8375  pickOptPhoto
 8398  selectFormat
 8407  highlightPal
 8412  setLang
 8427  lang
 8440  spineColors
 8467  sampleCover
 8486  auto
 8487  build
 8494  name
 8510  words
 8517  apply
 8544  build
 8553  nst70
 8573  names
 8574  renderLive
 8587  flowMode
 8596  exifDate
 8606  readAscii
 8607  scan
 8624  addPhotos
 8633  remap
 8634  applyOrder
 8647  movePhoto
 8650  sortByDate
 8659  renderPhotosPlus
 8698  startGenAnim
 8710  tick
 8718  stopGenAnim
 8720  runGeneration
 8725  noel
 8729  fill
 8732  renderSummary
 8745  syncPrice
 8756  goTab
 8778  setLang
 8795  lang
 8826  applyText
 8835  fromFrance
 8843  fromOSM
 8862  close
 8863  render
 8871  pick
 8879  search
 8924  etape

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
