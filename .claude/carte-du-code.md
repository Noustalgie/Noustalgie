# Carte de public/index.html

Générée automatiquement (8547 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1729 : <style> (131 Ko)
- lignes 1730-1749 : <script type="application/ld+json"> (1 Ko)
- lignes 1750-1837 : <script type="application/ld+json"> (4 Ko)
- lignes 2379-4543 : <script> (182 Ko)
- lignes 4544-5859 : <script> (121 Ko)
- lignes 5860-8521 : <script> (226 Ko)
- lignes 8522-8544 : <script> (1 Ko)

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
 1415  v5.4 — lisibilité
 1420  v5.5 — finitions demandées
 1446  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1624  galerie d'accueil : lien vers l'album d'exemple complet
 1718  Fond du site (choix de Gabin) : le couple dans la montagne, flouté dans le fichier même et voilé, fixe derrièr
 4864  Style Magazine : le livre comme un magazine de couple
 6035  1. Import des photos : une version écran + une version impression
 6325  2. Génération : histoire + légendes à partir des photos
 6637  3. Éditeur
 7045  4. Sauvegarde locale (IndexedDB : photos comprises)
 7080  5. Impression : photos en pleine résolution + PDF hébergé
 7181  6. Paiement
 8086  1. Livre 3D réutilisable
 8183  2. Aperçu en direct pendant la création (ordinateur)
 8217  3. Photos : date de prise de vue, couverture, glisser-déposer
 8319  4. Génération vivante : leurs photos se posent dans un livre
 8345  5. Récapitulatif de commande avec LEUR couverture
 8373  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1865  <header>
 1866  <nav class="ed-nav">
 1888  <main id="main" tabindex="-1">
 1890  <section class="ed-hero">
 1899  <div class="nst-demo" id="nstDemo"
 1905  <section class="nst-how nst-frise" id="how">
 1919  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1941  <section class="ed-price" id="pricing">
 1974  <section class="section app-section" id="app">
 2001  <div class="panel active" id="panel0"
 2086  <div class="panel" id="panel1"
 2127  <div class="panel" id="panel2"
 2153  <div class="panel" id="panel3"
 2154  <div id="nstEd"
 2181  <div class="panel" id="panel4"
 2183  <div id="payForm"
 2261  <section class="ed-faq-section" id="faq">
 2309  <footer>
 2358  <div class="legal-overlay" id="legalOverlay"
 2364  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2384  LANGS.fr
 2471  LANGS.en
 2558  LANGS.de
 2645  LANGS.es
 2732  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2823  toggleLangMenu
 2824  pickLang
 2826  setLang
 2865  highlightPal
 2885  selectPricing
 2900  onSlider
 2913  onInAppSlider
 2936  animNum
 2942  toggleCmp
 2961  saveDraft
 2980  restoreDraft
 2987  set
 2995  clearDraft
 3019  goTab
 3058  edPickPrice
 3064  toggleFaq
 3065  startApp
 3070  addPhotosFromEditor
 3103  ensureConvertible
 3121  detectFocalY
 3141  showUploadLoader
 3153  hideUploadLoader
 3157  addPhotos
 3165  processBatch
 3202  getMinPhotos
 3206  renderPhotos
 3222  removePhoto
 3228  openMsgModal
 3229  closeMsgModal
 3230  saveMsgModal
 3235  selStyle
 3240  log
 3250  setProgress
 3261  api
 3291  runGeneration
 3523  renderBookPreview
 3533  pg
 3540  _take
 3551  pickIdx
 3557  ph
 3558  imgT
 3567  img
 3576  wantTall
 3577  wantSquare
 3578  wantWide
 3983  avRender
 4020  reapplyTexts
 4021  avBuildThumbs
 4034  avNext
 4035  avPrev
 4042  toggleEditor
 4043  edTab
 4044  refreshEditor
 4045  refreshTextFields
 4073  estRows
 4082  liveText
 4095  setActiveSlot
 4096  edSelectPhoto
 4097  updateFilter
 4098  updateCrop
 4099  updateZoom
 4100  toggleBW
 4101  applySlotEditsToDOM
 4105  saveTextStyle
 4106  updateTextStyle
 4107  toggleTextStyle
 4108  setTextSize
 4118  applyTextStylesToDOM
 4119  edSelectLayout
 4120  applyEdit
 4121  applyLayoutOverride
 4122  applyTextLive
 4123  resetEdit
 4127  initCropGestures
 4131  editorOpen
 4132  curSlot
 4140  snapshotPage
 4141  undoEdit
 4143  openFullPreview
 4150  base64ToBlob
 4162  fetchWithTimeout
 4177  processPayment
 4276  generateAlbumPDF
 4283  compressPhotoForPdf
 4347  generateAlbumPDF_UNUSED
 4414  applyPromo
 4435  selectFormat
 4457  updateFormatPrices
 4471  generateFinalPDF
 4488  addPage
 4514  openLegal
 4515  closeLegal
 4554  clamp
 4600  curLang
 4607  themeKey
 4608  theme
 4609  photos
 4611  printSrc
 4623  faceSpan
 4626  autoPos
 4631  fit
 4634  L
 4657  cropCost
 4672  slot
 4693  tx
 4700  fit
 4701  orientOf
 4868  MT
 4870  mix
 4881  MONTHS
 4885  svgHeart
 4886  svgHeartLine
 4887  svgCurl
 4888  tape
 4890  polaroid
 4897  barcode
 4906  heartMap
 4918  wordGrid
 4920  rnd
 4946  folio
 4962  col
 4966  seal
 5075  ic
 5140  mark
 5262  fmtCoord
 5266  k3Line
 5273  yearPhotos
 5284  kmBetween
 5289  villesT
 5296  planMagazine
 5378  again
 5379  freshOr
 5380  pick
 5384  mk
 5392  L
 5482  renderPage
 5501  tierOf
 5502  photoPageCount
 5503  minPhotos
 5506  distribute
 5522  pickLayout
 5539  chooseLayout
 5552  mkPage
 5556  plan
 5592  tag
 5595  takePhoto
 5666  pairOf
 5668  relayout
 5674  makeSpread
 5692  unmakeSpread
 5708  syncSpread
 5716  fixSpreads
 5755  loadDetector
 5760  go
 5770  loadImg
 5774  saliency
 5801  subjectFromFaces
 5810  analyze
 5836  analyzeAll
 6008  t
 6029  lang
 6030  nPagesSel
 6031  promo
 6036  loadImage
 6038  toJpeg
 6060  was
 6077  pickerBack
 6093  showPickHelp
 6102  close
 6124  within
 6125  decodeFile
 6155  hdBlob
 6165  importFile
 6186  toast
 6199  geom
 6204  prepThumb
 6210  prepFull
 6216  dropPhoto
 6222  tile
 6231  pump
 6259  pump2
 6279  addPhotos
 6312  renderPhotos
 6331  browserTag
 6332  callAI
 6360  thumb
 6362  coupleInfo
 6376  mqParts
 6381  magAnswers
 6400  fetchCarte
 6410  fetchVilles
 6422  storyPrompt
 6461  magFacts
 6471  magazinePrompt
 6493  cleanMag
 6494  s
 6506  captionPhotos
 6528  defaultStory
 6563  runGeneration
 6627  showIssue
 6640  isWide
 6641  snap
 6643  H
 6644  commit
 6645  restore
 6646  undo
 6647  redo
 6648  updUndo
 6653  visible
 6661  mountPage
 6666  scaleHost
 6675  drawStage
 6689  drawThumb
 6693  drawStrip
 6700  markStrip
 6706  drawThemes
 6711  revealStage
 6717  drawAll
 6718  refreshPage
 6720  afterSlotEdit
 6727  go
 6728  step
 6733  highlightSel
 6743  drawTools
 6793  rewrite
 6810  swapPhoto
 6821  movePage
 6831  bindEditor
 7004  openReader
 7007  draw
 7011  close
 7013  next
 7029  renderBookPreview
 7047  idb
 7048  idbSet
 7049  idbGet
 7050  idbDel
 7051  saveLocal
 7057  offerResume
 7081  fullBlob
 7099  dataUrlToBlob
 7100  uploadPhotos
 7102  todo
 7108  worker
 7131  docHtml
 7137  printHtml
 7138  innerHtml
 7140  spineStyle
 7144  spineText
 7145  defaultSpine
 7146  coverHtml
 7154  generateAlbumPDF
 7160  gen
 7191  processPayment
 7231  goTab
 7258  lang
 7268  img
 7293  stop
 7324  upd
 7350  apply
 7369  T
 7370  nm
 7371  renderQuiz
 7377  mark
 7383  save
 7430  mail
 7577  backLbl
 7582  toc
 7589  show
 7596  openLegal
 7604  hideLegal
 7605  closeLegal
 7633  cur
 7642  paint
 7667  lang
 7672  applyUI
 7679  setLang
 7699  syncStory
 7733  ensureStoryFor
 7749  recompose
 7763  addInput
 7782  removePhoto
 7835  saveLink
 7857  openFromLink
 7867  set
 7885  trHide
 7887  trackOverlay
 7895  close
 7932  ouvrir
 7958  ekLabel
 7969  drawEbar
 7994  coach
 8000  done
 8006  goTab
 8015  draw
 8043  payLabel
 8054  highlightPal
 8059  setLang
 8074  lang
 8087  spineColors
 8114  sampleCover
 8133  auto
 8134  build
 8141  name
 8167  build
 8176  nst70
 8196  names
 8197  renderLive
 8210  flowMode
 8219  exifDate
 8229  readAscii
 8230  scan
 8247  addPhotos
 8256  remap
 8257  applyOrder
 8270  movePhoto
 8273  sortByDate
 8282  renderPhotosPlus
 8321  startGenAnim
 8333  tick
 8341  stopGenAnim
 8343  runGeneration
 8346  renderSummary
 8359  syncPrice
 8369  goTab
 8391  setLang
 8408  lang
 8439  applyText
 8448  fromFrance
 8456  fromOSM
 8475  close
 8476  render
 8484  pick
 8492  search
 8528  etape

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
