# Carte de public/index.html

Générée automatiquement (7237 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-52 : <script type="application/ld+json"> (1 Ko)
- lignes 57-1490 : <style> (120 Ko)
- lignes 1491-1510 : <script type="application/ld+json"> (1 Ko)
- lignes 1511-1598 : <script type="application/ld+json"> (4 Ko)
- lignes 2061-4220 : <script> (173 Ko)
- lignes 4221-4820 : <script> (38 Ko)
- lignes 4821-7234 : <script> (198 Ko)

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
 4996  1. Import des photos : une version écran + une version impression
 5258  2. Génération : histoire + légendes à partir des photos
 5523  3. Éditeur
 5904  4. Sauvegarde locale (IndexedDB : photos comprises)
 5939  5. Impression : photos en pleine résolution + PDF hébergé
 6040  6. Paiement
 6830  1. Livre 3D réutilisable
 6896  2. Aperçu en direct pendant la création (ordinateur)
 6930  3. Photos : date de prise de vue, couverture, glisser-déposer
 7032  4. Génération vivante : leurs photos se posent dans un livre
 7058  5. Récapitulatif de commande avec LEUR couverture
 7086  6. Finitions : apparition au défilement, page tournée

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
 2040  <div class="legal-overlay" id="legalOverlay"
 2046  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2066  LANGS.fr
 2152  LANGS.en
 2238  LANGS.de
 2324  LANGS.es
 2410  LANGS.pt

## Fonctions

 2500  toggleLangMenu
 2501  pickLang
 2503  setLang
 2542  highlightPal
 2562  selectPricing
 2577  onSlider
 2590  onInAppSlider
 2613  animNum
 2619  toggleCmp
 2638  saveDraft
 2657  restoreDraft
 2664  set
 2672  clearDraft
 2696  goTab
 2735  edPickPrice
 2741  toggleFaq
 2742  startApp
 2747  addPhotosFromEditor
 2780  ensureConvertible
 2798  detectFocalY
 2818  showUploadLoader
 2830  hideUploadLoader
 2834  addPhotos
 2842  processBatch
 2879  getMinPhotos
 2883  renderPhotos
 2899  removePhoto
 2905  openMsgModal
 2906  closeMsgModal
 2907  saveMsgModal
 2912  selStyle
 2917  log
 2927  setProgress
 2938  api
 2968  runGeneration
 3200  renderBookPreview
 3210  pg
 3217  _take
 3228  pickIdx
 3234  ph
 3235  imgT
 3244  img
 3253  wantTall
 3254  wantSquare
 3255  wantWide
 3660  avRender
 3697  reapplyTexts
 3698  avBuildThumbs
 3711  avNext
 3712  avPrev
 3719  toggleEditor
 3720  edTab
 3721  refreshEditor
 3722  refreshTextFields
 3750  estRows
 3759  liveText
 3772  setActiveSlot
 3773  edSelectPhoto
 3774  updateFilter
 3775  updateCrop
 3776  updateZoom
 3777  toggleBW
 3778  applySlotEditsToDOM
 3782  saveTextStyle
 3783  updateTextStyle
 3784  toggleTextStyle
 3785  setTextSize
 3795  applyTextStylesToDOM
 3796  edSelectLayout
 3797  applyEdit
 3798  applyLayoutOverride
 3799  applyTextLive
 3800  resetEdit
 3804  initCropGestures
 3808  editorOpen
 3809  curSlot
 3817  snapshotPage
 3818  undoEdit
 3820  openFullPreview
 3827  base64ToBlob
 3839  fetchWithTimeout
 3854  processPayment
 3953  generateAlbumPDF
 3960  compressPhotoForPdf
 4024  generateAlbumPDF_UNUSED
 4091  applyPromo
 4112  selectFormat
 4134  updateFormatPrices
 4148  generateFinalPDF
 4165  addPage
 4191  openLegal
 4192  closeLegal
 4231  clamp
 4268  curLang
 4275  themeKey
 4276  theme
 4277  photos
 4279  printSrc
 4291  faceSpan
 4294  autoPos
 4299  fit
 4302  L
 4325  cropCost
 4337  slot
 4356  tx
 4363  fit
 4364  orientOf
 4517  renderPage
 4536  tierOf
 4537  photoPageCount
 4538  minPhotos
 4541  distribute
 4557  pickLayout
 4574  chooseLayout
 4587  mkPage
 4591  plan
 4627  tag
 4630  takePhoto
 4716  loadDetector
 4721  go
 4731  loadImg
 4735  saliency
 4762  subjectFromFaces
 4771  analyze
 4797  analyzeAll
 4969  t
 4990  lang
 4991  nPagesSel
 4992  promo
 4997  loadImage
 4999  toJpeg
 5021  was
 5035  pickerBack
 5045  showPickHelp
 5050  close
 5064  within
 5065  decodeFile
 5095  hdBlob
 5105  importFile
 5126  toast
 5139  geom
 5144  prepThumb
 5150  prepFull
 5156  dropPhoto
 5162  tile
 5171  pump
 5198  pump2
 5218  addPhotos
 5245  renderPhotos
 5264  browserTag
 5265  callAI
 5293  thumb
 5295  coupleInfo
 5310  storyPrompt
 5357  keywords
 5366  missingAnswers
 5375  repairStory
 5393  captionPhotos
 5415  defaultStory
 5450  runGeneration
 5513  showIssue
 5525  isWide
 5526  snap
 5528  H
 5529  commit
 5530  restore
 5531  undo
 5532  redo
 5533  updUndo
 5538  visible
 5546  mountPage
 5551  scaleHost
 5560  drawStage
 5573  drawThumb
 5577  drawStrip
 5584  markStrip
 5590  drawThemes
 5595  revealStage
 5601  drawAll
 5602  refreshPage
 5604  go
 5605  step
 5610  highlightSel
 5620  drawTools
 5665  rewrite
 5682  swapPhoto
 5692  movePage
 5701  bindEditor
 5863  openReader
 5866  draw
 5870  close
 5872  next
 5888  renderBookPreview
 5906  idb
 5907  idbSet
 5908  idbGet
 5909  idbDel
 5910  saveLocal
 5916  offerResume
 5940  fullBlob
 5958  dataUrlToBlob
 5959  uploadPhotos
 5961  todo
 5967  worker
 5990  docHtml
 5996  printHtml
 5997  innerHtml
 5999  spineStyle
 6003  spineText
 6004  defaultSpine
 6005  coverHtml
 6013  generateAlbumPDF
 6019  gen
 6050  processPayment
 6090  goTab
 6117  lang
 6120  pg
 6155  upd
 6181  apply
 6210  mail
 6359  toc
 6366  show
 6372  openLegal
 6378  closeLegal
 6408  cur
 6417  paint
 6442  lang
 6447  applyUI
 6454  setLang
 6472  syncStory
 6502  ensureStoryFor
 6518  recompose
 6532  addInput
 6551  removePhoto
 6603  saveLink
 6625  openFromLink
 6635  set
 6652  trackOverlay
 6660  close
 6713  drawEbar
 6738  coach
 6744  done
 6750  goTab
 6759  draw
 6787  payLabel
 6798  highlightPal
 6803  setLang
 6818  lang
 6831  spineColors
 6871  name
 6873  auto
 6909  names
 6910  renderLive
 6923  flowMode
 6932  exifDate
 6942  readAscii
 6943  scan
 6960  addPhotos
 6969  remap
 6970  applyOrder
 6983  movePhoto
 6986  sortByDate
 6995  renderPhotosPlus
 7034  startGenAnim
 7046  tick
 7054  stopGenAnim
 7056  runGeneration
 7059  renderSummary
 7072  syncPrice
 7082  goTab
 7104  setLang
 7121  lang
 7152  applyText
 7161  fromFrance
 7169  fromOSM
 7188  close
 7189  render
 7197  pick
 7205  search

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
