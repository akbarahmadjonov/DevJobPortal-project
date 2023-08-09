import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Jobs.scss'

export const JobsNested = () => {
  return (
    <div className="job-nested">
      <div className="job-nested__inner">
        <h1 className="job-nested__title">Jobs</h1>
        <button className="job-nested__button">
          <FontAwesomeIcon
            className="icon"
            icon={faPlus}
            style={{ color: "#fff" }}
          />{" "}
          Create a job
        </button>
      </div>
    </div>
  );
};
