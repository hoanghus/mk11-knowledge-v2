# Migration Notes (Legacy `mk11-giao-an` -> `mk11-knowledge-v2`)

## Source snapshot

- Lessons: `../mk11-giao-an/apps/web/content/lessons/*.mdx`
- Character datasets: `../mk11-giao-an/data/characters/*.json`
- Raw references copied to: `migration/raw/*`

## What was migrated

- Lessons to `content/lessons/<category>/<slug>.mdx`
- Character pages to `content/characters/<slug>.mdx`
- Structured data:
  - `data/characters.json`
  - `data/combos.json`
  - `data/frame-data.json`

## Mapping details

- Module -> category map:
  - Fundamentals -> fundamentals
  - Neutral -> neutral
  - Defense -> defense
  - Punish -> punish
  - Matchup -> matchup-theory
  - Mindset -> fundamentals
- Difficulty inferred from level:
  - 0-2 beginner
  - 3-5 intermediate
  - 6-8 advanced

## Known limitations in this pass

- Matchup long-form pages were not auto-generated from old code (dataset lacked full matchup MDX corpus).
- Frame data fields like startup/on-block/on-hit are partially unavailable in source rows and remain sparse.
- Character gameplan sections are scaffolded from available metadata, not manually curated yet.

## Artifacts for audit

- `migration/maps/lessons-map.json`
- `migration/cleaned/summary.json`
- `scripts/migrate-from-mk11-giao-an.mjs`
