import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate, Link as LinkDom } from "react-router-dom";
import GoogleIcon from "../../../Assets/Icons/GoogleIcon.svg";
import eyeIcon from "../../../Assets/Icons/eye.png";
import closeEye from "../../../Assets/Icons/close eye.png";
import Logo from "./../../../Assets/Images/SuperCoderLogoForDeveloper.svg";
import checkIcon from "../../../Assets/Icons/check.png";
import crossIcon from "../../../Assets/Icons/cross.png";
import mainImg from "../../../Assets/Images/authenticate-img.svg";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Link,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { signInWithGoogle } from "../../../Components/Firebase";

const url = "https://job-px4t.onrender.com/api";

const initialState = {
  typeInput: "password",
  lastName: "",
  firstName: "",
  password: "",
  email: "",
  userImg: "",
  disabled: true,
  focusedName: false,
  focusedEmail: false,
  focusedPass: false,
  validPassword: false,
  validEmail: false,
  validFirstName: false,
  check1: false,
  check2: false,
  check3: false,
  check4: false,
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Success!");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Error!");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Perform validation checks
    const lengthValid = password.length >= 10;
    const lowercaseValid = /[a-z]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const digitValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*()_+[\]{};':"\\|,.<>?/~-]/.test(
      password
    );

    // Update state with validation results
    setState({
      ...state,
      check1: lengthValid,
      check2: digitValid,
      check3: lowercaseValid && uppercaseValid,
      check4: specialCharValid,
    });
    setValidPassword(
      lengthValid &&
        lowercaseValid &&
        uppercaseValid &&
        digitValid &&
        specialCharValid
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const nameLength = name.length >= 3 && name.length <= 25;
    return nameRegex.test(name) && nameLength;
  };

  const handleFirstNameChange = (event) => {
    const newFirstName = event.target.value;
    setState({
      ...state,
      firstName: newFirstName,
      validFirstName: isValidName(newFirstName),
    });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleGoogleClick = async () => {
    try {
      const result = await signInWithGoogle();
      const { user } = result;

      setState({
        ...state,
        email: user?.email || "",
        userImg: user?.photoURL || "",
      });

      const data = new FormData();
      data.append("fullName", user?.displayName);
      data.append("userEmail", user?.email);

      const response = await axios.post(url + "/user", data);
      const token = response?.data?.token;
      const message = response?.data?.message;

      if (message === "Confirmation code sent to the email") {
        setSuccessMsg(message);
        setOpenSuccess(true);
        setShowConfirmationCode(true);
      }

      if (token) {
        setSuccessMsg("Successfully Signed Up!");
        setOpenSuccess(true);
        setShowConfirmationCode(false);

        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        localStorage.setItem("verify", JSON.stringify(true));

        setTimeout(() => {
          navigate("/dev-profile");
          window.location.reload();
        }, 1000);
      }

      setOpenLoader(false);
    } catch (error) {
      const unexpectedError = error?.message;
      const serverError = error?.response?.data?.message;
      if (
        error.message !== "Firebase: Error (auth/cancelled-popup-request)." &&
        error.message !== "Firebase: Error (auth/popup-closed-by-user)."
      ) {
        console.log(error?.message);
        if (unexpectedError) {
          setErrorMsg(unexpectedError);
        }

        if (serverError) {
          setErrorMsg(serverError);
        }
        setOpenError(true);
        setOpenLoader(false);
      } else {
        console.log(error?.message);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setOpenLoader(true);
      const data = new FormData(event.currentTarget);
      const firstName = data.get("firstName");
      const lastName = data.get("lastName");
      const fullName = `${lastName} ${firstName}`;
      data.append("fullName", fullName);

      const response = await axios.post(url + "/user", data);
      const token = response?.data?.token;
      const message = response?.data?.message;

      if (message === "Confirmation code sent to the email") {
        setSuccessMsg(message);
        setOpenSuccess(true);
        setShowConfirmationCode(true);
      }

      if (token) {
        setSuccessMsg("Successfully Signed Up!");
        setOpenSuccess(true);
        setShowConfirmationCode(false);
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        localStorage.setItem("verify", JSON.stringify(true));

        setTimeout(() => {
          navigate("/dev-profile");
          window.location.reload();
        }, 1000);
      }
      setOpenLoader(false);
    } catch (error) {
      console.log(error);

      const unexpectedError = error?.message;
      const serverError = error?.response?.data?.message;

      if (unexpectedError) {
        setErrorMsg(unexpectedError);
      }

      if (serverError) {
        setErrorMsg(serverError);
      }
      setOpenError(true);
      setOpenLoader(false);
    }
  };
  useEffect(() => {
    const { validEmail, validFirstName } = state;
    setState({
      ...state,
      disabled: !(validEmail && validPassword && validFirstName),
    });
  }, [
    password,
    validPassword,
    state.firstName,
    state.validEmail,
    state.validFirstName,
    state,
  ]);

  return (
    <>
      {/* Backdrop - Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Main sect */}
      <div className="w-full h-screen flex">
        {/* Left side */}
        <div className="w-1/4 md:flex bg-[#19378b] p-[50px] relative h-screen hidden flex-col justify-between">
          <div className="w-full text-white">
            <img
              src={Logo}
              width={70}
              height={41}
              className="mb-[60px] cursor-pointer"
              onClick={() => navigate("/")}
              alt="site-logo"
            />
            <h2 className="mb-[25px] leading-tight text-[22px] font-bold">
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

        {/* Right side */}
        <div className="bg-[#2144a5] w-full md:w-3/4">
          {/* Main Register Card */}
          <main className="relative w-full h-screen flex items-center justify-center">
            <div className="flex rounded-md flex-col z-40 items-center px-[10px] transition-all duration-150 md:px-[30px] pb-[15px] pt-[40px] w-5/6 md:w-1/2 bg-white">
              <Typography
                component="h1"
                variant="h5"
                className="mx-auto w-full text-center text-black"
                sx={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}
              >
                Sign up as a developer
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                marginBottom={""}
                sx={{ fontSize: "14px" }}
                className="text-[#000] font-normal max-[360px]:hidden flex text-center "
              >
                Sign up with your Google account or use the form
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Button
                  onClick={handleGoogleClick}
                  className="flex w-full items-center  justify-center space-x-2 bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 outline-none"
                >
                  <img
                    src={GoogleIcon}
                    alt="GoogleIcon"
                    width={25}
                    height={25}
                  />
                  <span className="max-[360px]:hidden flex text-[12px] transition-all duration-150 sm:text-[16px]">
                    Continue with Google
                  </span>
                </Button>
                <div className="w-full flex items-center justify-between my-[10px]">
                  <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                  <span className="text-blue-300 text-[16px]">or</span>
                  <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                </div>
                {/* Rest of the form inputs */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="first-name"
                      size="small"
                      name="firstName"
                      required
                      fullWidth
                      error={
                        state.focusedName
                          ? state.validFirstName
                            ? false
                            : true
                          : false
                      }
                      id="firstName"
                      onFocus={() => setState({ ...state, focusedName: true })}
                      value={state.firstName}
                      onChange={handleFirstNameChange}
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      size="small"
                      name="lastName"
                      value={state.lastName}
                      onChange={(e) =>
                        setState({ ...state, lastName: e.target.value })
                      }
                      autoComplete="last-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="userEmail"
                      size="small"
                      label="Email Address"
                      error={
                        state.focusedEmail
                          ? isValidEmail(state.email)
                            ? false
                            : true
                          : false
                      }
                      value={state.email}
                      onFocus={() => setState({ ...state, focusedEmail: true })}
                      onChange={(e) => {
                        setState({
                          ...state,
                          validEmail: isValidEmail(e.target.value),
                          email: e.target.value,
                        });
                      }}
                      name="userEmail"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item sx={{ position: "relative" }} xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      size="small"
                      onFocus={() => setState({ ...state, focusedPass: true })}
                      label="Password"
                      type={state?.typeInput}
                      id="password"
                      onChange={handlePasswordChange}
                      value={password}
                      autoComplete="new-password"
                      error={
                        state.focusedPass
                          ? validPassword
                            ? false
                            : true
                          : false
                      }
                    />
                    <img
                      width={17}
                      className={`absolute cursor-pointer right-[10px] top-[30px] `}
                      onClick={() => {
                        if (state.typeInput === "password") {
                          setState({ ...state, typeInput: "text" });
                        } else {
                          setState({ ...state, typeInput: "password" });
                        }
                      }}
                      height={17}
                      src={state.typeInput === "password" ? eyeIcon : closeEye}
                      alt="toggle input type"
                    />

                    <ul
                      className={`transition-all ${
                        state.focusedPass
                          ? "translate-y-1 flex flex-col"
                          : "h-0 w-0 opacity-0"
                      } duration-500 items-start justify-start text-[14px] mt-[10px]`}
                    >
                      <li className="flex space-x-2 items-center justify-center">
                        <img
                          src={state.check1 ? checkIcon : crossIcon}
                          width={15}
                          height={15}
                          alt="check-cross-icon"
                        />
                        <span>a minimum of 10 characters</span>
                      </li>
                      <li className="flex space-x-2 items-center justify-center">
                        <img
                          src={state.check2 ? checkIcon : crossIcon}
                          width={15}
                          height={15}
                          alt="check-cross-icon"
                        />
                        <span>a number</span>
                      </li>
                      <li className="flex space-x-2 items-center justify-center">
                        <img
                          src={state.check3 ? checkIcon : crossIcon}
                          width={15}
                          height={15}
                          alt="check-cross-icon"
                        />
                        <span>uppercase and lowercase letters</span>
                      </li>
                      <li className="flex items-center space-x-2 justify-center">
                        <img
                          src={state.check4 ? checkIcon : crossIcon}
                          width={15}
                          height={15}
                          alt="check-cross-icon"
                        />
                        <span>a special character</span>
                      </li>
                    </ul>
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
                </Grid>
                <Grid
                  xs={12}
                  className="transition-all flex items-center justify-center duration-150 max-[360px]:mt-[40px] md:mt-[52px]"
                >
                  <Button
                    disabled={state.disabled}
                    type="submit"
                    variant="contained"
                    size={window.innerWidth > 516 ? "medium" : "small"}
                    className="w-full w mx-auto z-50 transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[14px] md:text-[16px] text-white rounded-md "
                  >
                    Create Your Supercoder Account
                  </Button>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  pt={3} // You can adjust the padding value as needed
                >
                  <Grid item>
                    <span className="text-[#989898] tracking-tighter font-semibold">
                      By confirming your email, you agree to our
                    </span>
                    <a
                      href="#!"
                      className="text-[blue] tracking-tighter font-semibold"
                    >
                      {"  "}
                      Terms of Service
                    </a>
                  </Grid>
                  <Grid item>
                    <span className="text-[#989898] tracking-tighter font-semibold">
                      and that you have read and understood our
                    </span>
                    <a
                      href="#!"
                      className="text-[blue] tracking-tighter font-semibold"
                    >
                      {"  "}
                      Privacy Policy
                    </a>
                  </Grid>
                  <Grid item sx={{ mt: "15px" }} className="tracking-tighter">
                    Already have an account?
                    <Link variant="body2">
                      <LinkDom to={"/user/login"}> Sign in</LinkDom>
                    </Link>
                  </Grid>
                </Grid>
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
