import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import "./index.css";
import "./main.scss";
import { Home } from "./Pages";
import { Jobs } from "./Pages/Jobs/Jobs";

const App = () => {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
