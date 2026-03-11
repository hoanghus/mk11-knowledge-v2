import { z } from "zod"

export const frameMoveSchema = z.object({
  id: z.string(),
  character: z.string(),
  move: z.string(),
  command: z.string(),
  type: z.enum(["high", "mid", "low", "overhead", "throw", "special"]).optional(),
  startup: z.number().optional(),
  active: z.string().optional(),
  recovery: z.number().optional(),
  onBlock: z.number().optional(),
  onHit: z.number().optional(),
  flawlessBlockGap: z.string().optional(),
  cancelAdvantage: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type FrameMove = z.infer<typeof frameMoveSchema>
