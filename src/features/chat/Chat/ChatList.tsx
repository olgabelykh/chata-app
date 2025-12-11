import { List, ListItem, ListItemButton, ListItemText } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"

import { setSelected, selectSelected } from "../chatsSlice"

export const ChatList = ({
  chats,
}: {
  chats: { id: string; name: string }[]
}) => {
  const dispatch = useAppDispatch()

  const selected = useAppSelector(selectSelected)

  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {chats.map(chat => (
          <ListItem key={chat.id} disablePadding>
            <ListItemButton
              selected={selected === chat.id}
              onClick={() => {
                dispatch(setSelected(chat.id))
              }}
            >
              <ListItemText primary={chat.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
