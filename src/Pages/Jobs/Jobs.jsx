import React, { useEffect, useState } from "react";
import "./Jobs.scss";

// Images
import Flag from "../../Assets/Images/jobs-hero-card_flag.png";
import SaveButton from "../../Assets/Images/jobs-posts_save.svg";
import Layer from "../../Assets/Images/layer.png";
import Cancel from "../../Assets/Images/X-icon.svg";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import Header from "../../Widgets/Header/Header";
import { Footer } from "../../Widgets";
import { BlueButton } from "./../../Components/TitleText/TitleText";

// const mockJobsData = [
//   {
//     id: 1,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },
//   {
//     id: 2,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },
//   {
//     id: 3,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },
//   {
//     id: 4,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },
//   {
//     id: 5,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },

//   {
//     id: 6,
//     company: "Mousco Ltd number one.",
//     img: Flag,
//     location: "California, USA",
//     profession: "Lead Backend developer - Part time",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
//     skills: [
//       "Software development",
//       "Mysql databases",
//       "Node.js",
//       "devop operations",
//     ],
//     info: ["In-office", "Contract", "120K USD"],
//   },
// ];

export const Jobs = () => {
  const [visibleCards, setVisibleCards] = useState(5); //* Initial number of cards to show
  const [openLoader, setOpenLoader] = useState(false);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [jobCard, setJobCard] = useState(null);
  const [jobCardOpen, setJobCardOpen] = useState(false);
  const [locations, setLocations] = useState(null);
  const [modal, setModal] = useState(false);
  const [jobsSearch, setJobsSearch] = useState("");
  const [locationOption, setLocationOption] = useState();

  const url = "https://jobas.onrender.com/api";
  const navigate = useNavigate();

  // Pagination start
  const [state, setState] = useState({
    todos: [],
    currentPage: 1, // Current page number
    todosPerPage: 5, // Number of items to display per page
  });

  const { todos, currentPage, todosPerPage } = state;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  function handleLoadMore() {
    setState((prevState) => ({
      ...prevState,
      todosPerPage: todosPerPage + 3,
    }));
    if (todosPerPage + 3 >= todos.length) {
      return setShowBtnLoadMore(false);
    }
  }
  // Pagination end
  // Get Jobs
  useEffect(() => {
    setOpenLoader(true);
    axios
      .get(`${url}/job`)
      .then((data) => {
        setJobs(data?.data);
        setState((prevState) => ({
          ...prevState,
          todos: data?.data,
        }));
      })
      .catch(() => {
        // setError(true)
      })
      .finally(() => {
        setOpenLoader(false);
        // setLoading(false)
      });
  }, []);

  // Get Jobs Location
  useEffect(() => {
    axios
      .get(`${url}/job/location`)
      .then((data) => {
        setLocations(data?.data);
      })
      .catch(() => {
        // setError(true)
      })
      .finally(() => {
        // setLoading(false)
      });
  }, []);

  // Get Job Info
  const handleCardClick = (evt) => {
    evt.preventDefault();

    setJobCardOpen(true);
    let jobId = evt?.target?.dataset?.id;

    if (!jobId) {
      // If jobId2 is not available, try getting the parent element's id
      jobId = evt?.target?.parentElement?.id;

      // If still not found, try recursively checking the parent elements until a valid jobId2 is found
      let parentElement = evt?.target?.parentElement?.parentElement;
      while (!jobId && parentElement) {
        jobId = parentElement.id;
        parentElement = parentElement.parentElement;
      }
    }
    setOpenLoader(true);
    axios
      .get(`${url}/job/${jobId}`)
      .then((data) => {
        setJobCard(data?.data);
      })
      .catch(() => {
        // setError(true)
      })
      .finally(() => {
        setOpenLoader(false);
        // setLoading(false)
      });
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();

    axios
      .get(`${url}/job/search`, {
        params: { comLocation: locationOption, jobTitle: jobsSearch },
      })
      .then((data) => {
        setJobs(data.data);
      })
      .catch(() => {
        // setError(true)
      })
      .finally(() => {
        // setLoading(false)
      });
  };

  const handleApply = () => {
    const verified = localStorage.getItem("verify");
    if (verified) {
      if (JSON.parse(verified) === true) return setModal(true);
    } else navigate("/auth/login");
  };

  //* Handles more button event
  // const handleLoadMore = () => {
  //   setVisibleCards((prevVisibleCards) => prevVisibleCards + 5);
  // };
  return (
    <>
      {/* Backdrop Loader */}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
        }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* JOBS */}
      {modal ? (
        <div className="container max-w-[1728px]  mx-auto position-relative">
          <main className=" w-full ">
            <div className="flex absolute top-[106px] rounded-md right-[276px] flex-col z-40 space-y-[40px] items-center px-[40px] w-[612px] min-h-[637px]  bg-white">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  pb: "104px",
                }}
              >
                <div className="modal-wrap">
                  {/* Backendan kegan rasm qo'yiladi */}
                  <img src={""} alt={""} />
                  <div>
                    <Typography
                      component="h5"
                      variant="h5"
                      className="font-semibold text-black text-[10px]"
                    >
                      {/* {job?.company} */}
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      className="text-[#999] text-[16px] font-normal"
                    >
                      {/* Apply as a {job?.profession} */}
                    </Typography>
                  </div>
                  <span className="xIcon" onClick={() => setModal(false)}>
                    X
                  </span>
                </div>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="Email address"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="full_name"
                        label="Full names"
                        name="full_name"
                        autoComplete="full_name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Resume"
                        name="email"
                        autoComplete="Email"
                      />
                    </Grid>
                  </Grid>
                  <div className="flex flex-col pt-[30px] items-center justify-between w-full space-y-4">
                    <button
                      type="submit"
                      className=" w-full py-[23px] transition-all bg-[#0050C8] font-normal active:bg-blue-800 hover:bg-blue-600 text-[16px] text-white rounded-md "
                    >
                      Apply
                    </button>
                  </div>
                </Box>
              </Box>
            </div>
          </main>
        </div>
      ) : (
        ""
      )}
      <Header />
      <div className="jobs">
        <div className="container">
          <div className="jobs-inner">
            <div className="jobs-inner__hero">
              <h2 className="jobs-title">Jobs</h2>
              <p className="jobs-text">Find your dream job</p>
            </div>
            <form
              onSubmit={handleSearchSubmit}
              className="jobs-inner__hero jobs-inputs"
            >
              <input
                onChange={(e) => setJobsSearch(e.target.value)}
                className="jobs-inner__input"
                type="text"
                name="job"
                placeholder="What the kind of job you want"
              />
              <select
                onChange={(e) => setLocationOption(e.target.value)}
                className="jobs-inner__select"
                name="location-job"
              >
                <option value="all">All</option>
                {locations?.map((loc) => (
                  <option key={loc.id} value={loc.location}>
                    {loc.location}{" "}
                  </option>
                ))}
              </select>
              <button type="submit" className="jobs-inner__button">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* JOBS POSTS */}
      <div className="job-posts">
        <div className="container">
          <h3 className="job-posts__title">Latest added</h3>
          {
            <div className="job-posts__inner">
              {/* Pagination */}
              <div className="flex  items-center flex-col justify-between w-full">
                <ul className="job-posts__inner">
                  {currentTodos.map((job, index) => (
                    <li key={index}>
                      <div
                        data-id={job?._id}
                        id={job?._id}
                        onClick={handleCardClick}
                        className="job-posts__static"
                        key={job._id}
                      >
                        <div className="job-posts__card">
                          <div className="inner-wrapper">
                            <img
                              width={46}
                              height={48}
                              src={job?.comImg}
                              alt="flag country"
                            />
                            <div className="job-posts__items">
                              <h3 className="job-posts__company">
                                {job?.comName}
                              </h3>
                              <p className="job-posts__location">
                                {job?.comLocation}
                              </p>
                            </div>
                            <div className="save-button">
                              <button className="save-button__btn">
                                <img
                                  className="save-button__img"
                                  src={SaveButton}
                                  alt="save button"
                                />
                                <span className="save-button__text">save</span>
                              </button>
                            </div>
                          </div>
                          <h4 className="job-posts__profession">
                            {job?.jobTitle}
                          </h4>
                          <div className="job-post__wrapper">
                            <p className="job-posts__text">{job?.jobInfo}</p>
                          </div>
                          <span className="job-posts__skills">Skills:</span>
                          <ul className="job-posts__list">
                            {job?.jobSkills?.map((skill) => (
                              <li className="job-posts__item" key={skill?._id}>
                                {skill?.skillName}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Info block */}
                        <div className="info-block">
                          <ul className="info-list">
                            <li className="info-item">{job?.jobType}</li>
                            <li className="info-item">
                              {/* {job.jobCooperate} */}
                              Contract
                            </li>
                            <li className="info-item">
                              {job?.jobPrice}&nbsp;{job?.moneyTypeId?.moneyType}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                  {showBtnLoadMore ? (
                    <li>
                      <button
                        onClick={() => handleLoadMore()}
                        className="blue-button p-[15px] rounded-md bg-blue-400 z-50 text-2xl text-black flex items-center justify-center font-bold"
                      >
                        Load More
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>

              <div className="job-posts__static compatible">
                {/* <img
                className="layer-img"
                src={Layer}
                alt="Layer img"
                width={145}
              />
              <p className="preview__text">
                Click on a job to preview its full job details here
              </p> */}
                {/* Card more info */}
                {jobCardOpen ? (
                  <div className="more-upper">
                    <div className="more-inner">
                      <h3 className="more-title">Job Details</h3>
                      <div className="more-wrapper__img">
                        <img
                          onClick={() => setJobCardOpen(false)}
                          className="more-img"
                          src={Cancel}
                          alt="cancel button"
                        />
                      </div>
                      {/* Career */}
                    </div>
                    <div className="more-down">
                      <div className="more-down__inner">
                        <img
                          width={48}
                          height={48}
                          className="more-adjust__img"
                          src={jobCard?.comImg}
                          alt="flag more"
                        />
                        <div className="more-info">
                          <h4 className="more-info__company">
                            {jobCard?.comName}
                          </h4>
                          <span className="more-info__location">
                            {jobCard?.comLocation}
                          </span>
                        </div>
                        <div className="more-save__button">
                          <button className="save-button__btn">
                            <img
                              className="save-button__img"
                              src={SaveButton}
                              alt="save button"
                            />
                            <span className="save-button__text">save</span>
                          </button>
                        </div>
                      </div>
                      <h3 className="more-down__title">{jobCard?.jobTitle}</h3>
                      <div className="more-down__text">
                        <p className="more-down__desc">{jobCard?.jobInfo}</p>
                        <div className="more-down__outer">
                          <p className="more-down__skills">Skills:</p>
                          <ul className="more-down__list">
                            {jobCard?.jobSkills.map((skill) => (
                              <li className="more-down__item" key={skill?._id}>
                                {skill?.skillName}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p className="more-down__more">
                          {jobCard?.moreInfo[0]?.jobText}
                        </p>
                      </div>
                      {/* More down - Job requirements */}
                      <div className="job-req">
                        <ul className="job-req__list">
                          {/* <li className="job-req__item">In-office</li>
        <li className="job-req__item">Contract</li>
        <li className="job-req__item">120K - 140K USD</li> */}

                          <li className="job-req__item">{jobCard?.jobType}</li>
                          <li className="job-req__item">
                            {/* {jobCard?.jobCooperate} */}
                            Contract
                          </li>
                          <li className="job-req__item">{jobCard?.jobPrice}</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={handleApply}
                      className="more-upper__applyBtn"
                    >
                      Apply for this job
                    </button>
                  </div>
                ) : (
                  <>
                    <img
                      className="layer-img"
                      src={Layer}
                      alt="Layer img"
                      width={145}
                    />
                    <p className="preview__text">
                      Click on a job to preview its full job details here
                    </p>
                  </>
                )}
              </div>
            </div>
          }
        </div>
      </div>
      <div className="jobs__footer-container">
        <Footer />
      </div>
    </>
  );
};

// {/* Load more button */}
// {/* {visibleCards < mockJobsData.length && (
//   <button
//     className="load-more__btn"
//     type="button"
//     onClick={handleLoadMore}
//   >
//     Load more
//   </button>
// )} */}

// when this button onclick make page darker for modal show noticable
// <button
//   onClick={() => setModal(true)}
//   className="more-upper__applyBtn"
// >
//   Apply for this job
// </button>

// {jobs?.map((job) => (
//   <div
//     data-id={job?._id}
//     id={job?._id}
//     onClick={handleCardClick}
//     className="job-posts__static"
//     key={job._id}
//   >
//     <div className="job-posts__card">
//       <div className="inner-wrapper">
//         <img
//           width={46}
//           height={48}
//           src={job?.comImg}
//           alt="flag country"
//         />
//         <div className="job-posts__items">
//           <h3 className="job-posts__company">{job?.comName}</h3>
//           <p className="job-posts__location">
//             {job?.comLocation}
//           </p>
//         </div>
//         <div className="save-button">
//           <button className="save-button__btn">
//             <img
//               className="save-button__img"
//               src={SaveButton}
//               alt="save button"
//             />
//             <span className="save-button__text">save</span>
//           </button>
//         </div>
//       </div>
//       <h4 className="job-posts__profession">{job?.jobTitle}</h4>
//       <div className="job-post__wrapper">
//         <p className="job-posts__text">{job?.jobInfo}</p>
//       </div>
//       <span className="job-posts__skills">Skills:</span>
//       <ul className="job-posts__list">
//         {job?.jobSkills?.map((skill) => (
//           <li className="job-posts__item" key={skill?._id}>
//             {skill?.skillName}
//           </li>
//         ))}
//       </ul>
//     </div>
//     {/* Info block */}
//     <div className="info-block">
//       <ul className="info-list">
//         <li className="info-item">{job?.jobType}</li>
//         <li className="info-item">
//           {/* {job.jobCooperate} */}
//           Contract
//         </li>
//         <li className="info-item">
//           {job?.jobPrice}&nbsp;{job?.moneyTypeId?.moneyType}
//         </li>
//       </ul>
//     </div>
//   </div>
// ))}
