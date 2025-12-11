import { Stack, Typography } from "@mui/material"

import { useWebSocket } from "../../../app/wsApi/useWebSocket"

import { useSelectedChat } from "./useSelectedChat"

export const ChatTitle = () => {
  const selectedChat = useSelectedChat()
  const { state } = useWebSocket()

  return (
    <Stack
      height={64}
      minHeight={64}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography p={2} variant="h6">
        {selectedChat?.name}
      </Typography>
      <Stack p={2} flexDirection={"row"} gap={1}>
        <Typography p={0} variant="body2">
          Статус подключения:
        </Typography>
        <Typography p={0} variant="body2">
          {state}
        </Typography>
      </Stack>
    </Stack>
  )
}
