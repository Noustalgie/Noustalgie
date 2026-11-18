# Carte de public/index.html

Générée automatiquement (10053 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6780 : <script> (212 Ko)
- lignes 6781-10012 : <script> (288 Ko)
- lignes 10013-10050 : <script> (3 Ko)

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
 6976  1. Import des photos : une version écran + une version impression
 7285  2. Génération : histoire + légendes à partir des photos
 7607  3. Éditeur
 8014  4. Sauvegarde locale (IndexedDB : photos comprises)
 8088  5. Impression : photos en pleine résolution + PDF hébergé
 8364  6. Paiement
 9524  1. Livre 3D réutilisable
 9645  2. Aperçu en direct pendant la création (ordinateur)
 9679  3. Photos : date de prise de vue, couverture, glisser-déposer
 9781  4. Génération vivante : leurs photos se posent dans un livre
 9807  5. Récapitulatif de commande avec LEUR couverture
 9864  6. Finitions : apparition au défilement, page tournée

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
 5910  cachetCoeur
 5912  heart
 5928  objImg
 5930  cachet
 5946  envDos
 5954  envFace
 5963  timbre
 5973  tampon
 5986  haut
 6061  fmtCoord
 6065  k3Line
 6072  yearPhotos
 6082  parseMeet
 6093  kmBetween
 6098  villesT
 6105  planMagazine
 6163  st
 6217  again
 6218  freshOr
 6219  pick
 6224  mk
 6235  meetTxt
 6238  L
 6376  renderPage
 6397  tierOf
 6398  photoPageCount
 6399  minPhotos
 6402  distribute
 6418  pickLayout
 6445  pickMag
 6458  chooseLayout
 6471  mkPage
 6475  plan
 6511  tag
 6514  takePhoto
 6585  pairOf
 6587  magAlbum
 6588  relayout
 6594  makeSpread
 6612  unmakeSpread
 6628  syncSpread
 6636  fixSpreads
 6676  loadDetector
 6681  go
 6691  loadImg
 6695  saliency
 6722  subjectFromFaces
 6731  analyze
 6757  analyzeAll
 6949  t
 6970  lang
 6971  nPagesSel
 6972  promo
 6977  loadImage
 6979  toJpeg
 7001  was
 7018  pickerBack
 7034  showPickHelp
 7043  close
 7065  within
 7066  decodeFile
 7096  hdBlob
 7106  importFile
 7127  toast
 7140  geom
 7145  prepThumb
 7151  prepFull
 7157  dropPhoto
 7163  tile
 7172  pump
 7200  pump2
 7220  addPhotos
 7253  renderPhotos
 7266  drawUp36
 7291  browserTag
 7292  callAI
 7320  thumb
 7322  coupleInfo
 7338  mqParts
 7343  magAnswers
 7362  fetchCarte
 7372  fetchVilles
 7384  storyPrompt
 7425  magFacts
 7435  magazinePrompt
 7457  cleanMag
 7458  s
 7470  captionPhotos
 7492  defaultStory
 7529  runGeneration
 7597  showIssue
 7610  isWide
 7611  snap
 7613  H
 7614  commit
 7615  restore
 7616  undo
 7617  redo
 7618  updUndo
 7623  visible
 7631  mountPage
 7636  scaleHost
 7645  drawStage
 7659  drawThumb
 7663  drawStrip
 7670  markStrip
 7676  drawThemes
 7681  revealStage
 7687  drawAll
 7688  refreshPage
 7690  afterSlotEdit
 7697  go
 7698  step
 7703  highlightSel
 7713  drawTools
 7764  rewrite
 7781  swapPhoto
 7790  movePage
 7800  bindEditor
 7973  openReader
 7976  draw
 7980  close
 7982  next
 7998  renderBookPreview
 8016  idb
 8017  idbSet
 8018  idbGet
 8019  idbDel
 8020  saveLocal
 8026  offerResume
 8063  proposerMagazine
 8093  lisible
 8101  hdCopie
 8106  photoAEnvoyer
 8126  dataUrlToBlob
 8130  relais
 8136  uploadPhotos
 8139  todo
 8146  worker
 8178  nstBake
 8236  docHtml
 8245  printHtml
 8246  innerHtml
 8248  spineStyle
 8252  spineText
 8253  defaultSpine
 8254  coverHtml
 8270  paInnerHtml
 8277  paSheet
 8285  paCoverHtml
 8295  optSlot
 8301  afficheHtml
 8309  cadreHtml
 8313  aimantHtml
 8314  generateAlbumPDF
 8325  gen
 8332  doc
 8333  tries
 8376  processPayment
 8382  vers
 8435  goTab
 8462  lang
 8472  img
 8497  stop
 8528  upd
 8556  apply
 8575  T
 8576  nm
 8577  renderQuiz
 8583  mark
 8589  save
 8636  mail
 8801  backLbl
 8806  toc
 8813  show
 8820  openLegal
 8828  hideLegal
 8829  closeLegal
 8857  cur
 8866  paint
 8891  lang
 8896  applyUI
 8903  setLang
 8926  syncStory
 8962  ensureStoryFor
 8978  recompose
 8992  addInput
 9021  removePhoto
 9038  selectPricing
 9089  fixTexts
 9122  saveLink
 9123  q
 9161  fermer
 9181  openFromLink
 9191  set
 9209  trHide
 9211  trackOverlay
 9219  close
 9258  ouvrir
 9288  ekLabel
 9301  drawEbar
 9326  coach
 9332  done
 9338  goTab
 9347  draw
 9378  payLabel
 9420  optTotal
 9422  drawOpts
 9447  fillOptImgs
 9460  pickOptPhoto
 9483  selectFormat
 9492  highlightPal
 9497  setLang
 9512  lang
 9525  spineColors
 9552  sampleCover
 9571  auto
 9572  build
 9579  name
 9595  words
 9602  apply
 9629  build
 9638  nst70
 9658  names
 9659  renderLive
 9672  flowMode
 9681  exifDate
 9691  readAscii
 9692  scan
 9709  addPhotos
 9718  remap
 9719  applyOrder
 9732  movePhoto
 9735  sortByDate
 9744  renderPhotosPlus
 9783  startGenAnim
 9795  tick
 9803  stopGenAnim
 9805  runGeneration
 9810  noel
 9813  noelApres
 9818  fill
 9821  renderSummary
 9834  syncPrice
 9851  cadeauLien
 9860  goTab
 9882  setLang
 9899  lang
 9930  applyText
 9939  fromFrance
 9947  fromOSM
 9966  close
 9967  render
 9975  pick
 9983  search
10028  etape

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
