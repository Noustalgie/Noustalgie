# Carte de public/index.html

Générée automatiquement (10055 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1708 : <style> (143 Ko)
- lignes 1709-1782 : <script type="application/ld+json"> (2 Ko)
- lignes 1783-1886 : <script type="application/ld+json"> (6 Ko)
- lignes 2472-4645 : <script> (190 Ko)
- lignes 4646-6782 : <script> (213 Ko)
- lignes 6783-10014 : <script> (288 Ko)
- lignes 10015-10052 : <script> (3 Ko)

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
 5510  Magazine v2 : pages pleine page, photos posées sur des photos, fonds de couleur
 5871  Pages « objets » : roses, nœud de dentelle, enveloppe, cachet de cire, carte postale
 6978  1. Import des photos : une version écran + une version impression
 7287  2. Génération : histoire + légendes à partir des photos
 7609  3. Éditeur
 8016  4. Sauvegarde locale (IndexedDB : photos comprises)
 8090  5. Impression : photos en pleine résolution + PDF hébergé
 8366  6. Paiement
 9526  1. Livre 3D réutilisable
 9647  2. Aperçu en direct pendant la création (ordinateur)
 9681  3. Photos : date de prise de vue, couverture, glisser-déposer
 9783  4. Génération vivante : leurs photos se posent dans un livre
 9809  5. Récapitulatif de commande avec LEUR couverture
 9866  6. Finitions : apparition au défilement, page tournée

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
 5516  mixc
 5517  rgba
 5522  VEIL
 5524  ratioOf
 5525  boxFor
 5527  polaDims
 5528  pola
 5537  booth
 5546  motif
 5552  sticker
 5559  txh
 5566  cadreOr
 5574  plaque
 5583  rond
 5726  row
 5744  cell
 5772  stat
 5812  laurel
 5828  sun
 5829  cloud
 5830  heart
 5881  rose
 5889  petal
 5902  feuille
 5911  noeud
 5931  cachet
 5947  envDos
 5955  envFace
 5964  timbre
 5974  tampon
 5986  haut
 6042  tige
 6063  fmtCoord
 6067  k3Line
 6074  yearPhotos
 6084  parseMeet
 6095  kmBetween
 6100  villesT
 6107  planMagazine
 6165  st
 6219  again
 6220  freshOr
 6221  pick
 6226  mk
 6237  meetTxt
 6240  L
 6378  renderPage
 6399  tierOf
 6400  photoPageCount
 6401  minPhotos
 6404  distribute
 6420  pickLayout
 6447  pickMag
 6460  chooseLayout
 6473  mkPage
 6477  plan
 6513  tag
 6516  takePhoto
 6587  pairOf
 6589  magAlbum
 6590  relayout
 6596  makeSpread
 6614  unmakeSpread
 6630  syncSpread
 6638  fixSpreads
 6678  loadDetector
 6683  go
 6693  loadImg
 6697  saliency
 6724  subjectFromFaces
 6733  analyze
 6759  analyzeAll
 6951  t
 6972  lang
 6973  nPagesSel
 6974  promo
 6979  loadImage
 6981  toJpeg
 7003  was
 7020  pickerBack
 7036  showPickHelp
 7045  close
 7067  within
 7068  decodeFile
 7098  hdBlob
 7108  importFile
 7129  toast
 7142  geom
 7147  prepThumb
 7153  prepFull
 7159  dropPhoto
 7165  tile
 7174  pump
 7202  pump2
 7222  addPhotos
 7255  renderPhotos
 7268  drawUp36
 7293  browserTag
 7294  callAI
 7322  thumb
 7324  coupleInfo
 7340  mqParts
 7345  magAnswers
 7364  fetchCarte
 7374  fetchVilles
 7386  storyPrompt
 7427  magFacts
 7437  magazinePrompt
 7459  cleanMag
 7460  s
 7472  captionPhotos
 7494  defaultStory
 7531  runGeneration
 7599  showIssue
 7612  isWide
 7613  snap
 7615  H
 7616  commit
 7617  restore
 7618  undo
 7619  redo
 7620  updUndo
 7625  visible
 7633  mountPage
 7638  scaleHost
 7647  drawStage
 7661  drawThumb
 7665  drawStrip
 7672  markStrip
 7678  drawThemes
 7683  revealStage
 7689  drawAll
 7690  refreshPage
 7692  afterSlotEdit
 7699  go
 7700  step
 7705  highlightSel
 7715  drawTools
 7766  rewrite
 7783  swapPhoto
 7792  movePage
 7802  bindEditor
 7975  openReader
 7978  draw
 7982  close
 7984  next
 8000  renderBookPreview
 8018  idb
 8019  idbSet
 8020  idbGet
 8021  idbDel
 8022  saveLocal
 8028  offerResume
 8065  proposerMagazine
 8095  lisible
 8103  hdCopie
 8108  photoAEnvoyer
 8128  dataUrlToBlob
 8132  relais
 8138  uploadPhotos
 8141  todo
 8148  worker
 8180  nstBake
 8238  docHtml
 8247  printHtml
 8248  innerHtml
 8250  spineStyle
 8254  spineText
 8255  defaultSpine
 8256  coverHtml
 8272  paInnerHtml
 8279  paSheet
 8287  paCoverHtml
 8297  optSlot
 8303  afficheHtml
 8311  cadreHtml
 8315  aimantHtml
 8316  generateAlbumPDF
 8327  gen
 8334  doc
 8335  tries
 8378  processPayment
 8384  vers
 8437  goTab
 8464  lang
 8474  img
 8499  stop
 8530  upd
 8558  apply
 8577  T
 8578  nm
 8579  renderQuiz
 8585  mark
 8591  save
 8638  mail
 8803  backLbl
 8808  toc
 8815  show
 8822  openLegal
 8830  hideLegal
 8831  closeLegal
 8859  cur
 8868  paint
 8893  lang
 8898  applyUI
 8905  setLang
 8928  syncStory
 8964  ensureStoryFor
 8980  recompose
 8994  addInput
 9023  removePhoto
 9040  selectPricing
 9091  fixTexts
 9124  saveLink
 9125  q
 9163  fermer
 9183  openFromLink
 9193  set
 9211  trHide
 9213  trackOverlay
 9221  close
 9260  ouvrir
 9290  ekLabel
 9303  drawEbar
 9328  coach
 9334  done
 9340  goTab
 9349  draw
 9380  payLabel
 9422  optTotal
 9424  drawOpts
 9449  fillOptImgs
 9462  pickOptPhoto
 9485  selectFormat
 9494  highlightPal
 9499  setLang
 9514  lang
 9527  spineColors
 9554  sampleCover
 9573  auto
 9574  build
 9581  name
 9597  words
 9604  apply
 9631  build
 9640  nst70
 9660  names
 9661  renderLive
 9674  flowMode
 9683  exifDate
 9693  readAscii
 9694  scan
 9711  addPhotos
 9720  remap
 9721  applyOrder
 9734  movePhoto
 9737  sortByDate
 9746  renderPhotosPlus
 9785  startGenAnim
 9797  tick
 9805  stopGenAnim
 9807  runGeneration
 9812  noel
 9815  noelApres
 9820  fill
 9823  renderSummary
 9836  syncPrice
 9853  cadeauLien
 9862  goTab
 9884  setLang
 9901  lang
 9932  applyText
 9941  fromFrance
 9949  fromOSM
 9968  close
 9969  render
 9977  pick
 9985  search
10030  etape

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
