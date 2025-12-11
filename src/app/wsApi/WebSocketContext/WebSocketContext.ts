import { createContext } from "react"

import type { State } from "../types"
import { STATES } from "../constants"
import { wsApi } from "../wsApi"
export type WebSocketContextType = {
  state: State
  open: () => void
  close: () => void
}

const initialState = {
  open: wsApi.open,
  close: wsApi.close,
  state: STATES.idle,
}

export const WebSocketContext =
  createContext<WebSocketContextType>(initialState)
