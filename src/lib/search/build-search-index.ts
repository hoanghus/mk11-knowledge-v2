import {
  listCharacters,
  listGlossaryTerms,
  listLessons,
  listMatchups,
  listPracticeDrills,
} from "@/lib/content"

export type SearchDoc = {
  type: "lesson" | "character" | "matchup" | "glossary" | "practice"
  title: string
  summary: string
  href: string
  tags: string[]
}

export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const [lessons, characters, matchups, glossary, practice] = await Promise.all([
    listLessons(),
    listCharacters(),
    listMatchups(),
    listGlossaryTerms(),
    listPracticeDrills(),
  ])

  return [
    ...lessons.map((item) => ({
      type: "lesson" as const,
      title: item.title,
      summary: item.summary,
      href: `/learn/${item.slug}`,
      tags: item.tags,
    })),
    ...characters.map((item) => ({
      type: "character" as const,
      title: item.name,
      summary: item.summary,
      href: `/characters/${item.slug}`,
      tags: item.tags,
    })),
    ...matchups.map((item) => ({
      type: "matchup" as const,
      title: item.title,
      summary: item.summary,
      href: `/matchups/${item.slug}`,
      tags: item.tags,
    })),
    ...glossary.map((item) => ({
      type: "glossary" as const,
      title: item.term,
      summary: item.shortDefinition,
      href: `/glossary#${item.slug}`,
      tags: item.tags ?? [],
    })),
    ...practice.map((item) => ({
      type: "practice" as const,
      title: item.title,
      summary: item.goal,
      href: `/practice#${item.slug}`,
      tags: [],
    })),
  ]
}
