import { React, useState } from "react";

// Material UI components
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Logo from "./../../../Assets/Images/SuperCoderLogoForDeveloper.svg";
import mainImg from "../../../Assets/Images/authenticate-img.svg";
import backImg from "../../../Assets/Icons/back.svg";
import forgotPasswordImg from "../../../Assets/Images/forgot-password-img.svg";
import Box from "@mui/material/Box";
import GoogleIcon from "../../../Assets/Icons/GoogleIcon.svg";
import {
  Link,
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  Snackbar,
  Button,
  FormHelperText,
} from "@mui/material";
// Default components
import { Link as LinkDom, useNavigate } from "react-router-dom";
import Header from "../../../Widgets/Header/Header";
import { Footer } from "../../../Widgets";
import eyeIcon from "../../../Assets/Icons/eye.png";
import axios from "axios";
import Verify from "../../../Components/Authentification/Verify";
import { signInWithGoole } from "../../../Components/Firebase";

export default function Login() {
  const url = process.env.URL || "https://job-px4t.onrender.com/api";
  const [openLoader, setOpenLoader] = useState(false);
  const verify = JSON.parse(localStorage.getItem("verify")) || false;
  const [forgotPassword, setForgotPassword] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Success!");
  const [errorMsg, setErrorMsg] = useState("Unexpected Error!");
  const [subValue, setSubValue] = useState("");
  const navigate = useNavigate();
  const [typeInput, setTypeInput] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // LogIn Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpenLoader(true);

    if (forgotPassword) {
      await axios
        .post(url + "/user/login", data)
        .then((res) => {
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
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err?.response?.data?.message);
          setOpenError(true);
          setOpenLoader(false);
        });
    } else {
      await axios
        .post(url + "/user/login", data)
        .then((res) => {
          const token = res?.data?.token;
          if (token) {
            setSuccessMsg("Successfully Logged In!");
            setOpenSuccess(true);
            localStorage.setItem("token", token);
            localStorage.setItem("userData", JSON.stringify(res?.data?.data));
            localStorage.setItem("verify", JSON.stringify(true));
            // setTimeout(() => {
            //   navigate("/");
            // }, 1000);
          }
          setOpenLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err?.response?.data?.message);
          setOpenError(true);
          setOpenLoader(false);
        });
    }
    console.log({
      email: data.get("userEmail"),
      password: data.get("password"),
    });
  };

  const handleGoogleClick = async () => {
    signInWithGoole()
      .then(async (result) => {
        setEmail(result?.user?.email);
        console.log(result.user.auth);
        await axios
          .post(url + "/user/login", {
            userEmail: result?.user?.email,
          })
          .then((res) => {
            const token = res?.data?.token;
            if (token) {
              setSuccessMsg("Successfully Logged In!");
              setOpenSuccess(true);
              localStorage.setItem("token", token);
              localStorage.setItem("userData", JSON.stringify(res?.data?.data));
              localStorage.setItem("verify", JSON.stringify(true));
              // setTimeout(() => {
              //   navigate("/");
              // }, 1000);
            }
            setOpenLoader(false);
          })
          .catch((err) => {
            console.log(err);
            setErrorMsg(err.message);
            setErrorMsg(err?.response?.data?.message);
            setOpenError(true);
            setOpenLoader(false);
          });
      })
      .catch((er) => {
        if (er.message !== "Firebase: Error (auth/cancelled-popup-request).") {
          setErrorMsg(er.message);
          setOpenError(true);
          console.log(er);
        } else console.log(er);
      });
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

      {/* Header  */}
      {/* <Header /> */}

      {verify ? (
        <>
          <div className="container max-w-[1728px] mx-auto">
            <Verify />
          </div>
        </>
      ) : (
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
            {/* Main Login Card */}
            {forgotPassword ? (
              <main className="relative w-full h-screen flex items-center justify-center">
                <div className="flex rounded-md flex-col z-40 space-y-[40px] w-1/2 pb-[20px] items-center px-[30px]  bg-white">
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
                      onSubmit={handleSubmit}
                      sx={{ mt: 1, width: "100%", position: "relative" }}
                    >
                      <TextField
                        required
                        margin="normal"
                        type="email"
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
                          Having trouble logging in?{" "}
                          <Link variant="body2">
                            <a href="mailto:support@supercoder.co">
                              Contact support
                            </a>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
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
                </div>
              </main>
            ) : (
              <main className="relative w-full h-screen flex items-center justify-center">
                <div className="flex rounded-md flex-col z-40 space-y-[40px] w-1/2 pb-[20px] items-center px-[30px]  bg-white">
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
                        fontSize: "26px",
                        marginBottom: "15px",
                        fontWeight: 700,
                      }}
                      className="mx-auto w-full text-center font-bold text-black "
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
                        <span>Continue with Google</span>
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
                        className={`absolute cursor-pointer right-[10px] bottom-[170px] `}
                        onClick={() => {
                          if (typeInput === "password") {
                            setTypeInput("text");
                          } else setTypeInput("password");
                        }}
                        height={17}
                        src={eyeIcon}
                        alt="toggle input type"
                      />
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
                      {/* <p className="flex text-center text-[16px]">Forgot Password?</p> */}
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
                          <Link variant="body2">
                            <LinkDom to={"/user/register"}>Sign up</LinkDom>
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </div>
              </main>
            )}
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
      </Snackbar>
    </>
  );
}

// <footer className="relative w-full bg-white">
//   <div
//     className={`flex flex-col space-y-[20px] py-[80px] absolute w-full top-[1200px]`}
//   >
//     <div className="flex justify-between mb-[84px] items-center w-full">
//       <div className="flex flex-col items-start w-[50%]">
//         <h2 className="text-[24px] text-black font-semibold ">
//           Subscribe to our newslettter
//         </h2>
//         <p className=" text-[16px] font-normal text-[#999]">
//           Get informed on every update
//         </p>
//       </div>
//       <div className="max-w-[50%] text-[16px] w-[602px]  flex items-end ">
//         <form onSubmit={handleSubmitSub} className="w-full">
//           <label
//             className="flex w-full text-[16px]"
//             htmlFor="emailForSub"
//           >
//             <TextField
//               required
//               fullWidth
//               type="email"
//               id="emailForSub"
//               label="Your email address"
//               name="emailForSub"
//               value={subValue}
//               onChange={(e) => setSubValue(e.target.value)}
//               style={{ color: "#999", textSize: "16px" }}
//               autoComplete="email"
//             />
//             <button
//               type="submit"
//               className="w-[30%] py-[10px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-sm"
//             >
//               Subscribe
//             </button>
//           </label>
//         </form>
//       </div>
//     </div>
//     <hr className="bg-[#0050c81a] flex " />
//     {/*  */}
//     <div className="flex space-x-[190px]   pt-[55px] items-start">
//       <div>
//         <h1 className="text-[#0050C8] text-[20px] font-bold">
//           TheJobportal
//         </h1>
//       </div>
//       <div className="flex space-x-[170px] pt-[10px]">
//         <div>
//           <h2 className="text-black text-[20px] mb-[14px] font-normal">
//             Sitemap
//           </h2>
//           <ul
//             style={{ fontFamily: "Lato, sans-serif" }}
//             className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
//           >
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Home
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Jobs
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               FAQs
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Support
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               About
//             </Link>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-black text-[20px] mb-[14px] font-normal">
//             FAQs
//           </h2>
//           <ul
//             style={{ fontFamily: "Lato, sans-serif" }}
//             className=" flex flex-col items-start w-full text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
//           >
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               How can I search for a specific job ?
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Are there freelance jobs ?
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Can I post a jobs also
//             </Link>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-black text-[20px] mb-[14px] font-normal">
//             Contact us
//           </h2>
//           <ul
//             style={{ fontFamily: "Lato, sans-serif" }}
//             className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
//           >
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Github
//             </Link>
//             <Link
//               className="hover:text-blue-500 transition-all"
//               to={"/"}
//             >
//               Twitter
//             </Link>
//           </ul>
//         </div>
//       </div>
//     </div>
//     <div className="flex w-full items-center pt-[197px] justify-center">
//       <a
//         href="*#"
//         className="text-[#2F2F2F] text-[16px] font-normal "
//         target="_blank"
//       >
//         Developer and maintained by{" "}
//         <span className="hover:text-blue-500 transition-all">
//           {" "}
//           Regis
//         </span>
//       </a>
//     </div>
//   </div>
// </footer>
