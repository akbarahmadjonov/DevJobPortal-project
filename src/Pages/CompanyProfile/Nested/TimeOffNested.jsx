import React from "react";
import "./TimeOff.scss";
import { FaSuitcase } from "react-icons/fa";

export const TimeOffNested = () => {
  return (
    <div className="timeoff">
      <div className="timeoff__inner">
        <h1 className="timeoff__title">Time Off</h1>
      </div>
      <div className="timeoff__outer"></div>
      {/* Jobs section */}
      <div className="timeoff__hired">
        <FaSuitcase style={{ color: "#0050C8", fontSize: "23px" }} />
        <h2 className="timeoff__hired-title">No developer hired yet!</h2>
      </div>
    </div>
  );
};
