import path from "node:path"
import { z } from "zod"

import { frameMoveSchema, type FrameMove } from "@/lib/schemas"

import { readJsonFile } from "./_fs"

const file = path.join(process.cwd(), "data", "frame-data.json")
const frameMovesSchema = z.array(frameMoveSchema)

export async function listFrameMoves(): Promise<FrameMove[]> {
  const parsed = await readJsonFile<unknown>(file)
  return frameMovesSchema.parse(parsed)
}
