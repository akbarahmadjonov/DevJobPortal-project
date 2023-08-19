import { React, useRef, useState } from "react";
import hBg from "./../../../Assets/Images/Header bg.png";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, Link as LinkDom } from "react-router-dom";
import Logo from "./../../../Assets/Images/SuperCoderLogoForDeveloper.svg";
import mainImg from "../../../Assets/Images/authenticate-img.svg";

import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
} from "@mui/material";
import Header from "../../../Widgets/Header/Header";
import { Footer } from "../../../Widgets";
import axios from "axios";
import { auth, signInWithGoole } from "../../../Components/Firebase";

export default function Register() {
  const privacy_check = useRef(false);
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("This is a success message!");
  const [errorMsg, setErrorMsg] = useState("This is a error message!");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userImg, setUserImg] = useState("");
  const url = "https://job-px4t.onrender.com/api";
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    signInWithGoole()
      .then((result) => {
        setEmail();
        setUserImg(result?.user?.photoURL);
        axios.post(url + "/user", {
          fullName: result?.user?.displayName,
          userEmail: result?.user?.email,
          password: "googlestatic123password",
        });
        console.log(result.user.auth);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenLoader(true);
    await axios
      .post(url + "/user", data)
      .then((res) => {
        const token = res?.data?.token;
        const msg = res?.data?.message;
        if (msg === "Confirmation code sent to the email") {
          setSuccessMsg(msg);
          setOpenSuccess(true);
          setShowConfirmationCode(true);
        }
        if (token) {
          setSuccessMsg("Successfully Signed Up!");
          setOpenSuccess(true);
          setShowConfirmationCode(false);
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(res?.data?.data));
          localStorage.setItem("verify", JSON.stringify(true));
          setTimeout(() => {
            navigate("/user/login");
          }, 1000);
        }
        setOpenLoader(false);
      })
      .catch((err) => {
        console.log(err);
        const unexpectedError = err?.message;
        const serverError = err?.response?.data?.message;
        if (unexpectedError) {
          setErrorMsg(unexpectedError);
        }
        if (serverError) {
          setErrorMsg(serverError);
        }
        setOpenError(true);
        setOpenLoader(false);
      });
  };
  return (
    <>
      {/* Backdrop - Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main sect  */}
      <div className="w-full h-screen flex">
        <div className="w-1/4 md:flex bg-[#19378b] p-[50px] relative h-screen hidden flex-col justify-between">
          <div className="w-full  text-white">
            <img
              src={Logo}
              width={70}
              height={41}
              className="mb-[60px]"
              alt="site-logo"
            />
            <h2 className="mb-[25px] leading-tight text-[22px] font-bold ">
              Upgrade your life with a global tech HR platform
            </h2>
            <p className="tracking-tight leading-tight">
              Access to a wide range of remote jobs, allowing for a better
              work-life balance, increased productivity, and reduced stress
              levels. Join today and start experiencing the benefits of remote
              work.
            </p>
          </div>
          <img
            src={mainImg}
            alt="creative_image"
            className="w-[420px] absolute bottom-[75px] h-[305px]"
          />
        </div>
        <div className="bg-[#2144a5] w-full md:w-3/4">
          {/* Main Register Card */}
          <main className="relative w-full">
            <div className="flex absolute top-[106px] rounded-md right-[276px] flex-col z-40 space-y-[40px] items-center px-[40px] w-[612px] min-h-[637px]  bg-white">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  pb: "74px",
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  className="font-semibold text-black text-[24px]"
                >
                  Sign Up
                </Typography>
                <Typography
                  component="h6"
                  variant="h6"
                  className="text-[#999] text-[16px] font-normal"
                >
                  Wow! You meade a great choice
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        size="small"
                        name="fullName"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        size="small"
                        name="userName"
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="userEmail"
                        size="small"
                        label="Email Address"
                        name="userEmail"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        size="small"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    {showConfirmationCode ? (
                      <Grid item xs={12}>
                        <TextField
                          required
                        size="small"
                          fullWidth
                          name="confirmationCode"
                          label="Confirmation Code"
                          type="number"
                          id="confirmationCode"
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    <Grid item xs={12}>
                      <label
                        htmlFor="checkbox"
                        className="flex space-x-4 text-[20px] items-center mt-[49px]"
                      >
                        <input
                          type="checkbox"
                          ref={privacy_check}
                          className="h-[20px] w-[20px]"
                        />
                        <p
                          onClick={() => {
                            privacy_check.current.checked =
                              !privacy_check.current.checked;
                          }}
                        >
                          I accept the terms of service and privacy policy
                        </p>
                      </label>
                    </Grid>
                  </Grid>
                  <div className="flex flex-col pt-[30px] items-center justify-between w-full space-y-4">
                    <button
                      type="submit"
                      className=" w-full py-[23px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-md "
                    >
                      Sign up
                    </button>
                    <span className="text-[#999999] text-[16px]">OR</span>
                    <button
                      type="button"
                      className=" w-full py-[23px] transition-all bg-[#F65050] font-normal active:bg-red-600 hover:bg-red-400 text-[16px] text-white rounded-md "
                      onClick={handleGoogleClick}
                    >
                      Sign Up Using Google
                    </button>
                  </div>
                  <Grid container justifyContent="center" pt={"20px"}>
                    <Grid item>
                      <Link variant="body2">
                        <LinkDom to={"/user/login"}>
                          Already have an account? Sign in
                        </LinkDom>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          </main>
        </div>
      </div>
      {/* Error Alert */}
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
      {/* Success Alert */}
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
      </Snackbar>
    </>
  );
}
