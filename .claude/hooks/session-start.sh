#!/bin/bash
# Crochet SessionStart (sessions Claude Code sur le web uniquement) : installe ce qu'il faut pour que
# les contrôles du site (outils/verifier-site.py, outils/rendu.py) et les films (video/) marchent dès
# le début de la session. Sans effet en local. Peut tourner plusieurs fois sans dommage.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Python. Playwright reste en 1.56 : c'est la version du Chromium préinstallé (/opt/pw-browsers/chromium-1194).
# Les autres paquets servent aux captures (Pillow) et à la musique des films (video/tools/audio*.py).
python3 -m pip install --quiet --disable-pip-version-check --root-user-action=ignore \
  'playwright==1.56.0' pillow numpy scipy soundfile pedalboard pyloudnorm

# Node : moteur des films et des visuels du site (gsap, three)
npm install --prefix video --silent --no-audit --no-fund

# Polices réelles des captures (outils/rendu.py), gardées dans ~/.cache
python3 -c 'import sys; sys.path.insert(0, "outils"); import rendu; rendu.installer_polices()'

echo "Outils prêts : python3 outils/verifier-site.py, outils/rendu.py, outils/audit-seo.py et video/."
