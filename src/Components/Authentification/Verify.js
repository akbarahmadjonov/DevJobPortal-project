import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import axios from "axios";
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Verify(params) {
  const url = process.env.URL || "https://job-px4t.onrender.com/api";
  const user = localStorage?.getItem("userData");
  const fullName = user && JSON.parse(user).fullName;
  const email = user && JSON.parse(user).email;
  const token = localStorage.getItem("token");
  const [openModal, setOpenModal] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleDeleteUser = async (e) => {
    switch (e.target.textContent) {
      case "YES":
        setOpenLoader(true);
        setOpenModal(false)
        if (token) {
          await axios
            .delete(url + "/user", {
              headers: {
                token,
              },
            })
            .then((res) => {
              localStorage.clear();
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setOpenLoader(false)
            });
        } else window.location.reload();
        break;
      case "NO":
        setOpenModal(false);
        break;
      default:
        setOpenModal(false);
    }
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
      {token && email && fullName ? (
        <div
          className={`bg-white relative drop-shadow-2xl transition-shadow shadow-blue-700 mt-[50px] flex flex-col items-center justify-center h-[800px] text-[#707ff4] backdrop-blur-md w-full p-[40px] `}
        >
          <h1 className="text-7xl font-bold transition-all animate-bounce duration-300">
            Welcome <span className="underline">{fullName}</span>.
          </h1>
          <div className="w-full flex items-center justify-between text-4xl m-[40px]">
            <p>Email: {email}</p>
          </div>
          <div className="flex w-full items-center justify-between mt-[50px]">
            <Button
              onClick={logOut}
              variant="contained"
              size="large"
              color="warning"
            >
              Log Out
            </Button>
            <Button
              onClick={() => setOpenModal(true)}
              variant="contained"
              size="large"
              color="error"
            >
              Delete Account
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`bg-white transition-all duration-300 relative drop-shadow-2xl  shadow-blue-700 mt-[50px] flex flex-col items-center justify-center h-[800px] text-[#707ff4] backdrop-blur-md w-full p-[40px] `}
        >
          <h1 className="text-7xl font-bold transition-all animate-pulse duration-300">
            Please Login Again
          </h1>
          <Button
            onClick={logOut}
            className="transition-all animate-bounce"
            sx={{
              marginTop: "50px",
              position: "absolute",
              bottom: "50px",
              right: "50px",
            }}
            variant="contained"
            size="large"
            color="error"
          >
            Log In
          </Button>
        </div>
      )}
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeleteUser}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you choose to proceed with the account deletion, all your account
            data, including profile information, saved preferences, and
            associated records, will be permanently removed and cannot be
            recovered. Please ensure you have backed up any important
            information before confirming your decision.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUser}>NO</Button>
          <Button onClick={handleDeleteUser}>YES</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
