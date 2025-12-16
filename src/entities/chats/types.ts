import type * as z from "zod"

import type { ChatSchema, MessageSchema } from "./schemas"

export type Chat = z.infer<typeof ChatSchema>

export type Message = z.infer<typeof MessageSchema>
