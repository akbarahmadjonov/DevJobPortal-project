import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./main.scss";
import { Home } from "./Pages";
import Login from "./Pages/Auth/User/Login";
import Register from "./Pages/Auth/User/Register";
import { Jobs } from "./Pages/Jobs/Jobs";
import CompanyLogin from "./Pages/Auth/Company/Login";
import CompanyRegister from "./Pages/Auth/Company/Register";

const App = () => {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
