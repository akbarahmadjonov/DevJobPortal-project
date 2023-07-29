import { React, useState } from "react";
import hBg from "./../../Assets/Images/Header bg.png";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleSubmitSub = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("emailForSub"),
    });
  };

  return (
    <>
      <img
        src={hBg}
        alt="header background"
        className="w-full   max-h-[1200px] absolute -z-20 object-cover"
      />
      <div className="container max-w-[1728px] mx-auto">
        <main className="relative w-full">
          <div className="flex absolute top-[106px] rounded-md right-[276px] flex-col z-40 space-y-[40px] items-center px-[40px] w-[612px] min-h-[637px]  bg-white">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                className="font-semibold text-black text-[24px]"
              >
                Login
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                className="text-[#999] text-[16px] font-normal"
              >
                Welcome back! Login to continue
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  type="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  style={{ color: "#999" }}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  style={{ color: "#999" }}
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  style={{ paddingLeft: "30px" }}
                  label="Remember me"
                />
                <div className="flex flex-col items-center pt-[30px] justify-between w-full space-y-4">
                  <button
                    type="submit"
                    className=" w-full py-[23px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-md "
                  >
                    Login
                  </button>
                  <span className="text-[#999999] text-[16px]">OR</span>
                  <button
                    type="button"
                    className=" w-full py-[23px] transition-all bg-[#F65050] font-normal active:bg-red-600 hover:bg-red-400 text-[16px] text-white rounded-md "
                    //   onClick={}
                  >
                    Login with google
                  </button>
                </div>
              </Box>
            </Box>
          </div>
        </main>
        <footer className="relative w-full bg-white">
          <div className="flex flex-col space-y-[20px] py-[80px] absolute w-full top-[1200px] ">
            <div className="flex justify-between mb-[84px] items-center w-full">
              <div className="flex flex-col items-start w-[50%]">
                <h2 className="text-[24px] text-black font-semibold ">
                  Subscribe to our newslettter
                </h2>
                <p className=" text-[16px] font-normal text-[#999]">
                  Get informed on every update
                </p>
              </div>
              <div className="max-w-[50%] text-[16px] w-[602px]  flex items-end ">
                <form onSubmit={handleSubmitSub} className="w-full">
                  <label
                    className="flex w-full text-[16px]"
                    htmlFor="emailForSub"
                  >
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="emailForSub"
                      label="Your email address"
                      name="emailForSub"
                      style={{ color: "#999", textSize: "16px" }}
                      autoComplete="email"
                    />
                    <button
                      type="submit"
                      className="w-[30%] py-[10px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-sm"
                    >
                      Subscribe
                    </button>
                  </label>
                </form>
              </div>
            </div>
            <hr className="bg-[#0050c81a] flex " />
            {/*  */}
            <div className="flex space-x-[190px]   pt-[55px] items-start">
              <div>
                <h1 className="text-[#0050C8] text-[20px] font-bold">
                  TheJobportal
                </h1>
              </div>
              <div className="flex space-x-[170px] pt-[10px]">
                <div>
                  <h2 className="text-black text-[20px] mb-[14px] font-normal">
                    Sitemap
                  </h2>
                  <ul
                    style={{ fontFamily: "Lato, sans-serif" }}
                    className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
                  >
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Home
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Jobs
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      FAQs
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Support
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      About
                    </Link>
                  </ul>
                </div>
                <div>
                  <h2 className="text-black text-[20px] mb-[14px] font-normal">
                    FAQs
                  </h2>
                  <ul
                    style={{ fontFamily: "Lato, sans-serif" }}
                    className=" flex flex-col items-start w-full text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
                  >
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      How can I search for a specific job ?
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Are there freelance jobs ?
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Can I post a jobs also
                    </Link>
                  </ul>
                </div>
                <div>
                  <h2 className="text-black text-[20px] mb-[14px] font-normal">
                    Contact us
                  </h2>
                  <ul
                    style={{ fontFamily: "Lato, sans-serif" }}
                    className=" flex flex-col items-start w-[30%] text-[16px] space-y-[14px] font-[Lato] justify-between  text-[#999]"
                  >
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Github
                    </Link>
                    <Link
                      className="hover:text-blue-500 transition-all"
                      to={"/"}
                    >
                      Twitter
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center pt-[197px] justify-center">
              <a
                href="#!"
                className="text-[#2F2F2F] text-[16px] font-normal "
                target="_blank"
              >
                Developer and maintained by{" "}
                <span className="hover:text-blue-500 transition-all">
                  {" "}
                  Regis
                </span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
