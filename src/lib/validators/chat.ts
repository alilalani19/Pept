import { z } from 'zod'

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
  sessionId: z.string().cuid().optional(),
  peptideSlug: z.string().optional(),
})

export type ChatMessageInput = z.infer<typeof chatMessageSchema>
