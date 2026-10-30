# Carte de public/index.html

Générée automatiquement (8935 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1652 : <style> (137 Ko)
- lignes 1653-1726 : <script type="application/ld+json"> (2 Ko)
- lignes 1727-1830 : <script type="application/ld+json"> (6 Ko)
- lignes 2394-4566 : <script> (189 Ko)
- lignes 4567-5892 : <script> (122 Ko)
- lignes 5893-8903 : <script> (260 Ko)
- lignes 8904-8932 : <script> (2 Ko)

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
 4894  Style Magazine : le livre comme un magazine de couple
 6073  1. Import des photos : une version écran + une version impression
 6363  2. Génération : histoire + légendes à partir des photos
 6675  3. Éditeur
 7082  4. Sauvegarde locale (IndexedDB : photos comprises)
 7135  5. Impression : photos en pleine résolution + PDF hébergé
 7375  6. Paiement
 8434  1. Livre 3D réutilisable
 8555  2. Aperçu en direct pendant la création (ordinateur)
 8589  3. Photos : date de prise de vue, couverture, glisser-déposer
 8691  4. Génération vivante : leurs photos se posent dans un livre
 8717  5. Récapitulatif de commande avec LEUR couverture
 8755  6. Finitions : apparition au défilement, page tournée

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
 2085  <div class="panel" id="panel1"
 2130  <div class="panel" id="panel2"
 2156  <div class="panel" id="panel3"
 2157  <div id="nstEd"
 2184  <div class="panel" id="panel4"
 2186  <div id="payForm"
 2267  <section class="ed-faq-section" id="faq">
 2323  <footer>
 2373  <div class="legal-overlay" id="legalOverlay"
 2379  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2399  LANGS.fr
 2487  LANGS.en
 2575  LANGS.de
 2663  LANGS.es
 2751  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2843  toggleLangMenu
 2844  pickLang
 2846  setLang
 2885  highlightPal
 2905  selectPricing
 2920  onSlider
 2933  onInAppSlider
 2956  animNum
 2962  toggleCmp
 2981  saveDraft
 3000  restoreDraft
 3007  set
 3015  clearDraft
 3039  goTab
 3078  edPickPrice
 3084  toggleFaq
 3085  startApp
 3090  addPhotosFromEditor
 3123  ensureConvertible
 3141  detectFocalY
 3161  showUploadLoader
 3173  hideUploadLoader
 3177  addPhotos
 3185  processBatch
 3222  getMinPhotos
 3226  renderPhotos
 3242  removePhoto
 3248  openMsgModal
 3249  closeMsgModal
 3250  saveMsgModal
 3255  selStyle
 3260  log
 3270  setProgress
 3281  api
 3311  runGeneration
 3543  renderBookPreview
 3553  pg
 3560  _take
 3571  pickIdx
 3577  ph
 3578  imgT
 3587  img
 3596  wantTall
 3597  wantSquare
 3598  wantWide
 4003  avRender
 4040  reapplyTexts
 4041  avBuildThumbs
 4054  avNext
 4055  avPrev
 4062  toggleEditor
 4063  edTab
 4064  refreshEditor
 4065  refreshTextFields
 4093  estRows
 4102  liveText
 4115  setActiveSlot
 4116  edSelectPhoto
 4117  updateFilter
 4118  updateCrop
 4119  updateZoom
 4120  toggleBW
 4121  applySlotEditsToDOM
 4125  saveTextStyle
 4126  updateTextStyle
 4127  toggleTextStyle
 4128  setTextSize
 4138  applyTextStylesToDOM
 4139  edSelectLayout
 4140  applyEdit
 4141  applyLayoutOverride
 4142  applyTextLive
 4143  resetEdit
 4147  initCropGestures
 4151  editorOpen
 4152  curSlot
 4160  snapshotPage
 4161  undoEdit
 4163  openFullPreview
 4170  base64ToBlob
 4182  fetchWithTimeout
 4197  processPayment
 4296  generateAlbumPDF
 4303  compressPhotoForPdf
 4367  generateAlbumPDF_UNUSED
 4434  applyPromo
 4455  selectFormat
 4477  updateFormatPrices
 4491  generateFinalPDF
 4508  addPage
 4534  openLegal
 4535  closeLegal
 4577  clamp
 4623  curLang
 4630  themeKey
 4631  theme
 4632  photos
 4637  printSrc
 4649  faceSpan
 4652  autoPos
 4657  fit
 4660  L
 4683  cropCost
 4698  slot
 4723  tx
 4730  fit
 4731  orientOf
 4898  MT
 4900  mix
 4911  MONTHS
 4915  svgHeart
 4916  svgHeartLine
 4917  svgCurl
 4918  tape
 4920  polaroid
 4927  barcode
 4936  heartMap
 4948  wordGrid
 4950  rnd
 4976  folio
 4992  col
 4996  seal
 5105  ic
 5170  mark
 5292  fmtCoord
 5296  k3Line
 5303  yearPhotos
 5314  kmBetween
 5319  villesT
 5326  planMagazine
 5408  again
 5409  freshOr
 5410  pick
 5414  mk
 5422  L
 5512  renderPage
 5533  tierOf
 5534  photoPageCount
 5535  minPhotos
 5538  distribute
 5554  pickLayout
 5571  chooseLayout
 5584  mkPage
 5588  plan
 5624  tag
 5627  takePhoto
 5698  pairOf
 5700  relayout
 5706  makeSpread
 5724  unmakeSpread
 5740  syncSpread
 5748  fixSpreads
 5788  loadDetector
 5793  go
 5803  loadImg
 5807  saliency
 5834  subjectFromFaces
 5843  analyze
 5869  analyzeAll
 6046  t
 6067  lang
 6068  nPagesSel
 6069  promo
 6074  loadImage
 6076  toJpeg
 6098  was
 6115  pickerBack
 6131  showPickHelp
 6140  close
 6162  within
 6163  decodeFile
 6193  hdBlob
 6203  importFile
 6224  toast
 6237  geom
 6242  prepThumb
 6248  prepFull
 6254  dropPhoto
 6260  tile
 6269  pump
 6297  pump2
 6317  addPhotos
 6350  renderPhotos
 6369  browserTag
 6370  callAI
 6398  thumb
 6400  coupleInfo
 6414  mqParts
 6419  magAnswers
 6438  fetchCarte
 6448  fetchVilles
 6460  storyPrompt
 6499  magFacts
 6509  magazinePrompt
 6531  cleanMag
 6532  s
 6544  captionPhotos
 6566  defaultStory
 6601  runGeneration
 6665  showIssue
 6678  isWide
 6679  snap
 6681  H
 6682  commit
 6683  restore
 6684  undo
 6685  redo
 6686  updUndo
 6691  visible
 6699  mountPage
 6704  scaleHost
 6713  drawStage
 6727  drawThumb
 6731  drawStrip
 6738  markStrip
 6744  drawThemes
 6749  revealStage
 6755  drawAll
 6756  refreshPage
 6758  afterSlotEdit
 6765  go
 6766  step
 6771  highlightSel
 6781  drawTools
 6832  rewrite
 6849  swapPhoto
 6858  movePage
 6868  bindEditor
 7041  openReader
 7044  draw
 7048  close
 7050  next
 7066  renderBookPreview
 7084  idb
 7085  idbSet
 7086  idbGet
 7087  idbDel
 7088  saveLocal
 7094  offerResume
 7136  fullBlob
 7154  dataUrlToBlob
 7155  uploadPhotos
 7158  todo
 7164  worker
 7190  nstBake
 7248  docHtml
 7257  printHtml
 7258  innerHtml
 7260  spineStyle
 7264  spineText
 7265  defaultSpine
 7266  coverHtml
 7282  paInnerHtml
 7289  paSheet
 7297  paCoverHtml
 7307  optSlot
 7313  afficheHtml
 7321  cadreHtml
 7325  aimantHtml
 7326  generateAlbumPDF
 7336  gen
 7343  doc
 7344  tries
 7387  processPayment
 7445  goTab
 7472  lang
 7482  img
 7507  stop
 7538  upd
 7564  apply
 7583  T
 7584  nm
 7585  renderQuiz
 7591  mark
 7597  save
 7644  mail
 7799  backLbl
 7804  toc
 7811  show
 7818  openLegal
 7826  hideLegal
 7827  closeLegal
 7855  cur
 7864  paint
 7889  lang
 7894  applyUI
 7901  setLang
 7921  syncStory
 7955  ensureStoryFor
 7971  recompose
 7985  addInput
 8014  removePhoto
 8031  selectPricing
 8078  saveLink
 8100  openFromLink
 8110  set
 8128  trHide
 8130  trackOverlay
 8138  close
 8177  ouvrir
 8203  ekLabel
 8214  drawEbar
 8239  coach
 8245  done
 8251  goTab
 8260  draw
 8288  payLabel
 8330  optTotal
 8332  drawOpts
 8357  fillOptImgs
 8370  pickOptPhoto
 8393  selectFormat
 8402  highlightPal
 8407  setLang
 8422  lang
 8435  spineColors
 8462  sampleCover
 8481  auto
 8482  build
 8489  name
 8505  words
 8512  apply
 8539  build
 8548  nst70
 8568  names
 8569  renderLive
 8582  flowMode
 8591  exifDate
 8601  readAscii
 8602  scan
 8619  addPhotos
 8628  remap
 8629  applyOrder
 8642  movePhoto
 8645  sortByDate
 8654  renderPhotosPlus
 8693  startGenAnim
 8705  tick
 8713  stopGenAnim
 8715  runGeneration
 8720  noel
 8724  fill
 8727  renderSummary
 8740  syncPrice
 8751  goTab
 8773  setLang
 8790  lang
 8821  applyText
 8830  fromFrance
 8838  fromOSM
 8857  close
 8858  render
 8866  pick
 8874  search
 8910  etape

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
