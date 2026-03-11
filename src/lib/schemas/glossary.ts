import { z } from "zod"

export const glossaryTermSchema = z.object({
  slug: z.string(),
  term: z.string(),
  shortDefinition: z.string(),
  fullDefinition: z.string(),
  relatedTerms: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
})

export type GlossaryTerm = z.infer<typeof glossaryTermSchema>
