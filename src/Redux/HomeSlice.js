import { createSlice } from "@reduxjs/toolkit";

export const { actions: homeActions, reducer: homeReducer } = createSlice({
  name: "home",
  initialState: {
    jobs: null,
    homeLoading: false,
    homeError: null,
  },
  reducers: {
    setJobs: (state, { payload }) => {
      state.jobs = payload;
      state.homeLoading = false;
    },
    setHomeLoading: (state, { payload }) => {
      state.homeLoading = payload;
    },
    setHomeError: (state, { payload }) => {
      state.homeError = payload;
      state.homeLoading = false;
    },
  },
});
