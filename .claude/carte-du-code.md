# Carte de public/index.html

Générée automatiquement (8361 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1661 : <style> (124 Ko)
- lignes 1662-1681 : <script type="application/ld+json"> (1 Ko)
- lignes 1682-1769 : <script type="application/ld+json"> (4 Ko)
- lignes 2296-4455 : <script> (179 Ko)
- lignes 4456-5760 : <script> (118 Ko)
- lignes 5761-8338 : <script> (216 Ko)
- lignes 8339-8358 : <script> (1 Ko)

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
 4765  Style Magazine : le livre comme un magazine de couple
 5936  1. Import des photos : une version écran + une version impression
 6205  2. Génération : histoire + légendes à partir des photos
 6517  3. Éditeur
 6925  4. Sauvegarde locale (IndexedDB : photos comprises)
 6960  5. Impression : photos en pleine résolution + PDF hébergé
 7061  6. Paiement
 7923  1. Livre 3D réutilisable
 8000  2. Aperçu en direct pendant la création (ordinateur)
 8034  3. Photos : date de prise de vue, couverture, glisser-déposer
 8136  4. Génération vivante : leurs photos se posent dans un livre
 8162  5. Récapitulatif de commande avec LEUR couverture
 8190  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1797  <header>
 1798  <nav class="ed-nav">
 1820  <main id="main" tabindex="-1">
 1822  <section class="ed-hero">
 1831  <div class="nst-demo" id="nstDemo"
 1837  <section class="nst-how nst-frise" id="how">
 1858  <section class="ed-price" id="pricing">
 1891  <section class="section app-section" id="app">
 1918  <div class="panel active" id="panel0"
 2003  <div class="panel" id="panel1"
 2044  <div class="panel" id="panel2"
 2070  <div class="panel" id="panel3"
 2071  <div id="nstEd"
 2098  <div class="panel" id="panel4"
 2100  <div id="payForm"
 2178  <section class="ed-faq-section" id="faq">
 2226  <footer>
 2275  <div class="legal-overlay" id="legalOverlay"
 2281  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2301  LANGS.fr
 2387  LANGS.en
 2473  LANGS.de
 2559  LANGS.es
 2645  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2735  toggleLangMenu
 2736  pickLang
 2738  setLang
 2777  highlightPal
 2797  selectPricing
 2812  onSlider
 2825  onInAppSlider
 2848  animNum
 2854  toggleCmp
 2873  saveDraft
 2892  restoreDraft
 2899  set
 2907  clearDraft
 2931  goTab
 2970  edPickPrice
 2976  toggleFaq
 2977  startApp
 2982  addPhotosFromEditor
 3015  ensureConvertible
 3033  detectFocalY
 3053  showUploadLoader
 3065  hideUploadLoader
 3069  addPhotos
 3077  processBatch
 3114  getMinPhotos
 3118  renderPhotos
 3134  removePhoto
 3140  openMsgModal
 3141  closeMsgModal
 3142  saveMsgModal
 3147  selStyle
 3152  log
 3162  setProgress
 3173  api
 3203  runGeneration
 3435  renderBookPreview
 3445  pg
 3452  _take
 3463  pickIdx
 3469  ph
 3470  imgT
 3479  img
 3488  wantTall
 3489  wantSquare
 3490  wantWide
 3895  avRender
 3932  reapplyTexts
 3933  avBuildThumbs
 3946  avNext
 3947  avPrev
 3954  toggleEditor
 3955  edTab
 3956  refreshEditor
 3957  refreshTextFields
 3985  estRows
 3994  liveText
 4007  setActiveSlot
 4008  edSelectPhoto
 4009  updateFilter
 4010  updateCrop
 4011  updateZoom
 4012  toggleBW
 4013  applySlotEditsToDOM
 4017  saveTextStyle
 4018  updateTextStyle
 4019  toggleTextStyle
 4020  setTextSize
 4030  applyTextStylesToDOM
 4031  edSelectLayout
 4032  applyEdit
 4033  applyLayoutOverride
 4034  applyTextLive
 4035  resetEdit
 4039  initCropGestures
 4043  editorOpen
 4044  curSlot
 4052  snapshotPage
 4053  undoEdit
 4055  openFullPreview
 4062  base64ToBlob
 4074  fetchWithTimeout
 4089  processPayment
 4188  generateAlbumPDF
 4195  compressPhotoForPdf
 4259  generateAlbumPDF_UNUSED
 4326  applyPromo
 4347  selectFormat
 4369  updateFormatPrices
 4383  generateFinalPDF
 4400  addPage
 4426  openLegal
 4427  closeLegal
 4466  clamp
 4507  curLang
 4514  themeKey
 4515  theme
 4516  photos
 4518  printSrc
 4530  faceSpan
 4533  autoPos
 4538  fit
 4541  L
 4564  cropCost
 4576  slot
 4595  tx
 4602  fit
 4603  orientOf
 4769  MT
 4771  mix
 4782  MONTHS
 4786  svgHeart
 4787  svgHeartLine
 4788  svgCurl
 4789  tape
 4791  polaroid
 4798  barcode
 4807  heartMap
 4819  wordGrid
 4821  rnd
 4847  folio
 4863  col
 4867  seal
 4976  ic
 5041  mark
 5163  fmtCoord
 5167  k3Line
 5174  yearPhotos
 5185  kmBetween
 5190  villesT
 5197  planMagazine
 5279  again
 5280  freshOr
 5281  pick
 5285  mk
 5293  L
 5383  renderPage
 5402  tierOf
 5403  photoPageCount
 5404  minPhotos
 5407  distribute
 5423  pickLayout
 5440  chooseLayout
 5453  mkPage
 5457  plan
 5493  tag
 5496  takePhoto
 5567  pairOf
 5569  relayout
 5575  makeSpread
 5593  unmakeSpread
 5609  syncSpread
 5617  fixSpreads
 5656  loadDetector
 5661  go
 5671  loadImg
 5675  saliency
 5702  subjectFromFaces
 5711  analyze
 5737  analyzeAll
 5909  t
 5930  lang
 5931  nPagesSel
 5932  promo
 5937  loadImage
 5939  toJpeg
 5961  was
 5978  pickerBack
 5989  showPickHelp
 5994  close
 6008  within
 6009  decodeFile
 6039  hdBlob
 6049  importFile
 6070  toast
 6083  geom
 6088  prepThumb
 6094  prepFull
 6100  dropPhoto
 6106  tile
 6115  pump
 6142  pump2
 6162  addPhotos
 6192  renderPhotos
 6211  browserTag
 6212  callAI
 6240  thumb
 6242  coupleInfo
 6256  mqParts
 6261  magAnswers
 6280  fetchCarte
 6290  fetchVilles
 6302  storyPrompt
 6341  magFacts
 6351  magazinePrompt
 6373  cleanMag
 6374  s
 6386  captionPhotos
 6408  defaultStory
 6443  runGeneration
 6507  showIssue
 6520  isWide
 6521  snap
 6523  H
 6524  commit
 6525  restore
 6526  undo
 6527  redo
 6528  updUndo
 6533  visible
 6541  mountPage
 6546  scaleHost
 6555  drawStage
 6569  drawThumb
 6573  drawStrip
 6580  markStrip
 6586  drawThemes
 6591  revealStage
 6597  drawAll
 6598  refreshPage
 6600  afterSlotEdit
 6607  go
 6608  step
 6613  highlightSel
 6623  drawTools
 6673  rewrite
 6690  swapPhoto
 6701  movePage
 6711  bindEditor
 6884  openReader
 6887  draw
 6891  close
 6893  next
 6909  renderBookPreview
 6927  idb
 6928  idbSet
 6929  idbGet
 6930  idbDel
 6931  saveLocal
 6937  offerResume
 6961  fullBlob
 6979  dataUrlToBlob
 6980  uploadPhotos
 6982  todo
 6988  worker
 7011  docHtml
 7017  printHtml
 7018  innerHtml
 7020  spineStyle
 7024  spineText
 7025  defaultSpine
 7026  coverHtml
 7034  generateAlbumPDF
 7040  gen
 7071  processPayment
 7111  goTab
 7138  lang
 7169  upd
 7191  apply
 7210  T
 7211  nm
 7212  renderQuiz
 7218  mark
 7224  save
 7269  mail
 7414  backLbl
 7419  toc
 7426  show
 7433  openLegal
 7441  hideLegal
 7442  closeLegal
 7470  cur
 7479  paint
 7504  lang
 7509  applyUI
 7516  setLang
 7536  syncStory
 7570  ensureStoryFor
 7586  recompose
 7600  addInput
 7619  removePhoto
 7672  saveLink
 7694  openFromLink
 7704  set
 7722  trHide
 7724  trackOverlay
 7732  close
 7769  ouvrir
 7795  ekLabel
 7806  drawEbar
 7831  coach
 7837  done
 7843  goTab
 7852  draw
 7880  payLabel
 7891  highlightPal
 7896  setLang
 7911  lang
 7924  spineColors
 7951  sampleCover
 7969  auto
 7970  build
 7977  name
 8013  names
 8014  renderLive
 8027  flowMode
 8036  exifDate
 8046  readAscii
 8047  scan
 8064  addPhotos
 8073  remap
 8074  applyOrder
 8087  movePhoto
 8090  sortByDate
 8099  renderPhotosPlus
 8138  startGenAnim
 8150  tick
 8158  stopGenAnim
 8160  runGeneration
 8163  renderSummary
 8176  syncPrice
 8186  goTab
 8208  setLang
 8225  lang
 8256  applyText
 8265  fromFrance
 8273  fromOSM
 8292  close
 8293  render
 8301  pick
 8309  search
 8345  etape

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
