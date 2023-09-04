import { createSlice } from "@reduxjs/toolkit";

export const { actions: DevActions, reducer: DevReducer } = createSlice({
  name: "developer",
  initialState: {
    menu: false,
  },
  reducers: {
    setMenu: (state, { payload }) => {
      state.menu = payload;
    },
  },
});
