# Carte de public/index.html

Générée automatiquement (9132 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1672 : <style> (139 Ko)
- lignes 1673-1746 : <script type="application/ld+json"> (2 Ko)
- lignes 1747-1850 : <script type="application/ld+json"> (6 Ko)
- lignes 2430-4602 : <script> (189 Ko)
- lignes 4603-5973 : <script> (127 Ko)
- lignes 5974-9091 : <script> (272 Ko)
- lignes 9092-9129 : <script> (3 Ko)

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
 4974  Style Magazine : le livre comme un magazine de couple
 6169  1. Import des photos : une version écran + une version impression
 6478  2. Génération : histoire + légendes à partir des photos
 6796  3. Éditeur
 7203  4. Sauvegarde locale (IndexedDB : photos comprises)
 7277  5. Impression : photos en pleine résolution + PDF hébergé
 7517  6. Paiement
 8622  1. Livre 3D réutilisable
 8743  2. Aperçu en direct pendant la création (ordinateur)
 8777  3. Photos : date de prise de vue, couverture, glisser-déposer
 8879  4. Génération vivante : leurs photos se posent dans un livre
 8905  5. Récapitulatif de commande avec LEUR couverture
 8943  6. Finitions : apparition au défilement, page tournée

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
 2409  <div class="legal-overlay" id="legalOverlay"
 2415  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2435  LANGS.fr
 2523  LANGS.en
 2611  LANGS.de
 2699  LANGS.es
 2787  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2879  toggleLangMenu
 2880  pickLang
 2882  setLang
 2921  highlightPal
 2941  selectPricing
 2956  onSlider
 2969  onInAppSlider
 2992  animNum
 2998  toggleCmp
 3017  saveDraft
 3036  restoreDraft
 3043  set
 3051  clearDraft
 3075  goTab
 3114  edPickPrice
 3120  toggleFaq
 3121  startApp
 3126  addPhotosFromEditor
 3159  ensureConvertible
 3177  detectFocalY
 3197  showUploadLoader
 3209  hideUploadLoader
 3213  addPhotos
 3221  processBatch
 3258  getMinPhotos
 3262  renderPhotos
 3278  removePhoto
 3284  openMsgModal
 3285  closeMsgModal
 3286  saveMsgModal
 3291  selStyle
 3296  log
 3306  setProgress
 3317  api
 3347  runGeneration
 3579  renderBookPreview
 3589  pg
 3596  _take
 3607  pickIdx
 3613  ph
 3614  imgT
 3623  img
 3632  wantTall
 3633  wantSquare
 3634  wantWide
 4039  avRender
 4076  reapplyTexts
 4077  avBuildThumbs
 4090  avNext
 4091  avPrev
 4098  toggleEditor
 4099  edTab
 4100  refreshEditor
 4101  refreshTextFields
 4129  estRows
 4138  liveText
 4151  setActiveSlot
 4152  edSelectPhoto
 4153  updateFilter
 4154  updateCrop
 4155  updateZoom
 4156  toggleBW
 4157  applySlotEditsToDOM
 4161  saveTextStyle
 4162  updateTextStyle
 4163  toggleTextStyle
 4164  setTextSize
 4174  applyTextStylesToDOM
 4175  edSelectLayout
 4176  applyEdit
 4177  applyLayoutOverride
 4178  applyTextLive
 4179  resetEdit
 4183  initCropGestures
 4187  editorOpen
 4188  curSlot
 4196  snapshotPage
 4197  undoEdit
 4199  openFullPreview
 4206  base64ToBlob
 4218  fetchWithTimeout
 4233  processPayment
 4332  generateAlbumPDF
 4339  compressPhotoForPdf
 4403  generateAlbumPDF_UNUSED
 4470  applyPromo
 4491  selectFormat
 4513  updateFormatPrices
 4527  generateFinalPDF
 4544  addPage
 4570  openLegal
 4571  closeLegal
 4613  clamp
 4659  curLang
 4666  themeKey
 4667  theme
 4668  photos
 4673  printSrc
 4685  faceSpan
 4688  autoPos
 4693  fit
 4696  L
 4719  cropCost
 4734  slot
 4767  joli
 4788  coeur
 4791  tx
 4798  fit
 4805  haut
 4811  orientOf
 4978  MT
 4980  mix
 4991  MONTHS
 4995  svgHeart
 4996  svgHeartLine
 4997  svgCurl
 4998  tape
 5000  polaroid
 5007  barcode
 5016  heartMap
 5028  wordGrid
 5030  rnd
 5056  folio
 5072  col
 5076  seal
 5185  ic
 5250  mark
 5373  fmtCoord
 5377  k3Line
 5384  yearPhotos
 5395  kmBetween
 5400  villesT
 5407  planMagazine
 5489  again
 5490  freshOr
 5491  pick
 5495  mk
 5503  L
 5593  renderPage
 5614  tierOf
 5615  photoPageCount
 5616  minPhotos
 5619  distribute
 5635  pickLayout
 5652  chooseLayout
 5665  mkPage
 5669  plan
 5705  tag
 5708  takePhoto
 5779  pairOf
 5781  relayout
 5787  makeSpread
 5805  unmakeSpread
 5821  syncSpread
 5829  fixSpreads
 5869  loadDetector
 5874  go
 5884  loadImg
 5888  saliency
 5915  subjectFromFaces
 5924  analyze
 5950  analyzeAll
 6142  t
 6163  lang
 6164  nPagesSel
 6165  promo
 6170  loadImage
 6172  toJpeg
 6194  was
 6211  pickerBack
 6227  showPickHelp
 6236  close
 6258  within
 6259  decodeFile
 6289  hdBlob
 6299  importFile
 6320  toast
 6333  geom
 6338  prepThumb
 6344  prepFull
 6350  dropPhoto
 6356  tile
 6365  pump
 6393  pump2
 6413  addPhotos
 6446  renderPhotos
 6459  drawUp36
 6484  browserTag
 6485  callAI
 6513  thumb
 6515  coupleInfo
 6531  mqParts
 6536  magAnswers
 6555  fetchCarte
 6565  fetchVilles
 6577  storyPrompt
 6616  magFacts
 6626  magazinePrompt
 6648  cleanMag
 6649  s
 6661  captionPhotos
 6683  defaultStory
 6718  runGeneration
 6786  showIssue
 6799  isWide
 6800  snap
 6802  H
 6803  commit
 6804  restore
 6805  undo
 6806  redo
 6807  updUndo
 6812  visible
 6820  mountPage
 6825  scaleHost
 6834  drawStage
 6848  drawThumb
 6852  drawStrip
 6859  markStrip
 6865  drawThemes
 6870  revealStage
 6876  drawAll
 6877  refreshPage
 6879  afterSlotEdit
 6886  go
 6887  step
 6892  highlightSel
 6902  drawTools
 6953  rewrite
 6970  swapPhoto
 6979  movePage
 6989  bindEditor
 7162  openReader
 7165  draw
 7169  close
 7171  next
 7187  renderBookPreview
 7205  idb
 7206  idbSet
 7207  idbGet
 7208  idbDel
 7209  saveLocal
 7215  offerResume
 7252  proposerMagazine
 7278  fullBlob
 7296  dataUrlToBlob
 7297  uploadPhotos
 7300  todo
 7306  worker
 7332  nstBake
 7390  docHtml
 7399  printHtml
 7400  innerHtml
 7402  spineStyle
 7406  spineText
 7407  defaultSpine
 7408  coverHtml
 7424  paInnerHtml
 7431  paSheet
 7439  paCoverHtml
 7449  optSlot
 7455  afficheHtml
 7463  cadreHtml
 7467  aimantHtml
 7468  generateAlbumPDF
 7478  gen
 7485  doc
 7486  tries
 7529  processPayment
 7587  goTab
 7614  lang
 7624  img
 7649  stop
 7680  upd
 7706  apply
 7725  T
 7726  nm
 7727  renderQuiz
 7733  mark
 7739  save
 7786  mail
 7948  backLbl
 7953  toc
 7960  show
 7967  openLegal
 7975  hideLegal
 7976  closeLegal
 8004  cur
 8013  paint
 8038  lang
 8043  applyUI
 8050  setLang
 8072  syncStory
 8106  ensureStoryFor
 8122  recompose
 8136  addInput
 8165  removePhoto
 8182  selectPricing
 8233  fixTexts
 8266  saveLink
 8288  openFromLink
 8298  set
 8316  trHide
 8318  trackOverlay
 8326  close
 8365  ouvrir
 8391  ekLabel
 8402  drawEbar
 8427  coach
 8433  done
 8439  goTab
 8448  draw
 8476  payLabel
 8518  optTotal
 8520  drawOpts
 8545  fillOptImgs
 8558  pickOptPhoto
 8581  selectFormat
 8590  highlightPal
 8595  setLang
 8610  lang
 8623  spineColors
 8650  sampleCover
 8669  auto
 8670  build
 8677  name
 8693  words
 8700  apply
 8727  build
 8736  nst70
 8756  names
 8757  renderLive
 8770  flowMode
 8779  exifDate
 8789  readAscii
 8790  scan
 8807  addPhotos
 8816  remap
 8817  applyOrder
 8830  movePhoto
 8833  sortByDate
 8842  renderPhotosPlus
 8881  startGenAnim
 8893  tick
 8901  stopGenAnim
 8903  runGeneration
 8908  noel
 8912  fill
 8915  renderSummary
 8928  syncPrice
 8939  goTab
 8961  setLang
 8978  lang
 9009  applyText
 9018  fromFrance
 9026  fromOSM
 9045  close
 9046  render
 9054  pick
 9062  search
 9107  etape

## api/

- api/_fn/album.js (124 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (81 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (29 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (309 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
