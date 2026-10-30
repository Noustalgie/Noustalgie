# Carte de public/index.html

Générée automatiquement (8900 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-34 : <script type="application/ld+json"> (11 Ko)
- lignes 37-53 : <script> (1 Ko)
- lignes 54-1652 : <style> (137 Ko)
- lignes 1653-1726 : <script type="application/ld+json"> (2 Ko)
- lignes 1727-1830 : <script type="application/ld+json"> (6 Ko)
- lignes 2394-4566 : <script> (189 Ko)
- lignes 4567-5892 : <script> (122 Ko)
- lignes 5893-8868 : <script> (256 Ko)
- lignes 8869-8897 : <script> (2 Ko)

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
 4894  Style Magazine : le livre comme un magazine de couple
 6068  1. Import des photos : une version écran + une version impression
 6358  2. Génération : histoire + légendes à partir des photos
 6670  3. Éditeur
 7077  4. Sauvegarde locale (IndexedDB : photos comprises)
 7112  5. Impression : photos en pleine résolution + PDF hébergé
 7347  6. Paiement
 8399  1. Livre 3D réutilisable
 8520  2. Aperçu en direct pendant la création (ordinateur)
 8554  3. Photos : date de prise de vue, couverture, glisser-déposer
 8656  4. Génération vivante : leurs photos se posent dans un livre
 8682  5. Récapitulatif de commande avec LEUR couverture
 8720  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1859  <header>
 1860  <nav class="ed-nav">
 1882  <main id="main" tabindex="-1">
 1884  <section class="ed-hero">
 1893  <div class="nst-demo" id="nstDemo"
 1899  <section class="nst-how nst-frise" id="how">
 1913  <section class="nst-70" id="annees70" aria-labelledby="nst70T">
 1936  <section class="ed-price" id="pricing">
 1973  <section class="section app-section" id="app">
 2000  <div class="panel active" id="panel0"
 2085  <div class="panel" id="panel1"
 2130  <div class="panel" id="panel2"
 2156  <div class="panel" id="panel3"
 2157  <div id="nstEd"
 2184  <div class="panel" id="panel4"
 2186  <div id="payForm"
 2267  <section class="ed-faq-section" id="faq">
 2323  <footer>
 2373  <div class="legal-overlay" id="legalOverlay"
 2379  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2399  LANGS.fr
 2487  LANGS.en
 2575  LANGS.de
 2663  LANGS.es
 2751  LANGS.pt

## Fonctions

   42  nstLoadLib
   46  all
 2843  toggleLangMenu
 2844  pickLang
 2846  setLang
 2885  highlightPal
 2905  selectPricing
 2920  onSlider
 2933  onInAppSlider
 2956  animNum
 2962  toggleCmp
 2981  saveDraft
 3000  restoreDraft
 3007  set
 3015  clearDraft
 3039  goTab
 3078  edPickPrice
 3084  toggleFaq
 3085  startApp
 3090  addPhotosFromEditor
 3123  ensureConvertible
 3141  detectFocalY
 3161  showUploadLoader
 3173  hideUploadLoader
 3177  addPhotos
 3185  processBatch
 3222  getMinPhotos
 3226  renderPhotos
 3242  removePhoto
 3248  openMsgModal
 3249  closeMsgModal
 3250  saveMsgModal
 3255  selStyle
 3260  log
 3270  setProgress
 3281  api
 3311  runGeneration
 3543  renderBookPreview
 3553  pg
 3560  _take
 3571  pickIdx
 3577  ph
 3578  imgT
 3587  img
 3596  wantTall
 3597  wantSquare
 3598  wantWide
 4003  avRender
 4040  reapplyTexts
 4041  avBuildThumbs
 4054  avNext
 4055  avPrev
 4062  toggleEditor
 4063  edTab
 4064  refreshEditor
 4065  refreshTextFields
 4093  estRows
 4102  liveText
 4115  setActiveSlot
 4116  edSelectPhoto
 4117  updateFilter
 4118  updateCrop
 4119  updateZoom
 4120  toggleBW
 4121  applySlotEditsToDOM
 4125  saveTextStyle
 4126  updateTextStyle
 4127  toggleTextStyle
 4128  setTextSize
 4138  applyTextStylesToDOM
 4139  edSelectLayout
 4140  applyEdit
 4141  applyLayoutOverride
 4142  applyTextLive
 4143  resetEdit
 4147  initCropGestures
 4151  editorOpen
 4152  curSlot
 4160  snapshotPage
 4161  undoEdit
 4163  openFullPreview
 4170  base64ToBlob
 4182  fetchWithTimeout
 4197  processPayment
 4296  generateAlbumPDF
 4303  compressPhotoForPdf
 4367  generateAlbumPDF_UNUSED
 4434  applyPromo
 4455  selectFormat
 4477  updateFormatPrices
 4491  generateFinalPDF
 4508  addPage
 4534  openLegal
 4535  closeLegal
 4577  clamp
 4623  curLang
 4630  themeKey
 4631  theme
 4632  photos
 4637  printSrc
 4649  faceSpan
 4652  autoPos
 4657  fit
 4660  L
 4683  cropCost
 4698  slot
 4723  tx
 4730  fit
 4731  orientOf
 4898  MT
 4900  mix
 4911  MONTHS
 4915  svgHeart
 4916  svgHeartLine
 4917  svgCurl
 4918  tape
 4920  polaroid
 4927  barcode
 4936  heartMap
 4948  wordGrid
 4950  rnd
 4976  folio
 4992  col
 4996  seal
 5105  ic
 5170  mark
 5292  fmtCoord
 5296  k3Line
 5303  yearPhotos
 5314  kmBetween
 5319  villesT
 5326  planMagazine
 5408  again
 5409  freshOr
 5410  pick
 5414  mk
 5422  L
 5512  renderPage
 5533  tierOf
 5534  photoPageCount
 5535  minPhotos
 5538  distribute
 5554  pickLayout
 5571  chooseLayout
 5584  mkPage
 5588  plan
 5624  tag
 5627  takePhoto
 5698  pairOf
 5700  relayout
 5706  makeSpread
 5724  unmakeSpread
 5740  syncSpread
 5748  fixSpreads
 5788  loadDetector
 5793  go
 5803  loadImg
 5807  saliency
 5834  subjectFromFaces
 5843  analyze
 5869  analyzeAll
 6041  t
 6062  lang
 6063  nPagesSel
 6064  promo
 6069  loadImage
 6071  toJpeg
 6093  was
 6110  pickerBack
 6126  showPickHelp
 6135  close
 6157  within
 6158  decodeFile
 6188  hdBlob
 6198  importFile
 6219  toast
 6232  geom
 6237  prepThumb
 6243  prepFull
 6249  dropPhoto
 6255  tile
 6264  pump
 6292  pump2
 6312  addPhotos
 6345  renderPhotos
 6364  browserTag
 6365  callAI
 6393  thumb
 6395  coupleInfo
 6409  mqParts
 6414  magAnswers
 6433  fetchCarte
 6443  fetchVilles
 6455  storyPrompt
 6494  magFacts
 6504  magazinePrompt
 6526  cleanMag
 6527  s
 6539  captionPhotos
 6561  defaultStory
 6596  runGeneration
 6660  showIssue
 6673  isWide
 6674  snap
 6676  H
 6677  commit
 6678  restore
 6679  undo
 6680  redo
 6681  updUndo
 6686  visible
 6694  mountPage
 6699  scaleHost
 6708  drawStage
 6722  drawThumb
 6726  drawStrip
 6733  markStrip
 6739  drawThemes
 6744  revealStage
 6750  drawAll
 6751  refreshPage
 6753  afterSlotEdit
 6760  go
 6761  step
 6766  highlightSel
 6776  drawTools
 6827  rewrite
 6844  swapPhoto
 6853  movePage
 6863  bindEditor
 7036  openReader
 7039  draw
 7043  close
 7045  next
 7061  renderBookPreview
 7079  idb
 7080  idbSet
 7081  idbGet
 7082  idbDel
 7083  saveLocal
 7089  offerResume
 7113  fullBlob
 7131  dataUrlToBlob
 7132  uploadPhotos
 7135  todo
 7141  worker
 7166  nstBake
 7224  docHtml
 7233  printHtml
 7234  innerHtml
 7236  spineStyle
 7240  spineText
 7241  defaultSpine
 7242  coverHtml
 7258  paInnerHtml
 7265  paSheet
 7273  paCoverHtml
 7283  optSlot
 7289  afficheHtml
 7297  cadreHtml
 7301  aimantHtml
 7302  generateAlbumPDF
 7308  gen
 7315  doc
 7316  tries
 7357  processPayment
 7410  goTab
 7437  lang
 7447  img
 7472  stop
 7503  upd
 7529  apply
 7548  T
 7549  nm
 7550  renderQuiz
 7556  mark
 7562  save
 7609  mail
 7764  backLbl
 7769  toc
 7776  show
 7783  openLegal
 7791  hideLegal
 7792  closeLegal
 7820  cur
 7829  paint
 7854  lang
 7859  applyUI
 7866  setLang
 7886  syncStory
 7920  ensureStoryFor
 7936  recompose
 7950  addInput
 7979  removePhoto
 7996  selectPricing
 8043  saveLink
 8065  openFromLink
 8075  set
 8093  trHide
 8095  trackOverlay
 8103  close
 8142  ouvrir
 8168  ekLabel
 8179  drawEbar
 8204  coach
 8210  done
 8216  goTab
 8225  draw
 8253  payLabel
 8295  optTotal
 8297  drawOpts
 8322  fillOptImgs
 8335  pickOptPhoto
 8358  selectFormat
 8367  highlightPal
 8372  setLang
 8387  lang
 8400  spineColors
 8427  sampleCover
 8446  auto
 8447  build
 8454  name
 8470  words
 8477  apply
 8504  build
 8513  nst70
 8533  names
 8534  renderLive
 8547  flowMode
 8556  exifDate
 8566  readAscii
 8567  scan
 8584  addPhotos
 8593  remap
 8594  applyOrder
 8607  movePhoto
 8610  sortByDate
 8619  renderPhotosPlus
 8658  startGenAnim
 8670  tick
 8678  stopGenAnim
 8680  runGeneration
 8685  noel
 8689  fill
 8692  renderSummary
 8705  syncPrice
 8716  goTab
 8738  setLang
 8755  lang
 8786  applyText
 8795  fromFrance
 8803  fromOSM
 8822  close
 8823  render
 8831  pick
 8839  search
 8875  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/alerte.js (34 lignes) /api/tools?fn=alerte — un client bloqué au moment de payer : email à Gabin avec l'erreur exacte et le contexte
- api/_fn/cancel.js (28 lignes) 
- api/_fn/carte.js (239 lignes) /api/carte?q=Lille : plan du lieu de rencontre pour la page « Là où tout a commencé ».
- api/_fn/indexnow.js (24 lignes) /api/indexnow (cron Vercel quotidien, cf. vercel.json) : signale à IndexNow (Bing, qui sert à ChatGPT Search e
- api/_fn/order.js (46 lignes) Détails d'une commande pour la page de confirmation (lecture seule, délai maximum 6 s)
- api/_fn/printapi-hook.js (54 lignes) api/printapi-hook.js — Print API prévient d'un changement de statut (corps : orderId=…).
- api/_fn/promo.js (19 lignes) api/promo.js — vérifie un code promo (codes dans la variable Vercel PROMO_CODES)
- api/_fn/sante.js (40 lignes) /api/sante?jeton=…&pays=FR,BE : contrôle de l'imprimeur sans rien commander (clés Print API, prix d'achat, liv
- api/_fn/sign-upload.js (22 lignes) api/sign-upload.js — autorise le navigateur à envoyer UNE photo en pleine résolution
- api/_fn/spine.js (38 lignes) api/spine.js — largeur de tranche du livre, fournie par Prodigi (dépend du nombre de pages et de l'atelier)
- api/_fn/track.js (58 lignes) api/track.js — « Suivre ma commande » : numéro NOUST-… + email de la commande
- api/_lib/cloudinary.js (43 lignes) api/_lib/cloudinary.js — signature et upload serveur (pas une route)
- api/_lib/printapi.js (59 lignes) api/_lib/printapi.js — imprimeur Print API (Groningue, Pays-Bas) : jeton OAuth, commandes, lecture d'une comma
- api/_lib/promo.js (49 lignes) api/_lib/promo.js — codes promo lus depuis la variable Vercel PROMO_CODES
- api/_lib/security.js (59 lignes) api/_lib/security.js — utilitaires partagés (pas une route : préfixe _)
- api/chat.js (84 lignes) api/chat.js — proxy OpenAI VERROUILLÉ
- api/cleanup.js (54 lignes) api/cleanup.js — Nettoyage RGPD quotidien (cron Vercel, cf. vercel.json)
- api/create-checkout.js (175 lignes) api/create-checkout.js — création de la session Stripe
- api/generate-pdf.js (101 lignes) api/generate-pdf.js — HTML de l'album → PDF 21×21 cm via PDFShift
- api/prodigi-webhook.js (88 lignes) api/prodigi-webhook.js — callbacks Prodigi (expédition → email de suivi au client)
- api/tools.js (28 lignes) api/tools.js — petites routes regroupées en une seule fonction
- api/webhook.js (292 lignes) api/webhook.js — Webhook Stripe : déclenché à chaque paiement réussi,
