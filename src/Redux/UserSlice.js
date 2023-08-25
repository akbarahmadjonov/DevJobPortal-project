import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    user:
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")),
    token:
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZThhOTI1ZWEwMzE3ODczODQxYmM1YSIsImlhdCI6MTY5Mjk2OTI1M30.pKPg9cJqq8ma6Yz7dLvtcoznphVDWVbHQ0TOl42b2Ew",
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
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
