export const MESSAGE_TYPES = {
  new: "message:new",
} as const

export const STATES = {
  idle: "idle",
  connecting: "connecting",
  open: "open",
  closed: "closed",
  closing: "closing",
  error: "error",
} as const
