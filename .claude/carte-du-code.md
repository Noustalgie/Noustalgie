# Carte de public/index.html

Générée automatiquement (7502 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-151 : <script type="application/ld+json"> (3 Ko)
- lignes 156-1596 : <style> (121 Ko)
- lignes 1597-1616 : <script type="application/ld+json"> (1 Ko)
- lignes 1617-1704 : <script type="application/ld+json"> (4 Ko)
- lignes 2183-4342 : <script> (173 Ko)
- lignes 4343-5027 : <script> (44 Ko)
- lignes 5028-7479 : <script> (205 Ko)
- lignes 7480-7499 : <script> (1 Ko)

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
 5203  1. Import des photos : une version écran + une version impression
 5465  2. Génération : histoire + légendes à partir des photos
 5730  3. Éditeur
 6135  4. Sauvegarde locale (IndexedDB : photos comprises)
 6170  5. Impression : photos en pleine résolution + PDF hébergé
 6271  6. Paiement
 7075  1. Livre 3D réutilisable
 7141  2. Aperçu en direct pendant la création (ordinateur)
 7175  3. Photos : date de prise de vue, couverture, glisser-déposer
 7277  4. Génération vivante : leurs photos se posent dans un livre
 7303  5. Récapitulatif de commande avec LEUR couverture
 7331  6. Finitions : apparition au défilement, page tournée

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
 2162  <div class="legal-overlay" id="legalOverlay"
 2168  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2188  LANGS.fr
 2274  LANGS.en
 2360  LANGS.de
 2446  LANGS.es
 2532  LANGS.pt

## Fonctions

 2622  toggleLangMenu
 2623  pickLang
 2625  setLang
 2664  highlightPal
 2684  selectPricing
 2699  onSlider
 2712  onInAppSlider
 2735  animNum
 2741  toggleCmp
 2760  saveDraft
 2779  restoreDraft
 2786  set
 2794  clearDraft
 2818  goTab
 2857  edPickPrice
 2863  toggleFaq
 2864  startApp
 2869  addPhotosFromEditor
 2902  ensureConvertible
 2920  detectFocalY
 2940  showUploadLoader
 2952  hideUploadLoader
 2956  addPhotos
 2964  processBatch
 3001  getMinPhotos
 3005  renderPhotos
 3021  removePhoto
 3027  openMsgModal
 3028  closeMsgModal
 3029  saveMsgModal
 3034  selStyle
 3039  log
 3049  setProgress
 3060  api
 3090  runGeneration
 3322  renderBookPreview
 3332  pg
 3339  _take
 3350  pickIdx
 3356  ph
 3357  imgT
 3366  img
 3375  wantTall
 3376  wantSquare
 3377  wantWide
 3782  avRender
 3819  reapplyTexts
 3820  avBuildThumbs
 3833  avNext
 3834  avPrev
 3841  toggleEditor
 3842  edTab
 3843  refreshEditor
 3844  refreshTextFields
 3872  estRows
 3881  liveText
 3894  setActiveSlot
 3895  edSelectPhoto
 3896  updateFilter
 3897  updateCrop
 3898  updateZoom
 3899  toggleBW
 3900  applySlotEditsToDOM
 3904  saveTextStyle
 3905  updateTextStyle
 3906  toggleTextStyle
 3907  setTextSize
 3917  applyTextStylesToDOM
 3918  edSelectLayout
 3919  applyEdit
 3920  applyLayoutOverride
 3921  applyTextLive
 3922  resetEdit
 3926  initCropGestures
 3930  editorOpen
 3931  curSlot
 3939  snapshotPage
 3940  undoEdit
 3942  openFullPreview
 3949  base64ToBlob
 3961  fetchWithTimeout
 3976  processPayment
 4075  generateAlbumPDF
 4082  compressPhotoForPdf
 4146  generateAlbumPDF_UNUSED
 4213  applyPromo
 4234  selectFormat
 4256  updateFormatPrices
 4270  generateFinalPDF
 4287  addPage
 4313  openLegal
 4314  closeLegal
 4353  clamp
 4390  curLang
 4397  themeKey
 4398  theme
 4399  photos
 4401  printSrc
 4413  faceSpan
 4416  autoPos
 4421  fit
 4424  L
 4447  cropCost
 4459  slot
 4478  tx
 4485  fit
 4486  orientOf
 4650  renderPage
 4669  tierOf
 4670  photoPageCount
 4671  minPhotos
 4674  distribute
 4690  pickLayout
 4707  chooseLayout
 4720  mkPage
 4724  plan
 4760  tag
 4763  takePhoto
 4834  pairOf
 4836  relayout
 4842  makeSpread
 4860  unmakeSpread
 4876  syncSpread
 4884  fixSpreads
 4923  loadDetector
 4928  go
 4938  loadImg
 4942  saliency
 4969  subjectFromFaces
 4978  analyze
 5004  analyzeAll
 5176  t
 5197  lang
 5198  nPagesSel
 5199  promo
 5204  loadImage
 5206  toJpeg
 5228  was
 5242  pickerBack
 5252  showPickHelp
 5257  close
 5271  within
 5272  decodeFile
 5302  hdBlob
 5312  importFile
 5333  toast
 5346  geom
 5351  prepThumb
 5357  prepFull
 5363  dropPhoto
 5369  tile
 5378  pump
 5405  pump2
 5425  addPhotos
 5452  renderPhotos
 5471  browserTag
 5472  callAI
 5500  thumb
 5502  coupleInfo
 5517  storyPrompt
 5564  keywords
 5573  missingAnswers
 5582  repairStory
 5600  captionPhotos
 5622  defaultStory
 5657  runGeneration
 5720  showIssue
 5732  isWide
 5733  snap
 5735  H
 5736  commit
 5737  restore
 5738  undo
 5739  redo
 5740  updUndo
 5745  visible
 5753  mountPage
 5758  scaleHost
 5767  drawStage
 5781  drawThumb
 5785  drawStrip
 5792  markStrip
 5798  drawThemes
 5803  revealStage
 5809  drawAll
 5810  refreshPage
 5812  afterSlotEdit
 5819  go
 5820  step
 5825  highlightSel
 5835  drawTools
 5885  rewrite
 5902  swapPhoto
 5913  movePage
 5923  bindEditor
 6094  openReader
 6097  draw
 6101  close
 6103  next
 6119  renderBookPreview
 6137  idb
 6138  idbSet
 6139  idbGet
 6140  idbDel
 6141  saveLocal
 6147  offerResume
 6171  fullBlob
 6189  dataUrlToBlob
 6190  uploadPhotos
 6192  todo
 6198  worker
 6221  docHtml
 6227  printHtml
 6228  innerHtml
 6230  spineStyle
 6234  spineText
 6235  defaultSpine
 6236  coverHtml
 6244  generateAlbumPDF
 6250  gen
 6281  processPayment
 6321  goTab
 6348  lang
 6350  X
 6353  pg
 6392  upd
 6418  apply
 6447  mail
 6596  toc
 6603  show
 6609  openLegal
 6615  closeLegal
 6645  cur
 6654  paint
 6679  lang
 6684  applyUI
 6691  setLang
 6709  syncStory
 6739  ensureStoryFor
 6755  recompose
 6769  addInput
 6788  removePhoto
 6841  saveLink
 6863  openFromLink
 6873  set
 6890  trackOverlay
 6898  close
 6934  ouvrir
 6958  drawEbar
 6983  coach
 6989  done
 6995  goTab
 7004  draw
 7032  payLabel
 7043  highlightPal
 7048  setLang
 7063  lang
 7076  spineColors
 7116  name
 7118  auto
 7154  names
 7155  renderLive
 7168  flowMode
 7177  exifDate
 7187  readAscii
 7188  scan
 7205  addPhotos
 7214  remap
 7215  applyOrder
 7228  movePhoto
 7231  sortByDate
 7240  renderPhotosPlus
 7279  startGenAnim
 7291  tick
 7299  stopGenAnim
 7301  runGeneration
 7304  renderSummary
 7317  syncPrice
 7327  goTab
 7349  setLang
 7366  lang
 7397  applyText
 7406  fromFrance
 7414  fromOSM
 7433  close
 7434  render
 7442  pick
 7450  search
 7486  etape

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
