import fs from "node:fs/promises"
import path from "node:path"

import matter from "gray-matter"

import { lessonSchema, type Lesson } from "@/lib/schemas/entities"

const lessonsRoot = path.join(process.cwd(), "content", "lessons")

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(resolved)
      return resolved.endsWith(".mdx") ? [resolved] : []
    }),
  )

  return nested.flat()
}

export async function listLessons(): Promise<Lesson[]> {
  const files = await walk(lessonsRoot)
  const lessons = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8")
      const parsed = matter(raw)
      return lessonSchema.parse(parsed.data)
    }),
  )

  return lessons.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title))
}
