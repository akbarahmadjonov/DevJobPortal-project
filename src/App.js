import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
// import "./main.scss";
import "./index.css";
import Header from "./Widgets/Header/Header";

const App = () => (
  <>
    <div>
      <Header />
      <Routes>
        <Route path="/auth" element={<Register />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  </>
);

export default App;
