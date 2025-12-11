import { Typography } from "@mui/material"

export const UserInfo = ({ name }: { name: string }) => (
  <Typography p={2} textAlign="center" variant="h6" component="div">
    {name}
  </Typography>
)
