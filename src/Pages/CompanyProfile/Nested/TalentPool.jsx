import React from "react";
import "./TalentPool.scss";
import { Button, Select } from "antd";
import { NavLink, Outlet } from "react-router-dom";

export const TalentPool = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="talentpool">
      <div className="talentpool__inner">
        <h1 className="talentpool__title">Talent Pool</h1>
        <div className="talentpool__form">
          <Select
            style={{ borderBottom: "1px solid #0050c8" }}
            className="talentpool_select-ant"
            defaultValue="Skills"
            onChange={handleChange}
            options={[{ value: "Paused" }]}
          />
          <Select
            style={{ borderBottom: "1px solid #0050c8" }}
            className="talentpool_select-ant"
            defaultValue="Total experience"
            onChange={handleChange}
            options={[{ value: "Paused" }]}
          />
          <Select
            style={{ borderBottom: "1px solid #0050c8" }}
            className="talentpool_select-ant"
            defaultValue="All"
            onChange={handleChange}
            options={[{ value: "Paused" }]}
          />
          <Button className="jobsTalentButtons">Search</Button>
        </div>
      </div>
      {/* Tab router */}
      <div className="tab__router">
        <NavLink className="tab__links" to={"all"} activeClassName="active">
          <h3 className="tab__innerTitle">All</h3>
        </NavLink>
        <NavLink className="tab__links" to={"saved"} activeClassName="active">
          <h3 className="tab__innerTitle">Saved</h3>
        </NavLink>
        <NavLink className="tab__links" to={"opened"} activeClassName="active">
          <h3 className="tab__innerTitle">Opened</h3>
        </NavLink>
        <NavLink
          className="tab__links"
          to={"proposed"}
          activeClassName="active"
        >
          <h3 className="tab__innerTitle">Proposed</h3>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
