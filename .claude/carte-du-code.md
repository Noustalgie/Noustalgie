# Carte de public/index.html

Générée automatiquement (10032 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6759 : <script> (210 Ko)
- lignes 6760-9991 : <script> (288 Ko)
- lignes 9992-10029 : <script> (3 Ko)

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
 5523  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 5884  Pages « objets » : nœud de satin, enveloppe, cachet de cire, carte postale
 6955  1. Import des photos : une version écran + une version impression
 7264  2. Génération : histoire + légendes à partir des photos
 7586  3. Éditeur
 7993  4. Sauvegarde locale (IndexedDB : photos comprises)
 8067  5. Impression : photos en pleine résolution + PDF hébergé
 8343  6. Paiement
 9503  1. Livre 3D réutilisable
 9624  2. Aperçu en direct pendant la création (ordinateur)
 9658  3. Photos : date de prise de vue, couverture, glisser-déposer
 9760  4. Génération vivante : leurs photos se posent dans un livre
 9786  5. Récapitulatif de commande avec LEUR couverture
 9843  6. Finitions : apparition au défilement, page tournée

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
 5105  edToc
 5106  edNames
 5117  col
 5124  col3
 5232  ic
 5297  mark
 5529  mixc
 5530  rgba
 5535  VEIL
 5537  ratioOf
 5538  boxFor
 5540  polaDims
 5541  pola
 5550  booth
 5559  motif
 5565  sticker
 5572  txh
 5579  cadreOr
 5587  plaque
 5596  rond
 5739  row
 5757  cell
 5785  stat
 5825  laurel
 5841  sun
 5842  cloud
 5843  heart
 5891  noeud
 5910  cachet
 5926  envDos
 5934  envFace
 5943  timbre
 5953  tampon
 5965  haut
 6040  fmtCoord
 6044  k3Line
 6051  yearPhotos
 6061  parseMeet
 6072  kmBetween
 6077  villesT
 6084  planMagazine
 6142  st
 6196  again
 6197  freshOr
 6198  pick
 6203  mk
 6214  meetTxt
 6217  L
 6355  renderPage
 6376  tierOf
 6377  photoPageCount
 6378  minPhotos
 6381  distribute
 6397  pickLayout
 6424  pickMag
 6437  chooseLayout
 6450  mkPage
 6454  plan
 6490  tag
 6493  takePhoto
 6564  pairOf
 6566  magAlbum
 6567  relayout
 6573  makeSpread
 6591  unmakeSpread
 6607  syncSpread
 6615  fixSpreads
 6655  loadDetector
 6660  go
 6670  loadImg
 6674  saliency
 6701  subjectFromFaces
 6710  analyze
 6736  analyzeAll
 6928  t
 6949  lang
 6950  nPagesSel
 6951  promo
 6956  loadImage
 6958  toJpeg
 6980  was
 6997  pickerBack
 7013  showPickHelp
 7022  close
 7044  within
 7045  decodeFile
 7075  hdBlob
 7085  importFile
 7106  toast
 7119  geom
 7124  prepThumb
 7130  prepFull
 7136  dropPhoto
 7142  tile
 7151  pump
 7179  pump2
 7199  addPhotos
 7232  renderPhotos
 7245  drawUp36
 7270  browserTag
 7271  callAI
 7299  thumb
 7301  coupleInfo
 7317  mqParts
 7322  magAnswers
 7341  fetchCarte
 7351  fetchVilles
 7363  storyPrompt
 7404  magFacts
 7414  magazinePrompt
 7436  cleanMag
 7437  s
 7449  captionPhotos
 7471  defaultStory
 7508  runGeneration
 7576  showIssue
 7589  isWide
 7590  snap
 7592  H
 7593  commit
 7594  restore
 7595  undo
 7596  redo
 7597  updUndo
 7602  visible
 7610  mountPage
 7615  scaleHost
 7624  drawStage
 7638  drawThumb
 7642  drawStrip
 7649  markStrip
 7655  drawThemes
 7660  revealStage
 7666  drawAll
 7667  refreshPage
 7669  afterSlotEdit
 7676  go
 7677  step
 7682  highlightSel
 7692  drawTools
 7743  rewrite
 7760  swapPhoto
 7769  movePage
 7779  bindEditor
 7952  openReader
 7955  draw
 7959  close
 7961  next
 7977  renderBookPreview
 7995  idb
 7996  idbSet
 7997  idbGet
 7998  idbDel
 7999  saveLocal
 8005  offerResume
 8042  proposerMagazine
 8072  lisible
 8080  hdCopie
 8085  photoAEnvoyer
 8105  dataUrlToBlob
 8109  relais
 8115  uploadPhotos
 8118  todo
 8125  worker
 8157  nstBake
 8215  docHtml
 8224  printHtml
 8225  innerHtml
 8227  spineStyle
 8231  spineText
 8232  defaultSpine
 8233  coverHtml
 8249  paInnerHtml
 8256  paSheet
 8264  paCoverHtml
 8274  optSlot
 8280  afficheHtml
 8288  cadreHtml
 8292  aimantHtml
 8293  generateAlbumPDF
 8304  gen
 8311  doc
 8312  tries
 8355  processPayment
 8361  vers
 8414  goTab
 8441  lang
 8451  img
 8476  stop
 8507  upd
 8535  apply
 8554  T
 8555  nm
 8556  renderQuiz
 8562  mark
 8568  save
 8615  mail
 8780  backLbl
 8785  toc
 8792  show
 8799  openLegal
 8807  hideLegal
 8808  closeLegal
 8836  cur
 8845  paint
 8870  lang
 8875  applyUI
 8882  setLang
 8905  syncStory
 8941  ensureStoryFor
 8957  recompose
 8971  addInput
 9000  removePhoto
 9017  selectPricing
 9068  fixTexts
 9101  saveLink
 9102  q
 9140  fermer
 9160  openFromLink
 9170  set
 9188  trHide
 9190  trackOverlay
 9198  close
 9237  ouvrir
 9267  ekLabel
 9280  drawEbar
 9305  coach
 9311  done
 9317  goTab
 9326  draw
 9357  payLabel
 9399  optTotal
 9401  drawOpts
 9426  fillOptImgs
 9439  pickOptPhoto
 9462  selectFormat
 9471  highlightPal
 9476  setLang
 9491  lang
 9504  spineColors
 9531  sampleCover
 9550  auto
 9551  build
 9558  name
 9574  words
 9581  apply
 9608  build
 9617  nst70
 9637  names
 9638  renderLive
 9651  flowMode
 9660  exifDate
 9670  readAscii
 9671  scan
 9688  addPhotos
 9697  remap
 9698  applyOrder
 9711  movePhoto
 9714  sortByDate
 9723  renderPhotosPlus
 9762  startGenAnim
 9774  tick
 9782  stopGenAnim
 9784  runGeneration
 9789  noel
 9792  noelApres
 9797  fill
 9800  renderSummary
 9813  syncPrice
 9830  cadeauLien
 9839  goTab
 9861  setLang
 9878  lang
 9909  applyText
 9918  fromFrance
 9926  fromOSM
 9945  close
 9946  render
 9954  pick
 9962  search
10007  etape

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
