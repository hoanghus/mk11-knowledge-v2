import path from "node:path"

import { matchupSchema, type Matchup } from "@/lib/schemas"

import { parseMdxFrontmatter, walkFiles } from "./_fs"

const root = path.join(process.cwd(), "content", "matchups")

export async function listMatchups(): Promise<Matchup[]> {
  const files = await walkFiles(root, ".mdx")
  const data = await Promise.all(
    files.map(async (file) => matchupSchema.parse(await parseMdxFrontmatter(file))),
  )

  return data.filter((item) => item.published).sort((a, b) => a.title.localeCompare(b.title))
}
