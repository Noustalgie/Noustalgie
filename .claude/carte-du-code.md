# Carte de public/index.html

Générée automatiquement (7256 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-52 : <script type="application/ld+json"> (1 Ko)
- lignes 57-1490 : <style> (120 Ko)
- lignes 1491-1510 : <script type="application/ld+json"> (1 Ko)
- lignes 1511-1598 : <script type="application/ld+json"> (4 Ko)
- lignes 2073-4232 : <script> (173 Ko)
- lignes 4233-4832 : <script> (38 Ko)
- lignes 4833-7253 : <script> (198 Ko)

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
 5008  1. Import des photos : une version écran + une version impression
 5270  2. Génération : histoire + légendes à partir des photos
 5535  3. Éditeur
 5916  4. Sauvegarde locale (IndexedDB : photos comprises)
 5951  5. Impression : photos en pleine résolution + PDF hébergé
 6052  6. Paiement
 6849  1. Livre 3D réutilisable
 6915  2. Aperçu en direct pendant la création (ordinateur)
 6949  3. Photos : date de prise de vue, couverture, glisser-déposer
 7051  4. Génération vivante : leurs photos se posent dans un livre
 7077  5. Récapitulatif de commande avec LEUR couverture
 7105  6. Finitions : apparition au défilement, page tournée

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
 2052  <div class="legal-overlay" id="legalOverlay"
 2058  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2078  LANGS.fr
 2164  LANGS.en
 2250  LANGS.de
 2336  LANGS.es
 2422  LANGS.pt

## Fonctions

 2512  toggleLangMenu
 2513  pickLang
 2515  setLang
 2554  highlightPal
 2574  selectPricing
 2589  onSlider
 2602  onInAppSlider
 2625  animNum
 2631  toggleCmp
 2650  saveDraft
 2669  restoreDraft
 2676  set
 2684  clearDraft
 2708  goTab
 2747  edPickPrice
 2753  toggleFaq
 2754  startApp
 2759  addPhotosFromEditor
 2792  ensureConvertible
 2810  detectFocalY
 2830  showUploadLoader
 2842  hideUploadLoader
 2846  addPhotos
 2854  processBatch
 2891  getMinPhotos
 2895  renderPhotos
 2911  removePhoto
 2917  openMsgModal
 2918  closeMsgModal
 2919  saveMsgModal
 2924  selStyle
 2929  log
 2939  setProgress
 2950  api
 2980  runGeneration
 3212  renderBookPreview
 3222  pg
 3229  _take
 3240  pickIdx
 3246  ph
 3247  imgT
 3256  img
 3265  wantTall
 3266  wantSquare
 3267  wantWide
 3672  avRender
 3709  reapplyTexts
 3710  avBuildThumbs
 3723  avNext
 3724  avPrev
 3731  toggleEditor
 3732  edTab
 3733  refreshEditor
 3734  refreshTextFields
 3762  estRows
 3771  liveText
 3784  setActiveSlot
 3785  edSelectPhoto
 3786  updateFilter
 3787  updateCrop
 3788  updateZoom
 3789  toggleBW
 3790  applySlotEditsToDOM
 3794  saveTextStyle
 3795  updateTextStyle
 3796  toggleTextStyle
 3797  setTextSize
 3807  applyTextStylesToDOM
 3808  edSelectLayout
 3809  applyEdit
 3810  applyLayoutOverride
 3811  applyTextLive
 3812  resetEdit
 3816  initCropGestures
 3820  editorOpen
 3821  curSlot
 3829  snapshotPage
 3830  undoEdit
 3832  openFullPreview
 3839  base64ToBlob
 3851  fetchWithTimeout
 3866  processPayment
 3965  generateAlbumPDF
 3972  compressPhotoForPdf
 4036  generateAlbumPDF_UNUSED
 4103  applyPromo
 4124  selectFormat
 4146  updateFormatPrices
 4160  generateFinalPDF
 4177  addPage
 4203  openLegal
 4204  closeLegal
 4243  clamp
 4280  curLang
 4287  themeKey
 4288  theme
 4289  photos
 4291  printSrc
 4303  faceSpan
 4306  autoPos
 4311  fit
 4314  L
 4337  cropCost
 4349  slot
 4368  tx
 4375  fit
 4376  orientOf
 4529  renderPage
 4548  tierOf
 4549  photoPageCount
 4550  minPhotos
 4553  distribute
 4569  pickLayout
 4586  chooseLayout
 4599  mkPage
 4603  plan
 4639  tag
 4642  takePhoto
 4728  loadDetector
 4733  go
 4743  loadImg
 4747  saliency
 4774  subjectFromFaces
 4783  analyze
 4809  analyzeAll
 4981  t
 5002  lang
 5003  nPagesSel
 5004  promo
 5009  loadImage
 5011  toJpeg
 5033  was
 5047  pickerBack
 5057  showPickHelp
 5062  close
 5076  within
 5077  decodeFile
 5107  hdBlob
 5117  importFile
 5138  toast
 5151  geom
 5156  prepThumb
 5162  prepFull
 5168  dropPhoto
 5174  tile
 5183  pump
 5210  pump2
 5230  addPhotos
 5257  renderPhotos
 5276  browserTag
 5277  callAI
 5305  thumb
 5307  coupleInfo
 5322  storyPrompt
 5369  keywords
 5378  missingAnswers
 5387  repairStory
 5405  captionPhotos
 5427  defaultStory
 5462  runGeneration
 5525  showIssue
 5537  isWide
 5538  snap
 5540  H
 5541  commit
 5542  restore
 5543  undo
 5544  redo
 5545  updUndo
 5550  visible
 5558  mountPage
 5563  scaleHost
 5572  drawStage
 5585  drawThumb
 5589  drawStrip
 5596  markStrip
 5602  drawThemes
 5607  revealStage
 5613  drawAll
 5614  refreshPage
 5616  go
 5617  step
 5622  highlightSel
 5632  drawTools
 5677  rewrite
 5694  swapPhoto
 5704  movePage
 5713  bindEditor
 5875  openReader
 5878  draw
 5882  close
 5884  next
 5900  renderBookPreview
 5918  idb
 5919  idbSet
 5920  idbGet
 5921  idbDel
 5922  saveLocal
 5928  offerResume
 5952  fullBlob
 5970  dataUrlToBlob
 5971  uploadPhotos
 5973  todo
 5979  worker
 6002  docHtml
 6008  printHtml
 6009  innerHtml
 6011  spineStyle
 6015  spineText
 6016  defaultSpine
 6017  coverHtml
 6025  generateAlbumPDF
 6031  gen
 6062  processPayment
 6102  goTab
 6129  lang
 6132  pg
 6167  upd
 6193  apply
 6222  mail
 6371  toc
 6378  show
 6384  openLegal
 6390  closeLegal
 6420  cur
 6429  paint
 6454  lang
 6459  applyUI
 6466  setLang
 6484  syncStory
 6514  ensureStoryFor
 6530  recompose
 6544  addInput
 6563  removePhoto
 6615  saveLink
 6637  openFromLink
 6647  set
 6664  trackOverlay
 6672  close
 6708  ouvrir
 6732  drawEbar
 6757  coach
 6763  done
 6769  goTab
 6778  draw
 6806  payLabel
 6817  highlightPal
 6822  setLang
 6837  lang
 6850  spineColors
 6890  name
 6892  auto
 6928  names
 6929  renderLive
 6942  flowMode
 6951  exifDate
 6961  readAscii
 6962  scan
 6979  addPhotos
 6988  remap
 6989  applyOrder
 7002  movePhoto
 7005  sortByDate
 7014  renderPhotosPlus
 7053  startGenAnim
 7065  tick
 7073  stopGenAnim
 7075  runGeneration
 7078  renderSummary
 7091  syncPrice
 7101  goTab
 7123  setLang
 7140  lang
 7171  applyText
 7180  fromFrance
 7188  fromOSM
 7207  close
 7208  render
 7216  pick
 7224  search

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
