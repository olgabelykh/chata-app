import { Typography } from "@mui/material"
import { memo } from "react"

export const ChatName = memo(({ name }: { name?: string }) => {
  if (!name) {
    return
  }

  return (
    <Typography p={2} variant="h6">
      {name}
    </Typography>
  )
})
