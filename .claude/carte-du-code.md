# Carte de public/index.html

Générée automatiquement (10057 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2476-4649 : <script> (190 Ko)
- lignes 4650-6784 : <script> (212 Ko)
- lignes 6785-10016 : <script> (288 Ko)
- lignes 10017-10054 : <script> (3 Ko)

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
 5021  Style Magazine : le livre comme un magazine de couple
 5527  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 5888  Pages « objets » : nœud de satin, enveloppe, cachet de cire, carte postale
 6980  1. Import des photos : une version écran + une version impression
 7289  2. Génération : histoire + légendes à partir des photos
 7611  3. Éditeur
 8018  4. Sauvegarde locale (IndexedDB : photos comprises)
 8092  5. Impression : photos en pleine résolution + PDF hébergé
 8368  6. Paiement
 9528  1. Livre 3D réutilisable
 9649  2. Aperçu en direct pendant la création (ordinateur)
 9683  3. Photos : date de prise de vue, couverture, glisser-déposer
 9785  4. Génération vivante : leurs photos se posent dans un livre
 9811  5. Récapitulatif de commande avec LEUR couverture
 9868  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1915  <header>
 1916  <nav class="ed-nav">
 1938  <main id="main" tabindex="-1">
 1940  <section class="ed-hero">
 1950  <div class="nst-demo" id="nstDemo"
 1956  <section class="nst-how nst-frise" id="how">
 1970  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1993  <section class="ed-price" id="pricing">
 2031  <section class="section app-section" id="app">
 2058  <div class="panel active" id="panel0"
 2144  <div class="panel" id="panel1"
 2189  <div class="panel" id="panel2"
 2215  <div class="panel" id="panel3"
 2216  <div id="nstEd"
 2244  <div class="panel" id="panel4"
 2246  <div id="payForm"
 2327  <section class="ed-faq-section" id="faq">
 2383  <footer>
 2455  <div class="legal-overlay" id="legalOverlay"
 2461  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2481  LANGS.fr
 2569  LANGS.en
 2657  LANGS.de
 2745  LANGS.es
 2833  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2925  toggleLangMenu
 2926  pickLang
 2928  setLang
 2967  highlightPal
 2987  selectPricing
 3002  onSlider
 3015  onInAppSlider
 3038  animNum
 3044  toggleCmp
 3063  saveDraft
 3082  restoreDraft
 3089  set
 3097  clearDraft
 3121  goTab
 3160  edPickPrice
 3166  toggleFaq
 3167  startApp
 3172  addPhotosFromEditor
 3205  ensureConvertible
 3223  detectFocalY
 3243  showUploadLoader
 3255  hideUploadLoader
 3259  addPhotos
 3267  processBatch
 3304  getMinPhotos
 3308  renderPhotos
 3324  removePhoto
 3330  openMsgModal
 3331  closeMsgModal
 3332  saveMsgModal
 3337  selStyle
 3342  log
 3352  setProgress
 3363  api
 3393  runGeneration
 3625  renderBookPreview
 3635  pg
 3642  _take
 3653  pickIdx
 3659  ph
 3660  imgT
 3669  img
 3678  wantTall
 3679  wantSquare
 3680  wantWide
 4085  avRender
 4122  reapplyTexts
 4123  avBuildThumbs
 4136  avNext
 4137  avPrev
 4144  toggleEditor
 4145  edTab
 4146  refreshEditor
 4147  refreshTextFields
 4175  estRows
 4184  liveText
 4197  setActiveSlot
 4198  edSelectPhoto
 4199  updateFilter
 4200  updateCrop
 4201  updateZoom
 4202  toggleBW
 4203  applySlotEditsToDOM
 4207  saveTextStyle
 4208  updateTextStyle
 4209  toggleTextStyle
 4210  setTextSize
 4220  applyTextStylesToDOM
 4221  edSelectLayout
 4222  applyEdit
 4223  applyLayoutOverride
 4224  applyTextLive
 4225  resetEdit
 4229  initCropGestures
 4233  editorOpen
 4234  curSlot
 4242  snapshotPage
 4243  undoEdit
 4245  openFullPreview
 4252  base64ToBlob
 4264  fetchWithTimeout
 4279  processPayment
 4378  generateAlbumPDF
 4385  compressPhotoForPdf
 4449  generateAlbumPDF_UNUSED
 4516  applyPromo
 4538  selectFormat
 4560  updateFormatPrices
 4574  generateFinalPDF
 4591  addPage
 4617  openLegal
 4618  closeLegal
 4660  clamp
 4706  curLang
 4713  themeKey
 4714  theme
 4715  photos
 4720  printSrc
 4732  faceSpan
 4735  autoPos
 4740  fit
 4743  L
 4766  cropCost
 4781  slot
 4814  joli
 4835  coeur
 4838  tx
 4845  fit
 4852  haut
 4858  orientOf
 5025  MT
 5027  mix
 5038  MONTHS
 5042  svgHeart
 5043  svgHeartLine
 5044  svgCurl
 5045  tape
 5047  polaroid
 5054  barcode
 5063  heartMap
 5075  wordGrid
 5077  rnd
 5103  folio
 5109  edToc
 5110  edNames
 5121  col
 5128  col3
 5236  ic
 5301  mark
 5533  mixc
 5534  rgba
 5539  VEIL
 5541  ratioOf
 5542  boxFor
 5544  polaDims
 5545  pola
 5554  booth
 5563  motif
 5569  sticker
 5576  txh
 5583  cadreOr
 5591  plaque
 5600  rond
 5743  row
 5761  cell
 5789  stat
 5829  laurel
 5845  sun
 5846  cloud
 5847  heart
 5895  noeud
 5914  cachetCoeur
 5916  heart
 5932  objImg
 5934  cachet
 5950  envDos
 5958  envFace
 5967  timbre
 5977  tampon
 5990  haut
 6065  fmtCoord
 6069  k3Line
 6076  yearPhotos
 6086  parseMeet
 6097  kmBetween
 6102  villesT
 6109  planMagazine
 6167  st
 6221  again
 6222  freshOr
 6223  pick
 6228  mk
 6239  meetTxt
 6242  L
 6380  renderPage
 6401  tierOf
 6402  photoPageCount
 6403  minPhotos
 6406  distribute
 6422  pickLayout
 6449  pickMag
 6462  chooseLayout
 6475  mkPage
 6479  plan
 6515  tag
 6518  takePhoto
 6589  pairOf
 6591  magAlbum
 6592  relayout
 6598  makeSpread
 6616  unmakeSpread
 6632  syncSpread
 6640  fixSpreads
 6680  loadDetector
 6685  go
 6695  loadImg
 6699  saliency
 6726  subjectFromFaces
 6735  analyze
 6761  analyzeAll
 6953  t
 6974  lang
 6975  nPagesSel
 6976  promo
 6981  loadImage
 6983  toJpeg
 7005  was
 7022  pickerBack
 7038  showPickHelp
 7047  close
 7069  within
 7070  decodeFile
 7100  hdBlob
 7110  importFile
 7131  toast
 7144  geom
 7149  prepThumb
 7155  prepFull
 7161  dropPhoto
 7167  tile
 7176  pump
 7204  pump2
 7224  addPhotos
 7257  renderPhotos
 7270  drawUp36
 7295  browserTag
 7296  callAI
 7324  thumb
 7326  coupleInfo
 7342  mqParts
 7347  magAnswers
 7366  fetchCarte
 7376  fetchVilles
 7388  storyPrompt
 7429  magFacts
 7439  magazinePrompt
 7461  cleanMag
 7462  s
 7474  captionPhotos
 7496  defaultStory
 7533  runGeneration
 7601  showIssue
 7614  isWide
 7615  snap
 7617  H
 7618  commit
 7619  restore
 7620  undo
 7621  redo
 7622  updUndo
 7627  visible
 7635  mountPage
 7640  scaleHost
 7649  drawStage
 7663  drawThumb
 7667  drawStrip
 7674  markStrip
 7680  drawThemes
 7685  revealStage
 7691  drawAll
 7692  refreshPage
 7694  afterSlotEdit
 7701  go
 7702  step
 7707  highlightSel
 7717  drawTools
 7768  rewrite
 7785  swapPhoto
 7794  movePage
 7804  bindEditor
 7977  openReader
 7980  draw
 7984  close
 7986  next
 8002  renderBookPreview
 8020  idb
 8021  idbSet
 8022  idbGet
 8023  idbDel
 8024  saveLocal
 8030  offerResume
 8067  proposerMagazine
 8097  lisible
 8105  hdCopie
 8110  photoAEnvoyer
 8130  dataUrlToBlob
 8134  relais
 8140  uploadPhotos
 8143  todo
 8150  worker
 8182  nstBake
 8240  docHtml
 8249  printHtml
 8250  innerHtml
 8252  spineStyle
 8256  spineText
 8257  defaultSpine
 8258  coverHtml
 8274  paInnerHtml
 8281  paSheet
 8289  paCoverHtml
 8299  optSlot
 8305  afficheHtml
 8313  cadreHtml
 8317  aimantHtml
 8318  generateAlbumPDF
 8329  gen
 8336  doc
 8337  tries
 8380  processPayment
 8386  vers
 8439  goTab
 8466  lang
 8476  img
 8501  stop
 8532  upd
 8560  apply
 8579  T
 8580  nm
 8581  renderQuiz
 8587  mark
 8593  save
 8640  mail
 8805  backLbl
 8810  toc
 8817  show
 8824  openLegal
 8832  hideLegal
 8833  closeLegal
 8861  cur
 8870  paint
 8895  lang
 8900  applyUI
 8907  setLang
 8930  syncStory
 8966  ensureStoryFor
 8982  recompose
 8996  addInput
 9025  removePhoto
 9042  selectPricing
 9093  fixTexts
 9126  saveLink
 9127  q
 9165  fermer
 9185  openFromLink
 9195  set
 9213  trHide
 9215  trackOverlay
 9223  close
 9262  ouvrir
 9292  ekLabel
 9305  drawEbar
 9330  coach
 9336  done
 9342  goTab
 9351  draw
 9382  payLabel
 9424  optTotal
 9426  drawOpts
 9451  fillOptImgs
 9464  pickOptPhoto
 9487  selectFormat
 9496  highlightPal
 9501  setLang
 9516  lang
 9529  spineColors
 9556  sampleCover
 9575  auto
 9576  build
 9583  name
 9599  words
 9606  apply
 9633  build
 9642  nst70
 9662  names
 9663  renderLive
 9676  flowMode
 9685  exifDate
 9695  readAscii
 9696  scan
 9713  addPhotos
 9722  remap
 9723  applyOrder
 9736  movePhoto
 9739  sortByDate
 9748  renderPhotosPlus
 9787  startGenAnim
 9799  tick
 9807  stopGenAnim
 9809  runGeneration
 9814  noel
 9817  noelApres
 9822  fill
 9825  renderSummary
 9838  syncPrice
 9855  cadeauLien
 9864  goTab
 9886  setLang
 9903  lang
 9934  applyText
 9943  fromFrance
 9951  fromOSM
 9970  close
 9971  render
 9979  pick
 9987  search
10032  etape

## api/

- api/_fn/album.js (126 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cadeau.js (90 lignes) /api/tools?fn=cadeau — cartes cadeaux (api/_lib/cadeau.js)
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/photo.js (40 lignes) /api/tools?fn=photo — secours de l'envoi des photos en haute définition (3e essai de uploadPhotos, index.html)
- api/_fn/printapi-hook.js (77 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/recommande.js (65 lignes) /api/tools?fn=recommande&jeton=…&session=cs_live_…&contenu=URL[&couverture=URL][&essai=1]
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (60 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cadeau.js (75 lignes) api/_lib/cadeau.js — cartes cadeaux (49,99 €, soit un livre imprimé de 36 pages livré)
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (93 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (187 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (31 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (350 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
