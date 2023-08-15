import { createSlice } from "@reduxjs/toolkit";
import react from "./../Assets/Images/react.png";
import {
  php,
  python,
  android,
  angular,
  node,
  ruby,
  java,
  c,
  apple,
  flutter,
} from "../important_images";

export const AppSlice = createSlice({
  name: "App",
  initialState: [
    {
      imgLink: react,
      title: "ReactJS",
      selected: false,
    },
    {
      imgLink: node,
      selected: false,
      title: "NodeJS",
    },
    {
      imgLink: python,
      selected: false,
      title: "Python",
    },
    {
      selected: false,
      imgLink: angular,
      title: "Angular",
    },
    {
      imgLink: apple,
      selected: false,
      title: "IOS",
    },
    {
      imgLink: react,
      selected: false,
      title: "ReactNative",
    },
    {
      imgLink: android,
      title: "Android",
      selected: false,
    },
    {
      imgLink: java,
      title: "Java",
      selected: false,
    },
    {
      imgLink: ruby,
      title: "Ruby on Rails",
      selected: false,
    },
    {
      imgLink: c,
      title: "C#",
      selected: false,
    },
    {
      imgLink: flutter,
      title: "Flutter",
      selected: false,
    },
    {
      imgLink: php,
      title: "PHP",
      selected: false,
    },
  ],
  reducers: {
    AddApp: (state, action) => {
      state.push(action.payload);
    },
    ChangeApp: (state, action) => {
      state.map((app) => {
        if (app.title === action.payload.title) {
          app.selected = action.payload.selected;
        }
        return app;
      });
      
    },
    unSelect: (state, action) => {
      state.map((app) => {
        app.selected = action.payload;
        return app;
      });
      console.log(state)
    },
  },
});

export const { AddApp, ChangeApp, unSelect } = AppSlice.actions;
export default AppSlice.reducer;
