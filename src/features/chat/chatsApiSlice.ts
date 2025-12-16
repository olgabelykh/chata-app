import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { wsApi } from "../../app/wsApi"
import type { Message, Chat } from "../../entities/chats"

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
    sendMessage: build.mutation<Message, Message>({
      async queryFn(message: Message) {
        const data = await wsApi.sendMessage(message)
        return { data }
      },
      async onQueryStarted(patch, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          chatsApiSlice.util.updateQueryData(
            "getMessages",
            patch.chatId,
            draft => {
              draft.push(patch)
            },
          ),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const { useGetChatsQuery, useGetMessagesQuery, useSendMessageMutation } =
  chatsApiSlice
