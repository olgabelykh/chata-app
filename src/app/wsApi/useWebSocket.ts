import { useLayoutEffect, useState } from "react"

import { wsApi } from "./wsApi"
import { STATES } from "./constants"
import { type States } from "./types"

export const useWebSocket = () => {
  const [state, setState] = useState<States>(STATES.idle)

  useLayoutEffect(() => {
    wsApi.onConnecting(() => {
      setState(STATES.connecting)
    })
    wsApi.onOpen(() => {
      setState(STATES.open)
    })
    wsApi.onClose(() => {
      setState(STATES.closed)
    })
    wsApi.onError(() => {
      setState(STATES.error)
    })
  })

  return { state, open: wsApi.open, close: wsApi.close }
}
