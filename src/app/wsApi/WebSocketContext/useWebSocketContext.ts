import { useContext } from "react"

import { WebSocketContext, type WebSocketContextType } from "./WebSocketContext"

export const useWebSocketContext = () => {
  const context = useContext<WebSocketContextType>(WebSocketContext)

  return context
}
