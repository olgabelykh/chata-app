import { useGetChatsQuery } from "../chatsApiSlice"
import { useAppSelector } from "../../../app/hooks"
import { selectSelected } from "../chatsSlice"

export const useSelectedChat = () => {
  const selectedId = useAppSelector(selectSelected)

  const { data: chat } = useGetChatsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      data: data?.find(u => u.id === selectedId),
      ...rest,
    }),
  })

  return chat
}
