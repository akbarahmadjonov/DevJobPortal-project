import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./main.scss";
import { Home } from "./Pages";
import Login from "./Pages/Auth/User/Login";
import Register from "./Pages/Auth/User/Register";
import CompanyLogin from "./Pages/Auth/Company/Login";
import CompanyRegister from "./Pages/Auth/Company/Register";
import { DevProfile } from "./Pages/DevProfile";
import { Jobs } from "./Pages/Jobs/Jobs";
import { CompanyProfile } from "./Pages/CompanyProfile/CompanyProfile";
import { JobsNested } from "./Pages/CompanyProfile/Nested/JobsNested";
import { TimeOffNested } from "./Pages/CompanyProfile/Nested/TimeOffNested";
import { Evaluation } from "./Pages/CompanyProfile/Nested/EvaluationNested";
import { TalentPool } from "./Pages/CompanyProfile/Nested/TalentPool";
import { OpenPaused } from "./Pages/CompanyProfile/Nested/Jobs/OpenPaused/OpenPaused";
import { Archived } from "./Pages/CompanyProfile/Nested/Jobs/Archived/Archived";

const App = () => {
  //Test
  let hours = 5;
  let now = new Date().getTime();
  let setupTime = localStorage.getItem("setupTime");
  if (setupTime == null) {
    localStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", now);
    }
  }

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
          <Route path="/devs-profile" element={<DevProfile />} />
          <Route path="/comprofile" element={<CompanyProfile />}>
            <Route index element={<JobsNested />} />
            <Route path="jobs" element={<JobsNested />}>
              <Route index path="openpaused" element={<OpenPaused />} />
              <Route path="archived" element={<Archived />} />
            </Route>
            <Route path="timeoff" element={<TimeOffNested />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="talentpool" element={<TalentPool />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
};

export default App;
