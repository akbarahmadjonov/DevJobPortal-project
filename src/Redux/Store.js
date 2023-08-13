import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import Apps from "./AppSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
    Apps,
  },
});
