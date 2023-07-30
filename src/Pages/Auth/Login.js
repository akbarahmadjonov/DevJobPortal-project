import { React, useState } from "react";
import hBg from "./../../Assets/Images/Header bg.png";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Header from "../../Widgets/Header/Header";
import { Footer } from "../../Widgets";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // const handleSubmitSub = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("emailForSub"),
  //   });
  // };

  return (
    <>
      <Header></Header>
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
        <Footer footerTop="1200" />
      </div>
    </>
  );
}
