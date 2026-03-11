# Content Authoring Guide

## 1) Add a lesson

Create `content/lessons/<category>/<slug>.mdx` with frontmatter:

```md
---
slug: neutral-basics
title: "Neutral Basics"
summary: "Cách kiểm soát khoảng cách, bait whiff và chọn button an toàn."
category: neutral
difficulty: beginner
tags:
  - spacing
  - whiff-punish
published: true
order: 120
---
```

## 2) Add a character

Create `content/characters/<slug>.mdx` with frontmatter:

```md
---
slug: scorpion
title: "Scorpion"
name: "Scorpion"
summary: "Character thiên về whiff punish và strike/throw pressure."
difficulty: medium
archetypes:
  - whiff-punish
strengths:
  - Mobility cao
weaknesses:
  - Cần spacing chuẩn
tags:
  - mk11
published: true
---
```

## 3) Add combos / frame data / glossary

- Combos: append row to `data/combos.json`
- Frame data: append row to `data/frame-data.json`
- Glossary: append row to `data/glossary.json`

Always follow schema in `src/lib/schemas/*`.

## 4) Validate

```bash
pnpm lint
pnpm build
```

If build passes, data shape/frontmatter are valid for runtime loaders.
