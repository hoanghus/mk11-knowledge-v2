import fs from "node:fs/promises"
import path from "node:path"

import matter from "gray-matter"

export async function walkFiles(dir: string, ext: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walkFiles(fullPath, ext)
      return fullPath.endsWith(ext) ? [fullPath] : []
    }),
  )

  return nested.flat()
}

export async function parseMdxFrontmatter<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8")
  const parsed = matter(raw)
  return parsed.data as T
}

export async function parseMdxFile<T>(filePath: string): Promise<{ data: T; content: string }> {
  const raw = await fs.readFile(filePath, "utf8")
  const parsed = matter(raw)

  return {
    data: parsed.data as T,
    content: parsed.content,
  }
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf8")
  return JSON.parse(raw) as T
}
