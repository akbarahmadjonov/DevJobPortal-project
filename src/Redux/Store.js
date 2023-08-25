import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import Apps from "./AppSlice";
import { userReducer } from "./UserSlice";
import { homeReducer } from "./HomeSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userReducer,
    home: homeReducer,
    Apps,
  },
});
