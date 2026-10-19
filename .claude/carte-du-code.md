# Carte de public/index.html

Générée automatiquement (8507 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1712 : <style> (129 Ko)
- lignes 1713-1732 : <script type="application/ld+json"> (1 Ko)
- lignes 1733-1820 : <script type="application/ld+json"> (4 Ko)
- lignes 2362-4526 : <script> (182 Ko)
- lignes 4527-5842 : <script> (121 Ko)
- lignes 5843-8481 : <script> (221 Ko)
- lignes 8482-8504 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  678  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  820  FORCE FINALE : champs texte éditeur toujours sombres
  830  PANNEAUX EDITEUR : fond noir uniforme
  866  v1.1 — accessibilité & confort
  873  Noustalgie v2 — éditeur d'album
  975  v2.2 — édition au doigt
 1003  v3.3 — album : lien, format, photos, glisser-déposer, suivi
 1031  v2.2 — système de design du site
 1081  v2.3 — boutons pilule
 1090  v2.3 — galerie de vraies pages
 1105  v2.3 — garanties
 1111  v2.3 — tarifs actionnables
 1115  v2.3 — barre d'action mobile
 1128  v2.4 — hero : couverture du livre fermé
 1136  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1155  v2.5 — sélecteur de langue
 1165  v2.5 — pages d'information
 1207  v2.6 — « Comment ça marche »
 1239  v2.7 — « Comment ça marche » en frise éditoriale
 1259  v3 — indications sous les questions
 1260  v4 — livre 3D
 1284  v4 — tarifs : épaisseur réelle
 1288  v4 — aperçu en direct
 1299  v4 — photos
 1309  v4 — génération vivante
 1319  v4 — récapitulatif de commande
 1327  v4 — étapes
 1335  v4 — apparition au défilement et page tournée
 1345  v4.3 — suggestions d'adresse
 1359  v4.5 — message d'import
 1369  v4.7 — correctifs téléphone
 1385  v4.8 — édition évidente
 1404  v5.2 — photos non transmises par l'iPhone
 1413  v5.4 — lisibilité
 1418  v5.5 — finitions demandées
 1444  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1622  galerie d'accueil : lien vers l'album d'exemple complet
 4847  Style Magazine : le livre comme un magazine de couple
 6018  1. Import des photos : une version écran + une version impression
 6287  2. Génération : histoire + légendes à partir des photos
 6599  3. Éditeur
 7007  4. Sauvegarde locale (IndexedDB : photos comprises)
 7042  5. Impression : photos en pleine résolution + PDF hébergé
 7143  6. Paiement
 8046  1. Livre 3D réutilisable
 8143  2. Aperçu en direct pendant la création (ordinateur)
 8177  3. Photos : date de prise de vue, couverture, glisser-déposer
 8279  4. Génération vivante : leurs photos se posent dans un livre
 8305  5. Récapitulatif de commande avec LEUR couverture
 8333  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1848  <header>
 1849  <nav class="ed-nav">
 1871  <main id="main" tabindex="-1">
 1873  <section class="ed-hero">
 1882  <div class="nst-demo" id="nstDemo"
 1888  <section class="nst-how nst-frise" id="how">
 1902  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1924  <section class="ed-price" id="pricing">
 1957  <section class="section app-section" id="app">
 1984  <div class="panel active" id="panel0"
 2069  <div class="panel" id="panel1"
 2110  <div class="panel" id="panel2"
 2136  <div class="panel" id="panel3"
 2137  <div id="nstEd"
 2164  <div class="panel" id="panel4"
 2166  <div id="payForm"
 2244  <section class="ed-faq-section" id="faq">
 2292  <footer>
 2341  <div class="legal-overlay" id="legalOverlay"
 2347  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2367  LANGS.fr
 2454  LANGS.en
 2541  LANGS.de
 2628  LANGS.es
 2715  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2806  toggleLangMenu
 2807  pickLang
 2809  setLang
 2848  highlightPal
 2868  selectPricing
 2883  onSlider
 2896  onInAppSlider
 2919  animNum
 2925  toggleCmp
 2944  saveDraft
 2963  restoreDraft
 2970  set
 2978  clearDraft
 3002  goTab
 3041  edPickPrice
 3047  toggleFaq
 3048  startApp
 3053  addPhotosFromEditor
 3086  ensureConvertible
 3104  detectFocalY
 3124  showUploadLoader
 3136  hideUploadLoader
 3140  addPhotos
 3148  processBatch
 3185  getMinPhotos
 3189  renderPhotos
 3205  removePhoto
 3211  openMsgModal
 3212  closeMsgModal
 3213  saveMsgModal
 3218  selStyle
 3223  log
 3233  setProgress
 3244  api
 3274  runGeneration
 3506  renderBookPreview
 3516  pg
 3523  _take
 3534  pickIdx
 3540  ph
 3541  imgT
 3550  img
 3559  wantTall
 3560  wantSquare
 3561  wantWide
 3966  avRender
 4003  reapplyTexts
 4004  avBuildThumbs
 4017  avNext
 4018  avPrev
 4025  toggleEditor
 4026  edTab
 4027  refreshEditor
 4028  refreshTextFields
 4056  estRows
 4065  liveText
 4078  setActiveSlot
 4079  edSelectPhoto
 4080  updateFilter
 4081  updateCrop
 4082  updateZoom
 4083  toggleBW
 4084  applySlotEditsToDOM
 4088  saveTextStyle
 4089  updateTextStyle
 4090  toggleTextStyle
 4091  setTextSize
 4101  applyTextStylesToDOM
 4102  edSelectLayout
 4103  applyEdit
 4104  applyLayoutOverride
 4105  applyTextLive
 4106  resetEdit
 4110  initCropGestures
 4114  editorOpen
 4115  curSlot
 4123  snapshotPage
 4124  undoEdit
 4126  openFullPreview
 4133  base64ToBlob
 4145  fetchWithTimeout
 4160  processPayment
 4259  generateAlbumPDF
 4266  compressPhotoForPdf
 4330  generateAlbumPDF_UNUSED
 4397  applyPromo
 4418  selectFormat
 4440  updateFormatPrices
 4454  generateFinalPDF
 4471  addPage
 4497  openLegal
 4498  closeLegal
 4537  clamp
 4583  curLang
 4590  themeKey
 4591  theme
 4592  photos
 4594  printSrc
 4606  faceSpan
 4609  autoPos
 4614  fit
 4617  L
 4640  cropCost
 4655  slot
 4676  tx
 4683  fit
 4684  orientOf
 4851  MT
 4853  mix
 4864  MONTHS
 4868  svgHeart
 4869  svgHeartLine
 4870  svgCurl
 4871  tape
 4873  polaroid
 4880  barcode
 4889  heartMap
 4901  wordGrid
 4903  rnd
 4929  folio
 4945  col
 4949  seal
 5058  ic
 5123  mark
 5245  fmtCoord
 5249  k3Line
 5256  yearPhotos
 5267  kmBetween
 5272  villesT
 5279  planMagazine
 5361  again
 5362  freshOr
 5363  pick
 5367  mk
 5375  L
 5465  renderPage
 5484  tierOf
 5485  photoPageCount
 5486  minPhotos
 5489  distribute
 5505  pickLayout
 5522  chooseLayout
 5535  mkPage
 5539  plan
 5575  tag
 5578  takePhoto
 5649  pairOf
 5651  relayout
 5657  makeSpread
 5675  unmakeSpread
 5691  syncSpread
 5699  fixSpreads
 5738  loadDetector
 5743  go
 5753  loadImg
 5757  saliency
 5784  subjectFromFaces
 5793  analyze
 5819  analyzeAll
 5991  t
 6012  lang
 6013  nPagesSel
 6014  promo
 6019  loadImage
 6021  toJpeg
 6043  was
 6060  pickerBack
 6071  showPickHelp
 6076  close
 6090  within
 6091  decodeFile
 6121  hdBlob
 6131  importFile
 6152  toast
 6165  geom
 6170  prepThumb
 6176  prepFull
 6182  dropPhoto
 6188  tile
 6197  pump
 6224  pump2
 6244  addPhotos
 6274  renderPhotos
 6293  browserTag
 6294  callAI
 6322  thumb
 6324  coupleInfo
 6338  mqParts
 6343  magAnswers
 6362  fetchCarte
 6372  fetchVilles
 6384  storyPrompt
 6423  magFacts
 6433  magazinePrompt
 6455  cleanMag
 6456  s
 6468  captionPhotos
 6490  defaultStory
 6525  runGeneration
 6589  showIssue
 6602  isWide
 6603  snap
 6605  H
 6606  commit
 6607  restore
 6608  undo
 6609  redo
 6610  updUndo
 6615  visible
 6623  mountPage
 6628  scaleHost
 6637  drawStage
 6651  drawThumb
 6655  drawStrip
 6662  markStrip
 6668  drawThemes
 6673  revealStage
 6679  drawAll
 6680  refreshPage
 6682  afterSlotEdit
 6689  go
 6690  step
 6695  highlightSel
 6705  drawTools
 6755  rewrite
 6772  swapPhoto
 6783  movePage
 6793  bindEditor
 6966  openReader
 6969  draw
 6973  close
 6975  next
 6991  renderBookPreview
 7009  idb
 7010  idbSet
 7011  idbGet
 7012  idbDel
 7013  saveLocal
 7019  offerResume
 7043  fullBlob
 7061  dataUrlToBlob
 7062  uploadPhotos
 7064  todo
 7070  worker
 7093  docHtml
 7099  printHtml
 7100  innerHtml
 7102  spineStyle
 7106  spineText
 7107  defaultSpine
 7108  coverHtml
 7116  generateAlbumPDF
 7122  gen
 7153  processPayment
 7193  goTab
 7220  lang
 7230  img
 7255  stop
 7286  upd
 7312  apply
 7331  T
 7332  nm
 7333  renderQuiz
 7339  mark
 7345  save
 7390  mail
 7537  backLbl
 7542  toc
 7549  show
 7556  openLegal
 7564  hideLegal
 7565  closeLegal
 7593  cur
 7602  paint
 7627  lang
 7632  applyUI
 7639  setLang
 7659  syncStory
 7693  ensureStoryFor
 7709  recompose
 7723  addInput
 7742  removePhoto
 7795  saveLink
 7817  openFromLink
 7827  set
 7845  trHide
 7847  trackOverlay
 7855  close
 7892  ouvrir
 7918  ekLabel
 7929  drawEbar
 7954  coach
 7960  done
 7966  goTab
 7975  draw
 8003  payLabel
 8014  highlightPal
 8019  setLang
 8034  lang
 8047  spineColors
 8074  sampleCover
 8093  auto
 8094  build
 8101  name
 8127  build
 8136  nst70
 8156  names
 8157  renderLive
 8170  flowMode
 8179  exifDate
 8189  readAscii
 8190  scan
 8207  addPhotos
 8216  remap
 8217  applyOrder
 8230  movePhoto
 8233  sortByDate
 8242  renderPhotosPlus
 8281  startGenAnim
 8293  tick
 8301  stopGenAnim
 8303  runGeneration
 8306  renderSummary
 8319  syncPrice
 8329  goTab
 8351  setLang
 8368  lang
 8399  applyText
 8408  fromFrance
 8416  fromOSM
 8435  close
 8436  render
 8444  pick
 8452  search
 8488  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/order.js (35 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (42 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (144 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (82 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (24 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (249 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
