# MK11 Learning Hub (V1 Scaffold)

Rebuild from scratch for the MK11 learning website.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- MDX (long-form content)
- JSON/typed data (structured data)

## Quick start

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Route scaffold

- `/`
- `/learn`
- `/learn/[slug]`
- `/characters`
- `/characters/[character]`
- `/matchups`
- `/matchups/[slug]`
- `/combos`
- `/frame-data`
- `/practice`
- `/glossary`
- `/search`

## Content-first structure (initial)

- `content/` for MDX content
- `data/` for structured records
- `src/lib/content/*` for loaders/parsers
- `src/lib/schemas/*` for typed schema validation

## Migration helper

Run migration from the old codebase (`../mk11-giao-an`):

```bash
node scripts/migrate-from-mk11-giao-an.mjs
```

Generated outputs:
- `content/lessons/*`
- `content/characters/*`
- `data/characters.json`
- `data/combos.json`
- `data/frame-data.json`
- `migration/raw/*`
- `migration/maps/lessons-map.json`
- `migration/cleaned/summary.json`

## Status

Current phase completed:
- Scaffold + IA + shadcn foundation
- Typed schema/content loaders
- Unified search index (V1)
- Initial migration pipeline from old project data
