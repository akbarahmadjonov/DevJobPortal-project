import React, { useState } from "react";
import "./Jobs.scss";

// Images
import Flag from "../../Assets/Images/jobs-hero-card_flag.png";
import SaveButton from "../../Assets/Images/jobs-posts_save.svg";

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
          <div className="job-posts__inner"></div>
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