# Carte de public/index.html

Générée automatiquement (7525 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-166 : <script type="application/ld+json"> (4 Ko)
- lignes 171-1615 : <style> (122 Ko)
- lignes 1616-1635 : <script type="application/ld+json"> (1 Ko)
- lignes 1636-1723 : <script type="application/ld+json"> (4 Ko)
- lignes 2206-4365 : <script> (173 Ko)
- lignes 4366-5050 : <script> (44 Ko)
- lignes 5051-7502 : <script> (205 Ko)
- lignes 7503-7522 : <script> (1 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  660  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  802  FORCE FINALE : champs texte éditeur toujours sombres
  812  PANNEAUX EDITEUR : fond noir uniforme
  848  v1.1 — accessibilité & confort
  855  Noustalgie v2 — éditeur d'album
  957  v2.2 — édition au doigt
  985  v3.3 — album : lien, format, photos, glisser-déposer, suivi
 1013  v2.2 — système de design du site
 1063  v2.3 — boutons pilule
 1072  v2.3 — galerie de vraies pages
 1085  v2.3 — garanties
 1091  v2.3 — tarifs actionnables
 1095  v2.3 — barre d'action mobile
 1108  v2.4 — hero : couverture du livre fermé
 1116  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1135  v2.5 — sélecteur de langue
 1145  v2.5 — pages d'information
 1187  v2.6 — « Comment ça marche »
 1219  v2.7 — « Comment ça marche » en frise éditoriale
 1239  v3 — indications sous les questions
 1242  v4 — livre 3D
 1266  v4 — tarifs : épaisseur réelle
 1270  v4 — aperçu en direct
 1281  v4 — photos
 1291  v4 — génération vivante
 1301  v4 — récapitulatif de commande
 1309  v4 — étapes
 1317  v4 — apparition au défilement et page tournée
 1327  v4.3 — suggestions d'adresse
 1341  v4.5 — message d'import
 1351  v4.7 — correctifs téléphone
 1367  v4.8 — édition évidente
 1386  v5.2 — photos non transmises par l'iPhone
 1395  v5.4 — lisibilité
 1400  v5.5 — finitions demandées
 1426  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1604  galerie d'accueil : lien vers l'album d'exemple complet
 5226  1. Import des photos : une version écran + une version impression
 5488  2. Génération : histoire + légendes à partir des photos
 5753  3. Éditeur
 6158  4. Sauvegarde locale (IndexedDB : photos comprises)
 6193  5. Impression : photos en pleine résolution + PDF hébergé
 6294  6. Paiement
 7098  1. Livre 3D réutilisable
 7164  2. Aperçu en direct pendant la création (ordinateur)
 7198  3. Photos : date de prise de vue, couverture, glisser-déposer
 7300  4. Génération vivante : leurs photos se posent dans un livre
 7326  5. Récapitulatif de commande avec LEUR couverture
 7354  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1751  <header>
 1752  <nav class="ed-nav">
 1774  <main id="main" tabindex="-1">
 1776  <section class="ed-hero">
 1785  <div class="nst-demo" id="nstDemo"
 1791  <section class="nst-how nst-frise" id="how">
 1812  <section class="ed-price" id="pricing">
 1845  <section class="section app-section" id="app">
 1872  <div class="panel active" id="panel0"
 1914  <div class="panel" id="panel1"
 1955  <div class="panel" id="panel2"
 1981  <div class="panel" id="panel3"
 1982  <div id="nstEd"
 2009  <div class="panel" id="panel4"
 2011  <div id="payForm"
 2089  <section class="ed-faq-section" id="faq">
 2137  <footer>
 2185  <div class="legal-overlay" id="legalOverlay"
 2191  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2211  LANGS.fr
 2297  LANGS.en
 2383  LANGS.de
 2469  LANGS.es
 2555  LANGS.pt

## Fonctions

 2645  toggleLangMenu
 2646  pickLang
 2648  setLang
 2687  highlightPal
 2707  selectPricing
 2722  onSlider
 2735  onInAppSlider
 2758  animNum
 2764  toggleCmp
 2783  saveDraft
 2802  restoreDraft
 2809  set
 2817  clearDraft
 2841  goTab
 2880  edPickPrice
 2886  toggleFaq
 2887  startApp
 2892  addPhotosFromEditor
 2925  ensureConvertible
 2943  detectFocalY
 2963  showUploadLoader
 2975  hideUploadLoader
 2979  addPhotos
 2987  processBatch
 3024  getMinPhotos
 3028  renderPhotos
 3044  removePhoto
 3050  openMsgModal
 3051  closeMsgModal
 3052  saveMsgModal
 3057  selStyle
 3062  log
 3072  setProgress
 3083  api
 3113  runGeneration
 3345  renderBookPreview
 3355  pg
 3362  _take
 3373  pickIdx
 3379  ph
 3380  imgT
 3389  img
 3398  wantTall
 3399  wantSquare
 3400  wantWide
 3805  avRender
 3842  reapplyTexts
 3843  avBuildThumbs
 3856  avNext
 3857  avPrev
 3864  toggleEditor
 3865  edTab
 3866  refreshEditor
 3867  refreshTextFields
 3895  estRows
 3904  liveText
 3917  setActiveSlot
 3918  edSelectPhoto
 3919  updateFilter
 3920  updateCrop
 3921  updateZoom
 3922  toggleBW
 3923  applySlotEditsToDOM
 3927  saveTextStyle
 3928  updateTextStyle
 3929  toggleTextStyle
 3930  setTextSize
 3940  applyTextStylesToDOM
 3941  edSelectLayout
 3942  applyEdit
 3943  applyLayoutOverride
 3944  applyTextLive
 3945  resetEdit
 3949  initCropGestures
 3953  editorOpen
 3954  curSlot
 3962  snapshotPage
 3963  undoEdit
 3965  openFullPreview
 3972  base64ToBlob
 3984  fetchWithTimeout
 3999  processPayment
 4098  generateAlbumPDF
 4105  compressPhotoForPdf
 4169  generateAlbumPDF_UNUSED
 4236  applyPromo
 4257  selectFormat
 4279  updateFormatPrices
 4293  generateFinalPDF
 4310  addPage
 4336  openLegal
 4337  closeLegal
 4376  clamp
 4413  curLang
 4420  themeKey
 4421  theme
 4422  photos
 4424  printSrc
 4436  faceSpan
 4439  autoPos
 4444  fit
 4447  L
 4470  cropCost
 4482  slot
 4501  tx
 4508  fit
 4509  orientOf
 4673  renderPage
 4692  tierOf
 4693  photoPageCount
 4694  minPhotos
 4697  distribute
 4713  pickLayout
 4730  chooseLayout
 4743  mkPage
 4747  plan
 4783  tag
 4786  takePhoto
 4857  pairOf
 4859  relayout
 4865  makeSpread
 4883  unmakeSpread
 4899  syncSpread
 4907  fixSpreads
 4946  loadDetector
 4951  go
 4961  loadImg
 4965  saliency
 4992  subjectFromFaces
 5001  analyze
 5027  analyzeAll
 5199  t
 5220  lang
 5221  nPagesSel
 5222  promo
 5227  loadImage
 5229  toJpeg
 5251  was
 5265  pickerBack
 5275  showPickHelp
 5280  close
 5294  within
 5295  decodeFile
 5325  hdBlob
 5335  importFile
 5356  toast
 5369  geom
 5374  prepThumb
 5380  prepFull
 5386  dropPhoto
 5392  tile
 5401  pump
 5428  pump2
 5448  addPhotos
 5475  renderPhotos
 5494  browserTag
 5495  callAI
 5523  thumb
 5525  coupleInfo
 5540  storyPrompt
 5587  keywords
 5596  missingAnswers
 5605  repairStory
 5623  captionPhotos
 5645  defaultStory
 5680  runGeneration
 5743  showIssue
 5755  isWide
 5756  snap
 5758  H
 5759  commit
 5760  restore
 5761  undo
 5762  redo
 5763  updUndo
 5768  visible
 5776  mountPage
 5781  scaleHost
 5790  drawStage
 5804  drawThumb
 5808  drawStrip
 5815  markStrip
 5821  drawThemes
 5826  revealStage
 5832  drawAll
 5833  refreshPage
 5835  afterSlotEdit
 5842  go
 5843  step
 5848  highlightSel
 5858  drawTools
 5908  rewrite
 5925  swapPhoto
 5936  movePage
 5946  bindEditor
 6117  openReader
 6120  draw
 6124  close
 6126  next
 6142  renderBookPreview
 6160  idb
 6161  idbSet
 6162  idbGet
 6163  idbDel
 6164  saveLocal
 6170  offerResume
 6194  fullBlob
 6212  dataUrlToBlob
 6213  uploadPhotos
 6215  todo
 6221  worker
 6244  docHtml
 6250  printHtml
 6251  innerHtml
 6253  spineStyle
 6257  spineText
 6258  defaultSpine
 6259  coverHtml
 6267  generateAlbumPDF
 6273  gen
 6304  processPayment
 6344  goTab
 6371  lang
 6373  X
 6376  pg
 6415  upd
 6441  apply
 6470  mail
 6619  toc
 6626  show
 6632  openLegal
 6638  closeLegal
 6668  cur
 6677  paint
 6702  lang
 6707  applyUI
 6714  setLang
 6732  syncStory
 6762  ensureStoryFor
 6778  recompose
 6792  addInput
 6811  removePhoto
 6864  saveLink
 6886  openFromLink
 6896  set
 6913  trackOverlay
 6921  close
 6957  ouvrir
 6981  drawEbar
 7006  coach
 7012  done
 7018  goTab
 7027  draw
 7055  payLabel
 7066  highlightPal
 7071  setLang
 7086  lang
 7099  spineColors
 7139  name
 7141  auto
 7177  names
 7178  renderLive
 7191  flowMode
 7200  exifDate
 7210  readAscii
 7211  scan
 7228  addPhotos
 7237  remap
 7238  applyOrder
 7251  movePhoto
 7254  sortByDate
 7263  renderPhotosPlus
 7302  startGenAnim
 7314  tick
 7322  stopGenAnim
 7324  runGeneration
 7327  renderSummary
 7340  syncPrice
 7350  goTab
 7372  setLang
 7389  lang
 7420  applyText
 7429  fromFrance
 7437  fromOSM
 7456  close
 7457  render
 7465  pick
 7473  search
 7509  etape

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
