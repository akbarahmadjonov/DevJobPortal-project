import { createSlice } from "@reduxjs/toolkit";

export const { actions: DevActions, reducer: DevReducer } = createSlice({
  name: "developer",
  initialState: {
    menu: false,
    appliedJobs: null
  },
  reducers: {
    setMenu: (state, { payload }) => {
      state.menu = payload;
    },
    setAppliedJobs: (state, {payload}) => {
      state.appliedJobs = payload
    }
  },
});
