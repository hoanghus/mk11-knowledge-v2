import path from "node:path"
import { z } from "zod"

import { glossaryTermSchema, type GlossaryTerm } from "@/lib/schemas"

import { readJsonFile } from "./_fs"

const file = path.join(process.cwd(), "data", "glossary.json")
const glossarySchema = z.array(glossaryTermSchema)

export async function listGlossaryTerms(): Promise<GlossaryTerm[]> {
  const parsed = await readJsonFile<unknown>(file)
  return glossarySchema.parse(parsed)
}
