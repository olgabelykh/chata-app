import { useLayoutEffect, useMemo, useState } from "react"

import { wsApi } from "../wsApi"
import { STATES } from "../constants"
import { type State } from "../types"

export const useWebSocket = () => {
  const [state, setState] = useState<State>(STATES.idle)

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

  const webSocketApi = useMemo(
    () => ({ state, open: wsApi.open, close: wsApi.close }),
    [state],
  )

  return webSocketApi
}
