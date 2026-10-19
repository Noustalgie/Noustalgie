# Carte de public/index.html

Générée automatiquement (8278 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1656 : <style> (124 Ko)
- lignes 1657-1676 : <script type="application/ld+json"> (1 Ko)
- lignes 1677-1764 : <script type="application/ld+json"> (4 Ko)
- lignes 2289-4448 : <script> (179 Ko)
- lignes 4449-5695 : <script> (112 Ko)
- lignes 5696-8255 : <script> (213 Ko)
- lignes 8256-8275 : <script> (1 Ko)

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
 4758  Style Magazine : le livre comme un magazine de couple
 5871  1. Import des photos : une version écran + une version impression
 6140  2. Génération : histoire + légendes à partir des photos
 6442  3. Éditeur
 6850  4. Sauvegarde locale (IndexedDB : photos comprises)
 6885  5. Impression : photos en pleine résolution + PDF hébergé
 6986  6. Paiement
 7840  1. Livre 3D réutilisable
 7917  2. Aperçu en direct pendant la création (ordinateur)
 7951  3. Photos : date de prise de vue, couverture, glisser-déposer
 8053  4. Génération vivante : leurs photos se posent dans un livre
 8079  5. Récapitulatif de commande avec LEUR couverture
 8107  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1792  <header>
 1793  <nav class="ed-nav">
 1815  <main id="main" tabindex="-1">
 1817  <section class="ed-hero">
 1826  <div class="nst-demo" id="nstDemo"
 1832  <section class="nst-how nst-frise" id="how">
 1853  <section class="ed-price" id="pricing">
 1886  <section class="section app-section" id="app">
 1913  <div class="panel active" id="panel0"
 1996  <div class="panel" id="panel1"
 2037  <div class="panel" id="panel2"
 2063  <div class="panel" id="panel3"
 2064  <div id="nstEd"
 2091  <div class="panel" id="panel4"
 2093  <div id="payForm"
 2171  <section class="ed-faq-section" id="faq">
 2219  <footer>
 2268  <div class="legal-overlay" id="legalOverlay"
 2274  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2294  LANGS.fr
 2380  LANGS.en
 2466  LANGS.de
 2552  LANGS.es
 2638  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2728  toggleLangMenu
 2729  pickLang
 2731  setLang
 2770  highlightPal
 2790  selectPricing
 2805  onSlider
 2818  onInAppSlider
 2841  animNum
 2847  toggleCmp
 2866  saveDraft
 2885  restoreDraft
 2892  set
 2900  clearDraft
 2924  goTab
 2963  edPickPrice
 2969  toggleFaq
 2970  startApp
 2975  addPhotosFromEditor
 3008  ensureConvertible
 3026  detectFocalY
 3046  showUploadLoader
 3058  hideUploadLoader
 3062  addPhotos
 3070  processBatch
 3107  getMinPhotos
 3111  renderPhotos
 3127  removePhoto
 3133  openMsgModal
 3134  closeMsgModal
 3135  saveMsgModal
 3140  selStyle
 3145  log
 3155  setProgress
 3166  api
 3196  runGeneration
 3428  renderBookPreview
 3438  pg
 3445  _take
 3456  pickIdx
 3462  ph
 3463  imgT
 3472  img
 3481  wantTall
 3482  wantSquare
 3483  wantWide
 3888  avRender
 3925  reapplyTexts
 3926  avBuildThumbs
 3939  avNext
 3940  avPrev
 3947  toggleEditor
 3948  edTab
 3949  refreshEditor
 3950  refreshTextFields
 3978  estRows
 3987  liveText
 4000  setActiveSlot
 4001  edSelectPhoto
 4002  updateFilter
 4003  updateCrop
 4004  updateZoom
 4005  toggleBW
 4006  applySlotEditsToDOM
 4010  saveTextStyle
 4011  updateTextStyle
 4012  toggleTextStyle
 4013  setTextSize
 4023  applyTextStylesToDOM
 4024  edSelectLayout
 4025  applyEdit
 4026  applyLayoutOverride
 4027  applyTextLive
 4028  resetEdit
 4032  initCropGestures
 4036  editorOpen
 4037  curSlot
 4045  snapshotPage
 4046  undoEdit
 4048  openFullPreview
 4055  base64ToBlob
 4067  fetchWithTimeout
 4082  processPayment
 4181  generateAlbumPDF
 4188  compressPhotoForPdf
 4252  generateAlbumPDF_UNUSED
 4319  applyPromo
 4340  selectFormat
 4362  updateFormatPrices
 4376  generateFinalPDF
 4393  addPage
 4419  openLegal
 4420  closeLegal
 4459  clamp
 4500  curLang
 4507  themeKey
 4508  theme
 4509  photos
 4511  printSrc
 4523  faceSpan
 4526  autoPos
 4531  fit
 4534  L
 4557  cropCost
 4569  slot
 4588  tx
 4595  fit
 4596  orientOf
 4762  MT
 4764  mix
 4775  MONTHS
 4779  svgHeart
 4780  svgHeartLine
 4781  svgCurl
 4782  tape
 4784  polaroid
 4791  barcode
 4800  heartMap
 4812  wordGrid
 4814  rnd
 4840  folio
 4935  ic
 5000  mark
 5122  fmtCoord
 5126  k3Line
 5133  yearPhotos
 5143  planMagazine
 5220  again
 5221  freshOr
 5222  pick
 5226  mk
 5233  L
 5318  renderPage
 5337  tierOf
 5338  photoPageCount
 5339  minPhotos
 5342  distribute
 5358  pickLayout
 5375  chooseLayout
 5388  mkPage
 5392  plan
 5428  tag
 5431  takePhoto
 5502  pairOf
 5504  relayout
 5510  makeSpread
 5528  unmakeSpread
 5544  syncSpread
 5552  fixSpreads
 5591  loadDetector
 5596  go
 5606  loadImg
 5610  saliency
 5637  subjectFromFaces
 5646  analyze
 5672  analyzeAll
 5844  t
 5865  lang
 5866  nPagesSel
 5867  promo
 5872  loadImage
 5874  toJpeg
 5896  was
 5913  pickerBack
 5924  showPickHelp
 5929  close
 5943  within
 5944  decodeFile
 5974  hdBlob
 5984  importFile
 6005  toast
 6018  geom
 6023  prepThumb
 6029  prepFull
 6035  dropPhoto
 6041  tile
 6050  pump
 6077  pump2
 6097  addPhotos
 6127  renderPhotos
 6146  browserTag
 6147  callAI
 6175  thumb
 6177  coupleInfo
 6191  mqParts
 6196  magAnswers
 6214  fetchCarte
 6228  storyPrompt
 6267  magFacts
 6276  magazinePrompt
 6298  cleanMag
 6299  s
 6311  captionPhotos
 6333  defaultStory
 6368  runGeneration
 6432  showIssue
 6445  isWide
 6446  snap
 6448  H
 6449  commit
 6450  restore
 6451  undo
 6452  redo
 6453  updUndo
 6458  visible
 6466  mountPage
 6471  scaleHost
 6480  drawStage
 6494  drawThumb
 6498  drawStrip
 6505  markStrip
 6511  drawThemes
 6516  revealStage
 6522  drawAll
 6523  refreshPage
 6525  afterSlotEdit
 6532  go
 6533  step
 6538  highlightSel
 6548  drawTools
 6598  rewrite
 6615  swapPhoto
 6626  movePage
 6636  bindEditor
 6809  openReader
 6812  draw
 6816  close
 6818  next
 6834  renderBookPreview
 6852  idb
 6853  idbSet
 6854  idbGet
 6855  idbDel
 6856  saveLocal
 6862  offerResume
 6886  fullBlob
 6904  dataUrlToBlob
 6905  uploadPhotos
 6907  todo
 6913  worker
 6936  docHtml
 6942  printHtml
 6943  innerHtml
 6945  spineStyle
 6949  spineText
 6950  defaultSpine
 6951  coverHtml
 6959  generateAlbumPDF
 6965  gen
 6996  processPayment
 7036  goTab
 7063  lang
 7094  upd
 7116  apply
 7135  T
 7136  nm
 7137  renderQuiz
 7143  mark
 7149  save
 7194  mail
 7343  toc
 7350  show
 7356  openLegal
 7362  closeLegal
 7392  cur
 7401  paint
 7426  lang
 7431  applyUI
 7438  setLang
 7458  syncStory
 7492  ensureStoryFor
 7508  recompose
 7522  addInput
 7541  removePhoto
 7594  saveLink
 7616  openFromLink
 7626  set
 7643  trackOverlay
 7651  close
 7687  ouvrir
 7713  ekLabel
 7723  drawEbar
 7748  coach
 7754  done
 7760  goTab
 7769  draw
 7797  payLabel
 7808  highlightPal
 7813  setLang
 7828  lang
 7841  spineColors
 7868  sampleCover
 7886  auto
 7887  build
 7894  name
 7930  names
 7931  renderLive
 7944  flowMode
 7953  exifDate
 7963  readAscii
 7964  scan
 7981  addPhotos
 7990  remap
 7991  applyOrder
 8004  movePhoto
 8007  sortByDate
 8016  renderPhotosPlus
 8055  startGenAnim
 8067  tick
 8075  stopGenAnim
 8077  runGeneration
 8080  renderSummary
 8093  syncPrice
 8103  goTab
 8125  setLang
 8142  lang
 8173  applyText
 8182  fromFrance
 8190  fromOSM
 8209  close
 8210  render
 8218  pick
 8226  search
 8262  etape

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
