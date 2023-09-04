import React, { useEffect, useRef, useState } from "react";

import { Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../Widgets";
import axios from "axios";
// Images
import SaveButton from "../../Assets/Images/jobs-posts_save.svg";
import Layer from "../../Assets/Images/layer.png";
import Cancel from "../../Assets/Images/X-icon.svg";
import Header from "../../Widgets/Header/Header";
import closeButton from "../../Assets/Icons/close-btn.svg";
import errorIcon from "../../Assets/Icons/error.svg";
import "./Jobs.scss";

export const Jobs = () => {
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [jobCard, setJobCard] = useState(null);
  const [jobCardOpen, setJobCardOpen] = useState(false);
  const [locations, setLocations] = useState(null);
  const [modal, setModal] = useState(false);
  const [jobsSearch, setJobsSearch] = useState("");
  const [locationOption, setLocationOption] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);
  const [placeholderSelect, setPlaceholderSelect] = useState(false);
  const [jobIdAlpha, setJobIdAplha] = useState();

  const targetRef = useRef(null);

  const url = "https://job-px4t.onrender.com/api";
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
  let currentTodos = todos?.slice(indexOfFirstTodo, indexOfLastTodo);

  //User data

  const userData = JSON.parse(localStorage?.getItem("userData"));

  // Refreshes the current jobs
  // const search = () => {
  //   currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  //   return;
  // };

  function handleLoadMore() {
    setState((prevState) => ({
      ...prevState,
      todosPerPage: todosPerPage + 3,
    }));
    if (todosPerPage + 3 >= todos?.length) {
      return setShowBtnLoadMore(false);
    }
  }
  // Pagination end
  // Get Jobs
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${url}/job`
        // {
        //   headers:{
        //     token:localStorage.getItem("token"),
        //   }
        // }
      )
      .then((data) => {
        console.log(data);
        // setJobs(data?.data?.posts);
        setState((prevState) => ({
          ...prevState,
          todos: data?.data,
        }));
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        // setLoading(false)
      });
  }, []);

  // Get Jobs Location
  useEffect(() => {
    axios
      .get(`${url}/job/location`)
      .then((data) => {
        setLocations(data.data);
        setState((prevState) => ({
          ...prevState,
          todos: data.data,
        }));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        // setLoading(false)
      });
  }, []);

  //Using this var on modal apply as well. So made it global

  let jobId = "";

  // Get Job Info
  const handleCardClick = (evt) => {
    evt.preventDefault();
    setLoading(true);
    setJobCardOpen(true);

    targetRef.current.scrollIntoView({ behavior: "smooth" });

    jobId = evt?.target?.dataset?.id;

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
    setJobIdAplha(jobId);
    setLoading(true);

    axios
      .get(`${url}/job/${jobId}`)
      .then((data) => {
        setJobCard(data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setLoading(false);
      });
  };

  const handleSearchInput = (evt) => {
    if (evt.target.value !== "") {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }

    setJobsSearch(evt.target.value);
  };

  const handleSelectInput = (evt) => {
    if (evt.target.value !== "") {
      setPlaceholderSelect(true);
    } else {
      setPlaceholderSelect(false);
    }

    setLocationOption(evt.target.value);
  };

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    setJobCardOpen(false);
    setLoading(true);
    axios
      .get(`${url}/job/search`, {
        params: { comLocation: locationOption, jobTitle: jobsSearch },
      })
      .then((data) => {
        // if(jobsSearch===''){
        //   console.log('NO')
        //   setShowBtnLoadMore()
        // }
        setJobs(data.data);
        setState((prevState) => ({
          ...prevState,
          todos: data.data,
        }));
        setShowBtnLoadMore(false);
        // currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        // currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setLoading(false);
      });
  };

  const handleApply = () => {
    const verified = localStorage.getItem("verify");
    if (verified) {
      if (JSON.parse(verified) === true) return setModal(true);
    } else navigate("/user/login");
  };

  const [applyFile, setApplyFile] = useState(null);

  const handleFileUpload = async (evt) => {
    if (evt.target.files) {
      setApplyFile(evt.target.files[0]);
    }
  };

  const handleApplySubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    axios
      .post(
        `${url}/user/apply`,
        {
          jobId: jobIdAlpha,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setModal(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //* Handles more button event
  // const handleLoadMore = () => {
  //   setVisibleCards((prevVisibleCards) => prevVisibleCards + 5);
  // };

  if (error)
    return (
      <p className="error">
        <img src={errorIcon} alt="error" />
        Something went wrong. Try again...
      </p>
    );

  return (
    <>
      {/* Backdrop Loader */}

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* JOBS */}
      {modal && (
        <div className="jobs__modal">
          <div className="jobs__modal-content">
            <div className="jobs__modal-header">
              <p className="jobs__modal-title">Apply for the job?</p>
              <button
                type="button"
                className="xIcon"
                onClick={() => setModal(false)}
              >
                <img width={24} height={24} src={closeButton} alt="close" />
              </button>
            </div>
            <div className="jobs__modal-info-wrapper">
              <p className="jobs__modal-text">
                Your profile will be shared with the company you are applying
                for.
              </p>
              <strong>Increase your change to get this job</strong>
              <p>Complete your profile and take assessment of your skill</p>
            </div>
            <div className="jobs__modal-footer">
              <form onSubmit={handleApplySubmit} className="jobs__modal-form">
                <button
                  onClick={() => setModal(false)}
                  type="button"
                  className="jobs__form-button"
                >
                  <span className="jobs__form-button-text">Cancel</span>
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className={`jobs__form-button jobs__form-button-1 ${
                    loading && "jobs__form-button--loading"
                  }`}
                >
                  <span
                    style={{ color: "#FFF" }}
                    className="jobs__form-button-text"
                  >
                    {loading ? "Applying..." : "Submit"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
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
              <div className="placeholder-wrap input-wrap">
                <input
                  onChange={handleSearchInput}
                  className="jobs-inner__input"
                  type="text"
                  name="job"
                />
                <span
                  style={placeholder ? { display: "none" } : {}}
                  class="placeholder"
                >
                  <b class="placeholder-important">What </b> The kind of job you
                  want
                </span>
              </div>
              <div className="placeholder-wrap">
                <select
                  onChange={handleSelectInput}
                  // onChange={(e) => setLocationOption(e.target.value)}
                  className="jobs-inner__select"
                  name="location-job"
                >
                  {/* <option value="" disabled selected hidden>
                  <b className="placeholder-important">Where </b> Choose job location
                </option> */}
                  <option hidden selected disabled value=""></option>
                  <option value="All">All locations</option>
                  {locations?.map((loc) => (
                    <option key={loc.id} value={loc.location}>
                      {loc.location}{" "}
                    </option>
                  ))}
                </select>
                <span
                  style={placeholderSelect ? { display: "none" } : {}}
                  class="placeholder"
                >
                  <b class="placeholder-important">Where </b> Choose your
                  location
                </span>
              </div>

              <button type="submit" className="jobs-inner__button">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* JOBS POSTS */}
      <div className="job-posts">
        <div ref={targetRef} className="container jobs-container">
          <h3 className="job-posts__title">Latest added</h3>
          {currentTodos?.length > 0 ? (
            <div className="job-posts__inner-wrapper">
              {/* Pagination */}
              {/* <div className="flex  items-center flex-col justify-between w-full"> */}
              <div className="job-post__left">
                <ul
                  style={
                    jobCardOpen
                      ? {
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }
                      : {}
                  }
                  className="job-posts__inner"
                >
                  {currentTodos?.length &&
                    currentTodos?.map((job) => (
                      <li key={job?._id}>
                        <div
                          data-id={job?._id}
                          id={job?._id}
                          onClick={handleCardClick}
                          className="job-posts__static"
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
                                    width={14}
                                    height={14}
                                  />
                                  <span className="save-button__text">
                                    save
                                  </span>
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
                            {/* <ul className="job-posts__list">
                              {job?.jobSkills?.map((skill) => (
                                <li className="job-posts__item" key={skill._id}>
                                  {skill.skillName}
                                </li>
                              ))}
                            </ul> */}
                          </div>
                          {/* Info block */}
                          <div className="info-block">
                            <ul className="info-list">
                              <li className="info-item">{job?.jobType}</li>
                              <li className="info-item">
                                {job?.jobCooperate ? "Contract" : "Intern"}
                              </li>

                              <li className="info-item">
                                {job?.jobPrice?.toString().substr(0, 6)}.
                                {job?.moneyTypeId?.moneyType}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
                {showBtnLoadMore ? (
                  <button
                    onClick={() => handleLoadMore()}
                    className="job__load-more-button"
                  >
                    Load More
                  </button>
                ) : (
                  ""
                )}
              </div>
              {/* Card more info */}
              <div className="job-post__right">
                {jobCardOpen ? (
                  <div className="job-more-wrapper">
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
                          {loading ? (
                            ""
                          ) : (
                            <img
                              width={48}
                              height={48}
                              className="more-adjust__img"
                              src={jobCard?.comImg}
                              alt="flag more"
                            />
                          )}
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
                        <h3 className="more-down__title">
                          {jobCard?.jobTitle}
                        </h3>
                        <div className="more-down__text">
                          <p className="more-down__desc">{jobCard?.jobInfo}</p>
                          <div className="more-down__outer">
                            <p className="more-down__skills">Skills:</p>
                            <ul className="more-down__list">
                              {/* {jobCard?.jobSkills.map((skill) => (
                                <li
                                  className="more-down__item"
                                  key={skill?._id}
                                >
                                  {skill?.skillName}
                                </li>
                              ))} */}
                            </ul>
                          </div>
                          <p className="more-down__more">
                            {jobCard?.moreInfo[0]?.jobText}
                          </p>
                        </div>
                        {/* More down - Job requirements */}
                        <div className="job-req">
                          <ul className="job-req__list">
                            <li className="job-req__item">
                              {jobCard?.jobType}
                            </li>
                            <li className="job-req__item">
                              {jobCard?.jobCooperate ? "Contract" : "Intern"}
                            </li>
                            <li className="job-req__item">
                              {jobCard?.jobPrice}&nbsp;
                              {jobCard?.moneyTypeId?.moneyType}
                            </li>
                          </ul>
                        </div>
                        <button
                          onClick={handleApply}
                          className="more-upper__applyBtn"
                        >
                          Apply for this job
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="job-posts__static job-posts__static-view compatible ">
                    <img
                      className="layer-img"
                      src={Layer}
                      alt="Layer img"
                      width={145}
                    />
                    <p className="preview__text">
                      Click on a job to preview its full job details here
                    </p>
                  </div>
                )}
              </div>

              {/* </div> */}
            </div>
          ) : (
            //* Shows this message if no any job
            <p className="no-results-message">
              No jobs found matching your search criteria.
            </p>
          )}
        </div>
      </div>
      <div className="jobs__footer-container">
        <Footer />
      </div>
    </>
  );
};
