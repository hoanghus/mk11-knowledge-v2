import path from "node:path"

import { characterSchema, type Character } from "@/lib/schemas"

import { parseMdxFrontmatter, walkFiles } from "./_fs"

const root = path.join(process.cwd(), "content", "characters")

export async function listCharacters(): Promise<Character[]> {
  const files = await walkFiles(root, ".mdx")
  const data = await Promise.all(
    files.map(async (file) => characterSchema.parse(await parseMdxFrontmatter(file))),
  )

  return data.filter((item) => item.published).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  const characters = await listCharacters()
  return characters.find((item) => item.slug === slug) ?? null
}
