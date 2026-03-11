import { z } from "zod"

export const characterDifficultySchema = z.enum(["easy", "medium", "hard"])

export const characterSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  difficulty: characterDifficultySchema,
  archetypes: z.array(z.string()).default([]),
  summary: z.string(),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  portrait: z.string().optional(),
  published: z.boolean().default(true),
})

export type Character = z.infer<typeof characterSchema>
