import type { Message } from "../../entities/chats"
import type { STATES } from "./constants"

export type OnMessageCallback = (
  message: Message | undefined,
  error: string | undefined,
) => void

export type OnStateCallback = () => void
export type OnErrorCallback = () => void

export type States = (typeof STATES)[keyof typeof STATES]
