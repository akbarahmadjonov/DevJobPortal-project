import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import eyeIcon from "../../../Assets/Icons/eye.png";
import GoogleIcon from "../../../Assets/Icons/GoogleIcon.svg";
import { Link as LinkDom } from "react-router-dom";

const RightContent = ({
  email,
  setEmail,
  password,
  setPassword,
  typeInput,
  setTypeInput,
  handleGoogleClick,
  handleSubmit,
  navigate,
  setForgotPassword,
}) => {
  return (
    <div className="bg-[#2144a5] w-full md:w-3/4">
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
                <img src={GoogleIcon} alt="GoogleIcon" width={25} height={25} />
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
    </div>
  );
};
