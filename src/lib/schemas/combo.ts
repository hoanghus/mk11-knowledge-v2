import { z } from "zod"

export const comboSchema = z.object({
  id: z.string(),
  character: z.string(),
  title: z.string(),
  notation: z.string(),
  starter: z.string().optional(),
  damage: z.number(),
  bars: z.number(),
  position: z.enum(["midscreen", "corner", "any"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
})

export type Combo = z.infer<typeof comboSchema>
