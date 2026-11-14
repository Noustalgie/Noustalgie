# Carte de public/index.html

Générée automatiquement (9211 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1692 : <style> (141 Ko)
- lignes 1693-1766 : <script type="application/ld+json"> (2 Ko)
- lignes 1767-1870 : <script type="application/ld+json"> (6 Ko)
- lignes 2455-4628 : <script> (190 Ko)
- lignes 4629-5999 : <script> (127 Ko)
- lignes 6000-9170 : <script> (278 Ko)
- lignes 9171-9208 : <script> (3 Ko)

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
 5000  Style Magazine : le livre comme un magazine de couple
 6195  1. Import des photos : une version écran + une version impression
 6504  2. Génération : histoire + légendes à partir des photos
 6822  3. Éditeur
 7229  4. Sauvegarde locale (IndexedDB : photos comprises)
 7303  5. Impression : photos en pleine résolution + PDF hébergé
 7579  6. Paiement
 8692  1. Livre 3D réutilisable
 8813  2. Aperçu en direct pendant la création (ordinateur)
 8847  3. Photos : date de prise de vue, couverture, glisser-déposer
 8949  4. Génération vivante : leurs photos se posent dans un livre
 8975  5. Récapitulatif de commande avec LEUR couverture
 9022  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1899  <header>
 1900  <nav class="ed-nav">
 1922  <main id="main" tabindex="-1">
 1924  <section class="ed-hero">
 1934  <div class="nst-demo" id="nstDemo"
 1940  <section class="nst-how nst-frise" id="how">
 1954  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1977  <section class="ed-price" id="pricing">
 2015  <section class="section app-section" id="app">
 2042  <div class="panel active" id="panel0"
 2128  <div class="panel" id="panel1"
 2173  <div class="panel" id="panel2"
 2199  <div class="panel" id="panel3"
 2200  <div id="nstEd"
 2227  <div class="panel" id="panel4"
 2229  <div id="payForm"
 2310  <section class="ed-faq-section" id="faq">
 2366  <footer>
 2434  <div class="legal-overlay" id="legalOverlay"
 2440  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2460  LANGS.fr
 2548  LANGS.en
 2636  LANGS.de
 2724  LANGS.es
 2812  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2904  toggleLangMenu
 2905  pickLang
 2907  setLang
 2946  highlightPal
 2966  selectPricing
 2981  onSlider
 2994  onInAppSlider
 3017  animNum
 3023  toggleCmp
 3042  saveDraft
 3061  restoreDraft
 3068  set
 3076  clearDraft
 3100  goTab
 3139  edPickPrice
 3145  toggleFaq
 3146  startApp
 3151  addPhotosFromEditor
 3184  ensureConvertible
 3202  detectFocalY
 3222  showUploadLoader
 3234  hideUploadLoader
 3238  addPhotos
 3246  processBatch
 3283  getMinPhotos
 3287  renderPhotos
 3303  removePhoto
 3309  openMsgModal
 3310  closeMsgModal
 3311  saveMsgModal
 3316  selStyle
 3321  log
 3331  setProgress
 3342  api
 3372  runGeneration
 3604  renderBookPreview
 3614  pg
 3621  _take
 3632  pickIdx
 3638  ph
 3639  imgT
 3648  img
 3657  wantTall
 3658  wantSquare
 3659  wantWide
 4064  avRender
 4101  reapplyTexts
 4102  avBuildThumbs
 4115  avNext
 4116  avPrev
 4123  toggleEditor
 4124  edTab
 4125  refreshEditor
 4126  refreshTextFields
 4154  estRows
 4163  liveText
 4176  setActiveSlot
 4177  edSelectPhoto
 4178  updateFilter
 4179  updateCrop
 4180  updateZoom
 4181  toggleBW
 4182  applySlotEditsToDOM
 4186  saveTextStyle
 4187  updateTextStyle
 4188  toggleTextStyle
 4189  setTextSize
 4199  applyTextStylesToDOM
 4200  edSelectLayout
 4201  applyEdit
 4202  applyLayoutOverride
 4203  applyTextLive
 4204  resetEdit
 4208  initCropGestures
 4212  editorOpen
 4213  curSlot
 4221  snapshotPage
 4222  undoEdit
 4224  openFullPreview
 4231  base64ToBlob
 4243  fetchWithTimeout
 4258  processPayment
 4357  generateAlbumPDF
 4364  compressPhotoForPdf
 4428  generateAlbumPDF_UNUSED
 4495  applyPromo
 4517  selectFormat
 4539  updateFormatPrices
 4553  generateFinalPDF
 4570  addPage
 4596  openLegal
 4597  closeLegal
 4639  clamp
 4685  curLang
 4692  themeKey
 4693  theme
 4694  photos
 4699  printSrc
 4711  faceSpan
 4714  autoPos
 4719  fit
 4722  L
 4745  cropCost
 4760  slot
 4793  joli
 4814  coeur
 4817  tx
 4824  fit
 4831  haut
 4837  orientOf
 5004  MT
 5006  mix
 5017  MONTHS
 5021  svgHeart
 5022  svgHeartLine
 5023  svgCurl
 5024  tape
 5026  polaroid
 5033  barcode
 5042  heartMap
 5054  wordGrid
 5056  rnd
 5082  folio
 5098  col
 5102  seal
 5211  ic
 5276  mark
 5399  fmtCoord
 5403  k3Line
 5410  yearPhotos
 5421  kmBetween
 5426  villesT
 5433  planMagazine
 5515  again
 5516  freshOr
 5517  pick
 5521  mk
 5529  L
 5619  renderPage
 5640  tierOf
 5641  photoPageCount
 5642  minPhotos
 5645  distribute
 5661  pickLayout
 5678  chooseLayout
 5691  mkPage
 5695  plan
 5731  tag
 5734  takePhoto
 5805  pairOf
 5807  relayout
 5813  makeSpread
 5831  unmakeSpread
 5847  syncSpread
 5855  fixSpreads
 5895  loadDetector
 5900  go
 5910  loadImg
 5914  saliency
 5941  subjectFromFaces
 5950  analyze
 5976  analyzeAll
 6168  t
 6189  lang
 6190  nPagesSel
 6191  promo
 6196  loadImage
 6198  toJpeg
 6220  was
 6237  pickerBack
 6253  showPickHelp
 6262  close
 6284  within
 6285  decodeFile
 6315  hdBlob
 6325  importFile
 6346  toast
 6359  geom
 6364  prepThumb
 6370  prepFull
 6376  dropPhoto
 6382  tile
 6391  pump
 6419  pump2
 6439  addPhotos
 6472  renderPhotos
 6485  drawUp36
 6510  browserTag
 6511  callAI
 6539  thumb
 6541  coupleInfo
 6557  mqParts
 6562  magAnswers
 6581  fetchCarte
 6591  fetchVilles
 6603  storyPrompt
 6642  magFacts
 6652  magazinePrompt
 6674  cleanMag
 6675  s
 6687  captionPhotos
 6709  defaultStory
 6744  runGeneration
 6812  showIssue
 6825  isWide
 6826  snap
 6828  H
 6829  commit
 6830  restore
 6831  undo
 6832  redo
 6833  updUndo
 6838  visible
 6846  mountPage
 6851  scaleHost
 6860  drawStage
 6874  drawThumb
 6878  drawStrip
 6885  markStrip
 6891  drawThemes
 6896  revealStage
 6902  drawAll
 6903  refreshPage
 6905  afterSlotEdit
 6912  go
 6913  step
 6918  highlightSel
 6928  drawTools
 6979  rewrite
 6996  swapPhoto
 7005  movePage
 7015  bindEditor
 7188  openReader
 7191  draw
 7195  close
 7197  next
 7213  renderBookPreview
 7231  idb
 7232  idbSet
 7233  idbGet
 7234  idbDel
 7235  saveLocal
 7241  offerResume
 7278  proposerMagazine
 7308  lisible
 7316  hdCopie
 7321  photoAEnvoyer
 7341  dataUrlToBlob
 7345  relais
 7351  uploadPhotos
 7354  todo
 7361  worker
 7393  nstBake
 7451  docHtml
 7460  printHtml
 7461  innerHtml
 7463  spineStyle
 7467  spineText
 7468  defaultSpine
 7469  coverHtml
 7485  paInnerHtml
 7492  paSheet
 7500  paCoverHtml
 7510  optSlot
 7516  afficheHtml
 7524  cadreHtml
 7528  aimantHtml
 7529  generateAlbumPDF
 7540  gen
 7547  doc
 7548  tries
 7591  processPayment
 7597  vers
 7650  goTab
 7677  lang
 7687  img
 7712  stop
 7743  upd
 7771  apply
 7790  T
 7791  nm
 7792  renderQuiz
 7798  mark
 7804  save
 7851  mail
 8015  backLbl
 8020  toc
 8027  show
 8034  openLegal
 8042  hideLegal
 8043  closeLegal
 8071  cur
 8080  paint
 8105  lang
 8110  applyUI
 8117  setLang
 8139  syncStory
 8173  ensureStoryFor
 8189  recompose
 8203  addInput
 8232  removePhoto
 8249  selectPricing
 8300  fixTexts
 8333  saveLink
 8355  openFromLink
 8365  set
 8383  trHide
 8385  trackOverlay
 8393  close
 8432  ouvrir
 8458  ekLabel
 8469  drawEbar
 8494  coach
 8500  done
 8506  goTab
 8515  draw
 8546  payLabel
 8588  optTotal
 8590  drawOpts
 8615  fillOptImgs
 8628  pickOptPhoto
 8651  selectFormat
 8660  highlightPal
 8665  setLang
 8680  lang
 8693  spineColors
 8720  sampleCover
 8739  auto
 8740  build
 8747  name
 8763  words
 8770  apply
 8797  build
 8806  nst70
 8826  names
 8827  renderLive
 8840  flowMode
 8849  exifDate
 8859  readAscii
 8860  scan
 8877  addPhotos
 8886  remap
 8887  applyOrder
 8900  movePhoto
 8903  sortByDate
 8912  renderPhotosPlus
 8951  startGenAnim
 8963  tick
 8971  stopGenAnim
 8973  runGeneration
 8978  noel
 8982  fill
 8985  renderSummary
 8998  syncPrice
 9009  cadeauLien
 9018  goTab
 9040  setLang
 9057  lang
 9088  applyText
 9097  fromFrance
 9105  fromOSM
 9124  close
 9125  render
 9133  pick
 9141  search
 9186  etape

## api/

- api/_fn/album.js (124 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cadeau.js (90 lignes) /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/photo.js (40 lignes) /api/tools?fn=photo — secours de l'envoi des photos en haute définition (3e essai de uploadPhotos, index.html)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cadeau.js (75 lignes) api/_lib/cadeau.js — cartes cadeaux (49,99 €, soit un livre imprimé de 36 pages livré)
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (84 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (187 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (31 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (350 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
