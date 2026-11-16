# Carte de public/index.html

Générée automatiquement (10033 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6760 : <script> (210 Ko)
- lignes 6761-9992 : <script> (288 Ko)
- lignes 9993-10030 : <script> (3 Ko)

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
 5524  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 5885  Pages « objets » : nœud de satin, enveloppe, cachet de cire, carte postale
 6956  1. Import des photos : une version écran + une version impression
 7265  2. Génération : histoire + légendes à partir des photos
 7587  3. Éditeur
 7994  4. Sauvegarde locale (IndexedDB : photos comprises)
 8068  5. Impression : photos en pleine résolution + PDF hébergé
 8344  6. Paiement
 9504  1. Livre 3D réutilisable
 9625  2. Aperçu en direct pendant la création (ordinateur)
 9659  3. Photos : date de prise de vue, couverture, glisser-déposer
 9761  4. Génération vivante : leurs photos se posent dans un livre
 9787  5. Récapitulatif de commande avec LEUR couverture
 9844  6. Finitions : apparition au défilement, page tournée

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
 5233  ic
 5298  mark
 5530  mixc
 5531  rgba
 5536  VEIL
 5538  ratioOf
 5539  boxFor
 5541  polaDims
 5542  pola
 5551  booth
 5560  motif
 5566  sticker
 5573  txh
 5580  cadreOr
 5588  plaque
 5597  rond
 5740  row
 5758  cell
 5786  stat
 5826  laurel
 5842  sun
 5843  cloud
 5844  heart
 5892  noeud
 5911  cachet
 5927  envDos
 5935  envFace
 5944  timbre
 5954  tampon
 5966  haut
 6041  fmtCoord
 6045  k3Line
 6052  yearPhotos
 6062  parseMeet
 6073  kmBetween
 6078  villesT
 6085  planMagazine
 6143  st
 6197  again
 6198  freshOr
 6199  pick
 6204  mk
 6215  meetTxt
 6218  L
 6356  renderPage
 6377  tierOf
 6378  photoPageCount
 6379  minPhotos
 6382  distribute
 6398  pickLayout
 6425  pickMag
 6438  chooseLayout
 6451  mkPage
 6455  plan
 6491  tag
 6494  takePhoto
 6565  pairOf
 6567  magAlbum
 6568  relayout
 6574  makeSpread
 6592  unmakeSpread
 6608  syncSpread
 6616  fixSpreads
 6656  loadDetector
 6661  go
 6671  loadImg
 6675  saliency
 6702  subjectFromFaces
 6711  analyze
 6737  analyzeAll
 6929  t
 6950  lang
 6951  nPagesSel
 6952  promo
 6957  loadImage
 6959  toJpeg
 6981  was
 6998  pickerBack
 7014  showPickHelp
 7023  close
 7045  within
 7046  decodeFile
 7076  hdBlob
 7086  importFile
 7107  toast
 7120  geom
 7125  prepThumb
 7131  prepFull
 7137  dropPhoto
 7143  tile
 7152  pump
 7180  pump2
 7200  addPhotos
 7233  renderPhotos
 7246  drawUp36
 7271  browserTag
 7272  callAI
 7300  thumb
 7302  coupleInfo
 7318  mqParts
 7323  magAnswers
 7342  fetchCarte
 7352  fetchVilles
 7364  storyPrompt
 7405  magFacts
 7415  magazinePrompt
 7437  cleanMag
 7438  s
 7450  captionPhotos
 7472  defaultStory
 7509  runGeneration
 7577  showIssue
 7590  isWide
 7591  snap
 7593  H
 7594  commit
 7595  restore
 7596  undo
 7597  redo
 7598  updUndo
 7603  visible
 7611  mountPage
 7616  scaleHost
 7625  drawStage
 7639  drawThumb
 7643  drawStrip
 7650  markStrip
 7656  drawThemes
 7661  revealStage
 7667  drawAll
 7668  refreshPage
 7670  afterSlotEdit
 7677  go
 7678  step
 7683  highlightSel
 7693  drawTools
 7744  rewrite
 7761  swapPhoto
 7770  movePage
 7780  bindEditor
 7953  openReader
 7956  draw
 7960  close
 7962  next
 7978  renderBookPreview
 7996  idb
 7997  idbSet
 7998  idbGet
 7999  idbDel
 8000  saveLocal
 8006  offerResume
 8043  proposerMagazine
 8073  lisible
 8081  hdCopie
 8086  photoAEnvoyer
 8106  dataUrlToBlob
 8110  relais
 8116  uploadPhotos
 8119  todo
 8126  worker
 8158  nstBake
 8216  docHtml
 8225  printHtml
 8226  innerHtml
 8228  spineStyle
 8232  spineText
 8233  defaultSpine
 8234  coverHtml
 8250  paInnerHtml
 8257  paSheet
 8265  paCoverHtml
 8275  optSlot
 8281  afficheHtml
 8289  cadreHtml
 8293  aimantHtml
 8294  generateAlbumPDF
 8305  gen
 8312  doc
 8313  tries
 8356  processPayment
 8362  vers
 8415  goTab
 8442  lang
 8452  img
 8477  stop
 8508  upd
 8536  apply
 8555  T
 8556  nm
 8557  renderQuiz
 8563  mark
 8569  save
 8616  mail
 8781  backLbl
 8786  toc
 8793  show
 8800  openLegal
 8808  hideLegal
 8809  closeLegal
 8837  cur
 8846  paint
 8871  lang
 8876  applyUI
 8883  setLang
 8906  syncStory
 8942  ensureStoryFor
 8958  recompose
 8972  addInput
 9001  removePhoto
 9018  selectPricing
 9069  fixTexts
 9102  saveLink
 9103  q
 9141  fermer
 9161  openFromLink
 9171  set
 9189  trHide
 9191  trackOverlay
 9199  close
 9238  ouvrir
 9268  ekLabel
 9281  drawEbar
 9306  coach
 9312  done
 9318  goTab
 9327  draw
 9358  payLabel
 9400  optTotal
 9402  drawOpts
 9427  fillOptImgs
 9440  pickOptPhoto
 9463  selectFormat
 9472  highlightPal
 9477  setLang
 9492  lang
 9505  spineColors
 9532  sampleCover
 9551  auto
 9552  build
 9559  name
 9575  words
 9582  apply
 9609  build
 9618  nst70
 9638  names
 9639  renderLive
 9652  flowMode
 9661  exifDate
 9671  readAscii
 9672  scan
 9689  addPhotos
 9698  remap
 9699  applyOrder
 9712  movePhoto
 9715  sortByDate
 9724  renderPhotosPlus
 9763  startGenAnim
 9775  tick
 9783  stopGenAnim
 9785  runGeneration
 9790  noel
 9793  noelApres
 9798  fill
 9801  renderSummary
 9814  syncPrice
 9831  cadeauLien
 9840  goTab
 9862  setLang
 9879  lang
 9910  applyText
 9919  fromFrance
 9927  fromOSM
 9946  close
 9947  render
 9955  pick
 9963  search
10008  etape

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
