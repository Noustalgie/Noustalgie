# Carte de public/index.html

Générée automatiquement (7366 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-52 : <script type="application/ld+json"> (1 Ko)
- lignes 57-1490 : <style> (120 Ko)
- lignes 1491-1510 : <script type="application/ld+json"> (1 Ko)
- lignes 1511-1598 : <script type="application/ld+json"> (4 Ko)
- lignes 2073-4232 : <script> (173 Ko)
- lignes 4233-4917 : <script> (44 Ko)
- lignes 4918-7363 : <script> (203 Ko)

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
 5093  1. Import des photos : une version écran + une version impression
 5355  2. Génération : histoire + légendes à partir des photos
 5620  3. Éditeur
 6025  4. Sauvegarde locale (IndexedDB : photos comprises)
 6060  5. Impression : photos en pleine résolution + PDF hébergé
 6161  6. Paiement
 6959  1. Livre 3D réutilisable
 7025  2. Aperçu en direct pendant la création (ordinateur)
 7059  3. Photos : date de prise de vue, couverture, glisser-déposer
 7161  4. Génération vivante : leurs photos se posent dans un livre
 7187  5. Récapitulatif de commande avec LEUR couverture
 7215  6. Finitions : apparition au défilement, page tournée

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
 4540  renderPage
 4559  tierOf
 4560  photoPageCount
 4561  minPhotos
 4564  distribute
 4580  pickLayout
 4597  chooseLayout
 4610  mkPage
 4614  plan
 4650  tag
 4653  takePhoto
 4724  pairOf
 4726  relayout
 4732  makeSpread
 4750  unmakeSpread
 4766  syncSpread
 4774  fixSpreads
 4813  loadDetector
 4818  go
 4828  loadImg
 4832  saliency
 4859  subjectFromFaces
 4868  analyze
 4894  analyzeAll
 5066  t
 5087  lang
 5088  nPagesSel
 5089  promo
 5094  loadImage
 5096  toJpeg
 5118  was
 5132  pickerBack
 5142  showPickHelp
 5147  close
 5161  within
 5162  decodeFile
 5192  hdBlob
 5202  importFile
 5223  toast
 5236  geom
 5241  prepThumb
 5247  prepFull
 5253  dropPhoto
 5259  tile
 5268  pump
 5295  pump2
 5315  addPhotos
 5342  renderPhotos
 5361  browserTag
 5362  callAI
 5390  thumb
 5392  coupleInfo
 5407  storyPrompt
 5454  keywords
 5463  missingAnswers
 5472  repairStory
 5490  captionPhotos
 5512  defaultStory
 5547  runGeneration
 5610  showIssue
 5622  isWide
 5623  snap
 5625  H
 5626  commit
 5627  restore
 5628  undo
 5629  redo
 5630  updUndo
 5635  visible
 5643  mountPage
 5648  scaleHost
 5657  drawStage
 5671  drawThumb
 5675  drawStrip
 5682  markStrip
 5688  drawThemes
 5693  revealStage
 5699  drawAll
 5700  refreshPage
 5702  afterSlotEdit
 5709  go
 5710  step
 5715  highlightSel
 5725  drawTools
 5775  rewrite
 5792  swapPhoto
 5803  movePage
 5813  bindEditor
 5984  openReader
 5987  draw
 5991  close
 5993  next
 6009  renderBookPreview
 6027  idb
 6028  idbSet
 6029  idbGet
 6030  idbDel
 6031  saveLocal
 6037  offerResume
 6061  fullBlob
 6079  dataUrlToBlob
 6080  uploadPhotos
 6082  todo
 6088  worker
 6111  docHtml
 6117  printHtml
 6118  innerHtml
 6120  spineStyle
 6124  spineText
 6125  defaultSpine
 6126  coverHtml
 6134  generateAlbumPDF
 6140  gen
 6171  processPayment
 6211  goTab
 6238  lang
 6241  pg
 6276  upd
 6302  apply
 6331  mail
 6480  toc
 6487  show
 6493  openLegal
 6499  closeLegal
 6529  cur
 6538  paint
 6563  lang
 6568  applyUI
 6575  setLang
 6593  syncStory
 6623  ensureStoryFor
 6639  recompose
 6653  addInput
 6672  removePhoto
 6725  saveLink
 6747  openFromLink
 6757  set
 6774  trackOverlay
 6782  close
 6818  ouvrir
 6842  drawEbar
 6867  coach
 6873  done
 6879  goTab
 6888  draw
 6916  payLabel
 6927  highlightPal
 6932  setLang
 6947  lang
 6960  spineColors
 7000  name
 7002  auto
 7038  names
 7039  renderLive
 7052  flowMode
 7061  exifDate
 7071  readAscii
 7072  scan
 7089  addPhotos
 7098  remap
 7099  applyOrder
 7112  movePhoto
 7115  sortByDate
 7124  renderPhotosPlus
 7163  startGenAnim
 7175  tick
 7183  stopGenAnim
 7185  runGeneration
 7188  renderSummary
 7201  syncPrice
 7211  goTab
 7233  setLang
 7250  lang
 7281  applyText
 7290  fromFrance
 7298  fromOSM
 7317  close
 7318  render
 7326  pick
 7334  search

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
