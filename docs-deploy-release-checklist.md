# Deploy & Release Checklist (V1)

## 0) Preflight

- Ensure Node 22+ and pnpm installed
- `pnpm install`
- Confirm branch is up to date

## 1) Quality gate (local)

```bash
pnpm release:check
```

This runs:
- lint
- build
- content QA consistency check
- git status summary

## 2) Commit & push

```bash
git add .
git commit -m "chore: release v1"
git push origin <branch>
```

## 3) Deploy (Vercel)

- Import repo in Vercel (Framework: Next.js)
- Build command: `pnpm build`
- Install command: `pnpm install`
- Output: default Next.js
- Trigger deploy from the target branch

## 4) Smoke test after deploy

Quick automated smoke:

```bash
node scripts/smoke-prod-check.mjs > migration/cleaned/prod-smoke-report.json
```

Then check these routes manually:

- `/`
- `/learn`
- `/learn/l0-movement-basics`
- `/characters`
- `/characters/scorpion`
- `/combos`
- `/frame-data`
- `/practice`
- `/glossary`
- `/search?q=scorpion`

## 5) Content/data sanity checks

- Search returns mixed entity types
- Combos filters work (character/bars/position/difficulty)
- Frame data quick filters work
- Character detail tabs render without empty crashes

## 6) Release notes

At minimum include:
- commit hash
- migration summary numbers
- known limitations (matchup corpus depth, sparse advanced frame semantics)
