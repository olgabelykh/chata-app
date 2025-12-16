import { Button, Stack } from "@mui/material"

import { useSelectedChat } from "../useSelectedChat"
import { STATES, useWebSocketContext } from "../../../../app/wsApi"

import { ChatName } from "./ChatName"
import { ConnectionState } from "./ConnectionState"

export const ChatTitle = () => {
  const selectedChat = useSelectedChat()
  const {
    state,
    open: openConnection,
    close: closeConnection,
  } = useWebSocketContext()

  const disableOpen = state === STATES.open || state === STATES.connecting
  const disableClose = state === STATES.closed || state === STATES.closing

  return (
    <Stack
      height={64}
      minHeight={64}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack p={2} height={1} flexDirection="row" gap={1} alignItems="center">
        <ChatName name={selectedChat?.name} />
        <ConnectionState state={state} />
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
