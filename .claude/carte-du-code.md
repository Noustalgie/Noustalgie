# Carte de public/index.html

Générée automatiquement (8275 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1654 : <style> (124 Ko)
- lignes 1655-1674 : <script type="application/ld+json"> (1 Ko)
- lignes 1675-1762 : <script type="application/ld+json"> (4 Ko)
- lignes 2286-4445 : <script> (179 Ko)
- lignes 4446-5692 : <script> (112 Ko)
- lignes 5693-8252 : <script> (213 Ko)
- lignes 8253-8272 : <script> (1 Ko)

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
 1103  v2.3 — garanties
 1109  v2.3 — tarifs actionnables
 1113  v2.3 — barre d'action mobile
 1126  v2.4 — hero : couverture du livre fermé
 1134  v2.4 — lisibilité : textes secondaires contrastés (≥ 4,5:1)
 1153  v2.5 — sélecteur de langue
 1163  v2.5 — pages d'information
 1205  v2.6 — « Comment ça marche »
 1237  v2.7 — « Comment ça marche » en frise éditoriale
 1257  v3 — indications sous les questions
 1258  v4 — livre 3D
 1282  v4 — tarifs : épaisseur réelle
 1286  v4 — aperçu en direct
 1297  v4 — photos
 1307  v4 — génération vivante
 1317  v4 — récapitulatif de commande
 1325  v4 — étapes
 1333  v4 — apparition au défilement et page tournée
 1343  v4.3 — suggestions d'adresse
 1357  v4.5 — message d'import
 1367  v4.7 — correctifs téléphone
 1383  v4.8 — édition évidente
 1402  v5.2 — photos non transmises par l'iPhone
 1411  v5.4 — lisibilité
 1416  v5.5 — finitions demandées
 1442  v6 · Direction artistique « Taste Skill » (refonte en mode préservation)
 1620  galerie d'accueil : lien vers l'album d'exemple complet
 4755  Style Magazine : le livre comme un magazine de couple
 5868  1. Import des photos : une version écran + une version impression
 6137  2. Génération : histoire + légendes à partir des photos
 6437  3. Éditeur
 6845  4. Sauvegarde locale (IndexedDB : photos comprises)
 6880  5. Impression : photos en pleine résolution + PDF hébergé
 6981  6. Paiement
 7848  1. Livre 3D réutilisable
 7914  2. Aperçu en direct pendant la création (ordinateur)
 7948  3. Photos : date de prise de vue, couverture, glisser-déposer
 8050  4. Génération vivante : leurs photos se posent dans un livre
 8076  5. Récapitulatif de commande avec LEUR couverture
 8104  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1790  <header>
 1791  <nav class="ed-nav">
 1813  <main id="main" tabindex="-1">
 1815  <section class="ed-hero">
 1824  <div class="nst-demo" id="nstDemo"
 1830  <section class="nst-how nst-frise" id="how">
 1851  <section class="ed-price" id="pricing">
 1884  <section class="section app-section" id="app">
 1911  <div class="panel active" id="panel0"
 1994  <div class="panel" id="panel1"
 2035  <div class="panel" id="panel2"
 2061  <div class="panel" id="panel3"
 2062  <div id="nstEd"
 2089  <div class="panel" id="panel4"
 2091  <div id="payForm"
 2169  <section class="ed-faq-section" id="faq">
 2217  <footer>
 2265  <div class="legal-overlay" id="legalOverlay"
 2271  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2291  LANGS.fr
 2377  LANGS.en
 2463  LANGS.de
 2549  LANGS.es
 2635  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2725  toggleLangMenu
 2726  pickLang
 2728  setLang
 2767  highlightPal
 2787  selectPricing
 2802  onSlider
 2815  onInAppSlider
 2838  animNum
 2844  toggleCmp
 2863  saveDraft
 2882  restoreDraft
 2889  set
 2897  clearDraft
 2921  goTab
 2960  edPickPrice
 2966  toggleFaq
 2967  startApp
 2972  addPhotosFromEditor
 3005  ensureConvertible
 3023  detectFocalY
 3043  showUploadLoader
 3055  hideUploadLoader
 3059  addPhotos
 3067  processBatch
 3104  getMinPhotos
 3108  renderPhotos
 3124  removePhoto
 3130  openMsgModal
 3131  closeMsgModal
 3132  saveMsgModal
 3137  selStyle
 3142  log
 3152  setProgress
 3163  api
 3193  runGeneration
 3425  renderBookPreview
 3435  pg
 3442  _take
 3453  pickIdx
 3459  ph
 3460  imgT
 3469  img
 3478  wantTall
 3479  wantSquare
 3480  wantWide
 3885  avRender
 3922  reapplyTexts
 3923  avBuildThumbs
 3936  avNext
 3937  avPrev
 3944  toggleEditor
 3945  edTab
 3946  refreshEditor
 3947  refreshTextFields
 3975  estRows
 3984  liveText
 3997  setActiveSlot
 3998  edSelectPhoto
 3999  updateFilter
 4000  updateCrop
 4001  updateZoom
 4002  toggleBW
 4003  applySlotEditsToDOM
 4007  saveTextStyle
 4008  updateTextStyle
 4009  toggleTextStyle
 4010  setTextSize
 4020  applyTextStylesToDOM
 4021  edSelectLayout
 4022  applyEdit
 4023  applyLayoutOverride
 4024  applyTextLive
 4025  resetEdit
 4029  initCropGestures
 4033  editorOpen
 4034  curSlot
 4042  snapshotPage
 4043  undoEdit
 4045  openFullPreview
 4052  base64ToBlob
 4064  fetchWithTimeout
 4079  processPayment
 4178  generateAlbumPDF
 4185  compressPhotoForPdf
 4249  generateAlbumPDF_UNUSED
 4316  applyPromo
 4337  selectFormat
 4359  updateFormatPrices
 4373  generateFinalPDF
 4390  addPage
 4416  openLegal
 4417  closeLegal
 4456  clamp
 4497  curLang
 4504  themeKey
 4505  theme
 4506  photos
 4508  printSrc
 4520  faceSpan
 4523  autoPos
 4528  fit
 4531  L
 4554  cropCost
 4566  slot
 4585  tx
 4592  fit
 4593  orientOf
 4759  MT
 4761  mix
 4772  MONTHS
 4776  svgHeart
 4777  svgHeartLine
 4778  svgCurl
 4779  tape
 4781  polaroid
 4788  barcode
 4797  heartMap
 4809  wordGrid
 4811  rnd
 4837  folio
 4932  ic
 4997  mark
 5119  fmtCoord
 5123  k3Line
 5130  yearPhotos
 5140  planMagazine
 5217  again
 5218  freshOr
 5219  pick
 5223  mk
 5230  L
 5315  renderPage
 5334  tierOf
 5335  photoPageCount
 5336  minPhotos
 5339  distribute
 5355  pickLayout
 5372  chooseLayout
 5385  mkPage
 5389  plan
 5425  tag
 5428  takePhoto
 5499  pairOf
 5501  relayout
 5507  makeSpread
 5525  unmakeSpread
 5541  syncSpread
 5549  fixSpreads
 5588  loadDetector
 5593  go
 5603  loadImg
 5607  saliency
 5634  subjectFromFaces
 5643  analyze
 5669  analyzeAll
 5841  t
 5862  lang
 5863  nPagesSel
 5864  promo
 5869  loadImage
 5871  toJpeg
 5893  was
 5910  pickerBack
 5921  showPickHelp
 5926  close
 5940  within
 5941  decodeFile
 5971  hdBlob
 5981  importFile
 6002  toast
 6015  geom
 6020  prepThumb
 6026  prepFull
 6032  dropPhoto
 6038  tile
 6047  pump
 6074  pump2
 6094  addPhotos
 6124  renderPhotos
 6143  browserTag
 6144  callAI
 6172  thumb
 6174  coupleInfo
 6188  mqParts
 6193  magAnswers
 6211  fetchCarte
 6225  storyPrompt
 6262  magFacts
 6271  magazinePrompt
 6293  cleanMag
 6294  s
 6306  captionPhotos
 6328  defaultStory
 6363  runGeneration
 6427  showIssue
 6440  isWide
 6441  snap
 6443  H
 6444  commit
 6445  restore
 6446  undo
 6447  redo
 6448  updUndo
 6453  visible
 6461  mountPage
 6466  scaleHost
 6475  drawStage
 6489  drawThumb
 6493  drawStrip
 6500  markStrip
 6506  drawThemes
 6511  revealStage
 6517  drawAll
 6518  refreshPage
 6520  afterSlotEdit
 6527  go
 6528  step
 6533  highlightSel
 6543  drawTools
 6593  rewrite
 6610  swapPhoto
 6621  movePage
 6631  bindEditor
 6804  openReader
 6807  draw
 6811  close
 6813  next
 6829  renderBookPreview
 6847  idb
 6848  idbSet
 6849  idbGet
 6850  idbDel
 6851  saveLocal
 6857  offerResume
 6881  fullBlob
 6899  dataUrlToBlob
 6900  uploadPhotos
 6902  todo
 6908  worker
 6931  docHtml
 6937  printHtml
 6938  innerHtml
 6940  spineStyle
 6944  spineText
 6945  defaultSpine
 6946  coverHtml
 6954  generateAlbumPDF
 6960  gen
 6991  processPayment
 7031  goTab
 7058  lang
 7060  X
 7063  pg
 7102  upd
 7124  apply
 7143  T
 7144  nm
 7145  renderQuiz
 7151  mark
 7157  save
 7202  mail
 7351  toc
 7358  show
 7364  openLegal
 7370  closeLegal
 7400  cur
 7409  paint
 7434  lang
 7439  applyUI
 7446  setLang
 7466  syncStory
 7500  ensureStoryFor
 7516  recompose
 7530  addInput
 7549  removePhoto
 7602  saveLink
 7624  openFromLink
 7634  set
 7651  trackOverlay
 7659  close
 7695  ouvrir
 7721  ekLabel
 7731  drawEbar
 7756  coach
 7762  done
 7768  goTab
 7777  draw
 7805  payLabel
 7816  highlightPal
 7821  setLang
 7836  lang
 7849  spineColors
 7889  name
 7891  auto
 7927  names
 7928  renderLive
 7941  flowMode
 7950  exifDate
 7960  readAscii
 7961  scan
 7978  addPhotos
 7987  remap
 7988  applyOrder
 8001  movePhoto
 8004  sortByDate
 8013  renderPhotosPlus
 8052  startGenAnim
 8064  tick
 8072  stopGenAnim
 8074  runGeneration
 8077  renderSummary
 8090  syncPrice
 8100  goTab
 8122  setLang
 8139  lang
 8170  applyText
 8179  fromFrance
 8187  fromOSM
 8206  close
 8207  render
 8215  pick
 8223  search
 8259  etape

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
