# Carte de public/index.html

Générée automatiquement (8861 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1651 : <style> (137 Ko)
- lignes 1652-1724 : <script type="application/ld+json"> (2 Ko)
- lignes 1725-1828 : <script type="application/ld+json"> (6 Ko)
- lignes 2389-4561 : <script> (189 Ko)
- lignes 4562-5887 : <script> (122 Ko)
- lignes 5888-8829 : <script> (253 Ko)
- lignes 8830-8858 : <script> (2 Ko)

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
 4889  Style Magazine : le livre comme un magazine de couple
 6063  1. Import des photos : une version écran + une version impression
 6353  2. Génération : histoire + légendes à partir des photos
 6665  3. Éditeur
 7073  4. Sauvegarde locale (IndexedDB : photos comprises)
 7108  5. Impression : photos en pleine résolution + PDF hébergé
 7341  6. Paiement
 8360  1. Livre 3D réutilisable
 8481  2. Aperçu en direct pendant la création (ordinateur)
 8515  3. Photos : date de prise de vue, couverture, glisser-déposer
 8617  4. Génération vivante : leurs photos se posent dans un livre
 8643  5. Récapitulatif de commande avec LEUR couverture
 8681  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1857  <header>
 1858  <nav class="ed-nav">
 1880  <main id="main" tabindex="-1">
 1882  <section class="ed-hero">
 1891  <div class="nst-demo" id="nstDemo"
 1897  <section class="nst-how nst-frise" id="how">
 1911  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1934  <section class="ed-price" id="pricing">
 1971  <section class="section app-section" id="app">
 1998  <div class="panel active" id="panel0"
 2083  <div class="panel" id="panel1"
 2128  <div class="panel" id="panel2"
 2154  <div class="panel" id="panel3"
 2155  <div id="nstEd"
 2182  <div class="panel" id="panel4"
 2184  <div id="payForm"
 2262  <section class="ed-faq-section" id="faq">
 2318  <footer>
 2368  <div class="legal-overlay" id="legalOverlay"
 2374  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2394  LANGS.fr
 2482  LANGS.en
 2570  LANGS.de
 2658  LANGS.es
 2746  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2838  toggleLangMenu
 2839  pickLang
 2841  setLang
 2880  highlightPal
 2900  selectPricing
 2915  onSlider
 2928  onInAppSlider
 2951  animNum
 2957  toggleCmp
 2976  saveDraft
 2995  restoreDraft
 3002  set
 3010  clearDraft
 3034  goTab
 3073  edPickPrice
 3079  toggleFaq
 3080  startApp
 3085  addPhotosFromEditor
 3118  ensureConvertible
 3136  detectFocalY
 3156  showUploadLoader
 3168  hideUploadLoader
 3172  addPhotos
 3180  processBatch
 3217  getMinPhotos
 3221  renderPhotos
 3237  removePhoto
 3243  openMsgModal
 3244  closeMsgModal
 3245  saveMsgModal
 3250  selStyle
 3255  log
 3265  setProgress
 3276  api
 3306  runGeneration
 3538  renderBookPreview
 3548  pg
 3555  _take
 3566  pickIdx
 3572  ph
 3573  imgT
 3582  img
 3591  wantTall
 3592  wantSquare
 3593  wantWide
 3998  avRender
 4035  reapplyTexts
 4036  avBuildThumbs
 4049  avNext
 4050  avPrev
 4057  toggleEditor
 4058  edTab
 4059  refreshEditor
 4060  refreshTextFields
 4088  estRows
 4097  liveText
 4110  setActiveSlot
 4111  edSelectPhoto
 4112  updateFilter
 4113  updateCrop
 4114  updateZoom
 4115  toggleBW
 4116  applySlotEditsToDOM
 4120  saveTextStyle
 4121  updateTextStyle
 4122  toggleTextStyle
 4123  setTextSize
 4133  applyTextStylesToDOM
 4134  edSelectLayout
 4135  applyEdit
 4136  applyLayoutOverride
 4137  applyTextLive
 4138  resetEdit
 4142  initCropGestures
 4146  editorOpen
 4147  curSlot
 4155  snapshotPage
 4156  undoEdit
 4158  openFullPreview
 4165  base64ToBlob
 4177  fetchWithTimeout
 4192  processPayment
 4291  generateAlbumPDF
 4298  compressPhotoForPdf
 4362  generateAlbumPDF_UNUSED
 4429  applyPromo
 4450  selectFormat
 4472  updateFormatPrices
 4486  generateFinalPDF
 4503  addPage
 4529  openLegal
 4530  closeLegal
 4572  clamp
 4618  curLang
 4625  themeKey
 4626  theme
 4627  photos
 4632  printSrc
 4644  faceSpan
 4647  autoPos
 4652  fit
 4655  L
 4678  cropCost
 4693  slot
 4718  tx
 4725  fit
 4726  orientOf
 4893  MT
 4895  mix
 4906  MONTHS
 4910  svgHeart
 4911  svgHeartLine
 4912  svgCurl
 4913  tape
 4915  polaroid
 4922  barcode
 4931  heartMap
 4943  wordGrid
 4945  rnd
 4971  folio
 4987  col
 4991  seal
 5100  ic
 5165  mark
 5287  fmtCoord
 5291  k3Line
 5298  yearPhotos
 5309  kmBetween
 5314  villesT
 5321  planMagazine
 5403  again
 5404  freshOr
 5405  pick
 5409  mk
 5417  L
 5507  renderPage
 5528  tierOf
 5529  photoPageCount
 5530  minPhotos
 5533  distribute
 5549  pickLayout
 5566  chooseLayout
 5579  mkPage
 5583  plan
 5619  tag
 5622  takePhoto
 5693  pairOf
 5695  relayout
 5701  makeSpread
 5719  unmakeSpread
 5735  syncSpread
 5743  fixSpreads
 5783  loadDetector
 5788  go
 5798  loadImg
 5802  saliency
 5829  subjectFromFaces
 5838  analyze
 5864  analyzeAll
 6036  t
 6057  lang
 6058  nPagesSel
 6059  promo
 6064  loadImage
 6066  toJpeg
 6088  was
 6105  pickerBack
 6121  showPickHelp
 6130  close
 6152  within
 6153  decodeFile
 6183  hdBlob
 6193  importFile
 6214  toast
 6227  geom
 6232  prepThumb
 6238  prepFull
 6244  dropPhoto
 6250  tile
 6259  pump
 6287  pump2
 6307  addPhotos
 6340  renderPhotos
 6359  browserTag
 6360  callAI
 6388  thumb
 6390  coupleInfo
 6404  mqParts
 6409  magAnswers
 6428  fetchCarte
 6438  fetchVilles
 6450  storyPrompt
 6489  magFacts
 6499  magazinePrompt
 6521  cleanMag
 6522  s
 6534  captionPhotos
 6556  defaultStory
 6591  runGeneration
 6655  showIssue
 6668  isWide
 6669  snap
 6671  H
 6672  commit
 6673  restore
 6674  undo
 6675  redo
 6676  updUndo
 6681  visible
 6689  mountPage
 6694  scaleHost
 6703  drawStage
 6717  drawThumb
 6721  drawStrip
 6728  markStrip
 6734  drawThemes
 6739  revealStage
 6745  drawAll
 6746  refreshPage
 6748  afterSlotEdit
 6755  go
 6756  step
 6761  highlightSel
 6771  drawTools
 6821  rewrite
 6838  swapPhoto
 6849  movePage
 6859  bindEditor
 7032  openReader
 7035  draw
 7039  close
 7041  next
 7057  renderBookPreview
 7075  idb
 7076  idbSet
 7077  idbGet
 7078  idbDel
 7079  saveLocal
 7085  offerResume
 7109  fullBlob
 7127  dataUrlToBlob
 7128  uploadPhotos
 7131  todo
 7137  worker
 7162  nstBake
 7220  docHtml
 7229  printHtml
 7230  innerHtml
 7232  spineStyle
 7236  spineText
 7237  defaultSpine
 7238  coverHtml
 7254  paInnerHtml
 7261  paSheet
 7269  paCoverHtml
 7279  optSlot
 7285  afficheHtml
 7293  cadreHtml
 7297  aimantHtml
 7298  generateAlbumPDF
 7304  gen
 7311  doc
 7312  tries
 7351  processPayment
 7392  goTab
 7419  lang
 7429  img
 7454  stop
 7485  upd
 7511  apply
 7530  T
 7531  nm
 7532  renderQuiz
 7538  mark
 7544  save
 7591  mail
 7746  backLbl
 7751  toc
 7758  show
 7765  openLegal
 7773  hideLegal
 7774  closeLegal
 7802  cur
 7811  paint
 7836  lang
 7841  applyUI
 7848  setLang
 7868  syncStory
 7902  ensureStoryFor
 7918  recompose
 7932  addInput
 7951  removePhoto
 8004  saveLink
 8026  openFromLink
 8036  set
 8054  trHide
 8056  trackOverlay
 8064  close
 8103  ouvrir
 8129  ekLabel
 8140  drawEbar
 8165  coach
 8171  done
 8177  goTab
 8186  draw
 8214  payLabel
 8256  optTotal
 8258  drawOpts
 8283  fillOptImgs
 8296  pickOptPhoto
 8319  selectFormat
 8328  highlightPal
 8333  setLang
 8348  lang
 8361  spineColors
 8388  sampleCover
 8407  auto
 8408  build
 8415  name
 8431  words
 8438  apply
 8465  build
 8474  nst70
 8494  names
 8495  renderLive
 8508  flowMode
 8517  exifDate
 8527  readAscii
 8528  scan
 8545  addPhotos
 8554  remap
 8555  applyOrder
 8568  movePhoto
 8571  sortByDate
 8580  renderPhotosPlus
 8619  startGenAnim
 8631  tick
 8639  stopGenAnim
 8641  runGeneration
 8646  noel
 8650  fill
 8653  renderSummary
 8666  syncPrice
 8677  goTab
 8699  setLang
 8716  lang
 8747  applyText
 8756  fromFrance
 8764  fromOSM
 8783  close
 8784  render
 8792  pick
 8800  search
 8836  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (53 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sante.js (30 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (54 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (173 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (27 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
