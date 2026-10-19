# Carte de public/index.html

Générée automatiquement (8428 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1674 : <style> (126 Ko)
- lignes 1675-1694 : <script type="application/ld+json"> (1 Ko)
- lignes 1695-1782 : <script type="application/ld+json"> (4 Ko)
- lignes 2324-4488 : <script> (182 Ko)
- lignes 4489-5803 : <script> (121 Ko)
- lignes 5804-8405 : <script> (217 Ko)
- lignes 8406-8425 : <script> (1 Ko)

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
 4808  Style Magazine : le livre comme un magazine de couple
 5979  1. Import des photos : une version écran + une version impression
 6248  2. Génération : histoire + légendes à partir des photos
 6560  3. Éditeur
 6968  4. Sauvegarde locale (IndexedDB : photos comprises)
 7003  5. Impression : photos en pleine résolution + PDF hébergé
 7104  6. Paiement
 7970  1. Livre 3D réutilisable
 8067  2. Aperçu en direct pendant la création (ordinateur)
 8101  3. Photos : date de prise de vue, couverture, glisser-déposer
 8203  4. Génération vivante : leurs photos se posent dans un livre
 8229  5. Récapitulatif de commande avec LEUR couverture
 8257  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1810  <header>
 1811  <nav class="ed-nav">
 1833  <main id="main" tabindex="-1">
 1835  <section class="ed-hero">
 1844  <div class="nst-demo" id="nstDemo"
 1850  <section class="nst-how nst-frise" id="how">
 1864  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1886  <section class="ed-price" id="pricing">
 1919  <section class="section app-section" id="app">
 1946  <div class="panel active" id="panel0"
 2031  <div class="panel" id="panel1"
 2072  <div class="panel" id="panel2"
 2098  <div class="panel" id="panel3"
 2099  <div id="nstEd"
 2126  <div class="panel" id="panel4"
 2128  <div id="payForm"
 2206  <section class="ed-faq-section" id="faq">
 2254  <footer>
 2303  <div class="legal-overlay" id="legalOverlay"
 2309  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2329  LANGS.fr
 2416  LANGS.en
 2503  LANGS.de
 2590  LANGS.es
 2677  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2768  toggleLangMenu
 2769  pickLang
 2771  setLang
 2810  highlightPal
 2830  selectPricing
 2845  onSlider
 2858  onInAppSlider
 2881  animNum
 2887  toggleCmp
 2906  saveDraft
 2925  restoreDraft
 2932  set
 2940  clearDraft
 2964  goTab
 3003  edPickPrice
 3009  toggleFaq
 3010  startApp
 3015  addPhotosFromEditor
 3048  ensureConvertible
 3066  detectFocalY
 3086  showUploadLoader
 3098  hideUploadLoader
 3102  addPhotos
 3110  processBatch
 3147  getMinPhotos
 3151  renderPhotos
 3167  removePhoto
 3173  openMsgModal
 3174  closeMsgModal
 3175  saveMsgModal
 3180  selStyle
 3185  log
 3195  setProgress
 3206  api
 3236  runGeneration
 3468  renderBookPreview
 3478  pg
 3485  _take
 3496  pickIdx
 3502  ph
 3503  imgT
 3512  img
 3521  wantTall
 3522  wantSquare
 3523  wantWide
 3928  avRender
 3965  reapplyTexts
 3966  avBuildThumbs
 3979  avNext
 3980  avPrev
 3987  toggleEditor
 3988  edTab
 3989  refreshEditor
 3990  refreshTextFields
 4018  estRows
 4027  liveText
 4040  setActiveSlot
 4041  edSelectPhoto
 4042  updateFilter
 4043  updateCrop
 4044  updateZoom
 4045  toggleBW
 4046  applySlotEditsToDOM
 4050  saveTextStyle
 4051  updateTextStyle
 4052  toggleTextStyle
 4053  setTextSize
 4063  applyTextStylesToDOM
 4064  edSelectLayout
 4065  applyEdit
 4066  applyLayoutOverride
 4067  applyTextLive
 4068  resetEdit
 4072  initCropGestures
 4076  editorOpen
 4077  curSlot
 4085  snapshotPage
 4086  undoEdit
 4088  openFullPreview
 4095  base64ToBlob
 4107  fetchWithTimeout
 4122  processPayment
 4221  generateAlbumPDF
 4228  compressPhotoForPdf
 4292  generateAlbumPDF_UNUSED
 4359  applyPromo
 4380  selectFormat
 4402  updateFormatPrices
 4416  generateFinalPDF
 4433  addPage
 4459  openLegal
 4460  closeLegal
 4499  clamp
 4545  curLang
 4552  themeKey
 4553  theme
 4554  photos
 4556  printSrc
 4568  faceSpan
 4571  autoPos
 4576  fit
 4579  L
 4602  cropCost
 4617  slot
 4638  tx
 4645  fit
 4646  orientOf
 4812  MT
 4814  mix
 4825  MONTHS
 4829  svgHeart
 4830  svgHeartLine
 4831  svgCurl
 4832  tape
 4834  polaroid
 4841  barcode
 4850  heartMap
 4862  wordGrid
 4864  rnd
 4890  folio
 4906  col
 4910  seal
 5019  ic
 5084  mark
 5206  fmtCoord
 5210  k3Line
 5217  yearPhotos
 5228  kmBetween
 5233  villesT
 5240  planMagazine
 5322  again
 5323  freshOr
 5324  pick
 5328  mk
 5336  L
 5426  renderPage
 5445  tierOf
 5446  photoPageCount
 5447  minPhotos
 5450  distribute
 5466  pickLayout
 5483  chooseLayout
 5496  mkPage
 5500  plan
 5536  tag
 5539  takePhoto
 5610  pairOf
 5612  relayout
 5618  makeSpread
 5636  unmakeSpread
 5652  syncSpread
 5660  fixSpreads
 5699  loadDetector
 5704  go
 5714  loadImg
 5718  saliency
 5745  subjectFromFaces
 5754  analyze
 5780  analyzeAll
 5952  t
 5973  lang
 5974  nPagesSel
 5975  promo
 5980  loadImage
 5982  toJpeg
 6004  was
 6021  pickerBack
 6032  showPickHelp
 6037  close
 6051  within
 6052  decodeFile
 6082  hdBlob
 6092  importFile
 6113  toast
 6126  geom
 6131  prepThumb
 6137  prepFull
 6143  dropPhoto
 6149  tile
 6158  pump
 6185  pump2
 6205  addPhotos
 6235  renderPhotos
 6254  browserTag
 6255  callAI
 6283  thumb
 6285  coupleInfo
 6299  mqParts
 6304  magAnswers
 6323  fetchCarte
 6333  fetchVilles
 6345  storyPrompt
 6384  magFacts
 6394  magazinePrompt
 6416  cleanMag
 6417  s
 6429  captionPhotos
 6451  defaultStory
 6486  runGeneration
 6550  showIssue
 6563  isWide
 6564  snap
 6566  H
 6567  commit
 6568  restore
 6569  undo
 6570  redo
 6571  updUndo
 6576  visible
 6584  mountPage
 6589  scaleHost
 6598  drawStage
 6612  drawThumb
 6616  drawStrip
 6623  markStrip
 6629  drawThemes
 6634  revealStage
 6640  drawAll
 6641  refreshPage
 6643  afterSlotEdit
 6650  go
 6651  step
 6656  highlightSel
 6666  drawTools
 6716  rewrite
 6733  swapPhoto
 6744  movePage
 6754  bindEditor
 6927  openReader
 6930  draw
 6934  close
 6936  next
 6952  renderBookPreview
 6970  idb
 6971  idbSet
 6972  idbGet
 6973  idbDel
 6974  saveLocal
 6980  offerResume
 7004  fullBlob
 7022  dataUrlToBlob
 7023  uploadPhotos
 7025  todo
 7031  worker
 7054  docHtml
 7060  printHtml
 7061  innerHtml
 7063  spineStyle
 7067  spineText
 7068  defaultSpine
 7069  coverHtml
 7077  generateAlbumPDF
 7083  gen
 7114  processPayment
 7154  goTab
 7181  lang
 7212  upd
 7238  apply
 7257  T
 7258  nm
 7259  renderQuiz
 7265  mark
 7271  save
 7316  mail
 7461  backLbl
 7466  toc
 7473  show
 7480  openLegal
 7488  hideLegal
 7489  closeLegal
 7517  cur
 7526  paint
 7551  lang
 7556  applyUI
 7563  setLang
 7583  syncStory
 7617  ensureStoryFor
 7633  recompose
 7647  addInput
 7666  removePhoto
 7719  saveLink
 7741  openFromLink
 7751  set
 7769  trHide
 7771  trackOverlay
 7779  close
 7816  ouvrir
 7842  ekLabel
 7853  drawEbar
 7878  coach
 7884  done
 7890  goTab
 7899  draw
 7927  payLabel
 7938  highlightPal
 7943  setLang
 7958  lang
 7971  spineColors
 7998  sampleCover
 8017  auto
 8018  build
 8025  name
 8051  build
 8060  nst70
 8080  names
 8081  renderLive
 8094  flowMode
 8103  exifDate
 8113  readAscii
 8114  scan
 8131  addPhotos
 8140  remap
 8141  applyOrder
 8154  movePhoto
 8157  sortByDate
 8166  renderPhotosPlus
 8205  startGenAnim
 8217  tick
 8225  stopGenAnim
 8227  runGeneration
 8230  renderSummary
 8243  syncPrice
 8253  goTab
 8275  setLang
 8292  lang
 8323  applyText
 8332  fromFrance
 8340  fromOSM
 8359  close
 8360  render
 8368  pick
 8376  search
 8412  etape

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
