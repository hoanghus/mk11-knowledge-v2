import path from "node:path"

import { lessonSchema, type Lesson } from "@/lib/schemas"

import { parseMdxFile, parseMdxFrontmatter, walkFiles } from "./_fs"

const root = path.join(process.cwd(), "content", "lessons")

export type LessonDocument = Lesson & {
  content: string
  headings: Array<{ depth: 2 | 3; text: string; slug: string }>
  readingMinutes: number
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function extractHeadings(content: string): Array<{ depth: 2 | 3; text: string; slug: string }> {
  const lines = content.split("\n")
  const headings: Array<{ depth: 2 | 3; text: string; slug: string }> = []

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "").trim()
      headings.push({ depth: 2, text, slug: toSlug(text) })
      continue
    }

    if (line.startsWith("### ")) {
      const text = line.replace(/^###\s+/, "").trim()
      headings.push({ depth: 3, text, slug: toSlug(text) })
    }
  }

  return headings
}

function estimateReadingMinutes(content: string) {
  const words = content.replace(/[#*_`>-]/g, " ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export async function listLessons(): Promise<Lesson[]> {
  const files = await walkFiles(root, ".mdx")
  const lessons = await Promise.all(
    files.map(async (file) => lessonSchema.parse(await parseMdxFrontmatter(file))),
  )

  return lessons
    .filter((item) => item.published)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title))
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const lessons = await listLessons()
  return lessons.find((item) => item.slug === slug) ?? null
}

export async function getLessonDocumentBySlug(slug: string): Promise<LessonDocument | null> {
  const files = await walkFiles(root, ".mdx")

  for (const file of files) {
    const parsed = await parseMdxFile<unknown>(file)
    const data = lessonSchema.safeParse(parsed.data)

    if (!data.success) continue
    if (data.data.slug !== slug || !data.data.published) continue

    return {
      ...data.data,
      content: parsed.content,
      headings: extractHeadings(parsed.content),
      readingMinutes: estimateReadingMinutes(parsed.content),
    }
  }

  return null
}
