# V1 DoD Status (updated)

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
  - Matchup filter/search index
  - Unified search page
- Legacy migration pipeline scripted and reproducible
- QA content check script and report (`migration/cleaned/qa-report.json`)
- Production smoke test report (`migration/cleaned/prod-smoke-report.json`)

## Current data footprint

- Lessons: 45
- Characters: 37
- Matchups: 217
- Combos: 868
- Frame rows: 3039

## ⚠️ Remaining for quality (Round 2+)

- Matchup pages đã đủ số lượng nhưng nhiều trang vẫn ở mức template baseline; cần curate sâu top kèo quan trọng.
- Frame-data advanced semantics (startup/on-block/on-hit) vẫn thiếu ở nhiều row do hạn chế nguồn gốc dữ liệu.
- Character gameplan/punish text cần viết thủ công để thành coaching-quality.

## Next step

- Follow `docs-round2-curation-plan.md` và `migration/cleaned/top20-matchups-round2.json` để curate theo batch.
