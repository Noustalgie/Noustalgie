# Carte de public/index.html

Générée automatiquement (7466 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-151 : <script type="application/ld+json"> (3 Ko)
- lignes 156-1589 : <style> (120 Ko)
- lignes 1590-1609 : <script type="application/ld+json"> (1 Ko)
- lignes 1610-1697 : <script type="application/ld+json"> (4 Ko)
- lignes 2173-4332 : <script> (173 Ko)
- lignes 4333-5017 : <script> (44 Ko)
- lignes 5018-7463 : <script> (203 Ko)

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
 5193  1. Import des photos : une version écran + une version impression
 5455  2. Génération : histoire + légendes à partir des photos
 5720  3. Éditeur
 6125  4. Sauvegarde locale (IndexedDB : photos comprises)
 6160  5. Impression : photos en pleine résolution + PDF hébergé
 6261  6. Paiement
 7059  1. Livre 3D réutilisable
 7125  2. Aperçu en direct pendant la création (ordinateur)
 7159  3. Photos : date de prise de vue, couverture, glisser-déposer
 7261  4. Génération vivante : leurs photos se posent dans un livre
 7287  5. Récapitulatif de commande avec LEUR couverture
 7315  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1725  <nav class="ed-nav">
 1746  <section class="ed-hero">
 1755  <div class="nst-demo" id="nstDemo"
 1761  <section class="nst-how nst-frise" id="how">
 1782  <section class="ed-price" id="pricing">
 1815  <section class="section app-section" id="app">
 1842  <div class="panel active" id="panel0"
 1884  <div class="panel" id="panel1"
 1925  <div class="panel" id="panel2"
 1951  <div class="panel" id="panel3"
 1952  <div id="nstEd"
 1979  <div class="panel" id="panel4"
 1981  <div id="payForm"
 2059  <section class="ed-faq-section" id="faq">
 2106  <footer>
 2152  <div class="legal-overlay" id="legalOverlay"
 2158  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2178  LANGS.fr
 2264  LANGS.en
 2350  LANGS.de
 2436  LANGS.es
 2522  LANGS.pt

## Fonctions

 2612  toggleLangMenu
 2613  pickLang
 2615  setLang
 2654  highlightPal
 2674  selectPricing
 2689  onSlider
 2702  onInAppSlider
 2725  animNum
 2731  toggleCmp
 2750  saveDraft
 2769  restoreDraft
 2776  set
 2784  clearDraft
 2808  goTab
 2847  edPickPrice
 2853  toggleFaq
 2854  startApp
 2859  addPhotosFromEditor
 2892  ensureConvertible
 2910  detectFocalY
 2930  showUploadLoader
 2942  hideUploadLoader
 2946  addPhotos
 2954  processBatch
 2991  getMinPhotos
 2995  renderPhotos
 3011  removePhoto
 3017  openMsgModal
 3018  closeMsgModal
 3019  saveMsgModal
 3024  selStyle
 3029  log
 3039  setProgress
 3050  api
 3080  runGeneration
 3312  renderBookPreview
 3322  pg
 3329  _take
 3340  pickIdx
 3346  ph
 3347  imgT
 3356  img
 3365  wantTall
 3366  wantSquare
 3367  wantWide
 3772  avRender
 3809  reapplyTexts
 3810  avBuildThumbs
 3823  avNext
 3824  avPrev
 3831  toggleEditor
 3832  edTab
 3833  refreshEditor
 3834  refreshTextFields
 3862  estRows
 3871  liveText
 3884  setActiveSlot
 3885  edSelectPhoto
 3886  updateFilter
 3887  updateCrop
 3888  updateZoom
 3889  toggleBW
 3890  applySlotEditsToDOM
 3894  saveTextStyle
 3895  updateTextStyle
 3896  toggleTextStyle
 3897  setTextSize
 3907  applyTextStylesToDOM
 3908  edSelectLayout
 3909  applyEdit
 3910  applyLayoutOverride
 3911  applyTextLive
 3912  resetEdit
 3916  initCropGestures
 3920  editorOpen
 3921  curSlot
 3929  snapshotPage
 3930  undoEdit
 3932  openFullPreview
 3939  base64ToBlob
 3951  fetchWithTimeout
 3966  processPayment
 4065  generateAlbumPDF
 4072  compressPhotoForPdf
 4136  generateAlbumPDF_UNUSED
 4203  applyPromo
 4224  selectFormat
 4246  updateFormatPrices
 4260  generateFinalPDF
 4277  addPage
 4303  openLegal
 4304  closeLegal
 4343  clamp
 4380  curLang
 4387  themeKey
 4388  theme
 4389  photos
 4391  printSrc
 4403  faceSpan
 4406  autoPos
 4411  fit
 4414  L
 4437  cropCost
 4449  slot
 4468  tx
 4475  fit
 4476  orientOf
 4640  renderPage
 4659  tierOf
 4660  photoPageCount
 4661  minPhotos
 4664  distribute
 4680  pickLayout
 4697  chooseLayout
 4710  mkPage
 4714  plan
 4750  tag
 4753  takePhoto
 4824  pairOf
 4826  relayout
 4832  makeSpread
 4850  unmakeSpread
 4866  syncSpread
 4874  fixSpreads
 4913  loadDetector
 4918  go
 4928  loadImg
 4932  saliency
 4959  subjectFromFaces
 4968  analyze
 4994  analyzeAll
 5166  t
 5187  lang
 5188  nPagesSel
 5189  promo
 5194  loadImage
 5196  toJpeg
 5218  was
 5232  pickerBack
 5242  showPickHelp
 5247  close
 5261  within
 5262  decodeFile
 5292  hdBlob
 5302  importFile
 5323  toast
 5336  geom
 5341  prepThumb
 5347  prepFull
 5353  dropPhoto
 5359  tile
 5368  pump
 5395  pump2
 5415  addPhotos
 5442  renderPhotos
 5461  browserTag
 5462  callAI
 5490  thumb
 5492  coupleInfo
 5507  storyPrompt
 5554  keywords
 5563  missingAnswers
 5572  repairStory
 5590  captionPhotos
 5612  defaultStory
 5647  runGeneration
 5710  showIssue
 5722  isWide
 5723  snap
 5725  H
 5726  commit
 5727  restore
 5728  undo
 5729  redo
 5730  updUndo
 5735  visible
 5743  mountPage
 5748  scaleHost
 5757  drawStage
 5771  drawThumb
 5775  drawStrip
 5782  markStrip
 5788  drawThemes
 5793  revealStage
 5799  drawAll
 5800  refreshPage
 5802  afterSlotEdit
 5809  go
 5810  step
 5815  highlightSel
 5825  drawTools
 5875  rewrite
 5892  swapPhoto
 5903  movePage
 5913  bindEditor
 6084  openReader
 6087  draw
 6091  close
 6093  next
 6109  renderBookPreview
 6127  idb
 6128  idbSet
 6129  idbGet
 6130  idbDel
 6131  saveLocal
 6137  offerResume
 6161  fullBlob
 6179  dataUrlToBlob
 6180  uploadPhotos
 6182  todo
 6188  worker
 6211  docHtml
 6217  printHtml
 6218  innerHtml
 6220  spineStyle
 6224  spineText
 6225  defaultSpine
 6226  coverHtml
 6234  generateAlbumPDF
 6240  gen
 6271  processPayment
 6311  goTab
 6338  lang
 6341  pg
 6376  upd
 6402  apply
 6431  mail
 6580  toc
 6587  show
 6593  openLegal
 6599  closeLegal
 6629  cur
 6638  paint
 6663  lang
 6668  applyUI
 6675  setLang
 6693  syncStory
 6723  ensureStoryFor
 6739  recompose
 6753  addInput
 6772  removePhoto
 6825  saveLink
 6847  openFromLink
 6857  set
 6874  trackOverlay
 6882  close
 6918  ouvrir
 6942  drawEbar
 6967  coach
 6973  done
 6979  goTab
 6988  draw
 7016  payLabel
 7027  highlightPal
 7032  setLang
 7047  lang
 7060  spineColors
 7100  name
 7102  auto
 7138  names
 7139  renderLive
 7152  flowMode
 7161  exifDate
 7171  readAscii
 7172  scan
 7189  addPhotos
 7198  remap
 7199  applyOrder
 7212  movePhoto
 7215  sortByDate
 7224  renderPhotosPlus
 7263  startGenAnim
 7275  tick
 7283  stopGenAnim
 7285  runGeneration
 7288  renderSummary
 7301  syncPrice
 7311  goTab
 7333  setLang
 7350  lang
 7381  applyText
 7390  fromFrance
 7398  fromOSM
 7417  close
 7418  render
 7426  pick
 7434  search

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
