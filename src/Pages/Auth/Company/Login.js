import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  FormHelperText,
  Input,
  LinearProgress,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import successImg from "../../../Assets/Images/check-your-inbox.png";
import SuperCoderLogo from "./../../../Assets/Images/SuperCoderLogo.svg";
import eyeIcon from "../../../Assets/Icons/eye.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backImg from "../../../Assets/Icons/back.svg";
import axios from "axios";

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
  const emailValidation = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/
  );
  const passwordValidation = /^.{6,25}$/;
  const url = "https://job-px4t.onrender.com/api";
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Successfull Log In!");
  const [errorMsg, setErrorMsg] = useState("Unexpected Error!");
  const [reset, setReset] = useState(false);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post(url + "/recruiter/login", data)
      .then((res) => {
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
        console.log(err);
        setErrorMsg(err?.message);
        setErrorMsg(err?.response?.data?.message);
        setOpenError(true);
        setErrorInp(true);
      });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setOpenAlertNotification(true)
    // if (emailValidation.test(email)) {
    //   await axios
    //     .post(url + "/recruiter/login", {
    //       email,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       setSuccessMsg("Reset Successful");
    //       setOpenSuccess(true);
    //       setReset(true);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   setErrorMsg("Please enter a valid email address!");
    //   setOpenError(true);
    // }
  };

  useEffect(() => {
    if (forgotEmail) {
      if (emailValidation.test(email)) {
        setDisabled(false);
      } else setDisabled(true);
    } else {
      if (passwordValidation.test(password) && emailValidation.test(email)) {
        setDisabled(false);
      } else setDisabled(true);
    }
  }, [email, emailValidation, forgotEmail, password, passwordValidation]);

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
            className="duration-400 text-center w-[200px] hover:bg-[#2144a5] transition-all rounded-3xl bg-[#3A6FFF] text-white font-bold py-[8px] text-sm"
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
                <button onClick={(e) => setForgotEmail(false)} className="">
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
                  </div>
                  <div className="flex items-center flex-col justify-center w-full space-y-[24px]">
                    <Button
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
                      disabled={disabled}
                      onClick={handleReset}
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col relative w-[512px] mx-auto items-center h-[80vh] justify-center">
            <div className="flex flex-col items-center mb-[20px] justify-center">
              <h1 className="text-[26px] font-bold">Log in</h1>
            </div>
            <div
              style={{ rowGap: "13px" }}
              className="w-full pb-[40px] bg-white rounded-lg px-[30px] pt-[50px] flex-col"
            >
              <div className="flex  w-full justify-between items-center">
                <p className="w-[50%] border-[#607D8B] hover:text-[#acb6c8] border-b-2 transition-all duration-500 text-center py-[6px]">
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
                className="mt-[20px] flex flex-col "
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
                <div className="flex items-center flex-col justify-center w-full space-y-[24px]">
                  <Button
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
                    disabled={disabled}
                  >
                    LOGIN
                  </Button>
                  <p>
                    Don't have an account?{" "}
                    <Link
                      className="underline text-blue-500"
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
