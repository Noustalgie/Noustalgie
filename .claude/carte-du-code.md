# Carte de public/index.html

Générée automatiquement (7501 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-151 : <script type="application/ld+json"> (3 Ko)
- lignes 156-1596 : <style> (121 Ko)
- lignes 1597-1616 : <script type="application/ld+json"> (1 Ko)
- lignes 1617-1704 : <script type="application/ld+json"> (4 Ko)
- lignes 2182-4341 : <script> (173 Ko)
- lignes 4342-5026 : <script> (44 Ko)
- lignes 5027-7478 : <script> (205 Ko)
- lignes 7479-7498 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  645  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  787  FORCE FINALE : champs texte éditeur toujours sombres
  797  PANNEAUX EDITEUR : fond noir uniforme
  833  v1.1 — accessibilité & confort
  840  Noustalgie v2 — éditeur d'album
  942  v2.2 — édition au doigt
  970  v3.3 — album : lien, format, photos, glisser-déposer, suivi
  998  v2.2 — système de design du site
 1048  v2.3 — boutons pilule
 1057  v2.3 — galerie de vraies pages
 1070  v2.3 — garanties
 1076  v2.3 — tarifs actionnables
 1080  v2.3 — barre d'action mobile
 1093  v2.4 — hero : couverture du livre fermé
 1101  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1120  v2.5 — sélecteur de langue
 1130  v2.5 — pages d'information
 1172  v2.6 — « Comment ça marche »
 1204  v2.7 — « Comment ça marche » en frise éditoriale
 1224  v3 — indications sous les questions
 1227  v4 — livre 3D
 1251  v4 — tarifs : épaisseur réelle
 1255  v4 — aperçu en direct
 1266  v4 — photos
 1276  v4 — génération vivante
 1286  v4 — récapitulatif de commande
 1294  v4 — étapes
 1302  v4 — apparition au défilement et page tournée
 1312  v4.3 — suggestions d'adresse
 1326  v4.5 — message d'import
 1336  v4.7 — correctifs téléphone
 1352  v4.8 — édition évidente
 1371  v5.2 — photos non transmises par l'iPhone
 1380  v5.4 — lisibilité
 1385  v5.5 — finitions demandées
 1411  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1589  galerie d'accueil : lien vers l'album d'exemple complet
 5202  1. Import des photos : une version écran + une version impression
 5464  2. Génération : histoire + légendes à partir des photos
 5729  3. Éditeur
 6134  4. Sauvegarde locale (IndexedDB : photos comprises)
 6169  5. Impression : photos en pleine résolution + PDF hébergé
 6270  6. Paiement
 7074  1. Livre 3D réutilisable
 7140  2. Aperçu en direct pendant la création (ordinateur)
 7174  3. Photos : date de prise de vue, couverture, glisser-déposer
 7276  4. Génération vivante : leurs photos se posent dans un livre
 7302  5. Récapitulatif de commande avec LEUR couverture
 7330  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1732  <nav class="ed-nav">
 1754  <section class="ed-hero">
 1763  <div class="nst-demo" id="nstDemo"
 1769  <section class="nst-how nst-frise" id="how">
 1790  <section class="ed-price" id="pricing">
 1823  <section class="section app-section" id="app">
 1850  <div class="panel active" id="panel0"
 1892  <div class="panel" id="panel1"
 1933  <div class="panel" id="panel2"
 1959  <div class="panel" id="panel3"
 1960  <div id="nstEd"
 1987  <div class="panel" id="panel4"
 1989  <div id="payForm"
 2067  <section class="ed-faq-section" id="faq">
 2114  <footer>
 2161  <div class="legal-overlay" id="legalOverlay"
 2167  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2187  LANGS.fr
 2273  LANGS.en
 2359  LANGS.de
 2445  LANGS.es
 2531  LANGS.pt

## Fonctions

 2621  toggleLangMenu
 2622  pickLang
 2624  setLang
 2663  highlightPal
 2683  selectPricing
 2698  onSlider
 2711  onInAppSlider
 2734  animNum
 2740  toggleCmp
 2759  saveDraft
 2778  restoreDraft
 2785  set
 2793  clearDraft
 2817  goTab
 2856  edPickPrice
 2862  toggleFaq
 2863  startApp
 2868  addPhotosFromEditor
 2901  ensureConvertible
 2919  detectFocalY
 2939  showUploadLoader
 2951  hideUploadLoader
 2955  addPhotos
 2963  processBatch
 3000  getMinPhotos
 3004  renderPhotos
 3020  removePhoto
 3026  openMsgModal
 3027  closeMsgModal
 3028  saveMsgModal
 3033  selStyle
 3038  log
 3048  setProgress
 3059  api
 3089  runGeneration
 3321  renderBookPreview
 3331  pg
 3338  _take
 3349  pickIdx
 3355  ph
 3356  imgT
 3365  img
 3374  wantTall
 3375  wantSquare
 3376  wantWide
 3781  avRender
 3818  reapplyTexts
 3819  avBuildThumbs
 3832  avNext
 3833  avPrev
 3840  toggleEditor
 3841  edTab
 3842  refreshEditor
 3843  refreshTextFields
 3871  estRows
 3880  liveText
 3893  setActiveSlot
 3894  edSelectPhoto
 3895  updateFilter
 3896  updateCrop
 3897  updateZoom
 3898  toggleBW
 3899  applySlotEditsToDOM
 3903  saveTextStyle
 3904  updateTextStyle
 3905  toggleTextStyle
 3906  setTextSize
 3916  applyTextStylesToDOM
 3917  edSelectLayout
 3918  applyEdit
 3919  applyLayoutOverride
 3920  applyTextLive
 3921  resetEdit
 3925  initCropGestures
 3929  editorOpen
 3930  curSlot
 3938  snapshotPage
 3939  undoEdit
 3941  openFullPreview
 3948  base64ToBlob
 3960  fetchWithTimeout
 3975  processPayment
 4074  generateAlbumPDF
 4081  compressPhotoForPdf
 4145  generateAlbumPDF_UNUSED
 4212  applyPromo
 4233  selectFormat
 4255  updateFormatPrices
 4269  generateFinalPDF
 4286  addPage
 4312  openLegal
 4313  closeLegal
 4352  clamp
 4389  curLang
 4396  themeKey
 4397  theme
 4398  photos
 4400  printSrc
 4412  faceSpan
 4415  autoPos
 4420  fit
 4423  L
 4446  cropCost
 4458  slot
 4477  tx
 4484  fit
 4485  orientOf
 4649  renderPage
 4668  tierOf
 4669  photoPageCount
 4670  minPhotos
 4673  distribute
 4689  pickLayout
 4706  chooseLayout
 4719  mkPage
 4723  plan
 4759  tag
 4762  takePhoto
 4833  pairOf
 4835  relayout
 4841  makeSpread
 4859  unmakeSpread
 4875  syncSpread
 4883  fixSpreads
 4922  loadDetector
 4927  go
 4937  loadImg
 4941  saliency
 4968  subjectFromFaces
 4977  analyze
 5003  analyzeAll
 5175  t
 5196  lang
 5197  nPagesSel
 5198  promo
 5203  loadImage
 5205  toJpeg
 5227  was
 5241  pickerBack
 5251  showPickHelp
 5256  close
 5270  within
 5271  decodeFile
 5301  hdBlob
 5311  importFile
 5332  toast
 5345  geom
 5350  prepThumb
 5356  prepFull
 5362  dropPhoto
 5368  tile
 5377  pump
 5404  pump2
 5424  addPhotos
 5451  renderPhotos
 5470  browserTag
 5471  callAI
 5499  thumb
 5501  coupleInfo
 5516  storyPrompt
 5563  keywords
 5572  missingAnswers
 5581  repairStory
 5599  captionPhotos
 5621  defaultStory
 5656  runGeneration
 5719  showIssue
 5731  isWide
 5732  snap
 5734  H
 5735  commit
 5736  restore
 5737  undo
 5738  redo
 5739  updUndo
 5744  visible
 5752  mountPage
 5757  scaleHost
 5766  drawStage
 5780  drawThumb
 5784  drawStrip
 5791  markStrip
 5797  drawThemes
 5802  revealStage
 5808  drawAll
 5809  refreshPage
 5811  afterSlotEdit
 5818  go
 5819  step
 5824  highlightSel
 5834  drawTools
 5884  rewrite
 5901  swapPhoto
 5912  movePage
 5922  bindEditor
 6093  openReader
 6096  draw
 6100  close
 6102  next
 6118  renderBookPreview
 6136  idb
 6137  idbSet
 6138  idbGet
 6139  idbDel
 6140  saveLocal
 6146  offerResume
 6170  fullBlob
 6188  dataUrlToBlob
 6189  uploadPhotos
 6191  todo
 6197  worker
 6220  docHtml
 6226  printHtml
 6227  innerHtml
 6229  spineStyle
 6233  spineText
 6234  defaultSpine
 6235  coverHtml
 6243  generateAlbumPDF
 6249  gen
 6280  processPayment
 6320  goTab
 6347  lang
 6349  X
 6352  pg
 6391  upd
 6417  apply
 6446  mail
 6595  toc
 6602  show
 6608  openLegal
 6614  closeLegal
 6644  cur
 6653  paint
 6678  lang
 6683  applyUI
 6690  setLang
 6708  syncStory
 6738  ensureStoryFor
 6754  recompose
 6768  addInput
 6787  removePhoto
 6840  saveLink
 6862  openFromLink
 6872  set
 6889  trackOverlay
 6897  close
 6933  ouvrir
 6957  drawEbar
 6982  coach
 6988  done
 6994  goTab
 7003  draw
 7031  payLabel
 7042  highlightPal
 7047  setLang
 7062  lang
 7075  spineColors
 7115  name
 7117  auto
 7153  names
 7154  renderLive
 7167  flowMode
 7176  exifDate
 7186  readAscii
 7187  scan
 7204  addPhotos
 7213  remap
 7214  applyOrder
 7227  movePhoto
 7230  sortByDate
 7239  renderPhotosPlus
 7278  startGenAnim
 7290  tick
 7298  stopGenAnim
 7300  runGeneration
 7303  renderSummary
 7316  syncPrice
 7326  goTab
 7348  setLang
 7365  lang
 7396  applyText
 7405  fromFrance
 7413  fromOSM
 7432  close
 7433  render
 7441  pick
 7449  search
 7485  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (15 lignes) 
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
- api/tools.js (23 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (249 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
