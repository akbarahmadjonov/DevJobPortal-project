import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    user:
      localStorage.getItem("userData") &&
      JSON.parse(localStorage.getItem("userData")),
    token:
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWRhZDU3NTliNTExYTA4OTgxMzRjYSIsImlhdCI6MTY5MzI5ODAwN30.MTw3zzHAdVTl3bYwKhg_3I5SCy7Obtusg9JhbTA9Z3c",
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("userData", JSON.stringify(payload.user));
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.loading = false;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});
