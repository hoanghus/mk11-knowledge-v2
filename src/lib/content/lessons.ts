import path from "node:path"

import { lessonSchema, type Lesson } from "@/lib/schemas"

import { parseMdxFrontmatter, walkFiles } from "./_fs"

const root = path.join(process.cwd(), "content", "lessons")

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
