import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ChatsSliceState = {
  selected: string | null
}

const initialState: ChatsSliceState = {
  selected: null,
}

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: create => ({
    setSelected: create.reducer((state, action: PayloadAction<string>) => {
      state.selected = action.payload
    }),
    resetSelected: create.reducer(state => {
      state.selected = null
    }),
  }),
  selectors: {
    selectSelected: chats => chats.selected,
  },
})

export const { setSelected, resetSelected } = chatsSlice.actions

export const { selectSelected } = chatsSlice.selectors
