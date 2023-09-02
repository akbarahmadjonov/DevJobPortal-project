import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    user:
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")),

    token: localStorage.getItem("token"),
    userData: null,
    loading: false,
    error: false,
    isSubmitted: localStorage.getItem("isSubmitted"), // can be removed
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userData", JSON.stringify(payload.user));
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.loading = false;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setIsSubmitted: (state, { payload }) => {
      state.isSubmitted = payload; //can be removed
    },
  },
});
