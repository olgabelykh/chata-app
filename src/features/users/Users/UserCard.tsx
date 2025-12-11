import { type JSX } from "react"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

export type UserCardProps = {
  id: string
  name: string
  onClick: (id: string) => void
}

export const UserCard = ({ id, name, onClick }: UserCardProps): JSX.Element => {
  return (
    <Card
      sx={{
        width: 200,
        aspectRatio: "3 / 4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box display={"flex"} flex={1} width={1} p={2} justifyContent={"center"}>
        <CardMedia
          sx={{
            width: "70%",
            aspectRatio: "1 / 1",
            backgroundSize: "contain",
          }}
          image={`https://avatar.iran.liara.run/public/boy?username=${name}`}
          title={name}
        />
      </Box>
      <CardContent>
        <Typography
          textAlign={"center"}
          gutterBottom
          variant="h6"
          component="div"
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            onClick(id)
          }}
          size="small"
        >
          Выбрать
        </Button>
      </CardActions>
    </Card>
  )
}
