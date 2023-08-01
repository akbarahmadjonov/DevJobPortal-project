import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";

const mockJobsData = [
  {
    id: 1,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
  {
    id: 2,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
  {
    id: 3,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
  {
    id: 4,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
  {
    id: 5,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
  
  {
    id: 6,
    company: "Mousco Ltd number one.",
    img: Flag,
    location: "California, USA",
    profession: "Lead Backend developer - Part time",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    skills: [
      "Software development",
      "Mysql databases",
      "Node.js",
      "devop operations",
    ],
    info: ["In-office", "Contract", "120K USD"],
  },
];

export const Jobs = () => {
  const [visibleCards, setVisibleCards] = useState(5); //* Initial number of cards to show
  const [job, setJob] = useState(null);
  const [modal, setModal] = useState(false);

  //* Handles more button event
  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 5);
  };
  console.log(job);
  return (
    <>
      {/* JOBS */}
      {modal ? (
        <div className="container max-w-[1728px] mx-auto position-relative">
          <main className="relative w-full">
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
                  <img src={job?.img} alt={job?.company} />
                  <div>
                    <Typography
                      component="h5"
                      variant="h5"
                      className="font-semibold text-black text-[10px]"
                    >
                      {job?.company}
                    </Typography>
                    <Typography
                      component="h6"
                      variant="h6"
                      className="text-[#999] text-[16px] font-normal"
                    >
                      Apply as a {job?.profession}
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
      <div className="jobs">
        <div className="container">
          <div className="jobs-inner">
            <div className="jobs-inner__hero">
              <h2 className="jobs-title">Jobs</h2>
              <p className="jobs-text">Find your dream job</p>
            </div>
            <div className="jobs-inner__hero jobs-inputs">
              <input
                className="jobs-inner__input"
                type="text"
                name="job"
                placeholder="The kind of job you want"
              />
              <select className="jobs-inner__select" name="location-job">
                <option disabled>Choose job location</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
              </select>
              <button className="jobs-inner__button">Search</button>
            </div>
          </div>
        </div>
      </div>
      {/* JOBS POSTS */}
      <div className="job-posts">
        <div className="container">
          <h3 className="job-posts__title">Latest added</h3>
          <div className="job-posts__inner">
            {mockJobsData.slice(0, visibleCards).map((job) => (
              <div
                onClick={() => setJob(job)}
                className="job-posts__static"
                key={job.id}
              >
                <div className="job-posts__card">
                  <div className="inner-wrapper">
                    <img src={job?.img} alt="flag country" />
                    <div className="job-posts__items">
                      <h3 className="job-posts__company">{job.company}</h3>
                      <p className="job-posts__location">{job.location}</p>
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
                  <h4 className="job-posts__profession">{job.profession}</h4>
                  <div className="job-post__wrapper">
                    <p className="job-posts__text">{job.description}</p>
                  </div>
                  <span className="job-posts__skills">Skills:</span>
                  <ul className="job-posts__list">
                    {job.skills.map((skill, index) => (
                      <li className="job-posts__item" key={index}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Info block */}
                <div className="info-block">
                  <ul className="info-list">
                    {job.info.map((info, index) => (
                      <li className="info-item" key={index}>
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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
              {job ? (
                <div className="more-upper">
                  <div className="more-inner">
                    <h3 className="more-title">Job Details</h3>
                    <div className="more-wrapper__img">
                      <img
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
                        className="more-adjust__img"
                        src={job?.img}
                        alt="flag more"
                      />
                      <div className="more-info">
                        <h4 className="more-info__company">{job.company}</h4>
                        <span className="more-info__location">
                          {job.location}
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
                    <h3 className="more-down__title">
                      Lead Backend developer-Part time
                    </h3>
                    <div className="more-down__text">
                      <p className="more-down__desc">{job.description}</p>
                      <div className="more-down__outer">
                        <p className="more-down__skills">Skills:</p>
                        <ul className="more-down__list">
                          {/* <li className="more-down__item">
                            Software development
                          </li>
                          <li className="more-down__item">MySQL databases</li>
                          <li className="more-down__item">Node.js</li> */}
                          {job.skills.map((skill, index) => (
                            <li className="more-down__item" key={index}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="more-down__more">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitationLorem ipsum dolor sit amet, consectetur
                        adipiscing elit sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation
                      </p>
                    </div>
                    {/* More down - Job requirements */}
                    <div className="job-req">
                      <ul className="job-req__list">
                        {/* <li className="job-req__item">In-office</li>
                        <li className="job-req__item">Contract</li>
                        <li className="job-req__item">120K - 140K USD</li> */}
                        {job.info.map((info, index) => (
                          <li className="job-req__item" key={index}>
                            {info}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => setModal(true)}
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

          {/* Load more button */}
          {visibleCards < mockJobsData.length && (
            <button
              className="load-more__btn"
              type="button"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </>
  );
};

// when this button onclick make page darker for modal show noticable
// <button
                  //   onClick={() => setModal(true)}
                  //   className="more-upper__applyBtn"
                  // >
                  //   Apply for this job
                  // </button>