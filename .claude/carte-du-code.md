# Carte de public/index.html

Générée automatiquement (8629 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1613 : <style> (133 Ko)
- lignes 1614-1686 : <script type="application/ld+json"> (2 Ko)
- lignes 1687-1782 : <script type="application/ld+json"> (6 Ko)
- lignes 2330-4502 : <script> (186 Ko)
- lignes 4503-5828 : <script> (122 Ko)
- lignes 5829-8600 : <script> (236 Ko)
- lignes 8601-8626 : <script> (2 Ko)

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
 4830  Style Magazine : le livre comme un magazine de couple
 6004  1. Import des photos : une version écran + une version impression
 6294  2. Génération : histoire + légendes à partir des photos
 6606  3. Éditeur
 7014  4. Sauvegarde locale (IndexedDB : photos comprises)
 7049  5. Impression : photos en pleine résolution + PDF hébergé
 7226  6. Paiement
 8131  1. Livre 3D réutilisable
 8252  2. Aperçu en direct pendant la création (ordinateur)
 8286  3. Photos : date de prise de vue, couverture, glisser-déposer
 8388  4. Génération vivante : leurs photos se posent dans un livre
 8414  5. Récapitulatif de commande avec LEUR couverture
 8452  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1810  <header>
 1811  <nav class="ed-nav">
 1833  <main id="main" tabindex="-1">
 1835  <section class="ed-hero">
 1844  <div class="nst-demo" id="nstDemo"
 1850  <section class="nst-how nst-frise" id="how">
 1864  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1887  <section class="ed-price" id="pricing">
 1920  <section class="section app-section" id="app">
 1947  <div class="panel active" id="panel0"
 2032  <div class="panel" id="panel1"
 2073  <div class="panel" id="panel2"
 2099  <div class="panel" id="panel3"
 2100  <div id="nstEd"
 2127  <div class="panel" id="panel4"
 2129  <div id="payForm"
 2207  <section class="ed-faq-section" id="faq">
 2259  <footer>
 2309  <div class="legal-overlay" id="legalOverlay"
 2315  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2335  LANGS.fr
 2423  LANGS.en
 2511  LANGS.de
 2599  LANGS.es
 2687  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2779  toggleLangMenu
 2780  pickLang
 2782  setLang
 2821  highlightPal
 2841  selectPricing
 2856  onSlider
 2869  onInAppSlider
 2892  animNum
 2898  toggleCmp
 2917  saveDraft
 2936  restoreDraft
 2943  set
 2951  clearDraft
 2975  goTab
 3014  edPickPrice
 3020  toggleFaq
 3021  startApp
 3026  addPhotosFromEditor
 3059  ensureConvertible
 3077  detectFocalY
 3097  showUploadLoader
 3109  hideUploadLoader
 3113  addPhotos
 3121  processBatch
 3158  getMinPhotos
 3162  renderPhotos
 3178  removePhoto
 3184  openMsgModal
 3185  closeMsgModal
 3186  saveMsgModal
 3191  selStyle
 3196  log
 3206  setProgress
 3217  api
 3247  runGeneration
 3479  renderBookPreview
 3489  pg
 3496  _take
 3507  pickIdx
 3513  ph
 3514  imgT
 3523  img
 3532  wantTall
 3533  wantSquare
 3534  wantWide
 3939  avRender
 3976  reapplyTexts
 3977  avBuildThumbs
 3990  avNext
 3991  avPrev
 3998  toggleEditor
 3999  edTab
 4000  refreshEditor
 4001  refreshTextFields
 4029  estRows
 4038  liveText
 4051  setActiveSlot
 4052  edSelectPhoto
 4053  updateFilter
 4054  updateCrop
 4055  updateZoom
 4056  toggleBW
 4057  applySlotEditsToDOM
 4061  saveTextStyle
 4062  updateTextStyle
 4063  toggleTextStyle
 4064  setTextSize
 4074  applyTextStylesToDOM
 4075  edSelectLayout
 4076  applyEdit
 4077  applyLayoutOverride
 4078  applyTextLive
 4079  resetEdit
 4083  initCropGestures
 4087  editorOpen
 4088  curSlot
 4096  snapshotPage
 4097  undoEdit
 4099  openFullPreview
 4106  base64ToBlob
 4118  fetchWithTimeout
 4133  processPayment
 4232  generateAlbumPDF
 4239  compressPhotoForPdf
 4303  generateAlbumPDF_UNUSED
 4370  applyPromo
 4391  selectFormat
 4413  updateFormatPrices
 4427  generateFinalPDF
 4444  addPage
 4470  openLegal
 4471  closeLegal
 4513  clamp
 4559  curLang
 4566  themeKey
 4567  theme
 4568  photos
 4573  printSrc
 4585  faceSpan
 4588  autoPos
 4593  fit
 4596  L
 4619  cropCost
 4634  slot
 4659  tx
 4666  fit
 4667  orientOf
 4834  MT
 4836  mix
 4847  MONTHS
 4851  svgHeart
 4852  svgHeartLine
 4853  svgCurl
 4854  tape
 4856  polaroid
 4863  barcode
 4872  heartMap
 4884  wordGrid
 4886  rnd
 4912  folio
 4928  col
 4932  seal
 5041  ic
 5106  mark
 5228  fmtCoord
 5232  k3Line
 5239  yearPhotos
 5250  kmBetween
 5255  villesT
 5262  planMagazine
 5344  again
 5345  freshOr
 5346  pick
 5350  mk
 5358  L
 5448  renderPage
 5469  tierOf
 5470  photoPageCount
 5471  minPhotos
 5474  distribute
 5490  pickLayout
 5507  chooseLayout
 5520  mkPage
 5524  plan
 5560  tag
 5563  takePhoto
 5634  pairOf
 5636  relayout
 5642  makeSpread
 5660  unmakeSpread
 5676  syncSpread
 5684  fixSpreads
 5724  loadDetector
 5729  go
 5739  loadImg
 5743  saliency
 5770  subjectFromFaces
 5779  analyze
 5805  analyzeAll
 5977  t
 5998  lang
 5999  nPagesSel
 6000  promo
 6005  loadImage
 6007  toJpeg
 6029  was
 6046  pickerBack
 6062  showPickHelp
 6071  close
 6093  within
 6094  decodeFile
 6124  hdBlob
 6134  importFile
 6155  toast
 6168  geom
 6173  prepThumb
 6179  prepFull
 6185  dropPhoto
 6191  tile
 6200  pump
 6228  pump2
 6248  addPhotos
 6281  renderPhotos
 6300  browserTag
 6301  callAI
 6329  thumb
 6331  coupleInfo
 6345  mqParts
 6350  magAnswers
 6369  fetchCarte
 6379  fetchVilles
 6391  storyPrompt
 6430  magFacts
 6440  magazinePrompt
 6462  cleanMag
 6463  s
 6475  captionPhotos
 6497  defaultStory
 6532  runGeneration
 6596  showIssue
 6609  isWide
 6610  snap
 6612  H
 6613  commit
 6614  restore
 6615  undo
 6616  redo
 6617  updUndo
 6622  visible
 6630  mountPage
 6635  scaleHost
 6644  drawStage
 6658  drawThumb
 6662  drawStrip
 6669  markStrip
 6675  drawThemes
 6680  revealStage
 6686  drawAll
 6687  refreshPage
 6689  afterSlotEdit
 6696  go
 6697  step
 6702  highlightSel
 6712  drawTools
 6762  rewrite
 6779  swapPhoto
 6790  movePage
 6800  bindEditor
 6973  openReader
 6976  draw
 6980  close
 6982  next
 6998  renderBookPreview
 7016  idb
 7017  idbSet
 7018  idbGet
 7019  idbDel
 7020  saveLocal
 7026  offerResume
 7050  fullBlob
 7068  dataUrlToBlob
 7069  uploadPhotos
 7071  todo
 7077  worker
 7102  nstBake
 7159  docHtml
 7167  printHtml
 7168  innerHtml
 7170  spineStyle
 7174  spineText
 7175  defaultSpine
 7176  coverHtml
 7184  generateAlbumPDF
 7190  gen
 7202  doc
 7203  tries
 7236  processPayment
 7276  goTab
 7303  lang
 7313  img
 7338  stop
 7369  upd
 7395  apply
 7414  T
 7415  nm
 7416  renderQuiz
 7422  mark
 7428  save
 7475  mail
 7622  backLbl
 7627  toc
 7634  show
 7641  openLegal
 7649  hideLegal
 7650  closeLegal
 7678  cur
 7687  paint
 7712  lang
 7717  applyUI
 7724  setLang
 7744  syncStory
 7778  ensureStoryFor
 7794  recompose
 7808  addInput
 7827  removePhoto
 7880  saveLink
 7902  openFromLink
 7912  set
 7930  trHide
 7932  trackOverlay
 7940  close
 7977  ouvrir
 8003  ekLabel
 8014  drawEbar
 8039  coach
 8045  done
 8051  goTab
 8060  draw
 8088  payLabel
 8099  highlightPal
 8104  setLang
 8119  lang
 8132  spineColors
 8159  sampleCover
 8178  auto
 8179  build
 8186  name
 8202  words
 8209  apply
 8236  build
 8245  nst70
 8265  names
 8266  renderLive
 8279  flowMode
 8288  exifDate
 8298  readAscii
 8299  scan
 8316  addPhotos
 8325  remap
 8326  applyOrder
 8339  movePhoto
 8342  sortByDate
 8351  renderPhotosPlus
 8390  startGenAnim
 8402  tick
 8410  stopGenAnim
 8412  runGeneration
 8417  noel
 8421  fill
 8424  renderSummary
 8437  syncPrice
 8448  goTab
 8470  setLang
 8487  lang
 8518  applyText
 8527  fromFrance
 8535  fromOSM
 8554  close
 8555  render
 8563  pick
 8571  search
 8607  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
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
- api/create-checkout.js (145 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (85 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (87 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (25 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (251 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
