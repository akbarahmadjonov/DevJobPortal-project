import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../../Components/Firebase";
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
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [createNewPass, setCreateNewPass] = useState(false);
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
  // Google Auth
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
      setTimeout(() => {
        navigate("/dev-profile");
      }, 1000);
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
  // async function handleGoogleClick() {
  //   try {
  //     const result = await signInWithGoogle();
  //     setEmail(result?.user?.email);

  //     const res = await axios.post(apiUrl + "/user/login", {
  //       userEmail: result?.user?.email,
  //     });

  //     const token = res?.data?.token;
  //     if (token) {
  //       setSuccessMsg("Successfully Logged In!");
  //       setOpenSuccess(true);
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("userData", JSON.stringify(res?.data?.data));
  //       localStorage.setItem("verify", JSON.stringify(true));
  //       setTimeout(() => {
  //         navigate('/dev-profile')
  //       }, 1000);
  //     }
  //     setOpenLoader(false);
  //   } catch (err) {
  //     handleSignInError(err);
  //   }
  // }

  // function handleSignInError(err) {
  //   if (
  //     err.message !== "Firebase: Error (auth/cancelled-popup-request)." &&
  //     err.message !== "Firebase: Error (auth/popup-closed-by-user)."
  //   ) {
  //     setErrorMsg(err.message || err?.response?.data?.message);
  //     setOpenError(true);
  //     console.log(err?.message);
  //   } else {
  //     console.log(err?.message);
  //   }
  // }
  // Reset Function
  const handleReset = (e) => {
    e.preventDefault();
    setOpenLoader(true);
    const data = new FormData(e.currentTarget);
    axios
      .post(apiUrl + "/forgetPass", data)
      .then((res) => {
        const message = res?.data?.message;
        if (message === "Confirmation code sent to the email") {
          setSuccessMsg(message);
          setOpenSuccess(true);
          setShowConfirmationCode(true);
        }
        if (message === "ok") {
          setSuccessMsg("Email verified!");
          setOpenSuccess(true);
          setCreateNewPass(true);
        }
        if (message === "Password updated") {
          setSuccessMsg(message);
          setOpenSuccess(true);
          setShowConfirmationCode(false);
          setCreateNewPass(false);
          setForgotPassword(false);
          setTimeout(() => {
            navigate("/user/login");
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err?.message);
        setErrorMsg(err?.message);
        setErrorMsg(err?.response?.data?.message);
        setOpenError(true);
        setOpenLoader(false);
      })
      .finally(() => {
        setOpenLoader(false);
      });
  };

  // Checking if the user is authenticated
  // useEffect(() => {
  //   if (
  //     verify &&
  //     localStorage.getItem("userData") &&
  //     localStorage.getItem("token")
  //   ) {
  //     navigate("/dev-profile");
  //   }
  // }, []);

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
            setCreateNewPass={setCreateNewPass}
            createNewPass={createNewPass}
            password={password}
            setPassword={setPassword}
            typeInput={typeInput}
            setTypeInput={setTypeInput}
            handleGoogleClick={handleGoogleClick}
            showConfirmationCode={showConfirmationCode}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
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
