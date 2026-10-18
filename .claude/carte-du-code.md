# Carte de public/index.html

Générée automatiquement (8339 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1656 : <style> (124 Ko)
- lignes 1657-1676 : <script type="application/ld+json"> (1 Ko)
- lignes 1677-1764 : <script type="application/ld+json"> (4 Ko)
- lignes 2301-4460 : <script> (182 Ko)
- lignes 4461-5707 : <script> (112 Ko)
- lignes 5708-8316 : <script> (217 Ko)
- lignes 8317-8336 : <script> (1 Ko)

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
 4770  Style Magazine : le livre comme un magazine de couple
 5883  1. Import des photos : une version écran + une version impression
 6152  2. Génération : histoire + légendes à partir des photos
 6510  3. Éditeur
 6917  4. Sauvegarde locale (IndexedDB : photos comprises)
 6952  5. Impression : photos en pleine résolution + PDF hébergé
 7053  6. Paiement
 7912  1. Livre 3D réutilisable
 7978  2. Aperçu en direct pendant la création (ordinateur)
 8012  3. Photos : date de prise de vue, couverture, glisser-déposer
 8114  4. Génération vivante : leurs photos se posent dans un livre
 8140  5. Récapitulatif de commande avec LEUR couverture
 8168  6. Finitions : apparition au défilement, page tournée

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
 2009  <div class="panel" id="panel1"
 2050  <div class="panel" id="panel2"
 2076  <div class="panel" id="panel3"
 2077  <div id="nstEd"
 2104  <div class="panel" id="panel4"
 2106  <div id="payForm"
 2184  <section class="ed-faq-section" id="faq">
 2232  <footer>
 2280  <div class="legal-overlay" id="legalOverlay"
 2286  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2306  LANGS.fr
 2392  LANGS.en
 2478  LANGS.de
 2564  LANGS.es
 2650  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2740  toggleLangMenu
 2741  pickLang
 2743  setLang
 2782  highlightPal
 2802  selectPricing
 2817  onSlider
 2830  onInAppSlider
 2853  animNum
 2859  toggleCmp
 2878  saveDraft
 2897  restoreDraft
 2904  set
 2912  clearDraft
 2936  goTab
 2975  edPickPrice
 2981  toggleFaq
 2982  startApp
 2987  addPhotosFromEditor
 3020  ensureConvertible
 3038  detectFocalY
 3058  showUploadLoader
 3070  hideUploadLoader
 3074  addPhotos
 3082  processBatch
 3119  getMinPhotos
 3123  renderPhotos
 3139  removePhoto
 3145  openMsgModal
 3146  closeMsgModal
 3147  saveMsgModal
 3152  selStyle
 3157  log
 3167  setProgress
 3178  api
 3208  runGeneration
 3440  renderBookPreview
 3450  pg
 3457  _take
 3468  pickIdx
 3474  ph
 3475  imgT
 3484  img
 3493  wantTall
 3494  wantSquare
 3495  wantWide
 3900  avRender
 3937  reapplyTexts
 3938  avBuildThumbs
 3951  avNext
 3952  avPrev
 3959  toggleEditor
 3960  edTab
 3961  refreshEditor
 3962  refreshTextFields
 3990  estRows
 3999  liveText
 4012  setActiveSlot
 4013  edSelectPhoto
 4014  updateFilter
 4015  updateCrop
 4016  updateZoom
 4017  toggleBW
 4018  applySlotEditsToDOM
 4022  saveTextStyle
 4023  updateTextStyle
 4024  toggleTextStyle
 4025  setTextSize
 4035  applyTextStylesToDOM
 4036  edSelectLayout
 4037  applyEdit
 4038  applyLayoutOverride
 4039  applyTextLive
 4040  resetEdit
 4044  initCropGestures
 4048  editorOpen
 4049  curSlot
 4057  snapshotPage
 4058  undoEdit
 4060  openFullPreview
 4067  base64ToBlob
 4079  fetchWithTimeout
 4094  processPayment
 4193  generateAlbumPDF
 4200  compressPhotoForPdf
 4264  generateAlbumPDF_UNUSED
 4331  applyPromo
 4352  selectFormat
 4374  updateFormatPrices
 4388  generateFinalPDF
 4405  addPage
 4431  openLegal
 4432  closeLegal
 4471  clamp
 4512  curLang
 4519  themeKey
 4520  theme
 4521  photos
 4523  printSrc
 4535  faceSpan
 4538  autoPos
 4543  fit
 4546  L
 4569  cropCost
 4581  slot
 4600  tx
 4607  fit
 4608  orientOf
 4774  MT
 4776  mix
 4787  MONTHS
 4791  svgHeart
 4792  svgHeartLine
 4793  svgCurl
 4794  tape
 4796  polaroid
 4803  barcode
 4812  heartMap
 4824  wordGrid
 4826  rnd
 4852  folio
 4947  ic
 5012  mark
 5134  fmtCoord
 5138  k3Line
 5145  yearPhotos
 5155  planMagazine
 5232  again
 5233  freshOr
 5234  pick
 5238  mk
 5245  L
 5330  renderPage
 5349  tierOf
 5350  photoPageCount
 5351  minPhotos
 5354  distribute
 5370  pickLayout
 5387  chooseLayout
 5400  mkPage
 5404  plan
 5440  tag
 5443  takePhoto
 5514  pairOf
 5516  relayout
 5522  makeSpread
 5540  unmakeSpread
 5556  syncSpread
 5564  fixSpreads
 5603  loadDetector
 5608  go
 5618  loadImg
 5622  saliency
 5649  subjectFromFaces
 5658  analyze
 5684  analyzeAll
 5856  t
 5877  lang
 5878  nPagesSel
 5879  promo
 5884  loadImage
 5886  toJpeg
 5908  was
 5925  pickerBack
 5936  showPickHelp
 5941  close
 5955  within
 5956  decodeFile
 5986  hdBlob
 5996  importFile
 6017  toast
 6030  geom
 6035  prepThumb
 6041  prepFull
 6047  dropPhoto
 6053  tile
 6062  pump
 6089  pump2
 6109  addPhotos
 6139  renderPhotos
 6158  browserTag
 6159  callAI
 6187  thumb
 6189  coupleInfo
 6205  mqParts
 6210  magAnswers
 6228  fetchCarte
 6242  storyPrompt
 6289  magFacts
 6298  magazinePrompt
 6324  cleanMag
 6325  s
 6338  keywords
 6347  missingAnswers
 6356  repairStory
 6374  captionPhotos
 6396  defaultStory
 6431  runGeneration
 6500  showIssue
 6512  isWide
 6513  snap
 6515  H
 6516  commit
 6517  restore
 6518  undo
 6519  redo
 6520  updUndo
 6525  visible
 6533  mountPage
 6538  scaleHost
 6547  drawStage
 6561  drawThumb
 6565  drawStrip
 6572  markStrip
 6578  drawThemes
 6583  revealStage
 6589  drawAll
 6590  refreshPage
 6592  afterSlotEdit
 6599  go
 6600  step
 6605  highlightSel
 6615  drawTools
 6665  rewrite
 6682  swapPhoto
 6693  movePage
 6703  bindEditor
 6876  openReader
 6879  draw
 6883  close
 6885  next
 6901  renderBookPreview
 6919  idb
 6920  idbSet
 6921  idbGet
 6922  idbDel
 6923  saveLocal
 6929  offerResume
 6953  fullBlob
 6971  dataUrlToBlob
 6972  uploadPhotos
 6974  todo
 6980  worker
 7003  docHtml
 7009  printHtml
 7010  innerHtml
 7012  spineStyle
 7016  spineText
 7017  defaultSpine
 7018  coverHtml
 7026  generateAlbumPDF
 7032  gen
 7063  processPayment
 7103  goTab
 7130  lang
 7132  X
 7135  pg
 7174  upd
 7200  apply
 7219  T
 7220  nm
 7221  renderQuiz
 7227  mark
 7233  save
 7278  mail
 7427  toc
 7434  show
 7440  openLegal
 7446  closeLegal
 7476  cur
 7485  paint
 7510  lang
 7515  applyUI
 7522  setLang
 7542  syncStory
 7576  ensureStoryFor
 7592  recompose
 7606  addInput
 7625  removePhoto
 7678  saveLink
 7700  openFromLink
 7710  set
 7727  trackOverlay
 7735  close
 7771  ouvrir
 7795  drawEbar
 7820  coach
 7826  done
 7832  goTab
 7841  draw
 7869  payLabel
 7880  highlightPal
 7885  setLang
 7900  lang
 7913  spineColors
 7953  name
 7955  auto
 7991  names
 7992  renderLive
 8005  flowMode
 8014  exifDate
 8024  readAscii
 8025  scan
 8042  addPhotos
 8051  remap
 8052  applyOrder
 8065  movePhoto
 8068  sortByDate
 8077  renderPhotosPlus
 8116  startGenAnim
 8128  tick
 8136  stopGenAnim
 8138  runGeneration
 8141  renderSummary
 8154  syncPrice
 8164  goTab
 8186  setLang
 8203  lang
 8234  applyText
 8243  fromFrance
 8251  fromOSM
 8270  close
 8271  render
 8279  pick
 8287  search
 8323  etape

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
