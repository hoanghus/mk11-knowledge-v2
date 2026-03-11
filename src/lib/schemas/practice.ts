import { z } from "zod"

export const practiceDrillSchema = z.object({
  slug: z.string(),
  title: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  goal: z.string(),
  steps: z.array(z.string()),
  successCriteria: z.array(z.string()).optional(),
  relatedCharacters: z.array(z.string()).optional(),
  relatedLessons: z.array(z.string()).optional(),
})

export type PracticeDrill = z.infer<typeof practiceDrillSchema>
