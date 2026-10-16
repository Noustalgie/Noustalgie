# Carte de public/index.html

Générée automatiquement (7550 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

## Blocs

- lignes 3-3 : <script> (0 Ko)
- lignes 22-33 : <script type="application/ld+json"> (0 Ko)
- lignes 34-169 : <script type="application/ld+json"> (4 Ko)
- lignes 172-188 : <script> (1 Ko)
- lignes 189-1633 : <style> (122 Ko)
- lignes 1634-1653 : <script type="application/ld+json"> (1 Ko)
- lignes 1654-1741 : <script type="application/ld+json"> (4 Ko)
- lignes 2224-4383 : <script> (173 Ko)
- lignes 4384-5068 : <script> (44 Ko)
- lignes 5069-7527 : <script> (206 Ko)
- lignes 7528-7547 : <script> (1 Ko)

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
 5244  1. Import des photos : une version écran + une version impression
 5513  2. Génération : histoire + légendes à partir des photos
 5778  3. Éditeur
 6183  4. Sauvegarde locale (IndexedDB : photos comprises)
 6218  5. Impression : photos en pleine résolution + PDF hébergé
 6319  6. Paiement
 7123  1. Livre 3D réutilisable
 7189  2. Aperçu en direct pendant la création (ordinateur)
 7223  3. Photos : date de prise de vue, couverture, glisser-déposer
 7325  4. Génération vivante : leurs photos se posent dans un livre
 7351  5. Récapitulatif de commande avec LEUR couverture
 7379  6. Finitions : apparition au défilement, page tournée

## HTML : sections et zones clés

 1769  <header>
 1770  <nav class="ed-nav">
 1792  <main id="main" tabindex="-1">
 1794  <section class="ed-hero">
 1803  <div class="nst-demo" id="nstDemo"
 1809  <section class="nst-how nst-frise" id="how">
 1830  <section class="ed-price" id="pricing">
 1863  <section class="section app-section" id="app">
 1890  <div class="panel active" id="panel0"
 1932  <div class="panel" id="panel1"
 1973  <div class="panel" id="panel2"
 1999  <div class="panel" id="panel3"
 2000  <div id="nstEd"
 2027  <div class="panel" id="panel4"
 2029  <div id="payForm"
 2107  <section class="ed-faq-section" id="faq">
 2155  <footer>
 2203  <div class="legal-overlay" id="legalOverlay"
 2209  <div class="modal-bg" id="msgModal"

## Dictionnaires de langue (LANGS)

 2229  LANGS.fr
 2315  LANGS.en
 2401  LANGS.de
 2487  LANGS.es
 2573  LANGS.pt

## Fonctions

  177  nstLoadLib
  181  all
 2663  toggleLangMenu
 2664  pickLang
 2666  setLang
 2705  highlightPal
 2725  selectPricing
 2740  onSlider
 2753  onInAppSlider
 2776  animNum
 2782  toggleCmp
 2801  saveDraft
 2820  restoreDraft
 2827  set
 2835  clearDraft
 2859  goTab
 2898  edPickPrice
 2904  toggleFaq
 2905  startApp
 2910  addPhotosFromEditor
 2943  ensureConvertible
 2961  detectFocalY
 2981  showUploadLoader
 2993  hideUploadLoader
 2997  addPhotos
 3005  processBatch
 3042  getMinPhotos
 3046  renderPhotos
 3062  removePhoto
 3068  openMsgModal
 3069  closeMsgModal
 3070  saveMsgModal
 3075  selStyle
 3080  log
 3090  setProgress
 3101  api
 3131  runGeneration
 3363  renderBookPreview
 3373  pg
 3380  _take
 3391  pickIdx
 3397  ph
 3398  imgT
 3407  img
 3416  wantTall
 3417  wantSquare
 3418  wantWide
 3823  avRender
 3860  reapplyTexts
 3861  avBuildThumbs
 3874  avNext
 3875  avPrev
 3882  toggleEditor
 3883  edTab
 3884  refreshEditor
 3885  refreshTextFields
 3913  estRows
 3922  liveText
 3935  setActiveSlot
 3936  edSelectPhoto
 3937  updateFilter
 3938  updateCrop
 3939  updateZoom
 3940  toggleBW
 3941  applySlotEditsToDOM
 3945  saveTextStyle
 3946  updateTextStyle
 3947  toggleTextStyle
 3948  setTextSize
 3958  applyTextStylesToDOM
 3959  edSelectLayout
 3960  applyEdit
 3961  applyLayoutOverride
 3962  applyTextLive
 3963  resetEdit
 3967  initCropGestures
 3971  editorOpen
 3972  curSlot
 3980  snapshotPage
 3981  undoEdit
 3983  openFullPreview
 3990  base64ToBlob
 4002  fetchWithTimeout
 4017  processPayment
 4116  generateAlbumPDF
 4123  compressPhotoForPdf
 4187  generateAlbumPDF_UNUSED
 4254  applyPromo
 4275  selectFormat
 4297  updateFormatPrices
 4311  generateFinalPDF
 4328  addPage
 4354  openLegal
 4355  closeLegal
 4394  clamp
 4431  curLang
 4438  themeKey
 4439  theme
 4440  photos
 4442  printSrc
 4454  faceSpan
 4457  autoPos
 4462  fit
 4465  L
 4488  cropCost
 4500  slot
 4519  tx
 4526  fit
 4527  orientOf
 4691  renderPage
 4710  tierOf
 4711  photoPageCount
 4712  minPhotos
 4715  distribute
 4731  pickLayout
 4748  chooseLayout
 4761  mkPage
 4765  plan
 4801  tag
 4804  takePhoto
 4875  pairOf
 4877  relayout
 4883  makeSpread
 4901  unmakeSpread
 4917  syncSpread
 4925  fixSpreads
 4964  loadDetector
 4969  go
 4979  loadImg
 4983  saliency
 5010  subjectFromFaces
 5019  analyze
 5045  analyzeAll
 5217  t
 5238  lang
 5239  nPagesSel
 5240  promo
 5245  loadImage
 5247  toJpeg
 5269  was
 5286  pickerBack
 5297  showPickHelp
 5302  close
 5316  within
 5317  decodeFile
 5347  hdBlob
 5357  importFile
 5378  toast
 5391  geom
 5396  prepThumb
 5402  prepFull
 5408  dropPhoto
 5414  tile
 5423  pump
 5450  pump2
 5470  addPhotos
 5500  renderPhotos
 5519  browserTag
 5520  callAI
 5548  thumb
 5550  coupleInfo
 5565  storyPrompt
 5612  keywords
 5621  missingAnswers
 5630  repairStory
 5648  captionPhotos
 5670  defaultStory
 5705  runGeneration
 5768  showIssue
 5780  isWide
 5781  snap
 5783  H
 5784  commit
 5785  restore
 5786  undo
 5787  redo
 5788  updUndo
 5793  visible
 5801  mountPage
 5806  scaleHost
 5815  drawStage
 5829  drawThumb
 5833  drawStrip
 5840  markStrip
 5846  drawThemes
 5851  revealStage
 5857  drawAll
 5858  refreshPage
 5860  afterSlotEdit
 5867  go
 5868  step
 5873  highlightSel
 5883  drawTools
 5933  rewrite
 5950  swapPhoto
 5961  movePage
 5971  bindEditor
 6142  openReader
 6145  draw
 6149  close
 6151  next
 6167  renderBookPreview
 6185  idb
 6186  idbSet
 6187  idbGet
 6188  idbDel
 6189  saveLocal
 6195  offerResume
 6219  fullBlob
 6237  dataUrlToBlob
 6238  uploadPhotos
 6240  todo
 6246  worker
 6269  docHtml
 6275  printHtml
 6276  innerHtml
 6278  spineStyle
 6282  spineText
 6283  defaultSpine
 6284  coverHtml
 6292  generateAlbumPDF
 6298  gen
 6329  processPayment
 6369  goTab
 6396  lang
 6398  X
 6401  pg
 6440  upd
 6466  apply
 6495  mail
 6644  toc
 6651  show
 6657  openLegal
 6663  closeLegal
 6693  cur
 6702  paint
 6727  lang
 6732  applyUI
 6739  setLang
 6757  syncStory
 6787  ensureStoryFor
 6803  recompose
 6817  addInput
 6836  removePhoto
 6889  saveLink
 6911  openFromLink
 6921  set
 6938  trackOverlay
 6946  close
 6982  ouvrir
 7006  drawEbar
 7031  coach
 7037  done
 7043  goTab
 7052  draw
 7080  payLabel
 7091  highlightPal
 7096  setLang
 7111  lang
 7124  spineColors
 7164  name
 7166  auto
 7202  names
 7203  renderLive
 7216  flowMode
 7225  exifDate
 7235  readAscii
 7236  scan
 7253  addPhotos
 7262  remap
 7263  applyOrder
 7276  movePhoto
 7279  sortByDate
 7288  renderPhotosPlus
 7327  startGenAnim
 7339  tick
 7347  stopGenAnim
 7349  runGeneration
 7352  renderSummary
 7365  syncPrice
 7375  goTab
 7397  setLang
 7414  lang
 7445  applyText
 7454  fromFrance
 7462  fromOSM
 7481  close
 7482  render
 7490  pick
 7498  search
 7534  etape

## api/

- api/_fn/album.js (107 lignes) api/album.js — « Recevoir le lien de mon album »
- api/_fn/cancel.js (28 lignes) 
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
