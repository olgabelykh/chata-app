import { useGetUsersQuery } from "./usersApiSlice"
import { useAppSelector } from "../../app/hooks"
import { selectSelected } from "./usersSlice"

export const useSelectedUser = () => {
  const selected = useAppSelector(selectSelected)

  const { data: user } = useGetUsersQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.find(u => u.id === selected),
      ...rest,
    }),
  })

  return user
}
