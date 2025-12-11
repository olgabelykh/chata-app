import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

export type UsersSliceState = {
  selected: string | null
}

const initialState: UsersSliceState = {
  selected: null,
}

export const usersSlice = createSlice({
  name: "users",
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
    selectSelected: users => users.selected,
  },
})

export const { setSelected, resetSelected } = usersSlice.actions

export const { selectSelected } = usersSlice.selectors
