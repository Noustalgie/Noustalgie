# Carte de public/index.html

Générée automatiquement (7540 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-166 : <script type="application/ld+json"> (4 Ko)
- lignes 169-185 : <script> (1 Ko)
- lignes 186-1630 : <style> (122 Ko)
- lignes 1631-1650 : <script type="application/ld+json"> (1 Ko)
- lignes 1651-1738 : <script type="application/ld+json"> (4 Ko)
- lignes 2221-4380 : <script> (173 Ko)
- lignes 4381-5065 : <script> (44 Ko)
- lignes 5066-7517 : <script> (205 Ko)
- lignes 7518-7537 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  675  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  817  FORCE FINALE : champs texte éditeur toujours sombres
  827  PANNEAUX EDITEUR : fond noir uniforme
  863  v1.1 — accessibilité & confort
  870  Noustalgie v2 — éditeur d'album
  972  v2.2 — édition au doigt
 1000  v3.3 — album : lien, format, photos, glisser-déposer, suivi
 1028  v2.2 — système de design du site
 1078  v2.3 — boutons pilule
 1087  v2.3 — galerie de vraies pages
 1100  v2.3 — garanties
 1106  v2.3 — tarifs actionnables
 1110  v2.3 — barre d'action mobile
 1123  v2.4 — hero : couverture du livre fermé
 1131  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1150  v2.5 — sélecteur de langue
 1160  v2.5 — pages d'information
 1202  v2.6 — « Comment ça marche »
 1234  v2.7 — « Comment ça marche » en frise éditoriale
 1254  v3 — indications sous les questions
 1257  v4 — livre 3D
 1281  v4 — tarifs : épaisseur réelle
 1285  v4 — aperçu en direct
 1296  v4 — photos
 1306  v4 — génération vivante
 1316  v4 — récapitulatif de commande
 1324  v4 — étapes
 1332  v4 — apparition au défilement et page tournée
 1342  v4.3 — suggestions d'adresse
 1356  v4.5 — message d'import
 1366  v4.7 — correctifs téléphone
 1382  v4.8 — édition évidente
 1401  v5.2 — photos non transmises par l'iPhone
 1410  v5.4 — lisibilité
 1415  v5.5 — finitions demandées
 1441  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1619  galerie d'accueil : lien vers l'album d'exemple complet
 5241  1. Import des photos : une version écran + une version impression
 5503  2. Génération : histoire + légendes à partir des photos
 5768  3. Éditeur
 6173  4. Sauvegarde locale (IndexedDB : photos comprises)
 6208  5. Impression : photos en pleine résolution + PDF hébergé
 6309  6. Paiement
 7113  1. Livre 3D réutilisable
 7179  2. Aperçu en direct pendant la création (ordinateur)
 7213  3. Photos : date de prise de vue, couverture, glisser-déposer
 7315  4. Génération vivante : leurs photos se posent dans un livre
 7341  5. Récapitulatif de commande avec LEUR couverture
 7369  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1766  <header>
 1767  <nav class="ed-nav">
 1789  <main id="main" tabindex="-1">
 1791  <section class="ed-hero">
 1800  <div class="nst-demo" id="nstDemo"
 1806  <section class="nst-how nst-frise" id="how">
 1827  <section class="ed-price" id="pricing">
 1860  <section class="section app-section" id="app">
 1887  <div class="panel active" id="panel0"
 1929  <div class="panel" id="panel1"
 1970  <div class="panel" id="panel2"
 1996  <div class="panel" id="panel3"
 1997  <div id="nstEd"
 2024  <div class="panel" id="panel4"
 2026  <div id="payForm"
 2104  <section class="ed-faq-section" id="faq">
 2152  <footer>
 2200  <div class="legal-overlay" id="legalOverlay"
 2206  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2226  LANGS.fr
 2312  LANGS.en
 2398  LANGS.de
 2484  LANGS.es
 2570  LANGS.pt

## Fonctions

  174  nstLoadLib
  178  all
 2660  toggleLangMenu
 2661  pickLang
 2663  setLang
 2702  highlightPal
 2722  selectPricing
 2737  onSlider
 2750  onInAppSlider
 2773  animNum
 2779  toggleCmp
 2798  saveDraft
 2817  restoreDraft
 2824  set
 2832  clearDraft
 2856  goTab
 2895  edPickPrice
 2901  toggleFaq
 2902  startApp
 2907  addPhotosFromEditor
 2940  ensureConvertible
 2958  detectFocalY
 2978  showUploadLoader
 2990  hideUploadLoader
 2994  addPhotos
 3002  processBatch
 3039  getMinPhotos
 3043  renderPhotos
 3059  removePhoto
 3065  openMsgModal
 3066  closeMsgModal
 3067  saveMsgModal
 3072  selStyle
 3077  log
 3087  setProgress
 3098  api
 3128  runGeneration
 3360  renderBookPreview
 3370  pg
 3377  _take
 3388  pickIdx
 3394  ph
 3395  imgT
 3404  img
 3413  wantTall
 3414  wantSquare
 3415  wantWide
 3820  avRender
 3857  reapplyTexts
 3858  avBuildThumbs
 3871  avNext
 3872  avPrev
 3879  toggleEditor
 3880  edTab
 3881  refreshEditor
 3882  refreshTextFields
 3910  estRows
 3919  liveText
 3932  setActiveSlot
 3933  edSelectPhoto
 3934  updateFilter
 3935  updateCrop
 3936  updateZoom
 3937  toggleBW
 3938  applySlotEditsToDOM
 3942  saveTextStyle
 3943  updateTextStyle
 3944  toggleTextStyle
 3945  setTextSize
 3955  applyTextStylesToDOM
 3956  edSelectLayout
 3957  applyEdit
 3958  applyLayoutOverride
 3959  applyTextLive
 3960  resetEdit
 3964  initCropGestures
 3968  editorOpen
 3969  curSlot
 3977  snapshotPage
 3978  undoEdit
 3980  openFullPreview
 3987  base64ToBlob
 3999  fetchWithTimeout
 4014  processPayment
 4113  generateAlbumPDF
 4120  compressPhotoForPdf
 4184  generateAlbumPDF_UNUSED
 4251  applyPromo
 4272  selectFormat
 4294  updateFormatPrices
 4308  generateFinalPDF
 4325  addPage
 4351  openLegal
 4352  closeLegal
 4391  clamp
 4428  curLang
 4435  themeKey
 4436  theme
 4437  photos
 4439  printSrc
 4451  faceSpan
 4454  autoPos
 4459  fit
 4462  L
 4485  cropCost
 4497  slot
 4516  tx
 4523  fit
 4524  orientOf
 4688  renderPage
 4707  tierOf
 4708  photoPageCount
 4709  minPhotos
 4712  distribute
 4728  pickLayout
 4745  chooseLayout
 4758  mkPage
 4762  plan
 4798  tag
 4801  takePhoto
 4872  pairOf
 4874  relayout
 4880  makeSpread
 4898  unmakeSpread
 4914  syncSpread
 4922  fixSpreads
 4961  loadDetector
 4966  go
 4976  loadImg
 4980  saliency
 5007  subjectFromFaces
 5016  analyze
 5042  analyzeAll
 5214  t
 5235  lang
 5236  nPagesSel
 5237  promo
 5242  loadImage
 5244  toJpeg
 5266  was
 5280  pickerBack
 5290  showPickHelp
 5295  close
 5309  within
 5310  decodeFile
 5340  hdBlob
 5350  importFile
 5371  toast
 5384  geom
 5389  prepThumb
 5395  prepFull
 5401  dropPhoto
 5407  tile
 5416  pump
 5443  pump2
 5463  addPhotos
 5490  renderPhotos
 5509  browserTag
 5510  callAI
 5538  thumb
 5540  coupleInfo
 5555  storyPrompt
 5602  keywords
 5611  missingAnswers
 5620  repairStory
 5638  captionPhotos
 5660  defaultStory
 5695  runGeneration
 5758  showIssue
 5770  isWide
 5771  snap
 5773  H
 5774  commit
 5775  restore
 5776  undo
 5777  redo
 5778  updUndo
 5783  visible
 5791  mountPage
 5796  scaleHost
 5805  drawStage
 5819  drawThumb
 5823  drawStrip
 5830  markStrip
 5836  drawThemes
 5841  revealStage
 5847  drawAll
 5848  refreshPage
 5850  afterSlotEdit
 5857  go
 5858  step
 5863  highlightSel
 5873  drawTools
 5923  rewrite
 5940  swapPhoto
 5951  movePage
 5961  bindEditor
 6132  openReader
 6135  draw
 6139  close
 6141  next
 6157  renderBookPreview
 6175  idb
 6176  idbSet
 6177  idbGet
 6178  idbDel
 6179  saveLocal
 6185  offerResume
 6209  fullBlob
 6227  dataUrlToBlob
 6228  uploadPhotos
 6230  todo
 6236  worker
 6259  docHtml
 6265  printHtml
 6266  innerHtml
 6268  spineStyle
 6272  spineText
 6273  defaultSpine
 6274  coverHtml
 6282  generateAlbumPDF
 6288  gen
 6319  processPayment
 6359  goTab
 6386  lang
 6388  X
 6391  pg
 6430  upd
 6456  apply
 6485  mail
 6634  toc
 6641  show
 6647  openLegal
 6653  closeLegal
 6683  cur
 6692  paint
 6717  lang
 6722  applyUI
 6729  setLang
 6747  syncStory
 6777  ensureStoryFor
 6793  recompose
 6807  addInput
 6826  removePhoto
 6879  saveLink
 6901  openFromLink
 6911  set
 6928  trackOverlay
 6936  close
 6972  ouvrir
 6996  drawEbar
 7021  coach
 7027  done
 7033  goTab
 7042  draw
 7070  payLabel
 7081  highlightPal
 7086  setLang
 7101  lang
 7114  spineColors
 7154  name
 7156  auto
 7192  names
 7193  renderLive
 7206  flowMode
 7215  exifDate
 7225  readAscii
 7226  scan
 7243  addPhotos
 7252  remap
 7253  applyOrder
 7266  movePhoto
 7269  sortByDate
 7278  renderPhotosPlus
 7317  startGenAnim
 7329  tick
 7337  stopGenAnim
 7339  runGeneration
 7342  renderSummary
 7355  syncPrice
 7365  goTab
 7387  setLang
 7404  lang
 7435  applyText
 7444  fromFrance
 7452  fromOSM
 7471  close
 7472  render
 7480  pick
 7488  search
 7524  etape

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
