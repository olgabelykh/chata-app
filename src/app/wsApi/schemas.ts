import * as z from "zod"

import { MessageSchema } from "../../entities/chats/schemas"

import { MESSAGE_TYPES } from "./constants"

export const WSMessageSchema = z.object({
  type: z.literal(Object.values(MESSAGE_TYPES)),
  payload: MessageSchema,
})
