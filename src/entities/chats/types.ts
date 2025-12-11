import type * as z from "zod"

import type { ChatSchema, MessageSchema, NewMessageSchema } from "./schemas"

export type Chat = z.infer<typeof ChatSchema>

export type Message = z.infer<typeof MessageSchema>

export type NewMessage = z.infer<typeof NewMessageSchema>
