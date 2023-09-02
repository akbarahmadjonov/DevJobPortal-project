import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  FormHelperText,
  Grid,
  Input,
  LinearProgress,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import checkIcon from "../../../Assets/Icons/check.png";
import crossIcon from "../../../Assets/Icons/cross.png";
import closeEye from "../../../Assets/Icons/close eye.png";
import successImg from "../../../Assets/Images/check-your-inbox.png";
import SuperCoderLogo from "./../../../Assets/Images/SuperCoderLogo.svg";
import eyeIcon from "../../../Assets/Icons/eye.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backImg from "../../../Assets/Icons/back.svg";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

export default function CompanyLogin() {
  const [typeInput, setTypeInput] = useState("password");
  const [openAlertNotification, setOpenAlertNotification] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("error");
  const [colorE, setColorE] = useState("error");
  const [forgotEmail, setForgotEmail] = useState(false);
  const [errorInp, setErrorInp] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [disabled, setDisabled] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emailValidation = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const passwordValidation = /^.{6,25}$/;
  const url = "https://job-px4t.onrender.com/api";
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Successfull Log In!");
  const [errorMsg, setErrorMsg] = useState("Unexpected Error!");
  const [reset, setReset] = useState(false);
  const [resetBtnLoading, setResetBtnLoading] = useState(false);
  //
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [colorPass, setColorPass] = useState("primary");
  const [createNewPass, setCreateNewPass] = useState(false);
  const [passwordIndividualCheck, setPasswordIndividualCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 242,
    borderRadius: "15px",
    p: 4,
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    setResetBtnLoading(true);
    const data = new FormData(e.target);
    axios
      .post(url + "/recruiter/login", data)
      .then((res) => {
        setResetBtnLoading(false);
        localStorage.clear();
        localStorage.setItem("verify", JSON.stringify(false));
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("companyInfo", JSON.stringify(res?.data?.data));
        navigate("/comprofile");
        setSuccessMsg("Successfull Log In");
        setOpenSuccess(true);
        window.location.reload();
      })
      .catch((err) => {
        setResetBtnLoading(false);
        console.log(err);
        setErrorMsg(err?.message);
        setErrorMsg(err?.response?.data?.message);
        setOpenError(true);
        setErrorInp(true);
      });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    // setOpenAlertNotification(true);
    setResetBtnLoading(true);
    const data = new FormData(e.currentTarget);
    if (emailValidation.test(email)) {
      await axios
        .post(url + "/recruiter/forget", data)
        .then((res) => {
          const msg = res?.data?.message;
          setResetBtnLoading(false);
          console.log(res);
          if (msg?.includes("Confirmation code sent to the email!")) {
            setShowConfirmationCode(true);
            setSuccessMsg(msg);
            setOpenSuccess(true);
          }
          if (msg?.includes("ok")) {
            setCreateNewPass(true);
            setSuccessMsg("Email successfully verified!");
            setOpenSuccess(true);
          }
          if (msg === "Password updated") {
            setSuccessMsg(msg + " Successfully!");
            setOpenSuccess(true);
            setTimeout(() => {
              setForgotEmail(false);
              setShowConfirmationCode(false);
              setCreateNewPass(false);
              navigate("/company/login");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMsg(error.message);
          setErrorMsg(error?.response?.data?.message);
          setOpenError(true);
          setResetBtnLoading(false);
        });
    } else {
      setErrorMsg("Please enter a valid email address!");
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (forgotEmail) {
      if (emailValidation.test(email)) {
        if (createNewPass) {
          if (validPassword) {
            setDisabled(false);
          } else setDisabled(true);
        } else setDisabled(false);
      } else setDisabled(true);
    } else {
      if (passwordValidation.test(password) && emailValidation.test(email)) {
        setDisabled(false);
      } else setDisabled(true);
    }
  }, [
    email,
    emailValidation,
    forgotEmail,
    password,
    passwordValidation,
    validPassword,
  ]);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    // Minimum length of 10 characters
    const lengthValid = password.length >= 6;

    // At least one lowercase letter
    const lowercaseValid = /[a-z]/.test(password);
    // At least one digit
    const digitValid = /\d/.test(password);

    setPasswordIndividualCheck({
      ...passwordIndividualCheck,
      check1: lengthValid,
      check2: digitValid,
      check3: lowercaseValid,
    });
    // Update the validity state
    setValidPassword(lengthValid && lowercaseValid && digitValid);
  };

  return (
    <>
      <Box sx={{ width: "100%", position: "absolute", top: 0 }}>
        {showProgress && (
          <LinearProgress variant="determinate" value={progress} />
        )}
      </Box>
      <div className="container max-w-[1519px] ">
        <div className="w-full flex justify-between py-[20px] items-center">
          <img src={SuperCoderLogo} alt="SuperCoderLogo" width={160} />
          <Link
            onClick={() => {}}
            to={"/company/register"}
            className="duration-400 sm:flex hidden items-center justify-center text-center w-[200px] hover:bg-[#2144a5] transition-all rounded-3xl bg-[#3A6FFF] text-white font-bold py-[8px] text-sm"
          >
            Sign up
          </Link>
        </div>
        {forgotEmail ? (
          reset ? (
            <>
              <div className="flex items-center justify-center w-full h-[80vh]">
                <div className="flex flex-col relative w-[512px] mx-auto items-center justify-center">
                  <div className="flex flex-col items-center mb-[20px] justify-center ">
                    <p className="flex items-center mb-7 justify-center text-center  text-[26px] font-bold text-black">
                      Check your inbox
                    </p>
                    <button onClick={(e) => setReset(false)} className="">
                      <img
                        src={backImg}
                        alt="back btn"
                        width={20}
                        height={20}
                        className="absolute left-[40px] top-[10px]"
                      />
                    </button>
                    <img src={successImg} alt="successImg" className="mb-7" />
                    <h1 className="text-[26px] font-black text-center mb-2 text-[#3A6FFF]">
                      Can't find your email?
                    </h1>
                    <p className="text-[#2F2F2F] w-full font-normal mb-7 leading-[30px] text-center justify-start self-start text-[20px]">
                      If you can't find the email in your inbox or spam folder,
                      <br />
                      click below and we will send you a new one.
                    </p>
                  </div>
                  <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    sx={{ color: "white" }}
                    onClick={handleReset}
                  >
                    Resent Email
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col relative w-[512px] mx-auto items-center h-[80vh] justify-center">
              <div className="flex flex-col items-center mb-[20px] justify-center relative">
                <h1 className="text-[26px] font-bold text-center">
                  Enter your email address
                </h1>
                <button
                  onClick={(e) => {
                    setShowConfirmationCode(false);
                    setCreateNewPass(false);
                    setForgotEmail(false);
                  }}
                  className=""
                >
                  <img
                    src={backImg}
                    alt="back btn"
                    width={20}
                    height={20}
                    className="absolute left-[-110px] top-[10px]"
                  />
                </button>
              </div>
              <div
                style={{ rowGap: "13px" }}
                className="w-full pb-[40px] bg-white rounded-lg px-[30px] pt-[50px] flex-col"
              >
                <form
                  onSubmit={handleReset}
                  className="mt-[20px] flex flex-col "
                >
                  <div className="flex flex-col mb-[100px]">
                    <label className="font-bold" htmlFor="email">
                      Email
                    </label>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      color={colorE}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (!emailValidation.test(e.target.value)) {
                          e.target.setAttribute("error", true);
                          setColorE("error");
                        } else {
                          setColorE("primary");
                          e.target.removeAttribute("error");
                        }
                      }}
                      required
                      inputProps={{ "aria-label": "description" }}
                    />
                    {showConfirmationCode ? (
                      <Grid item xs={12} marginTop={2}>
                        <TextField
                          required
                          size="small"
                          fullWidth
                          name="confirmationCode"
                          label="Confirmation Code"
                          type="number"
                          id="confirmationCode"
                          variant="standard"
                        />
                      </Grid>
                    ) : (
                      ""
                    )}
                    {createNewPass ? (
                      <>
                        <div className="w-full relative">
                          <p className=" text-[16px] font-semibold leading-[16px] mb-[6px] mt-[18px]">
                            Set New Password
                          </p>
                          <div className="wrapper relative">
                            <TextField
                              id="password"
                              placeholder="Password"
                              type={typeInput}
                              name="password"
                              required
                              error={colorPass === "error" ? true : false}
                              className="w-full"
                              variant="standard"
                              color={colorPass}
                              onChange={handlePasswordChange}
                              size="small"
                              value={password}
                              autoComplete={"false"}
                            />
                            <img
                              width={17}
                              height={17}
                              className={`absolute cursor-pointer right-[10px] bottom-[10px]`}
                              onClick={() => {
                                if (typeInput === "password") {
                                  setTypeInput("text");
                                } else setTypeInput("password");
                              }}
                              src={
                                typeInput === "password" ? eyeIcon : closeEye
                              }
                              alt="toggle input type"
                            />
                          </div>
                          <ul
                            className={`transition-all ${
                              true
                                ? "translate-y-1 flex flex-col"
                                : "h-0 w-0 opacity-0"
                            } duration-500 items-start justify-start text-[14px] mt-[10px]`}
                          >
                            <li className="flex space-x-2 items-center justify-center">
                              <img
                                src={
                                  passwordIndividualCheck.check1
                                    ? checkIcon
                                    : crossIcon
                                }
                                width={15}
                                height={15}
                                alt="check-cross-icon"
                              />
                              <span>a minimum of 6 characters</span>
                            </li>
                            <li className="flex space-x-2 items-center justify-center">
                              <img
                                src={
                                  passwordIndividualCheck.check2
                                    ? checkIcon
                                    : crossIcon
                                }
                                width={15}
                                height={15}
                                alt="check-cross-icon"
                              />
                              <span>a number</span>
                            </li>
                            <li className="flex space-x-2 items-center justify-center">
                              <img
                                src={
                                  passwordIndividualCheck.check3
                                    ? checkIcon
                                    : crossIcon
                                }
                                width={15}
                                height={15}
                                alt="check-cross-icon"
                              />
                              <span>must contain letters</span>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex items-center flex-col justify-center w-full space-y-[24px]">
                    <LoadingButton
                      type="submit"
                      sx={{
                        paddingX: "16px",
                        paddingY: "8px",
                        width: "200px",
                        color: "white",
                        background: "#989898",
                        fontSize: "14px",
                        backgroundColor: "#3a6fff",
                      }}
                      style={{ color: "white" }}
                      variant="contained"
                      endIcon=''
                      loadingPosition="end"
                      loading={resetBtnLoading}
                      disabled={disabled}
                    >
                      Reset Password
                    </LoadingButton>
                  </div>
                </form>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col relative max-w-[512px] mx-auto items-center h-[80vh] justify-center">
            <div className="flex flex-col items-center  mt-[70px] md:mt-0 mb-[20px] justify-center">
              <h1 className="text-[26px] font-bold">Log in</h1>
            </div>
            <div
              style={{ rowGap: "13px" }}
              className="w-full pb-[40px] bg-white rounded-lg px-[30px] pt-[50px] flex-col"
            >
              <div className="flex md:flex-row flex-col w-full justify-between items-center">
                <p className="md:w-[50%] w-full border-[#607D8B] hover:text-[#acb6c8] border-b-2 transition-all duration-500 text-center py-[6px]">
                  Customers
                </p>
                <Link
                  to={"/user/login"}
                  className="w-[50%] border-transparent border-b-2 hover:text-[#acb6c8] transition-all duration-500 text-center py-[6px]"
                >
                  Developers
                </Link>
              </div>
              <form
                onSubmit={handleLoginFormSubmit}
                className="mt-[20px] transition-all duration-150   flex flex-col "
              >
                <div className="flex flex-col mb-[20px]">
                  <label className="font-bold" htmlFor="email">
                    Email
                  </label>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    id="email"
                    value={email}
                    color={colorE}
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!emailValidation.test(e.target.value)) {
                        e.target.setAttribute("error", true);
                        setColorE("error");
                      } else {
                        e.target.removeAttribute("error");
                        setColorE("primary");
                      }
                    }}
                    required
                    inputProps={{ "aria-label": "description" }}
                  />
                </div>
                <div className="flex flex-col mb-[10px] relative">
                  <label className="font-bold" htmlFor="password">
                    Password
                  </label>
                  <Input
                    variant="standard"
                    placeholder={"Password"}
                    id="password"
                    value={password}
                    name="password"
                    required
                    color={color}
                    type={typeInput}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!passwordValidation.test(e.target.value)) {
                        e.target.setAttribute("error", true);
                        setColor("error");
                      } else {
                        e.target.removeAttribute("error");
                        setColor("primary");
                      }
                    }}
                  />
                  <img
                    width={17}
                    className={`absolute cursor-pointer right-[5px] ${
                      errorInp ? " bottom-[30px] " : " bottom-[5px] "
                    }`}
                    onClick={() => {
                      if (typeInput === "password") {
                        setTypeInput("text");
                      } else setTypeInput("password");
                    }}
                    height={17}
                    src={eyeIcon}
                    alt="toggle input type"
                  />
                  {errorInp && (
                    <FormHelperText
                      sx={{
                        color: "red",
                        margin: "0 0 0 auto",
                        display: "flex",
                      }}
                      className=" ml-auto"
                    >
                      Incorrect email or password!
                    </FormHelperText>
                  )}
                </div>
                <span
                  onClick={(e) => setForgotEmail(true)}
                  className="cursor-pointer flex ml-auto text-[12px] text-[#3a6fff] mb-[50px]"
                >
                  Forgot password?
                </span>
                <div className="flex items-center transition-all duration-150 flex-col justify-center w-full space-y-[24px]">
                  <LoadingButton
                    type="submit"
                    sx={{
                      paddingX: "16px",
                      paddingY: "8px",
                      // width: "200px",
                      color: "white",
                      background: "#989898",
                      fontSize: "14px",
                      backgroundColor: "#3a6fff",
                    }}
                    loading={resetBtnLoading}
                    loadingPosition="end"
                    endIcon=''
                    style={{ color: "white" }}
                    variant="contained"
                    disabled={disabled}
                    className="transition-all duration-150 w-1/2 text-[10px] md:text-[14px]"
                  >
                    LOGIN
                  </LoadingButton>
                  <p>
                    Don't have an account?{" "}
                    <Link
                      className="underline transition-all duration-150 text-blue-500"
                      to="/company/register"
                    >
                      {" "}
                      Hire now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
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
            variant="filled"
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
            color="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {successMsg}
          </Alert>
        </Snackbar>
      </div>
      {/* Notification About development */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAlertNotification}
        onClose={(e) => setOpenAlertNotification(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAlertNotification}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" component="h1">
              Quick Notification
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              As the API for this page is not yet available, we want to clarify
              that the page is currently under development.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
