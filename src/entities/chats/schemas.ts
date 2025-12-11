import * as z from "zod"

export const ChatSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const MessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  userId: z.string(),
  userName: z.string(),
  content: z.string(),
  views: z.array(
    z.object({
      userId: z.string(),
      userName: z.string(),
    }),
  ),
})

export const NewMessageSchema = MessageSchema.pick({
  userId: true,
  userName: true,
  chatId: true,
  content: true,
})
