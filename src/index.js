import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.scss";
import { BackTop } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
    <div>
      <BackTop  />
    </div>
  </BrowserRouter>
);
