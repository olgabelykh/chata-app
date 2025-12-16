import { Stack, Typography } from "@mui/material"

export const Message = ({
  message,
  isUserMessage,
}: {
  message: { id: string; content: string; userName: string }
  isUserMessage: boolean
}) => (
  <Stack
    p={1}
    gap={1}
    borderRadius={1}
    ml={isUserMessage ? "auto" : 0}
    sx={{ backgroundColor: "white", maxWidth: "80%" }}
    key={message.id}
  >
    <Typography p={0} variant="body1">
      {message.content}
    </Typography>
    <Typography textAlign="end" p={0} variant="body2">
      {message.userName}
    </Typography>
  </Stack>
)
