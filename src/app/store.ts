import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { usersApiSlice } from "../features/users/usersApiSlice"
import { usersSlice } from "../features/users/usersSlice"
import { chatsApiSlice } from "../features/chat/chatsApiSlice"
import { chatsSlice } from "../features/chat/chatsSlice"

const rootReducer = combineSlices(
  usersApiSlice,
  chatsApiSlice,
  usersSlice,
  chatsSlice,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat([
        usersApiSlice.middleware,
        chatsApiSlice.middleware,
      ])
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
