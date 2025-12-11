import { Divider, Stack } from "@mui/material"
import { type JSX } from "react"

import { WebSocketContextProvider } from "../../../app/wsApi"

import { useGetChatsQuery } from "../chatsApiSlice"

import { UserInfo } from "./UserInfo"
import { ChatTitle } from "./ChatTitle/ChatTitle"
import { ChatList } from "./ChatList"
import { Messages } from "./Messages"

import { useSelectedChat } from "./useSelectedChat"

export type ChatProps = {
  userId: string
  userName: string
}

export const Chat = ({ userName, userId }: ChatProps): JSX.Element => {
  const { data: chats } = useGetChatsQuery()
  const { id: selectedChatId } = useSelectedChat() ?? {}

  return (
    <WebSocketContextProvider>
      <Stack width={1} height={1} flexDirection={"row"}>
        <Stack height={1}>
          <UserInfo name={userName} />
          <Divider />
          {chats && <ChatList chats={chats} />}
        </Stack>
        <Divider orientation={"vertical"} />
        <Stack height={1} flex={1}>
          <ChatTitle />
          <Divider />
          <Stack flex={1} height={1} overflow={"hidden"}>
            {selectedChatId && (
              <Messages
                chatId={selectedChatId}
                userId={userId}
                userName={userName}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </WebSocketContextProvider>
  )
}
