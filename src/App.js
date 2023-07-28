import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
// import "./main.scss";
import "./index.css";
import Header from "./Widgets/Header/Header";
import { Jobs } from "./Pages/Jobs/Jobs";

const App = () => (
  <>
    <main>
      <div>
        <Header />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>
    </main>
  </>
);

export default App;
