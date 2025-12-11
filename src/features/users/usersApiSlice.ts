import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { type User } from "../../entities/users"

type UsersApiResponse = User[]

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  reducerPath: "usersApi",
  endpoints: build => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    getUsers: build.query<UsersApiResponse, void>({
      query: () => "users",
    }),
  }),
})

export const { useGetUsersQuery } = usersApiSlice
