# Carte de public/index.html

Générée automatiquement (7543 lignes). Ouvrir une zone : Read avec offset = numéro de ligne.

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
- lignes 5069-7520 : <script> (205 Ko)
- lignes 7521-7540 : <script> (1 Ko)

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
 5506  2. Génération : histoire + légendes à partir des photos
 5771  3. Éditeur
 6176  4. Sauvegarde locale (IndexedDB : photos comprises)
 6211  5. Impression : photos en pleine résolution + PDF hébergé
 6312  6. Paiement
 7116  1. Livre 3D réutilisable
 7182  2. Aperçu en direct pendant la création (ordinateur)
 7216  3. Photos : date de prise de vue, couverture, glisser-déposer
 7318  4. Génération vivante : leurs photos se posent dans un livre
 7344  5. Récapitulatif de commande avec LEUR couverture
 7372  6. Finitions : apparition au défilement, page tournée

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
 5283  pickerBack
 5293  showPickHelp
 5298  close
 5312  within
 5313  decodeFile
 5343  hdBlob
 5353  importFile
 5374  toast
 5387  geom
 5392  prepThumb
 5398  prepFull
 5404  dropPhoto
 5410  tile
 5419  pump
 5446  pump2
 5466  addPhotos
 5493  renderPhotos
 5512  browserTag
 5513  callAI
 5541  thumb
 5543  coupleInfo
 5558  storyPrompt
 5605  keywords
 5614  missingAnswers
 5623  repairStory
 5641  captionPhotos
 5663  defaultStory
 5698  runGeneration
 5761  showIssue
 5773  isWide
 5774  snap
 5776  H
 5777  commit
 5778  restore
 5779  undo
 5780  redo
 5781  updUndo
 5786  visible
 5794  mountPage
 5799  scaleHost
 5808  drawStage
 5822  drawThumb
 5826  drawStrip
 5833  markStrip
 5839  drawThemes
 5844  revealStage
 5850  drawAll
 5851  refreshPage
 5853  afterSlotEdit
 5860  go
 5861  step
 5866  highlightSel
 5876  drawTools
 5926  rewrite
 5943  swapPhoto
 5954  movePage
 5964  bindEditor
 6135  openReader
 6138  draw
 6142  close
 6144  next
 6160  renderBookPreview
 6178  idb
 6179  idbSet
 6180  idbGet
 6181  idbDel
 6182  saveLocal
 6188  offerResume
 6212  fullBlob
 6230  dataUrlToBlob
 6231  uploadPhotos
 6233  todo
 6239  worker
 6262  docHtml
 6268  printHtml
 6269  innerHtml
 6271  spineStyle
 6275  spineText
 6276  defaultSpine
 6277  coverHtml
 6285  generateAlbumPDF
 6291  gen
 6322  processPayment
 6362  goTab
 6389  lang
 6391  X
 6394  pg
 6433  upd
 6459  apply
 6488  mail
 6637  toc
 6644  show
 6650  openLegal
 6656  closeLegal
 6686  cur
 6695  paint
 6720  lang
 6725  applyUI
 6732  setLang
 6750  syncStory
 6780  ensureStoryFor
 6796  recompose
 6810  addInput
 6829  removePhoto
 6882  saveLink
 6904  openFromLink
 6914  set
 6931  trackOverlay
 6939  close
 6975  ouvrir
 6999  drawEbar
 7024  coach
 7030  done
 7036  goTab
 7045  draw
 7073  payLabel
 7084  highlightPal
 7089  setLang
 7104  lang
 7117  spineColors
 7157  name
 7159  auto
 7195  names
 7196  renderLive
 7209  flowMode
 7218  exifDate
 7228  readAscii
 7229  scan
 7246  addPhotos
 7255  remap
 7256  applyOrder
 7269  movePhoto
 7272  sortByDate
 7281  renderPhotosPlus
 7320  startGenAnim
 7332  tick
 7340  stopGenAnim
 7342  runGeneration
 7345  renderSummary
 7358  syncPrice
 7368  goTab
 7390  setLang
 7407  lang
 7438  applyText
 7447  fromFrance
 7455  fromOSM
 7474  close
 7475  render
 7483  pick
 7491  search
 7527  etape

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
