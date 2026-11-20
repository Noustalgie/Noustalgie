#!/bin/bash
# Crochet SessionStart (sessions Claude Code sur le web uniquement) : installe ce qu'il faut pour que
# les contrôles du site (outils/verifier-site.py, outils/rendu.py) et les films (video/) marchent dès
# le début de la session. Sans effet en local. Peut tourner plusieurs fois sans dommage.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Python. Playwright suit la version du Playwright Node préinstallé, qui correspond au Chromium de /opt/pw-browsers
# (fixer 1.56 a cassé les contrôles le 20 novembre 2026 quand l'environnement est passé à chromium-1243).
# Les autres paquets servent aux captures (Pillow) et à la musique des films (video/tools/audio*.py).
PW=$(cd / && node -e "console.log(require('playwright/package.json').version)" 2>/dev/null || echo 1.56.0)
python3 -m pip install --quiet --disable-pip-version-check --root-user-action=ignore \
  "playwright==$PW" pillow numpy scipy soundfile pedalboard pyloudnorm

# Node : esbuild (minimise le CSS et le JavaScript de la construction de production), puis le moteur
# des films et des visuels du site (gsap, three)
npm install --silent --no-audit --no-fund
npm install --prefix video --silent --no-audit --no-fund

# Polices réelles des captures (outils/rendu.py), gardées dans ~/.cache
python3 -c 'import sys; sys.path.insert(0, "outils"); import rendu; rendu.installer_polices()'

echo "Outils prêts : python3 outils/verifier-site.py, outils/rendu.py, outils/audit-seo.py et video/."
