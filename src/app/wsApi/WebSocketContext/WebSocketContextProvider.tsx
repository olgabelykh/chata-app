import { type ReactNode } from "react"

import { WebSocketContext } from "./WebSocketContext"
import { useWebSocket } from "./useWebSocket"

export const WebSocketContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const ws = useWebSocket()

  return <WebSocketContext value={ws}>{children}</WebSocketContext>
}
