# Carte de public/index.html

Générée automatiquement (8501 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1712 : <style> (129 Ko)
- lignes 1713-1732 : <script type="application/ld+json"> (1 Ko)
- lignes 1733-1820 : <script type="application/ld+json"> (4 Ko)
- lignes 2362-4526 : <script> (182 Ko)
- lignes 4527-5841 : <script> (121 Ko)
- lignes 5842-8478 : <script> (220 Ko)
- lignes 8479-8498 : <script> (1 Ko)

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
 4846  Style Magazine : le livre comme un magazine de couple
 6017  1. Import des photos : une version écran + une version impression
 6286  2. Génération : histoire + légendes à partir des photos
 6598  3. Éditeur
 7006  4. Sauvegarde locale (IndexedDB : photos comprises)
 7041  5. Impression : photos en pleine résolution + PDF hébergé
 7142  6. Paiement
 8043  1. Livre 3D réutilisable
 8140  2. Aperçu en direct pendant la création (ordinateur)
 8174  3. Photos : date de prise de vue, couverture, glisser-déposer
 8276  4. Génération vivante : leurs photos se posent dans un livre
 8302  5. Récapitulatif de commande avec LEUR couverture
 8330  6. Finitions : apparition au défilement, page tournée

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
 4850  MT
 4852  mix
 4863  MONTHS
 4867  svgHeart
 4868  svgHeartLine
 4869  svgCurl
 4870  tape
 4872  polaroid
 4879  barcode
 4888  heartMap
 4900  wordGrid
 4902  rnd
 4928  folio
 4944  col
 4948  seal
 5057  ic
 5122  mark
 5244  fmtCoord
 5248  k3Line
 5255  yearPhotos
 5266  kmBetween
 5271  villesT
 5278  planMagazine
 5360  again
 5361  freshOr
 5362  pick
 5366  mk
 5374  L
 5464  renderPage
 5483  tierOf
 5484  photoPageCount
 5485  minPhotos
 5488  distribute
 5504  pickLayout
 5521  chooseLayout
 5534  mkPage
 5538  plan
 5574  tag
 5577  takePhoto
 5648  pairOf
 5650  relayout
 5656  makeSpread
 5674  unmakeSpread
 5690  syncSpread
 5698  fixSpreads
 5737  loadDetector
 5742  go
 5752  loadImg
 5756  saliency
 5783  subjectFromFaces
 5792  analyze
 5818  analyzeAll
 5990  t
 6011  lang
 6012  nPagesSel
 6013  promo
 6018  loadImage
 6020  toJpeg
 6042  was
 6059  pickerBack
 6070  showPickHelp
 6075  close
 6089  within
 6090  decodeFile
 6120  hdBlob
 6130  importFile
 6151  toast
 6164  geom
 6169  prepThumb
 6175  prepFull
 6181  dropPhoto
 6187  tile
 6196  pump
 6223  pump2
 6243  addPhotos
 6273  renderPhotos
 6292  browserTag
 6293  callAI
 6321  thumb
 6323  coupleInfo
 6337  mqParts
 6342  magAnswers
 6361  fetchCarte
 6371  fetchVilles
 6383  storyPrompt
 6422  magFacts
 6432  magazinePrompt
 6454  cleanMag
 6455  s
 6467  captionPhotos
 6489  defaultStory
 6524  runGeneration
 6588  showIssue
 6601  isWide
 6602  snap
 6604  H
 6605  commit
 6606  restore
 6607  undo
 6608  redo
 6609  updUndo
 6614  visible
 6622  mountPage
 6627  scaleHost
 6636  drawStage
 6650  drawThumb
 6654  drawStrip
 6661  markStrip
 6667  drawThemes
 6672  revealStage
 6678  drawAll
 6679  refreshPage
 6681  afterSlotEdit
 6688  go
 6689  step
 6694  highlightSel
 6704  drawTools
 6754  rewrite
 6771  swapPhoto
 6782  movePage
 6792  bindEditor
 6965  openReader
 6968  draw
 6972  close
 6974  next
 6990  renderBookPreview
 7008  idb
 7009  idbSet
 7010  idbGet
 7011  idbDel
 7012  saveLocal
 7018  offerResume
 7042  fullBlob
 7060  dataUrlToBlob
 7061  uploadPhotos
 7063  todo
 7069  worker
 7092  docHtml
 7098  printHtml
 7099  innerHtml
 7101  spineStyle
 7105  spineText
 7106  defaultSpine
 7107  coverHtml
 7115  generateAlbumPDF
 7121  gen
 7152  processPayment
 7192  goTab
 7219  lang
 7229  img
 7254  stop
 7285  upd
 7311  apply
 7330  T
 7331  nm
 7332  renderQuiz
 7338  mark
 7344  save
 7389  mail
 7534  backLbl
 7539  toc
 7546  show
 7553  openLegal
 7561  hideLegal
 7562  closeLegal
 7590  cur
 7599  paint
 7624  lang
 7629  applyUI
 7636  setLang
 7656  syncStory
 7690  ensureStoryFor
 7706  recompose
 7720  addInput
 7739  removePhoto
 7792  saveLink
 7814  openFromLink
 7824  set
 7842  trHide
 7844  trackOverlay
 7852  close
 7889  ouvrir
 7915  ekLabel
 7926  drawEbar
 7951  coach
 7957  done
 7963  goTab
 7972  draw
 8000  payLabel
 8011  highlightPal
 8016  setLang
 8031  lang
 8044  spineColors
 8071  sampleCover
 8090  auto
 8091  build
 8098  name
 8124  build
 8133  nst70
 8153  names
 8154  renderLive
 8167  flowMode
 8176  exifDate
 8186  readAscii
 8187  scan
 8204  addPhotos
 8213  remap
 8214  applyOrder
 8227  movePhoto
 8230  sortByDate
 8239  renderPhotosPlus
 8278  startGenAnim
 8290  tick
 8298  stopGenAnim
 8300  runGeneration
 8303  renderSummary
 8316  syncPrice
 8326  goTab
 8348  setLang
 8365  lang
 8396  applyText
 8405  fromFrance
 8413  fromOSM
 8432  close
 8433  render
 8441  pick
 8449  search
 8485  etape

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
