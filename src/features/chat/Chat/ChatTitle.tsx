import { Button, Stack, Typography } from "@mui/material"

import { useSelectedChat } from "./useSelectedChat"
import { useWebSocket } from "../../../app/wsApi/useWebSocket"
import { STATES } from "../../../app/wsApi"

export const ChatTitle = () => {
  const selectedChat = useSelectedChat()
  const { state, close: closeConnection, open: openConnection } = useWebSocket()

  const disableOpen = state === STATES.open || state === STATES.connecting
  const disableClose = state === STATES.closed || state === STATES.closing

  return (
    <Stack
      height={64}
      minHeight={64}
      flexDirection="row"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Stack p={2} flexDirection={"row"} gap={1} alignItems={"center"}>
        {selectedChat && (
          <Typography p={2} variant="h6">
            {selectedChat.name}
          </Typography>
        )}
        <Stack p={2} flexDirection={"row"} gap={1} alignItems={"center"}>
          <Typography p={0} variant="body2">
            Статус подключения:
          </Typography>
          <Typography p={0} variant="body2">
            {state}
          </Typography>
        </Stack>
      </Stack>
      <Stack p={2} flexDirection={"row"} gap={1} alignItems={"center"}>
        <Button size="small" onClick={openConnection} disabled={disableOpen}>
           Open
        </Button>
        <Button size="small" onClick={closeConnection} disabled={disableClose}>
          Close
        </Button>
      </Stack>
    </Stack>
  )
}
