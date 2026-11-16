# Carte de public/index.html

Générée automatiquement (9842 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6575 : <script> (187 Ko)
- lignes 6576-9801 : <script> (285 Ko)
- lignes 9802-9839 : <script> (3 Ko)

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
 5017  Style Magazine : le livre comme un magazine de couple
 5505  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 6771  1. Import des photos : une version écran + une version impression
 7080  2. Génération : histoire + légendes à partir des photos
 7402  3. Éditeur
 7809  4. Sauvegarde locale (IndexedDB : photos comprises)
 7883  5. Impression : photos en pleine résolution + PDF hébergé
 8159  6. Paiement
 9313  1. Livre 3D réutilisable
 9434  2. Aperçu en direct pendant la création (ordinateur)
 9468  3. Photos : date de prise de vue, couverture, glisser-déposer
 9570  4. Génération vivante : leurs photos se posent dans un livre
 9596  5. Récapitulatif de commande avec LEUR couverture
 9653  6. Finitions : apparition au défilement, page tournée

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
 2451  <div class="legal-overlay" id="legalOverlay"
 2457  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2477  LANGS.fr
 2565  LANGS.en
 2653  LANGS.de
 2741  LANGS.es
 2829  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2921  toggleLangMenu
 2922  pickLang
 2924  setLang
 2963  highlightPal
 2983  selectPricing
 2998  onSlider
 3011  onInAppSlider
 3034  animNum
 3040  toggleCmp
 3059  saveDraft
 3078  restoreDraft
 3085  set
 3093  clearDraft
 3117  goTab
 3156  edPickPrice
 3162  toggleFaq
 3163  startApp
 3168  addPhotosFromEditor
 3201  ensureConvertible
 3219  detectFocalY
 3239  showUploadLoader
 3251  hideUploadLoader
 3255  addPhotos
 3263  processBatch
 3300  getMinPhotos
 3304  renderPhotos
 3320  removePhoto
 3326  openMsgModal
 3327  closeMsgModal
 3328  saveMsgModal
 3333  selStyle
 3338  log
 3348  setProgress
 3359  api
 3389  runGeneration
 3621  renderBookPreview
 3631  pg
 3638  _take
 3649  pickIdx
 3655  ph
 3656  imgT
 3665  img
 3674  wantTall
 3675  wantSquare
 3676  wantWide
 4081  avRender
 4118  reapplyTexts
 4119  avBuildThumbs
 4132  avNext
 4133  avPrev
 4140  toggleEditor
 4141  edTab
 4142  refreshEditor
 4143  refreshTextFields
 4171  estRows
 4180  liveText
 4193  setActiveSlot
 4194  edSelectPhoto
 4195  updateFilter
 4196  updateCrop
 4197  updateZoom
 4198  toggleBW
 4199  applySlotEditsToDOM
 4203  saveTextStyle
 4204  updateTextStyle
 4205  toggleTextStyle
 4206  setTextSize
 4216  applyTextStylesToDOM
 4217  edSelectLayout
 4218  applyEdit
 4219  applyLayoutOverride
 4220  applyTextLive
 4221  resetEdit
 4225  initCropGestures
 4229  editorOpen
 4230  curSlot
 4238  snapshotPage
 4239  undoEdit
 4241  openFullPreview
 4248  base64ToBlob
 4260  fetchWithTimeout
 4275  processPayment
 4374  generateAlbumPDF
 4381  compressPhotoForPdf
 4445  generateAlbumPDF_UNUSED
 4512  applyPromo
 4534  selectFormat
 4556  updateFormatPrices
 4570  generateFinalPDF
 4587  addPage
 4613  openLegal
 4614  closeLegal
 4656  clamp
 4702  curLang
 4709  themeKey
 4710  theme
 4711  photos
 4716  printSrc
 4728  faceSpan
 4731  autoPos
 4736  fit
 4739  L
 4762  cropCost
 4777  slot
 4810  joli
 4831  coeur
 4834  tx
 4841  fit
 4848  haut
 4854  orientOf
 5021  MT
 5023  mix
 5034  MONTHS
 5038  svgHeart
 5039  svgHeartLine
 5040  svgCurl
 5041  tape
 5043  polaroid
 5050  barcode
 5059  heartMap
 5071  wordGrid
 5073  rnd
 5099  folio
 5115  col
 5119  seal
 5228  ic
 5293  mark
 5511  mixc
 5512  rgba
 5517  VEIL
 5519  ratioOf
 5520  boxFor
 5522  polaDims
 5523  pola
 5532  booth
 5541  motif
 5547  sticker
 5554  txh
 5561  cadreOr
 5569  plaque
 5578  rond
 5721  row
 5739  cell
 5767  stat
 5807  laurel
 5823  sun
 5824  cloud
 5825  heart
 5870  fmtCoord
 5874  k3Line
 5881  yearPhotos
 5891  parseMeet
 5902  kmBetween
 5907  villesT
 5914  planMagazine
 5969  st
 6020  again
 6021  freshOr
 6022  pick
 6027  mk
 6038  meetTxt
 6041  L
 6171  renderPage
 6192  tierOf
 6193  photoPageCount
 6194  minPhotos
 6197  distribute
 6213  pickLayout
 6240  pickMag
 6253  chooseLayout
 6266  mkPage
 6270  plan
 6306  tag
 6309  takePhoto
 6380  pairOf
 6382  magAlbum
 6383  relayout
 6389  makeSpread
 6407  unmakeSpread
 6423  syncSpread
 6431  fixSpreads
 6471  loadDetector
 6476  go
 6486  loadImg
 6490  saliency
 6517  subjectFromFaces
 6526  analyze
 6552  analyzeAll
 6744  t
 6765  lang
 6766  nPagesSel
 6767  promo
 6772  loadImage
 6774  toJpeg
 6796  was
 6813  pickerBack
 6829  showPickHelp
 6838  close
 6860  within
 6861  decodeFile
 6891  hdBlob
 6901  importFile
 6922  toast
 6935  geom
 6940  prepThumb
 6946  prepFull
 6952  dropPhoto
 6958  tile
 6967  pump
 6995  pump2
 7015  addPhotos
 7048  renderPhotos
 7061  drawUp36
 7086  browserTag
 7087  callAI
 7115  thumb
 7117  coupleInfo
 7133  mqParts
 7138  magAnswers
 7157  fetchCarte
 7167  fetchVilles
 7179  storyPrompt
 7220  magFacts
 7230  magazinePrompt
 7252  cleanMag
 7253  s
 7265  captionPhotos
 7287  defaultStory
 7324  runGeneration
 7392  showIssue
 7405  isWide
 7406  snap
 7408  H
 7409  commit
 7410  restore
 7411  undo
 7412  redo
 7413  updUndo
 7418  visible
 7426  mountPage
 7431  scaleHost
 7440  drawStage
 7454  drawThumb
 7458  drawStrip
 7465  markStrip
 7471  drawThemes
 7476  revealStage
 7482  drawAll
 7483  refreshPage
 7485  afterSlotEdit
 7492  go
 7493  step
 7498  highlightSel
 7508  drawTools
 7559  rewrite
 7576  swapPhoto
 7585  movePage
 7595  bindEditor
 7768  openReader
 7771  draw
 7775  close
 7777  next
 7793  renderBookPreview
 7811  idb
 7812  idbSet
 7813  idbGet
 7814  idbDel
 7815  saveLocal
 7821  offerResume
 7858  proposerMagazine
 7888  lisible
 7896  hdCopie
 7901  photoAEnvoyer
 7921  dataUrlToBlob
 7925  relais
 7931  uploadPhotos
 7934  todo
 7941  worker
 7973  nstBake
 8031  docHtml
 8040  printHtml
 8041  innerHtml
 8043  spineStyle
 8047  spineText
 8048  defaultSpine
 8049  coverHtml
 8065  paInnerHtml
 8072  paSheet
 8080  paCoverHtml
 8090  optSlot
 8096  afficheHtml
 8104  cadreHtml
 8108  aimantHtml
 8109  generateAlbumPDF
 8120  gen
 8127  doc
 8128  tries
 8171  processPayment
 8177  vers
 8230  goTab
 8257  lang
 8267  img
 8292  stop
 8323  upd
 8351  apply
 8370  T
 8371  nm
 8372  renderQuiz
 8378  mark
 8384  save
 8431  mail
 8596  backLbl
 8601  toc
 8608  show
 8615  openLegal
 8623  hideLegal
 8624  closeLegal
 8652  cur
 8661  paint
 8686  lang
 8691  applyUI
 8698  setLang
 8721  syncStory
 8757  ensureStoryFor
 8773  recompose
 8787  addInput
 8816  removePhoto
 8833  selectPricing
 8884  fixTexts
 8917  saveLink
 8918  q
 8956  fermer
 8976  openFromLink
 8986  set
 9004  trHide
 9006  trackOverlay
 9014  close
 9053  ouvrir
 9079  ekLabel
 9090  drawEbar
 9115  coach
 9121  done
 9127  goTab
 9136  draw
 9167  payLabel
 9209  optTotal
 9211  drawOpts
 9236  fillOptImgs
 9249  pickOptPhoto
 9272  selectFormat
 9281  highlightPal
 9286  setLang
 9301  lang
 9314  spineColors
 9341  sampleCover
 9360  auto
 9361  build
 9368  name
 9384  words
 9391  apply
 9418  build
 9427  nst70
 9447  names
 9448  renderLive
 9461  flowMode
 9470  exifDate
 9480  readAscii
 9481  scan
 9498  addPhotos
 9507  remap
 9508  applyOrder
 9521  movePhoto
 9524  sortByDate
 9533  renderPhotosPlus
 9572  startGenAnim
 9584  tick
 9592  stopGenAnim
 9594  runGeneration
 9599  noel
 9602  noelApres
 9607  fill
 9610  renderSummary
 9623  syncPrice
 9640  cadeauLien
 9649  goTab
 9671  setLang
 9688  lang
 9719  applyText
 9728  fromFrance
 9736  fromOSM
 9755  close
 9756  render
 9764  pick
 9772  search
 9817  etape

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
