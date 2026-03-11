import path from "node:path"
import { z } from "zod"

import { comboSchema, type Combo } from "@/lib/schemas"

import { readJsonFile } from "./_fs"

const file = path.join(process.cwd(), "data", "combos.json")

const combosSchema = z.array(comboSchema)

export async function listCombos(): Promise<Combo[]> {
  const parsed = await readJsonFile<unknown>(file)
  return combosSchema.parse(parsed)
}

export async function listCombosByCharacter(character: string): Promise<Combo[]> {
  const rows = await listCombos()
  return rows.filter((row) => row.character === character)
}
