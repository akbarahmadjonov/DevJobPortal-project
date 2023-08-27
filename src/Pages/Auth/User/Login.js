import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import Logo from "../../../Assets/Images/SuperCoderLogoForDeveloper.svg";
import mainImg from "../../../Assets/Images/authenticate-img.svg";
import backImg from "../../../Assets/Icons/back.svg";
import eyeIcon from "../../../Assets/Icons/eye.png";
import GoogleIcon from "../../../Assets/Icons/GoogleIcon.svg";
import axios from "axios";
import { Link as LinkDom, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../Components/Firebase";

import Verify from "../../../Components/Authentification/Verify";
import Header from "../../../Widgets/Header/Header";
import { Footer } from "../../../Widgets";
import { RightContent } from "./RightSide/RightContent";
import { LeftContent } from "./LeftSide/LeftContent";
import { useEffect } from "react";

const apiUrl = process.env.URL || "https://job-px4t.onrender.com/api";

const Login = () => {
  // State Hooks
  const [openLoader, setOpenLoader] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Success!");
  const [errorMsg, setErrorMsg] = useState("Unexpected Error!");
  const [subValue, setSubValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [forgotPassword, setForgotPassword] = useState(false);
  const verify = JSON.parse(localStorage.getItem("verify")) || false;

  // Other Hooks
  const navigate = useNavigate();

  // LogIn Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password")) {
      setOpenLoader(true);
      try {
        const res = await axios.post(apiUrl + "/user/login", data);
        const token = res?.data?.token;
        if (token) {
          setSuccessMsg("Successfully Logged In!");
          setOpenSuccess(true);
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(res?.data?.data));
          localStorage.setItem("verify", JSON.stringify(true));
          setTimeout(() => {
            navigate("/dev-profile");
          }, 1000);
        }
        setOpenLoader(false);
      } catch (err) {
        console.log(err);
        setErrorMsg(err?.message);
        setErrorMsg(err?.response?.data?.message);
        setOpenError(true);
        setOpenLoader(false);
      }
    }
  };

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithGoogle();
      setEmail(result?.user?.email);

      const res = await axios.post(apiUrl + "/user/login", {
        userEmail: result?.user?.email,
      });

      const token = res?.data?.token;
      if (token) {
        setSuccessMsg("Successfully Logged In!");
        setOpenSuccess(true);
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(res?.data?.data));
        localStorage.setItem("verify", JSON.stringify(true));
      }
      setOpenLoader(false);
    } catch (err) {
      if (
        err.message !== "Firebase: Error (auth/cancelled-popup-request)." &&
        err.message !== "Firebase: Error (auth/popup-closed-by-user)."
      ) {
        setErrorMsg(err.message);
        setErrorMsg(err?.response?.data?.message);
        setOpenError(true);
        console.log(err?.message);
      } else {
        console.log(err?.message);
      }
    }
  };
  useEffect(() => {
    if (
      verify &&
      localStorage.getItem("userData") &&
      localStorage.getItem("token")
    ) {
      navigate("/dev-profile");
    }
  }, [verify, navigate]);

  return (
    <>
      {/* Backdrop Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Conditionally Render Verification or Login */}
      {
        <div className="w-full h-screen flex">
          {/* Left Side Content */}
          <LeftContent />
          {/* Right Side Content */}
          <RightContent
            forgotPassword={forgotPassword}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            typeInput={typeInput}
            setTypeInput={setTypeInput}
            handleGoogleClick={handleGoogleClick}
            handleSubmit={handleSubmit}
            navigate={navigate}
            setForgotPassword={setForgotPassword}
          />
        </div>
      }
      {/* Success and Error Alerts */}
      {/* Success Alert */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      {/* Error Alert */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>{" "}
    </>
  );
};

export default Login;
