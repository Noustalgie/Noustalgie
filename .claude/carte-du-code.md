# Carte de public/index.html

Générée automatiquement (8626 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (8 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1613 : <style> (133 Ko)
- lignes 1614-1686 : <script type="application/ld+json"> (2 Ko)
- lignes 1687-1782 : <script type="application/ld+json"> (6 Ko)
- lignes 2330-4499 : <script> (185 Ko)
- lignes 4500-5825 : <script> (122 Ko)
- lignes 5826-8597 : <script> (236 Ko)
- lignes 8598-8623 : <script> (2 Ko)

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
 4827  Style Magazine : le livre comme un magazine de couple
 6001  1. Import des photos : une version écran + une version impression
 6291  2. Génération : histoire + légendes à partir des photos
 6603  3. Éditeur
 7011  4. Sauvegarde locale (IndexedDB : photos comprises)
 7046  5. Impression : photos en pleine résolution + PDF hébergé
 7223  6. Paiement
 8128  1. Livre 3D réutilisable
 8249  2. Aperçu en direct pendant la création (ordinateur)
 8283  3. Photos : date de prise de vue, couverture, glisser-déposer
 8385  4. Génération vivante : leurs photos se posent dans un livre
 8411  5. Récapitulatif de commande avec LEUR couverture
 8449  6. Finitions : apparition au défilement, page tournée

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
 4510  clamp
 4556  curLang
 4563  themeKey
 4564  theme
 4565  photos
 4570  printSrc
 4582  faceSpan
 4585  autoPos
 4590  fit
 4593  L
 4616  cropCost
 4631  slot
 4656  tx
 4663  fit
 4664  orientOf
 4831  MT
 4833  mix
 4844  MONTHS
 4848  svgHeart
 4849  svgHeartLine
 4850  svgCurl
 4851  tape
 4853  polaroid
 4860  barcode
 4869  heartMap
 4881  wordGrid
 4883  rnd
 4909  folio
 4925  col
 4929  seal
 5038  ic
 5103  mark
 5225  fmtCoord
 5229  k3Line
 5236  yearPhotos
 5247  kmBetween
 5252  villesT
 5259  planMagazine
 5341  again
 5342  freshOr
 5343  pick
 5347  mk
 5355  L
 5445  renderPage
 5466  tierOf
 5467  photoPageCount
 5468  minPhotos
 5471  distribute
 5487  pickLayout
 5504  chooseLayout
 5517  mkPage
 5521  plan
 5557  tag
 5560  takePhoto
 5631  pairOf
 5633  relayout
 5639  makeSpread
 5657  unmakeSpread
 5673  syncSpread
 5681  fixSpreads
 5721  loadDetector
 5726  go
 5736  loadImg
 5740  saliency
 5767  subjectFromFaces
 5776  analyze
 5802  analyzeAll
 5974  t
 5995  lang
 5996  nPagesSel
 5997  promo
 6002  loadImage
 6004  toJpeg
 6026  was
 6043  pickerBack
 6059  showPickHelp
 6068  close
 6090  within
 6091  decodeFile
 6121  hdBlob
 6131  importFile
 6152  toast
 6165  geom
 6170  prepThumb
 6176  prepFull
 6182  dropPhoto
 6188  tile
 6197  pump
 6225  pump2
 6245  addPhotos
 6278  renderPhotos
 6297  browserTag
 6298  callAI
 6326  thumb
 6328  coupleInfo
 6342  mqParts
 6347  magAnswers
 6366  fetchCarte
 6376  fetchVilles
 6388  storyPrompt
 6427  magFacts
 6437  magazinePrompt
 6459  cleanMag
 6460  s
 6472  captionPhotos
 6494  defaultStory
 6529  runGeneration
 6593  showIssue
 6606  isWide
 6607  snap
 6609  H
 6610  commit
 6611  restore
 6612  undo
 6613  redo
 6614  updUndo
 6619  visible
 6627  mountPage
 6632  scaleHost
 6641  drawStage
 6655  drawThumb
 6659  drawStrip
 6666  markStrip
 6672  drawThemes
 6677  revealStage
 6683  drawAll
 6684  refreshPage
 6686  afterSlotEdit
 6693  go
 6694  step
 6699  highlightSel
 6709  drawTools
 6759  rewrite
 6776  swapPhoto
 6787  movePage
 6797  bindEditor
 6970  openReader
 6973  draw
 6977  close
 6979  next
 6995  renderBookPreview
 7013  idb
 7014  idbSet
 7015  idbGet
 7016  idbDel
 7017  saveLocal
 7023  offerResume
 7047  fullBlob
 7065  dataUrlToBlob
 7066  uploadPhotos
 7068  todo
 7074  worker
 7099  nstBake
 7156  docHtml
 7164  printHtml
 7165  innerHtml
 7167  spineStyle
 7171  spineText
 7172  defaultSpine
 7173  coverHtml
 7181  generateAlbumPDF
 7187  gen
 7199  doc
 7200  tries
 7233  processPayment
 7273  goTab
 7300  lang
 7310  img
 7335  stop
 7366  upd
 7392  apply
 7411  T
 7412  nm
 7413  renderQuiz
 7419  mark
 7425  save
 7472  mail
 7619  backLbl
 7624  toc
 7631  show
 7638  openLegal
 7646  hideLegal
 7647  closeLegal
 7675  cur
 7684  paint
 7709  lang
 7714  applyUI
 7721  setLang
 7741  syncStory
 7775  ensureStoryFor
 7791  recompose
 7805  addInput
 7824  removePhoto
 7877  saveLink
 7899  openFromLink
 7909  set
 7927  trHide
 7929  trackOverlay
 7937  close
 7974  ouvrir
 8000  ekLabel
 8011  drawEbar
 8036  coach
 8042  done
 8048  goTab
 8057  draw
 8085  payLabel
 8096  highlightPal
 8101  setLang
 8116  lang
 8129  spineColors
 8156  sampleCover
 8175  auto
 8176  build
 8183  name
 8199  words
 8206  apply
 8233  build
 8242  nst70
 8262  names
 8263  renderLive
 8276  flowMode
 8285  exifDate
 8295  readAscii
 8296  scan
 8313  addPhotos
 8322  remap
 8323  applyOrder
 8336  movePhoto
 8339  sortByDate
 8348  renderPhotosPlus
 8387  startGenAnim
 8399  tick
 8407  stopGenAnim
 8409  runGeneration
 8414  noel
 8418  fill
 8421  renderSummary
 8434  syncPrice
 8445  goTab
 8467  setLang
 8484  lang
 8515  applyText
 8524  fromFrance
 8532  fromOSM
 8551  close
 8552  render
 8560  pick
 8568  search
 8604  etape

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
