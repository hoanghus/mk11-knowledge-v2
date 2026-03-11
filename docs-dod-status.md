# V1 DoD Status (current)

## ✅ Completed

- New standalone repo with clean architecture (`mk11-knowledge-v2`)
- Next.js App Router + TypeScript + Tailwind + shadcn/ui
- Content/data split established:
  - `content/*` for MDX
  - `data/*` for structured JSON
- Typed schemas + loaders + search index
- Core routes implemented:
  - Home, Learn, Learn detail, Characters, Character detail, Matchups, Matchup detail,
    Combos, Frame Data, Practice, Glossary, Search
- Practical tool pages:
  - Combos filters
  - Frame data filters/sort/search
  - Unified search page
- Legacy migration pipeline scripted and reproducible
- QA content check script and report (`migration/cleaned/qa-report.json`)

## ⚠️ Remaining polish for strict “production-ready DoD”

- Matchup corpus is still thin (few pages populated from legacy source)
- Frame-data advanced semantic fields (startup/on-block/on-hit) are sparse in source and need curation
- Character detail sections are structurally complete but still need manual curation for high-quality gameplan text

## Suggested next final mile

1. Curate/add matchup pages for top common pairings
2. Curate key move semantics per main characters
3. Final visual polish pass (spacing/typography/mobile micro-adjustments)
4. Deploy and smoke-test on production target
