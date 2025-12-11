import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { v4 as uuid } from "uuid"

import { wsApi } from "../../app/wsApi"
import type { Message, NewMessage, Chat } from "../../entities/chats"

const CHAT_URL = "http://localhost:3030/"

type ChatsApiResponse = Chat[]
type MessagesApiResponse = Message[]

export const chatsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: CHAT_URL }),
  reducerPath: "chatsApi",
  endpoints: build => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getChats: build.query<ChatsApiResponse, void>({
      query: () => "chats",
      async onCacheEntryAdded(_, api) {
        try {
          await api.cacheDataLoaded
          wsApi.open()
          await api.cacheEntryRemoved
          wsApi.close()
        } catch (error) {
          console.error(error)
        }
      },
    }),
    getMessages: build.query<MessagesApiResponse, string>({
      query: chatId => `chats/${chatId}/messages`,
      async onCacheEntryAdded(_, api) {
        try {
          await api.cacheDataLoaded
          wsApi.onMessage(message => {
            if (message) {
              api.updateCachedData(draft => {
                draft.push(message)
              })
            }
          })
        } catch (error) {
          console.error(error)
        }
      },
    }),
    sendMessage: build.mutation<Partial<Message> | string, NewMessage>({
      queryFn(message: NewMessage) {
        const success = wsApi.sendMessage(message)

        if (success) {
          return { data: { ...message, id: uuid(), views: [] } }
        }

        return { data: "erorr" }
      },
    }),
  }),
})

export const { useGetChatsQuery, useGetMessagesQuery, useSendMessageMutation } =
  chatsApiSlice
