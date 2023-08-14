import SuperCoderLogo from "./../../../Assets/Images/SuperCoderLogo.svg";
import NotSure from "../../../Assets/Images/Not_Sure.svg";
import AppCard from "../../../Components/Authentification/AppCard";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";
import { useEffect, useState } from "react";
// import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Link as LinkDom, useNavigate } from "react-router-dom";
import successImg from "../../../Assets/Icons/request-meeting-success-bg2.svg";
import { ChangeApp, unSelect } from "../../../Redux/AppSlice";

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
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [fundingRounds, setFundingRounds] = useState("");
  const [color, setColor] = useState("primary");
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [disabled2, setDisabled2] = useState(true);
  const [showProgress, setShowProgress] = useState(false);
  const navigate = useNavigate();
  const emailValidation = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  );
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  // const url = "http://localhost:3000";

  const handleChangeSelect = (event) => {
    setTime(event.target.value);
  };

  // if (fundingRounds && teamSize && phoneNumber && companyName && username) {
  //   setDisabled2(false);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // axios
    //   .post("#" + url, form)
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.setItem("email", email);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setStep(2);
    console.log({
      email: form.get("email"),
      time: form.get("time"),
    });
  };
  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    form.append("phoneNumber", phoneNumber);
    LoadProgress();
    // axios
    //   .post("#" + url, form)
    //   .then((res) => {
    //     console.log(res);
    //     localStorage.setItem("email", email);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //   .finally(() => {
    //    setProgress( 100)
    // setShowProgress(false);
    //
    // });
    // for (const [name, value] of form.entries()) {
    //   console.log(`${name}: ${value}`);
    // }
    // setProgress(100);
    // setShowProgress(true);
    setStep(3);
    // console.log({
    //   companyName: form.get("companyName"),
    //   username: form.get("username"),
    //   teamSize: form.get("teamSize"),
    //   phoneNumber: form.get("phoneNumber"),
    //   fundingRounds: form.get("fundingRounds"),
    //   companyWebsite: form.get("companyWebsite"),
    // });
  };
  const LoadProgress = () => {
    setShowProgress(true);
    setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 300);
  };

  return (
    <>
      <Box sx={{ width: "100%", position: "absolute", top: 0 }}>
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
                        onClick={() => {
                          dispatch(unSelect(false));
                        }}
                        className="flex cursor-pointer flex-col items-center min-h-[100px] w-[100px] border-[#ACB6C8] border p-[13px]  rounded-[5px] text-[12px] break-words pt-[9px] justify-between font-bold select-none"
                      >
                        <img src={NotSure} alt="skill" width={30} height={30} />
                        <div className="text-center font-bold leading-4 ">
                          Not sure,
                          <br />
                          Need advice
                        </div>
                      </div>
                      {apps.map((app, idx) => (
                        <AppCard
                          title={app.title}
                          key={idx}
                          imgLink={app.imgLink}
                          // selected={selected}
                        />
                      ))}
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
                                if (time && e?.target?.value) {
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
                    onChange={(e) => {
                      if (
                        username.length > 1 &&
                        companyName.length > 1 &&
                        phoneNumber.length > 1 &&
                        fundingRounds.length > 1 &&
                        teamSize.length > 1
                      ) {
                        if (companyWebsite) {
                          if (
                            companyWebsite.match(
                              /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
                            ) ||
                            companyWebsite.match(
                              /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                            )
                          ) {
                            setDisabled2(false);
                          } else setDisabled2(true);
                        } else setDisabled2(false);
                      } else {
                        setDisabled2(true);
                      }
                    }}
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
                              id="username"
                              name="username"
                              size="small"
                              value={username}
                              // autoComplete="username"
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
                              country={"uz"} //KR - South Korea
                              onChange={(value) => setPhoneNumber(value)}
                              value={phoneNumber}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            {/* <label htmlFor="companyWebsite" className="text-[14px] font-bold top-[10px]">Company Website (Optional)</label> */}
                            <TextField
                              fullWidth
                              id="companyWebsite"
                              name="companyWebsite"
                              size="small"
                              value={companyWebsite}
                              color={color}
                              onChange={(e) => {
                                setCompanyWebsite(e.target.value.trim());
                                if (
                                  companyWebsite.match(
                                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
                                  ) ||
                                  companyWebsite.match(
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

// { title: ".NET", year: 1994 },
// { title: "The Godfather", year: 1972 },
// { title: "The Godfather: Part II", year: 1974 },
// { title: "The Dark Knight", year: 2008 },
// { title: "12 Angry Men", year: 1957 },
// { title: "Schindler's List", year: 1993 },
// { title: "Pulp Fiction", year: 1994 },
// {
//   title: "The Lord of the Rings: The Return of the King",
//   year: 2003,
// },
// { title: "The Good, the Bad and the Ugly", year: 1966 },
// { title: "Fight Club", year: 1999 },
// {
//   title: "The Lord of the Rings: The Fellowship of the Ring",
//   year: 2001,
// },
// {
//   title: "Star Wars: Episode V - The Empire Strikes Back",
//   year: 1980,
// },
// { title: "Forrest Gump", year: 1994 },
// { title: "Inception", year: 2010 },
// {
//   title: "The Lord of the Rings: The Two Towers",
//   year: 2002,
// },
// { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
// { title: "Goodfellas", year: 1990 },
// { title: "The Matrix", year: 1999 },
// { title: "Seven Samurai", year: 1954 },
// {
//   title: "Star Wars: Episode IV - A New Hope",
//   year: 1977,
// },
// { title: "City of God", year: 2002 },
// { title: "Se7en", year: 1995 },
// { title: "The Silence of the Lambs", year: 1991 },
// { title: "It's a Wonderful Life", year: 1946 },
// { title: "Life Is Beautiful", year: 1997 },
// { title: "The Usual Suspects", year: 1995 },
// { title: "Léon: The Professional", year: 1994 },
// { title: "Spirited Away", year: 2001 },
// { title: "Saving Private Ryan", year: 1998 },
// { title: "Once Upon a Time in the West", year: 1968 },
// { title: "American History X", year: 1998 },
// { title: "Interstellar", year: 2014 },
// { title: "Casablanca", year: 1942 },
// { title: "City Lights", year: 1931 },
// { title: "Psycho", year: 1960 },
// { title: "The Green Mile", year: 1999 },
// { title: "The Intouchables", year: 2011 },
// { title: "Modern Times", year: 1936 },
// { title: "Raiders of the Lost Ark", year: 1981 },
// { title: "Rear Window", year: 1954 },
// { title: "The Pianist", year: 2002 },
// { title: "The Departed", year: 2006 },
// { title: "Terminator 2: Judgment Day", year: 1991 },
// { title: "Back to the Future", year: 1985 },
// { title: "Whiplash", year: 2014 },
// { title: "Gladiator", year: 2000 },
// { title: "Memento", year: 2000 },
// { title: "The Prestige", year: 2006 },
// { title: "The Lion King", year: 1994 },
// { title: "Apocalypse Now", year: 1979 },
// { title: "Alien", year: 1979 },
// { title: "Sunset Boulevard", year: 1950 },
// {
//   title:
//     "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//   year: 1964,
// },
// { title: "The Great Dictator", year: 1940 },
// { title: "Cinema Paradiso", year: 1988 },
// { title: "The Lives of Others", year: 2006 },
// { title: "Grave of the Fireflies", year: 1988 },
// { title: "Paths of Glory", year: 1957 },
// { title: "Django Unchained", year: 2012 },
// { title: "The Shining", year: 1980 },
// { title: "WALL·E", year: 2008 },
// { title: "American Beauty", year: 1999 },
// { title: "The Dark Knight Rises", year: 2012 },
// { title: "Princess Mononoke", year: 1997 },
// { title: "Aliens", year: 1986 },
// { title: "Oldboy", year: 2003 },
// { title: "Once Upon a Time in America", year: 1984 },
// { title: "Witness for the Prosecution", year: 1957 },
// { title: "Das Boot", year: 1981 },
// { title: "Citizen Kane", year: 1941 },
// { title: "North by Northwest", year: 1959 },
// { title: "Vertigo", year: 1958 },
// {
//   title: "Star Wars: Episode VI - Return of the Jedi",
//   year: 1983,
// },
// { title: "Reservoir Dogs", year: 1992 },
// { title: "Braveheart", year: 1995 },
// { title: "M", year: 1931 },
// { title: "Requiem for a Dream", year: 2000 },
// { title: "Amélie", year: 2001 },
// { title: "A Clockwork Orange", year: 1971 },
// { title: "Like Stars on Earth", year: 2007 },
// { title: "Taxi Driver", year: 1976 },
// { title: "Lawrence of Arabia", year: 1962 },
// { title: "Double Indemnity", year: 1944 },
// {
//   title: "Eternal Sunshine of the Spotless Mind",
//   year: 2004,
// },
// { title: "Amadeus", year: 1984 },
// { title: "To Kill a Mockingbird", year: 1962 },
// { title: "Toy Story 3", year: 2010 },
// { title: "Logan", year: 2017 },
// { title: "Full Metal Jacket", year: 1987 },
// { title: "Dangal", year: 2016 },
// { title: "The Sting", year: 1973 },
// { title: "2001: A Space Odyssey", year: 1968 },
// { title: "Singin' in the Rain", year: 1952 },
// { title: "Toy Story", year: 1995 },
// { title: "Bicycle Thieves", year: 1948 },
// { title: "The Kid", year: 1921 },
// { title: "Inglourious Basterds", year: 2009 },
// { title: "Snatch", year: 2000 },
// { title: "3 Idiots", year: 2009 },
// { title: "Monty Python and the Holy Grail", year: 1975 },
