import { z } from "zod"

export const matchupDifficultySchema = z.enum(["even", "slight-a", "slight-b", "hard-a", "hard-b"])

export const matchupSchema = z.object({
  slug: z.string(),
  characterA: z.string(),
  characterB: z.string(),
  title: z.string(),
  summary: z.string(),
  difficulty: matchupDifficultySchema.optional(),
  tags: z.array(z.string()).default([]),
  relatedLessons: z.array(z.string()).optional(),
  published: z.boolean().default(true),
})

export type Matchup = z.infer<typeof matchupSchema>
