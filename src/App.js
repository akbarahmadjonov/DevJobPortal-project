import React from "react";
import { Routes, Route, Link, Router, Outlet } from "react-router-dom";
import Login from "./Pages/Login";

const App = () => (
  <>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/about">Контакты</Link>
          </li>
          <li>
            <Link to="/about/oi">Yes</Link>
          </li>
          <li>
            <Link to="/users">Пользователи</Link>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/about"
          element={
            <div>
              <h2>Контакты</h2>
              <div>
                <Outlet />
              </div>
            </div>
          }
        >
          <Route path="oi" element={<h1>Hello nooooooo</h1>} />
        </Route>
        <Route path="/users" element={<h2>Пользователи</h2>} />
      </Routes>
    </main>
  </>
);

export default App;
