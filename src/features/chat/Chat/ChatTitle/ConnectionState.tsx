import { Typography, Stack } from "@mui/material"

export const ConnectionState = ({ state }: { state: string }) => {
  return (
    <Stack p={2} flexDirection="row" gap={1} alignItems="center">
      <Typography p={0} variant="body2">
        Статус подключения:
      </Typography>
      <Typography p={0} variant="body2">
        {state}
      </Typography>
    </Stack>
  )
}
