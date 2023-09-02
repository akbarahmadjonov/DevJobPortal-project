import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import forgotPasswordImg from "../../../../Assets/Images/forgot-password-img.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import backImg from "../../../../Assets/Icons/back.svg";
import FormHelperText from "@mui/material/FormHelperText";
import closeEye from "../../../../Assets/Icons/close eye.png";
import eyeIcon from "../../../../Assets/Icons/eye.png";
import checkIcon from "../../../../Assets/Icons/check.png";
import crossIcon from "../../../../Assets/Icons/cross.png";
import GoogleIcon from "../../../../Assets/Icons/GoogleIcon.svg";
import { Link as LinkDom } from "react-router-dom";
import { Backdrop, Fade, Modal } from "@mui/material";
import Logo from "./../../../../Assets/Images/SuperCoderLogoForDeveloper.svg";

export const RightContent = ({
  email,
  setEmail,
  password,
  setPassword,
  typeInput,
  setTypeInput,
  handleGoogleClick,
  handleSubmit,
  handleReset,
  navigate,
  forgotPassword,
  showConfirmationCode,
  setForgotPassword,
  createNewPass,
  setCreateNewPass,
}) => {
  const [openAlertNotification, setOpenAlertNotification] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [resetBtn, setResetBtn] = useState(true);
  const [focusedPass, setFocusedPass] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    // Minimum length of 10 characters
    const lengthValid = password.length >= 10;

    // At least one lowercase letter
    const lowercaseValid = /[a-z]/.test(password);

    // At least one uppercase letter
    const uppercaseValid = /[A-Z]/.test(password);

    // At least one digit
    const digitValid = /\d/.test(password);

    // At least one special character
    const specialCharValid = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    setCheck1(lengthValid);
    setCheck3(lowercaseValid && uppercaseValid);
    setCheck2(digitValid);
    setCheck4(specialCharValid);
    // Update the validity state
    setValidPassword(
      lengthValid &&
        lowercaseValid &&
        uppercaseValid &&
        digitValid &&
        specialCharValid
    );
  };
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
  useEffect(() => {
    if (createNewPass) {
      if (validPassword) {
        setResetBtn(false);
      } else setResetBtn(true);
    } else setResetBtn(false);
  }, [validPassword, createNewPass, resetBtn]);

  return (
    <>
      <div className="bg-[#2144a5] w-full md:w-3/4">
        <main className="relative w-full h-screen flex items-center justify-center">
          {forgotPassword ? (
            <>
              <main className="relative w-full flex-col h-screen flex items-center justify-center">
                <img
                  src={Logo}
                  width={70}
                  height={41}
                  className="mb-[30px] block md:hidden cursor-pointer"
                  alt="site-logo"
                  onClick={() => navigate("/")}
                />
                <div className="flex rounded-md flex-col z-40 space-y-[40px] w-5/6 md:w-1/2 pb-[20px] items-center px-[10px] md:px-[30px]  bg-white">
                  <Box
                    sx={{
                      marginTop: 4,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h4"
                      sx={{
                        fontSize: "26px",
                        marginBottom: "15px",
                        fontWeight: 700,
                      }}
                      className="mx-auto w-full text-center font-bold text-black "
                    >
                      Log in as a developer
                    </Typography>

                    <img
                      src={forgotPasswordImg}
                      className=""
                      width={"240px"}
                      alt="forgot-password-img"
                    />
                    <Box
                      component="form"
                      onSubmit={handleReset}
                      sx={{
                        mt: 1,
                        width: "100%",
                        marginBottom: "20px",
                        position: "relative",
                      }}
                    >
                      {createNewPass && (
                        <Typography
                          component="h1"
                          variant="h4"
                          sx={{
                            fontSize: "22px",
                            marginTop: "15px",
                            marginBottom: "15px",
                            fontWeight: 400,
                          }}
                          className="mx-auto w-full text-start font-bold text-black "
                        >
                          Create a new password
                        </Typography>
                      )}
                      <TextField
                        required
                        margin="normal"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email Address"
                        name="email"
                        size="small"
                        style={{ color: "#999" }}
                        autoComplete="email"
                        autoFocus
                      />

                      {showConfirmationCode && (
                        <Grid item xs={12} marginTop={2}>
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
                      )}
                      {createNewPass && (
                        <>
                          <Grid
                            item
                            marginTop={2}
                            sx={{ position: "relative" }}
                            xs={12}
                          >
                            <TextField
                              required
                              fullWidth
                              name="password"
                              size="small"
                              onFocus={() => setFocusedPass(true)}
                              label="Password"
                              type={typeInput}
                              id="password"
                              onChange={handlePasswordChange}
                              value={password}
                              autoComplete="new-password"
                              error={
                                focusedPass
                                  ? validPassword
                                    ? false
                                    : true
                                  : false
                              }
                            />
                            <img
                              width={17}
                              className={`absolute cursor-pointer right-[10px] top-[15px] `}
                              onClick={() => {
                                if (typeInput === "password") {
                                  setTypeInput("text");
                                } else {
                                  setTypeInput("password");
                                }
                              }}
                              height={17}
                              src={
                                typeInput === "password" ? eyeIcon : closeEye
                              }
                              alt="toggle input type"
                            />

                            <ul
                              className={`transition-all ${
                                focusedPass
                                  ? "translate-y-1 flex flex-col"
                                  : "h-0 w-0 opacity-0"
                              } duration-500 items-start justify-start text-[14px] mt-[10px]`}
                            >
                              <li className="flex space-x-2 items-center justify-center">
                                <img
                                  src={check1 ? checkIcon : crossIcon}
                                  width={15}
                                  height={15}
                                  alt="check-cross-icon"
                                />
                                <span>a minimum of 10 characters</span>
                              </li>
                              <li className="flex space-x-2 items-center justify-center">
                                <img
                                  src={check2 ? checkIcon : crossIcon}
                                  width={15}
                                  height={15}
                                  alt="check-cross-icon"
                                />
                                <span>a number</span>
                              </li>
                              <li className="flex space-x-2 items-center justify-center">
                                <img
                                  src={check3 ? checkIcon : crossIcon}
                                  width={15}
                                  height={15}
                                  alt="check-cross-icon"
                                />
                                <span>uppercase and lowercase letters</span>
                              </li>
                              <li className="flex items-center space-x-2 justify-center">
                                <img
                                  src={check4 ? checkIcon : crossIcon}
                                  width={15}
                                  height={15}
                                  alt="check-cross-icon"
                                />
                                <span>a special character</span>
                              </li>
                            </ul>
                          </Grid>
                        </>
                      )}
                      <div className="flex flex-col items-center pt-[40px] justify-between w-full space-y-4">
                        <Button
                          type="submit"
                          disabled={resetBtn}
                          variant="contained"
                          className="w-3/5 md:w-full py-[10px] duration-150 transition-all bg-[#3A6FFF] font-normal active:bg-blue-800 hover:bg-blue-600  text-[16px] text-white rounded-md "
                        >
                          <span className="text-[12px] md:text-[16px]">
                            Reset Password
                          </span>
                        </Button>
                      </div>
                      <Grid container justifyContent="center" pt={"15px"}>
                        <Grid item>
                          Having trouble logging in?{" "}
                          <Link
                            href="mailto:support@supercoder.co"
                            variant="body2"
                          >
                            Contact support
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                    <Link
                      variant="body2"
                      onClick={(e) => setForgotPassword(false)}
                      className="flex items-center space-x-2 cursor-pointer justify-center"
                    >
                      <button>
                        <img
                          src={backImg}
                          alt="back btn"
                          width={13}
                          height={13}
                          className="fill-blue-500 left-[40px] top-[10px]"
                        />
                      </button>
                      <p onClick={() => setForgotPassword(false)}>Sing In</p>
                    </Link>
                  </Box>
                </div>
              </main>
            </>
          ) : (
            <main className="relative w-full flex-col h-screen flex items-center justify-center">
              <img
                src={Logo}
                width={70}
                height={41}
                className="mb-[30px]  block md:hidden cursor-pointer"
                alt="site-logo"
                onClick={() => navigate("/")}
              />
              <div className="flex rounded-md flex-col z-40 space-y-[40px] w-5/6 transition-all duration-150 md:w-1/2 pb-[20px] items-center px-[30px]  bg-white">
                <Box
                  sx={{
                    marginTop: 4,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                      // fontSize: "26px",
                      marginBottom: "15px",
                      fontWeight: 700,
                    }}
                    className="mx-auto w-full text-center text-[20px] transition-all duration-150 md:text-[26px]  font-bold text-black "
                  >
                    Log in as a developer
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 1, width: "100%", position: "relative" }}
                  >
                    <Button
                      onClick={handleGoogleClick}
                      className="flex w-full items-center  justify-center space-x-2 bg-white border border-gray-300 rounded-lg  shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 outline-none"
                    >
                      <img
                        src={GoogleIcon}
                        alt="GoogleIcon"
                        width={25}
                        height={25}
                      />
                      <span
                        className={`text-[12px] transition-all duration-150 sm:text-[16px] max-[360px]:hidden flex`}
                      >
                        Continue with Google
                      </span>
                    </Button>
                    <div className="w-full flex items-center justify-between my-[10px]">
                      <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                      <span className="text-blue-300 text-[16px]">or</span>
                      <hr className="h-[1.5px] bg-blue-300 flex w-[46%]" />
                    </div>
                    <TextField
                      margin="normal"
                      type="email"
                      required
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="userEmail"
                      label="Email Address"
                      name="userEmail"
                      size="small"
                      style={{ color: "#999" }}
                      autoComplete="email"
                      autoFocus
                    />
                    <div className="relative ">
                      <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={typeInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        style={{ color: "#999" }}
                        autoComplete="current-password"
                      />
                      <img
                        width={17}
                        className={`absolute cursor-pointer right-[10px] transition-all duration-150 bottom-[17px] `}
                        onClick={() => {
                          if (typeInput === "password") {
                            setTypeInput("text");
                          } else setTypeInput("password");
                        }}
                        height={17}
                        src={typeInput === "password" ? eyeIcon : closeEye}
                        alt="toggle input type"
                      />
                    </div>
                    <FormHelperText
                      id="password"
                      className="hover:text-blue-700  tracking-tight  transition-all cursor-pointer"
                      sx={{
                        color: "#3A6FFF",
                        textAlign: "right",
                        fontSize: "14px",
                        marginLeft: "auto",
                      }}
                    >
                      <span onClick={() => setForgotPassword(true)}>
                        Forgot password?
                      </span>
                    </FormHelperText>
                    <div className="flex flex-col items-center pt-[40px] justify-between w-full space-y-4">
                      <button
                        type="submit"
                        className=" w-full py-[10px] transition-all bg-[#3A6FFF] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-md "
                      >
                        Log In
                      </button>
                    </div>
                    <Grid container justifyContent="center" pt={"15px"}>
                      <Grid item>
                        Don't have an account?{" "}
                        <LinkDom
                          to={"/user/register"}
                          className="text-[16px] text-blue-400"
                        >
                          Sign up
                        </LinkDom>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </div>
            </main>
          )}
        </main>
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
};
