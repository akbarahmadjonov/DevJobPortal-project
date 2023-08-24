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
          navigate("/");
        }, 1000);
      }
      setOpenLoader(false);
    } catch (err) {
      console.log(err);
      setErrorMsg(err?.response?.data?.message);
      setOpenError(true);
      setOpenLoader(false);
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
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      setOpenLoader(false);
    } catch (err) {
      if (err.message !== "Firebase: Error (auth/cancelled-popup-request).") {
        setErrorMsg(err.message);
        setOpenError(true);
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      {/* Backdrop Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Header */}
      {/* <Header /> */}

      {/* Conditionally Render Verification or Login */}
      {verify ? (
        <div className="container max-w-[1728px] mx-auto">
          <Verify />
        </div>
      ) : (
        <div className="w-full h-screen flex">
          {/* Left Side Content */}
          <div className="w-1/4 md:flex bg-[#19378b] p-[50px] relative h-screen hidden flex-col justify-between">
            {/* LeftContent component will be inserted here */}
          </div>

          {/* Right Side Content */}
          <div className="bg-[#2144a5] w-full md:w-3/4">
            {/* RightContent component will be inserted here */}
          </div>
        </div>
      )}

      {/* Success and Error Alerts */}
      {/* Snackbar components will be inserted here */}
    </>
  );
};

export default Login;
