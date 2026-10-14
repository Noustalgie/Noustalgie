# Carte de public/index.html

Générée automatiquement (7254 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-52 : <script type="application/ld+json"> (1 Ko)
- lignes 57-1490 : <style> (120 Ko)
- lignes 1491-1510 : <script type="application/ld+json"> (1 Ko)
- lignes 1511-1598 : <script type="application/ld+json"> (4 Ko)
- lignes 2071-4230 : <script> (173 Ko)
- lignes 4231-4830 : <script> (38 Ko)
- lignes 4831-7251 : <script> (198 Ko)

## Couches CSS et sections de script (commentaires « ═══ »)

  546  ÉDITEUR : fond noir cohérent sur TOUT le panneau
  688  FORCE FINALE : champs texte éditeur toujours sombres
  698  PANNEAUX EDITEUR : fond noir uniforme
  734  v1.1 — accessibilité & confort
  741  Noustalgie v2 — éditeur d'album
  843  v2.2 — édition au doigt
  871  v3.3 — album : lien, format, photos, glisser-déposer, suivi
  899  v2.2 — système de design du site
  949  v2.3 — boutons pilule
  958  v2.3 — galerie de vraies pages
  971  v2.3 — garanties
  977  v2.3 — tarifs actionnables
  981  v2.3 — barre d'action mobile
  994  v2.4 — hero : couverture du livre fermé
 1002  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1021  v2.5 — sélecteur de langue
 1031  v2.5 — pages d'information
 1073  v2.6 — « Comment ça marche »
 1105  v2.7 — « Comment ça marche » en frise éditoriale
 1125  v3 — indications sous les questions
 1128  v4 — livre 3D
 1152  v4 — tarifs : épaisseur réelle
 1156  v4 — aperçu en direct
 1167  v4 — photos
 1177  v4 — génération vivante
 1187  v4 — récapitulatif de commande
 1195  v4 — étapes
 1203  v4 — apparition au défilement et page tournée
 1213  v4.3 — suggestions d'adresse
 1227  v4.5 — message d'import
 1237  v4.7 — correctifs téléphone
 1253  v4.8 — édition évidente
 1272  v5.2 — photos non transmises par l'iPhone
 1281  v5.4 — lisibilité
 1286  v5.5 — finitions demandées
 1312  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 5006  1. Import des photos : une version écran + une version impression
 5268  2. Génération : histoire + légendes à partir des photos
 5533  3. Éditeur
 5914  4. Sauvegarde locale (IndexedDB : photos comprises)
 5949  5. Impression : photos en pleine résolution + PDF hébergé
 6050  6. Paiement
 6847  1. Livre 3D réutilisable
 6913  2. Aperçu en direct pendant la création (ordinateur)
 6947  3. Photos : date de prise de vue, couverture, glisser-déposer
 7049  4. Génération vivante : leurs photos se posent dans un livre
 7075  5. Récapitulatif de commande avec LEUR couverture
 7103  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1626  <nav class="ed-nav">
 1647  <section class="ed-hero">
 1656  <div class="nst-demo" id="nstDemo"
 1662  <section class="nst-how nst-frise" id="how">
 1683  <section class="ed-price" id="pricing">
 1716  <section class="section app-section" id="app">
 1743  <div class="panel active" id="panel0"
 1785  <div class="panel" id="panel1"
 1826  <div class="panel" id="panel2"
 1852  <div class="panel" id="panel3"
 1853  <div id="nstEd"
 1880  <div class="panel" id="panel4"
 1882  <div id="payForm"
 1960  <section class="ed-faq-section" id="faq">
 2007  <footer>
 2050  <div class="legal-overlay" id="legalOverlay"
 2056  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2076  LANGS.fr
 2162  LANGS.en
 2248  LANGS.de
 2334  LANGS.es
 2420  LANGS.pt

## Fonctions

 2510  toggleLangMenu
 2511  pickLang
 2513  setLang
 2552  highlightPal
 2572  selectPricing
 2587  onSlider
 2600  onInAppSlider
 2623  animNum
 2629  toggleCmp
 2648  saveDraft
 2667  restoreDraft
 2674  set
 2682  clearDraft
 2706  goTab
 2745  edPickPrice
 2751  toggleFaq
 2752  startApp
 2757  addPhotosFromEditor
 2790  ensureConvertible
 2808  detectFocalY
 2828  showUploadLoader
 2840  hideUploadLoader
 2844  addPhotos
 2852  processBatch
 2889  getMinPhotos
 2893  renderPhotos
 2909  removePhoto
 2915  openMsgModal
 2916  closeMsgModal
 2917  saveMsgModal
 2922  selStyle
 2927  log
 2937  setProgress
 2948  api
 2978  runGeneration
 3210  renderBookPreview
 3220  pg
 3227  _take
 3238  pickIdx
 3244  ph
 3245  imgT
 3254  img
 3263  wantTall
 3264  wantSquare
 3265  wantWide
 3670  avRender
 3707  reapplyTexts
 3708  avBuildThumbs
 3721  avNext
 3722  avPrev
 3729  toggleEditor
 3730  edTab
 3731  refreshEditor
 3732  refreshTextFields
 3760  estRows
 3769  liveText
 3782  setActiveSlot
 3783  edSelectPhoto
 3784  updateFilter
 3785  updateCrop
 3786  updateZoom
 3787  toggleBW
 3788  applySlotEditsToDOM
 3792  saveTextStyle
 3793  updateTextStyle
 3794  toggleTextStyle
 3795  setTextSize
 3805  applyTextStylesToDOM
 3806  edSelectLayout
 3807  applyEdit
 3808  applyLayoutOverride
 3809  applyTextLive
 3810  resetEdit
 3814  initCropGestures
 3818  editorOpen
 3819  curSlot
 3827  snapshotPage
 3828  undoEdit
 3830  openFullPreview
 3837  base64ToBlob
 3849  fetchWithTimeout
 3864  processPayment
 3963  generateAlbumPDF
 3970  compressPhotoForPdf
 4034  generateAlbumPDF_UNUSED
 4101  applyPromo
 4122  selectFormat
 4144  updateFormatPrices
 4158  generateFinalPDF
 4175  addPage
 4201  openLegal
 4202  closeLegal
 4241  clamp
 4278  curLang
 4285  themeKey
 4286  theme
 4287  photos
 4289  printSrc
 4301  faceSpan
 4304  autoPos
 4309  fit
 4312  L
 4335  cropCost
 4347  slot
 4366  tx
 4373  fit
 4374  orientOf
 4527  renderPage
 4546  tierOf
 4547  photoPageCount
 4548  minPhotos
 4551  distribute
 4567  pickLayout
 4584  chooseLayout
 4597  mkPage
 4601  plan
 4637  tag
 4640  takePhoto
 4726  loadDetector
 4731  go
 4741  loadImg
 4745  saliency
 4772  subjectFromFaces
 4781  analyze
 4807  analyzeAll
 4979  t
 5000  lang
 5001  nPagesSel
 5002  promo
 5007  loadImage
 5009  toJpeg
 5031  was
 5045  pickerBack
 5055  showPickHelp
 5060  close
 5074  within
 5075  decodeFile
 5105  hdBlob
 5115  importFile
 5136  toast
 5149  geom
 5154  prepThumb
 5160  prepFull
 5166  dropPhoto
 5172  tile
 5181  pump
 5208  pump2
 5228  addPhotos
 5255  renderPhotos
 5274  browserTag
 5275  callAI
 5303  thumb
 5305  coupleInfo
 5320  storyPrompt
 5367  keywords
 5376  missingAnswers
 5385  repairStory
 5403  captionPhotos
 5425  defaultStory
 5460  runGeneration
 5523  showIssue
 5535  isWide
 5536  snap
 5538  H
 5539  commit
 5540  restore
 5541  undo
 5542  redo
 5543  updUndo
 5548  visible
 5556  mountPage
 5561  scaleHost
 5570  drawStage
 5583  drawThumb
 5587  drawStrip
 5594  markStrip
 5600  drawThemes
 5605  revealStage
 5611  drawAll
 5612  refreshPage
 5614  go
 5615  step
 5620  highlightSel
 5630  drawTools
 5675  rewrite
 5692  swapPhoto
 5702  movePage
 5711  bindEditor
 5873  openReader
 5876  draw
 5880  close
 5882  next
 5898  renderBookPreview
 5916  idb
 5917  idbSet
 5918  idbGet
 5919  idbDel
 5920  saveLocal
 5926  offerResume
 5950  fullBlob
 5968  dataUrlToBlob
 5969  uploadPhotos
 5971  todo
 5977  worker
 6000  docHtml
 6006  printHtml
 6007  innerHtml
 6009  spineStyle
 6013  spineText
 6014  defaultSpine
 6015  coverHtml
 6023  generateAlbumPDF
 6029  gen
 6060  processPayment
 6100  goTab
 6127  lang
 6130  pg
 6165  upd
 6191  apply
 6220  mail
 6369  toc
 6376  show
 6382  openLegal
 6388  closeLegal
 6418  cur
 6427  paint
 6452  lang
 6457  applyUI
 6464  setLang
 6482  syncStory
 6512  ensureStoryFor
 6528  recompose
 6542  addInput
 6561  removePhoto
 6613  saveLink
 6635  openFromLink
 6645  set
 6662  trackOverlay
 6670  close
 6706  ouvrir
 6730  drawEbar
 6755  coach
 6761  done
 6767  goTab
 6776  draw
 6804  payLabel
 6815  highlightPal
 6820  setLang
 6835  lang
 6848  spineColors
 6888  name
 6890  auto
 6926  names
 6927  renderLive
 6940  flowMode
 6949  exifDate
 6959  readAscii
 6960  scan
 6977  addPhotos
 6986  remap
 6987  applyOrder
 7000  movePhoto
 7003  sortByDate
 7012  renderPhotosPlus
 7051  startGenAnim
 7063  tick
 7071  stopGenAnim
 7073  runGeneration
 7076  renderSummary
 7089  syncPrice
 7099  goTab
 7121  setLang
 7138  lang
 7169  applyText
 7178  fromFrance
 7186  fromOSM
 7205  close
 7206  render
 7214  pick
 7222  search

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
