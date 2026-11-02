# Carte de public/index.html

Générée automatiquement (9016 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1665 : <style> (138 Ko)
- lignes 1666-1739 : <script type="application/ld+json"> (2 Ko)
- lignes 1740-1843 : <script type="application/ld+json"> (6 Ko)
- lignes 2412-4584 : <script> (189 Ko)
- lignes 4585-5910 : <script> (122 Ko)
- lignes 5911-8975 : <script> (266 Ko)
- lignes 8976-9013 : <script> (3 Ko)

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
 4912  Style Magazine : le livre comme un magazine de couple
 6101  1. Import des photos : une version écran + une version impression
 6410  2. Génération : histoire + légendes à partir des photos
 6726  3. Éditeur
 7133  4. Sauvegarde locale (IndexedDB : photos comprises)
 7207  5. Impression : photos en pleine résolution + PDF hébergé
 7447  6. Paiement
 8506  1. Livre 3D réutilisable
 8627  2. Aperçu en direct pendant la création (ordinateur)
 8661  3. Photos : date de prise de vue, couverture, glisser-déposer
 8763  4. Génération vivante : leurs photos se posent dans un livre
 8789  5. Récapitulatif de commande avec LEUR couverture
 8827  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1872  <header>
 1873  <nav class="ed-nav">
 1895  <main id="main" tabindex="-1">
 1897  <section class="ed-hero">
 1906  <div class="nst-demo" id="nstDemo"
 1912  <section class="nst-how nst-frise" id="how">
 1926  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1949  <section class="ed-price" id="pricing">
 1986  <section class="section app-section" id="app">
 2013  <div class="panel active" id="panel0"
 2099  <div class="panel" id="panel1"
 2144  <div class="panel" id="panel2"
 2170  <div class="panel" id="panel3"
 2171  <div id="nstEd"
 2198  <div class="panel" id="panel4"
 2200  <div id="payForm"
 2281  <section class="ed-faq-section" id="faq">
 2337  <footer>
 2391  <div class="legal-overlay" id="legalOverlay"
 2397  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2417  LANGS.fr
 2505  LANGS.en
 2593  LANGS.de
 2681  LANGS.es
 2769  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2861  toggleLangMenu
 2862  pickLang
 2864  setLang
 2903  highlightPal
 2923  selectPricing
 2938  onSlider
 2951  onInAppSlider
 2974  animNum
 2980  toggleCmp
 2999  saveDraft
 3018  restoreDraft
 3025  set
 3033  clearDraft
 3057  goTab
 3096  edPickPrice
 3102  toggleFaq
 3103  startApp
 3108  addPhotosFromEditor
 3141  ensureConvertible
 3159  detectFocalY
 3179  showUploadLoader
 3191  hideUploadLoader
 3195  addPhotos
 3203  processBatch
 3240  getMinPhotos
 3244  renderPhotos
 3260  removePhoto
 3266  openMsgModal
 3267  closeMsgModal
 3268  saveMsgModal
 3273  selStyle
 3278  log
 3288  setProgress
 3299  api
 3329  runGeneration
 3561  renderBookPreview
 3571  pg
 3578  _take
 3589  pickIdx
 3595  ph
 3596  imgT
 3605  img
 3614  wantTall
 3615  wantSquare
 3616  wantWide
 4021  avRender
 4058  reapplyTexts
 4059  avBuildThumbs
 4072  avNext
 4073  avPrev
 4080  toggleEditor
 4081  edTab
 4082  refreshEditor
 4083  refreshTextFields
 4111  estRows
 4120  liveText
 4133  setActiveSlot
 4134  edSelectPhoto
 4135  updateFilter
 4136  updateCrop
 4137  updateZoom
 4138  toggleBW
 4139  applySlotEditsToDOM
 4143  saveTextStyle
 4144  updateTextStyle
 4145  toggleTextStyle
 4146  setTextSize
 4156  applyTextStylesToDOM
 4157  edSelectLayout
 4158  applyEdit
 4159  applyLayoutOverride
 4160  applyTextLive
 4161  resetEdit
 4165  initCropGestures
 4169  editorOpen
 4170  curSlot
 4178  snapshotPage
 4179  undoEdit
 4181  openFullPreview
 4188  base64ToBlob
 4200  fetchWithTimeout
 4215  processPayment
 4314  generateAlbumPDF
 4321  compressPhotoForPdf
 4385  generateAlbumPDF_UNUSED
 4452  applyPromo
 4473  selectFormat
 4495  updateFormatPrices
 4509  generateFinalPDF
 4526  addPage
 4552  openLegal
 4553  closeLegal
 4595  clamp
 4641  curLang
 4648  themeKey
 4649  theme
 4650  photos
 4655  printSrc
 4667  faceSpan
 4670  autoPos
 4675  fit
 4678  L
 4701  cropCost
 4716  slot
 4741  tx
 4748  fit
 4749  orientOf
 4916  MT
 4918  mix
 4929  MONTHS
 4933  svgHeart
 4934  svgHeartLine
 4935  svgCurl
 4936  tape
 4938  polaroid
 4945  barcode
 4954  heartMap
 4966  wordGrid
 4968  rnd
 4994  folio
 5010  col
 5014  seal
 5123  ic
 5188  mark
 5310  fmtCoord
 5314  k3Line
 5321  yearPhotos
 5332  kmBetween
 5337  villesT
 5344  planMagazine
 5426  again
 5427  freshOr
 5428  pick
 5432  mk
 5440  L
 5530  renderPage
 5551  tierOf
 5552  photoPageCount
 5553  minPhotos
 5556  distribute
 5572  pickLayout
 5589  chooseLayout
 5602  mkPage
 5606  plan
 5642  tag
 5645  takePhoto
 5716  pairOf
 5718  relayout
 5724  makeSpread
 5742  unmakeSpread
 5758  syncSpread
 5766  fixSpreads
 5806  loadDetector
 5811  go
 5821  loadImg
 5825  saliency
 5852  subjectFromFaces
 5861  analyze
 5887  analyzeAll
 6074  t
 6095  lang
 6096  nPagesSel
 6097  promo
 6102  loadImage
 6104  toJpeg
 6126  was
 6143  pickerBack
 6159  showPickHelp
 6168  close
 6190  within
 6191  decodeFile
 6221  hdBlob
 6231  importFile
 6252  toast
 6265  geom
 6270  prepThumb
 6276  prepFull
 6282  dropPhoto
 6288  tile
 6297  pump
 6325  pump2
 6345  addPhotos
 6378  renderPhotos
 6391  drawUp36
 6416  browserTag
 6417  callAI
 6445  thumb
 6447  coupleInfo
 6461  mqParts
 6466  magAnswers
 6485  fetchCarte
 6495  fetchVilles
 6507  storyPrompt
 6546  magFacts
 6556  magazinePrompt
 6578  cleanMag
 6579  s
 6591  captionPhotos
 6613  defaultStory
 6648  runGeneration
 6716  showIssue
 6729  isWide
 6730  snap
 6732  H
 6733  commit
 6734  restore
 6735  undo
 6736  redo
 6737  updUndo
 6742  visible
 6750  mountPage
 6755  scaleHost
 6764  drawStage
 6778  drawThumb
 6782  drawStrip
 6789  markStrip
 6795  drawThemes
 6800  revealStage
 6806  drawAll
 6807  refreshPage
 6809  afterSlotEdit
 6816  go
 6817  step
 6822  highlightSel
 6832  drawTools
 6883  rewrite
 6900  swapPhoto
 6909  movePage
 6919  bindEditor
 7092  openReader
 7095  draw
 7099  close
 7101  next
 7117  renderBookPreview
 7135  idb
 7136  idbSet
 7137  idbGet
 7138  idbDel
 7139  saveLocal
 7145  offerResume
 7182  proposerMagazine
 7208  fullBlob
 7226  dataUrlToBlob
 7227  uploadPhotos
 7230  todo
 7236  worker
 7262  nstBake
 7320  docHtml
 7329  printHtml
 7330  innerHtml
 7332  spineStyle
 7336  spineText
 7337  defaultSpine
 7338  coverHtml
 7354  paInnerHtml
 7361  paSheet
 7369  paCoverHtml
 7379  optSlot
 7385  afficheHtml
 7393  cadreHtml
 7397  aimantHtml
 7398  generateAlbumPDF
 7408  gen
 7415  doc
 7416  tries
 7459  processPayment
 7517  goTab
 7544  lang
 7554  img
 7579  stop
 7610  upd
 7636  apply
 7655  T
 7656  nm
 7657  renderQuiz
 7663  mark
 7669  save
 7716  mail
 7871  backLbl
 7876  toc
 7883  show
 7890  openLegal
 7898  hideLegal
 7899  closeLegal
 7927  cur
 7936  paint
 7961  lang
 7966  applyUI
 7973  setLang
 7993  syncStory
 8027  ensureStoryFor
 8043  recompose
 8057  addInput
 8086  removePhoto
 8103  selectPricing
 8150  saveLink
 8172  openFromLink
 8182  set
 8200  trHide
 8202  trackOverlay
 8210  close
 8249  ouvrir
 8275  ekLabel
 8286  drawEbar
 8311  coach
 8317  done
 8323  goTab
 8332  draw
 8360  payLabel
 8402  optTotal
 8404  drawOpts
 8429  fillOptImgs
 8442  pickOptPhoto
 8465  selectFormat
 8474  highlightPal
 8479  setLang
 8494  lang
 8507  spineColors
 8534  sampleCover
 8553  auto
 8554  build
 8561  name
 8577  words
 8584  apply
 8611  build
 8620  nst70
 8640  names
 8641  renderLive
 8654  flowMode
 8663  exifDate
 8673  readAscii
 8674  scan
 8691  addPhotos
 8700  remap
 8701  applyOrder
 8714  movePhoto
 8717  sortByDate
 8726  renderPhotosPlus
 8765  startGenAnim
 8777  tick
 8785  stopGenAnim
 8787  runGeneration
 8792  noel
 8796  fill
 8799  renderSummary
 8812  syncPrice
 8823  goTab
 8845  setLang
 8862  lang
 8893  applyText
 8902  fromFrance
 8910  fromOSM
 8929  close
 8930  render
 8938  pick
 8946  search
 8991  etape

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
