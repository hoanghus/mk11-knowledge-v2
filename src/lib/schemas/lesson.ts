import { z } from "zod"

export const lessonCategorySchema = z.enum([
  "fundamentals",
  "neutral",
  "offense",
  "defense",
  "oki",
  "punish",
  "movement",
  "matchup-theory",
])

export const lessonDifficultySchema = z.enum(["beginner", "intermediate", "advanced"])

export const lessonSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  category: lessonCategorySchema,
  difficulty: lessonDifficultySchema,
  tags: z.array(z.string()).default([]),
  relatedCharacters: z.array(z.string()).optional(),
  relatedMatchups: z.array(z.string()).optional(),
  published: z.boolean().default(true),
  order: z.number().optional(),
})

export type Lesson = z.infer<typeof lessonSchema>
