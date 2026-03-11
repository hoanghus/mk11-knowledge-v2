import { z } from "zod"

export const difficultySchema = z.enum(["beginner", "intermediate", "advanced"])

export const lessonSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.enum([
    "fundamentals",
    "neutral",
    "offense",
    "defense",
    "oki",
    "punish",
    "movement",
    "matchup-theory",
  ]),
  difficulty: difficultySchema,
  tags: z.array(z.string()),
  published: z.boolean().default(true),
  order: z.number().optional(),
})

export type Lesson = z.infer<typeof lessonSchema>
