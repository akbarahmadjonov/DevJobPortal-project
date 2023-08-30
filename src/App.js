import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./index.css";
import "./main.scss";
import { Home } from "./Pages";
import { CompanyProfile } from "./Pages/CompanyProfile/CompanyProfile";
import { Evaluation } from "./Pages/CompanyProfile/Nested/EvaluationNested";
import { JobsNested } from "./Pages/CompanyProfile/Nested/JobsNested";
import { TalentPool } from "./Pages/CompanyProfile/Nested/TalentPool";
import { TimeOffNested } from "./Pages/CompanyProfile/Nested/TimeOffNested";
import { DevProfile } from "./Pages/DevProfile";
import { Jobs } from "./Pages/Jobs/Jobs";
// Auth

import Login from "./Pages/Auth/User/Login";
import Register from "./Pages/Auth/User/Register";

import CompanyLogin from "./Pages/Auth/Company/Login";
import CompanyRegister from "./Pages/Auth/Company/Register";

// Jobs
import { Archived } from "./Pages/CompanyProfile/Nested/Jobs/Archived/Archived";
import { OpenPaused } from "./Pages/CompanyProfile/Nested/Jobs/OpenPaused/OpenPaused";
// Evaluation
import { Completed } from "./Pages/CompanyProfile/Nested/Evaluation/Completed/Completed";
import { Pending } from "./Pages/CompanyProfile/Nested/Evaluation/Pending/Pending";
// Talentpool
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { All } from "./Pages/CompanyProfile/Nested/TalentPool/All/All";
import { Opened } from "./Pages/CompanyProfile/Nested/TalentPool/Opened/Opened";
import { Proposed } from "./Pages/CompanyProfile/Nested/TalentPool/Proposed/Proposed";
import { Saved } from "./Pages/CompanyProfile/Nested/TalentPool/Saved/Saved";
import { homeActions } from "./Redux/HomeSlice";

// Profile
import { CompanyProfileProvider } from "./context/CompanyProfileContext";
import { Profile } from "./Pages/CompanyProfile/Profile/Profile";
import { userActions } from "./Redux/UserSlice";
import ErrorPage from "./Pages/Error/ErrorPage";
import { JobProvider } from "./context/JobContext";

const App = () => {
  const user = localStorage.getItem("userData");
  const token = localStorage.getItem("token");
  const companyInfo = localStorage.getItem("companyInfo");
  const isLogedCompany = companyInfo && token;
  const navigate = useNavigate();

  //Test
  // let hours = 5;
  // let now = new Date().getTime();
  // let setupTime = localStorage.getItem("setupTime");
  // if (setupTime == null) {
  //   localStorage.setItem("setupTime", now);
  // } else {
  //   if (now - setupTime > hours * 60 * 60 * 1000) {
  //     localStorage.clear();
  //     localStorage.setItem("setupTime", now);
  //   }
  // }

  //Jobs categories as used in two or more pages

  //Can be removed then

  // useEffect(() => {
  //   axios
  //     .get(`${url}/category`)
  //     .then((data) => {
  //       dispatch(homeActions.setJobs(data.data));
  //     })
  //     .catch(() => {
  //       dispatch(homeActions.setHomeError(true));
  //     });
  // }, [userData]);

  useEffect(() => {}, []);

  return (
    <main>
      <div>
        <JobProvider>
          <CompanyProfileProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/company/login" element={<CompanyLogin />} />
              <Route path="/company/register" element={<CompanyRegister />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route
                path={"/dev-profile"}
                element={user ? <DevProfile /> : <Navigate to="/user/login" />}
              />
              <Route
                path="/comprofile"
                element={
                  isLogedCompany ? (
                    <CompanyProfile />
                  ) : (
                    <Navigate to="/company/login" />
                  )
                }
              >
                <Route index element={<JobsNested />} />
                {/* Jobs */}
                <Route path="jobs" element={<JobsNested />}>
                  <Route index path="openpaused" element={<OpenPaused />} />
                  <Route path="archived" element={<Archived />} />
                  {/* Jobs */}
                </Route>
                <Route path="timeoff" element={<TimeOffNested />} />
                {/* Evaluation */}
                <Route path="evaluation" element={<Evaluation />}>
                  <Route index path="pending" element={<Pending />} />
                  <Route path="completed" element={<Completed />} />
                </Route>
                {/* Evaluation */}
                {/* Talentpool */}
                <Route path="talentpool" element={<TalentPool />}>
                  <Route index path="all" element={<All />} />
                  <Route path="saved" element={<Saved />} />
                  <Route path="opened" element={<Opened />} />
                  <Route path="proposed" element={<Proposed />} />
                </Route>
                {/* Talentpool */}
                {/* Profile */}
              </Route>

              <Route
                path="timeoff"
                element={isLogedCompany ? <TimeOffNested /> : <CompanyLogin />}
              />
              {/* Evaluation */}
              <Route
                path="evaluation"
                element={isLogedCompany ? <Evaluation /> : <CompanyLogin />}
              >
                <Route index path="pending" element={<Pending />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              {/* Evaluation */}
              {/* Talentpool */}
              <Route
                path="talentpool"
                element={isLogedCompany ? <TalentPool /> : <CompanyLogin />}
              >
                <Route index path="all" element={<All />} />
                <Route path="saved" element={<Saved />} />
                <Route path="opened" element={<Opened />} />
                <Route path="proposed" element={<Proposed />} />
              </Route>
              {/* Talentpool */}
              {/* Profile */}
              <Route
                path="/profile"
                element={isLogedCompany ? <Profile /> : <CompanyLogin />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </CompanyProfileProvider>
        </JobProvider>
      </div>
    </main>
  );
};

export default App;
