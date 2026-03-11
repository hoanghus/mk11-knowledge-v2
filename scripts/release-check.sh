#!/usr/bin/env bash
set -euo pipefail

echo "[1/4] Lint"
pnpm lint

echo "[2/4] Build"
pnpm build

echo "[3/4] Content QA"
node scripts/qa-content-check.mjs

echo "[4/4] Git status"
git status --short

echo "Release check completed ✅"
