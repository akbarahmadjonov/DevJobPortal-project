import React from "react";
import { FaPodcast } from "react-icons/fa6";
import "./Archived.scss";

export const Archived = () => {
  return (
    <div className="archived">
      <FaPodcast style={{ color: "#0050C8", fontSize: "23px" }} />
      <h2 className="archived__title">No jobs archived yet!</h2>
    </div>
  );
};
