import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.scss";
import { FloatButton } from "antd";
import { Provider } from "react-redux";
import store from './Redux/Store'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    <div>
      <FloatButton.BackTop type="primary"/>
    </div>
  </BrowserRouter>
);
