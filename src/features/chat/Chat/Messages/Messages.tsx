import { useRef } from "react"
import { Stack, Box } from "@mui/material"
import { blue } from "@mui/material/colors"

import {
  Scrollable,
  type ScrollableRefType,
} from "../../../../shared/ui/Scrollable"

import { MessageForm } from "./MessageForm"
import { useGetMessagesQuery } from "../../chatsApiSlice"
import { Message } from "./Message"

const bgColor = blue[100]

export type MessagesProps = {
  chatId: string
  userId: string
  userName: string
}

export const Messages = ({ chatId, userId, userName }: MessagesProps) => {
  const scrollableRef = useRef<ScrollableRefType>(null)
  const scrollToBottom = () => scrollableRef.current?.scrollToBottom()

  const { data, isError, isLoading, isSuccess } = useGetMessagesQuery(chatId)

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess) {
    return (
      <Stack sx={{ height: 1, flex: 1 }}>
        <Box sx={{ height: 1, overflow: "hidden", backgroundColor: bgColor }}>
          <Scrollable scrollableRef={scrollableRef}>
            <Stack sx={{ minHeight: 1 }} p={2} gap={1}>
              {data.map(message => (
                <Message
                  key={message.id}
                  message={message}
                  isUserMessage={message.userId === userId}
                />
              ))}
            </Stack>
          </Scrollable>
        </Box>
        <MessageForm
          userId={userId}
          userName={userName}
          chatId={chatId}
          onSubmit={scrollToBottom}
        />
      </Stack>
    )
  }
  return null
}
