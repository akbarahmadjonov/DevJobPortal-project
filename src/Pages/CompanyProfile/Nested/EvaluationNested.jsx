import React from "react";
import "./Evaluation.scss";
import { NavLink, Outlet } from "react-router-dom";

export const Evaluation = () => {
  return (
    <div className="evaluation">
      <div className="evaluation__inner">
        <h1 className="evaluation__title">Evaluation</h1>
      </div>
      <div className="tab__router">
        <NavLink className="tab__links" to={"pending"} activeClassName="active">
          <h3 className="tab__innerTitle">Pending</h3>
        </NavLink>
        <NavLink
          className="tab__links"
          to={"completed"}
          activeClassName="active"
        >
          <h3 className="tab__innerTitle">Completed</h3>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
