import { type ReactNode, type JSX } from "react"
import { Stack } from "@mui/material"

export const Container = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  return (
    <Stack height={1} p={2} alignItems="center" justifyContent="center">
      {children}
    </Stack>
  )
}
