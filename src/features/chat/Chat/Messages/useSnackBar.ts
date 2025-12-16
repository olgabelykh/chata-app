import { useMemo, useState } from "react"
import { type SnackbarCloseReason } from "@mui/material/Snackbar"

export function useSnackbar() {
  const [message, setMessage] = useState<string | null>(null)

  const actions = useMemo(() => {
    const show = (message: string) => {
      setMessage(message)
    }
    const onClose = (
      event: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason,
    ) => {
      if (reason === "clickaway") {
        return
      }

      setMessage(null)
    }

    return { show, onClose }
  }, [])

  return { ...actions, open: message !== null, message }
}
