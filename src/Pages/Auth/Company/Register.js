import SuperCoderLogo from "./../../../Assets/Images/SuperCoderLogo.svg";
import NotSure from "../../../Assets/Images/Not_Sure.svg";
import AppCard from "../../../Components/Authentification/AppCard";
import { useDispatch, useSelector } from "react-redux";
import eyeIcon from "../../../Assets/Icons/eye.png";
import react from "./../../../Assets/Images/react.png";
import backImg from "../../../Assets/Icons/back.svg";
import {
  php,
  python,
  android,
  angular,
  node,
  ruby,
  java,
  c,
  apple,
  flutter,
} from "../../../important_images";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  FormControl,
  Link,
  MenuItem,
  Select,
  Grid,
  Typography,
  TextField,
  InputLabel,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Link as LinkDom, useNavigate } from "react-router-dom";
import successImg from "../../../Assets/Icons/request-meeting-success-bg2.svg";
// import { ChangeApp, unSelect } from "../../../Redux/AppSlice";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      className="flex items-center justify-between"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color={"inherit"}
        className="hover:text-[#3a6fff] text-inherit"
        href="https://jacks-website-portfolio.netlify.app"
      >
        Jack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function CompanyRegister() {
  const apps = useSelector((state) => state.Apps);
  const [time, setTime] = useState(10);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setCompanyWebsite] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [fundingRounds, setFundingRounds] = useState("");
  const [color, setColor] = useState("primary");
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const [password, setPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [errorMsg, setErrorMsg] = useState("Unexpected error!");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Successfull Sing Up!");
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const [select5, setSelect5] = useState(false);
  const [select6, setSelect6] = useState(false);
  const [select7, setSelect7] = useState(false);
  const [select8, setSelect8] = useState(false);
  const [select9, setSelect9] = useState(false);
  const [select10, setSelect10] = useState(false);
  const [select11, setSelect11] = useState(false);
  const [select12, setSelect12] = useState(false);

  const navigate = useNavigate();
  const emailValidation = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  const passwordValidation = new RegExp(/((?=.*\d)(?=.*[a-z]).{6,20})/);
  const [progress, setProgress] = useState(0);
  const url = "https://job-px4t.onrender.com/api";

  const handleChangeSelect = (event) => {
    setTime(event.target.value);
  };

  const handleDeselectAll = () => {
    setSelect1(false);
    setSelect2(false);
    setSelect3(false);
    setSelect4(false);
    setSelect5(false);
    setSelect6(false);
    setSelect7(false);
    setSelect8(false);
    setSelect9(false);
    setSelect10(false);
    setSelect11(false);
    setSelect12(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("phoneNumber", phoneNumber);
    form.append("email", email);
    form.append("password", password);
    LoadProgress();
    axios
      .post(url + "/recruiter", form)
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("companyInfo", JSON.stringify(res?.data?.data));
        setStep(3);
        navigate("/comprofile");
        setSuccessMsg("Successfull Sing Up!");
        setOpenSuccess(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Something went wrong! Try again");
        if (err?.response?.data?.message?.includes("duplicate")) {
          setErrorMsg("This email is already registered!");
        }
        setOpenError(true);
      })
      .finally(() => {
        setProgress(100);
        setShowProgress(false);
      });
    console.log({
      companyName: form.get("companyName"),
      name: form.get("name"),
      teamSize: form.get("teamSize"),
      phoneNumber: form.get("phoneNumber"),
      fundingRounds: form.get("fundingRounds"),
      website: form.get("website"),
      email,
    });
  };
  const LoadProgress = () => {
    setShowProgress(true);
    setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);
  };
  useEffect(() => {
    if (
      name.length > 1 &&
      companyName.length > 1 &&
      phoneNumber.length > 1 &&
      fundingRounds.length > 1 &&
      teamSize.length > 1
    ) {
      if (website) {
        if (
          website.match(
            /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
          ) ||
          website.match(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
          )
        ) {
          setDisabled2(false);
        } else setDisabled2(true);
      } else setDisabled2(false);
    } else setDisabled2(true);
  }, [name, companyName, phoneNumber, teamSize, website, fundingRounds]);

  return (
    <>
      <Box sx={{ width: "100%", position: "fixed", top: 0 }}>
        {showProgress && (
          <LinearProgress variant="determinate" value={progress} />
        )}
      </Box>
      <div className="container max-w-[1519px] ">
        <div className="flex flex-col">
          <div className="w-full flex justify-between py-[20px] items-center">
            <img src={SuperCoderLogo} alt="SuperCoderLogo" width={160} />
            <button
              onClick={() => navigate("/company/login")}
              className="w-[200px] hover:bg-[#2144a5] transition-all rounded-3xl bg-[#3A6FFF] text-white font-bold py-[8px] text-sm"
            >
              Login
            </button>
          </div>
          <main>
            {step === 1 ? (
              <div className="flex flex-col relative w-[512px] mx-auto items-center justify-center">
                <div className="flex flex-col items-center mb-[20px] justify-center">
                  <h1 className="text-[26px] font-bold text-[#3A6FFF]">
                    Supercoder
                  </h1>
                  <p className="text-[#2F2F2F] text-[19px]">
                    Find developers to hire
                  </p>
                  <span className="text-[#ACB6C8] text-[12px] font-bold cursor-pointer leading-[14px]">
                    Select all that apply
                  </span>
                  <Chip
                    label={`STEP ${step}/3`}
                    sx={{
                      fontWeight: 500,
                      fontSize: "10px",
                      color: "#acb6c8",
                      p: 0,
                      bgcolor: "#3a6fff0d",
                    }}
                    className="absolute top-[40px] right-0"
                  />
                </div>
                <div className="w-full border  border-[#bfd4ff] py-[21px] px-[36px] rounded-sm flex-col">
                  <div>
                    {/* Rendering elements  */}
                    <div
                      className="flex flex-wrap  justify-between items-start"
                      style={{ rowGap: "13px" }}
                    >
                      <div
                        onClick={handleDeselectAll}
                        className="flex cursor-pointer flex-col items-center min-h-[100px] w-[100px] border-[#ACB6C8] border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none"
                      >
                        <img src={NotSure} alt="skill" width={30} height={30} />
                        <div className="text-center font-bold leading-4 ">
                          Not sure,
                          <br />
                          Need advice
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect1((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select1
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={react}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          ReactJS
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect2((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select2
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={node}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          NodeJS
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect3((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select3
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={python}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Python
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect4((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select4
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={angular}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Angular
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect5((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select5
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={apple}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          IOS
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect6((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select6
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={react}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          ReactNative
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect7((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select7
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={android}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Android
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect8((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select8
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={java}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Java
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect9((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select9
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={ruby}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Ruby on Rails
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect10((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select10
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={c}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          C#
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect11((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select11
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={flutter}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          Flutter
                        </div>
                      </div>
                      <div
                        onClick={() => setSelect12((state) => !state)}
                        className={`flex cursor-pointer flex-col items-center min-h-[100px] w-[100px]  border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none ${
                          select12
                            ? "border-blue-400 bg-[#3a6fff0d]"
                            : "border-[#ACB6C8] bg-white"
                        }`}
                      >
                        <img
                          src={php}
                          alt="skill"
                          width={40}
                          height={40}
                          className={""}
                        />
                        <div className="text-center font-bold leading-4 ">
                          PHP
                        </div>
                      </div>
                    </div>
                    {/* Select Bar */}
                    <div className="">
                      <form onSubmit={handleSubmit}>
                        <FormControl
                          sx={{ marginY: 1, mt: "20px", width: "100%" }}
                        >
                          {/*  */}
                          <Autocomplete
                            multiple
                            id="other-skills"
                            options={allSkills.map((option) => {
                              return option.language;
                            })}
                            size="small"
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => {
                                return (
                                  <Chip
                                    variant="filled"
                                    sx={{ bgcolor: "#d6e2ff", fontWeight: 600 }}
                                    label={option}
                                    {...getTagProps({ index: index + option })}
                                  />
                                );
                              })
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                onClick={() =>
                                  setTimeout(() => {
                                    console.clear();
                                  }, 2000)
                                }
                                label="Enter other skills"
                              />
                            )}
                          />
                          {/*  */}
                          <p className=" text-[16px] font-semibold leading-[16px] mb-[6px] mt-[18px]">
                            How soon do you need to hire developers?
                          </p>
                          <Select
                            value={time}
                            onChange={handleChangeSelect}
                            size="small"
                            id="time"
                            name="time"
                            // inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem selected value={10}>
                              Within the next month
                            </MenuItem>
                            <MenuItem value={20}>
                              Within the next 3 month
                            </MenuItem>
                            <MenuItem value={30}>
                              Within the next 6 month
                            </MenuItem>
                            <MenuItem value={40}>Not sure yet</MenuItem>
                          </Select>
                          <p className=" text-[16px] font-semibold leading-[16px] mb-[6px] mt-[18px]">
                            Your work Email
                          </p>
                          <TextField
                            id="email"
                            placeholder="Email"
                            type="email"
                            required
                            color={color}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailValidation.test(e?.target?.value)) {
                                if (
                                  time &&
                                  e?.target?.value &&
                                  passwordValidation.test(e?.target?.value)
                                ) {
                                  setDisabled(false);
                                  setColor("primary");
                                } else {
                                  setColor("error");
                                  setDisabled(true);
                                }
                              } else {
                                setDisabled(true);
                                setColor("error");
                              }
                            }}
                            size="small"
                            name="email"
                            value={email}
                            autoComplete="current-email"
                          />
                          <div className="w-full relative">
                            <p className=" text-[16px] font-semibold leading-[16px] mb-[6px] mt-[18px]">
                              Password
                            </p>
                            <TextField
                              id="password"
                              placeholder="Password"
                              type={typeInput}
                              name="password"
                              required
                              className="w-full"
                              color={color}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                if (passwordValidation.test(e?.target?.value)) {
                                  if (
                                    time &&
                                    e?.target?.value &&
                                    emailValidation.test(email)
                                  ) {
                                    setDisabled(false);
                                    setColor("primary");
                                  } else {
                                    setColor("error");
                                    setDisabled(true);
                                  }
                                } else {
                                  setDisabled(true);
                                  setColor("error");
                                }
                              }}
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
                              src={eyeIcon}
                              alt="toggle input type"
                            />
                          </div>
                          <Button
                            type="submit"
                            sx={{ width: "50%", mx: "auto", mt: "20px" }}
                            variant="contained"
                            disabled={disabled}
                          >
                            Continiue
                          </Button>
                        </FormControl>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              <>
                <div className="flex flex-col items-center justify-center mx-auto w-[512px] relative">
                  <div className="flex flex-col items-center mb-[20px] justify-center">
                    <h1 className="text-[26px] font-bold text-[#3A6FFF]">
                      Supercoder
                    </h1>
                    <p className="text-[#2F2F2F] text-[19px]">
                      Let us find the right software engineers
                    </p>
                    <Chip
                      label={`Step ${step}/3`}
                      sx={{
                        fontWeight: 500,
                        fontSize: "10px",
                        color: "#acb6c8",
                        p: 0,
                        bgcolor: "#3a6fff0d",
                      }}
                      className="absolute top-[40px] right-0"
                    />
                    <button onClick={(e) => setStep(1)} className="">
                      <img
                        src={backImg}
                        alt="back btn"
                        width={20}
                        height={20}
                        className="absolute left-[-110px] top-[10px]"
                      />
                    </button>
                  </div>
                  <Container
                    sx={{
                      mt: "0",
                      paddingY: "21px",
                      paddingX: "36px",
                      borderRadius: "5px",
                      border: `1px solid #bfd4ff`,
                    }}
                    component="main"
                    width="100%"
                    // onChange={}
                  >
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 0,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        noValidate={false}
                        component="form"
                        onSubmit={handleSubmitStep2}
                        sx={{ mt: 3, width: "100%" }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              size="small"
                              color={color}
                              id="companyName"
                              name="companyName"
                              value={companyName}
                              label="Company Name"
                              // autoComplete="companyName"
                              onChange={(e) => setCompanyName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl
                              required
                              size="small"
                              sx={{ m: 0, width: "100%" }}
                            >
                              <InputLabel id="labelrequired">
                                Team Size
                              </InputLabel>
                              <Select
                                value={teamSize}
                                label="Team Size *"
                                sx={{ width: "100%" }}
                                labelId="labelrequired"
                                id="teamSize"
                                name="teamSize"
                                onChange={(e) => setTeamSize(e.target.value)}
                              >
                                <MenuItem value={"1-10"}>1-10</MenuItem>
                                <MenuItem value={"11-50"}>11-50</MenuItem>
                                <MenuItem value={"51-250"}>51-250</MenuItem>
                                <MenuItem value={"251-10K"}>251-10K</MenuItem>
                                <MenuItem value={"10K+"}>10K+</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl
                              required
                              size="small"
                              sx={{ m: 0, width: "100%" }}
                            >
                              <InputLabel id="labelrequired">
                                Funding Rounds
                              </InputLabel>
                              <Select
                                labelId="labelrequired"
                                id="fundingRounds"
                                name="fundingRounds"
                                onChange={(e) =>
                                  setFundingRounds(e.target.value)
                                }
                                value={fundingRounds}
                                label="Funding Rounds *"
                                sx={{ width: "100%" }}
                                MenuProps={{
                                  PaperProps: {
                                    style: {
                                      maxHeight: 48 * 4.5 + 8,
                                      width: 250,
                                    },
                                  },
                                }}
                              >
                                {Funding_Rounds.map((name) => (
                                  <MenuItem
                                    key={name}
                                    value={name}
                                    // style={getStyles(name, personName, theme)}
                                  >
                                    {name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="name"
                              name="name"
                              size="small"
                              value={name}
                              // autoComplete="name"
                              onChange={(e) => setUsername(e.target.value)}
                              label="Your Name"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <label
                              htmlFor="phoneNumber"
                              className="text-[14px] font-bold"
                            >
                              Phone Number:
                            </label>
                            <PhoneInput
                              inputStyle={{ width: "100%" }}
                              isValid={true}
                              required={true}
                              country={"uz"} //KR - South Korea
                              onChange={(value) => setPhoneNumber(value)}
                              value={phoneNumber}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            {/* <label htmlFor="website" className="text-[14px] font-bold top-[10px]">Company Website (Optional)</label> */}
                            <TextField
                              fullWidth
                              id="website"
                              name="website"
                              size="small"
                              value={website}
                              color={color}
                              onChange={(e) => {
                                setCompanyWebsite(e.target.value.trim());
                                if (
                                  website.match(
                                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
                                  ) ||
                                  website.match(
                                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                                  )
                                ) {
                                  setColor("primary");
                                  setDisabled2(false);
                                } else {
                                  setDisabled2(true);
                                  setColor("error");
                                }
                              }}
                              // autoComplete="Company Website link url"
                              label="Company Website (Optional)"
                            />
                          </Grid>
                        </Grid>
                        <Button
                          disabled={disabled2}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Submit
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link variant="body2">
                              <LinkDom
                                to={"/company/login"}
                                onClick={() => setStep(1)}
                              >
                                Already have an account? Sign in
                              </LinkDom>
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                  <div className="text-[14px] p-[20px] flex flex-col w-[512px] items-center justify-center">
                    <p className="text-center">
                      By requesting a developer recruitment, you are deemed to
                      have agreed to our{" "}
                      <Link
                        to="/company/login"
                        className="transition-all text-[#3a6fff]"
                      >
                        privacy policy.
                      </Link>{" "}
                      As part of this policy, we will only share your personal
                      information with relevant departments and third parties
                      when it is necessary.
                    </p>
                    <Copyright sx={{ width: "150px", marginTop: "50px" }} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-full h-[80vh]">
                  <div className="flex flex-col relative w-[512px] mx-auto items-center justify-center">
                    <div className="flex flex-col space-y-7 items-center mb-[20px] justify-center">
                      <h1 className="text-[26px] font-black text-center  text-[#3A6FFF]">
                        Thank You For Reaching <br /> Out To Supercoder!
                      </h1>
                      <img src={successImg} alt="successImg" />
                      <p className="text-[#2F2F2F] w-[420px] font-normal leading-[20px] text-center justify-start self-start text-[14px]">
                        Supercoder team will take the time to learn more about
                        your business in order to determine whether a
                        partnership would be beneficial. If we think there’s a
                        good fit, we will be in touch.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
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
      {/* Error Alert */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

const allSkills = [
  {
    language: "JavaScript",
  },
  {
    language: "Python",
  },
  {
    language: "Java",
  },
  {
    language: "C++",
  },
  {
    language: "C#",
  },
  {
    language: "Ruby",
  },
  {
    language: "PHP",
  },
  {
    language: "Swift",
  },
  {
    language: "Go",
  },
  {
    language: "Kotlin",
  },
  {
    language: "Rust",
  },
  {
    language: "TypeScript",
  },
  {
    language: "Scala",
  },
  {
    language: "Perl",
  },
  {
    language: "Haskell",
  },
  {
    language: "Lua",
  },
  {
    language: "Dart",
  },
  {
    language: "MATLAB",
  },
  {
    language: "R",
  },
  {
    language: "Objective-C",
  },
  {
    language: "Groovy",
  },
  {
    language: "Perl",
  },
  {
    language: "VB.NET",
  },
  {
    language: "F#",
  },
  {
    language: "COBOL",
  },
  {
    language: "Fortran",
  },
  {
    language: "Ada",
  },
];
const Funding_Rounds = [
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D",
  "Pre-IPO",
  "Public",
];
