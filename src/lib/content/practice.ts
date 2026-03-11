import path from "node:path"

import { practiceDrillSchema, type PracticeDrill } from "@/lib/schemas"

import { parseMdxFrontmatter, walkFiles } from "./_fs"

const root = path.join(process.cwd(), "content", "practice")

export async function listPracticeDrills(): Promise<PracticeDrill[]> {
  const files = await walkFiles(root, ".mdx")
  const data = await Promise.all(
    files.map(async (file) => practiceDrillSchema.parse(await parseMdxFrontmatter(file))),
  )

  return data.sort((a, b) => a.title.localeCompare(b.title))
}
