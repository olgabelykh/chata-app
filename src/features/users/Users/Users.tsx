import { Stack, Typography } from "@mui/material"

import { useAppDispatch } from "../../../app/hooks"
import { Container } from "../../../shared/ui/Container"

import { setSelected } from "../usersSlice"
import { useGetUsersQuery } from "../usersApiSlice"
import { UserCard } from "./UserCard"

export const Users = () => {
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery()
  const dispatch = useAppDispatch()

  if (isError) {
    return (
      <Container>
        <Typography>Что-то пошло не так...</Typography>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container>
        <Typography>Загружаем...</Typography>
      </Container>
    )
  }

  const onClick = (userId: string) => {
    dispatch(setSelected(userId))
  }
  if (isSuccess) {
    return (
      <Stack
        p={4}
        alignItems="center"
        justifyContent="center"
        height={1}
        overflow="hidden"
        gap={4}
      >
        <Typography variant="h6" component="div">
          Выберите пользователя
        </Typography>
        <Stack
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          p={4}
          gap={2}
          overflow="auto"
          flexWrap="wrap"
        >
          {data.map(user => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              onClick={onClick}
            />
          ))}
        </Stack>
      </Stack>
    )
  }

  return null
}
