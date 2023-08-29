import React, { useEffect } from "react";
import "./CompanyProfile.scss";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClipboardCheck,
  faCog,
  faStopwatch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { ComHeader } from "../../Widgets/CompanyProfileHeader/ComHeader";
import { useState } from "react";

export const CompanyProfile = () => {
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const navigate = useNavigate();
  function navigation() {
    //* Automatically takes to route
    navigate("jobs/openpaused");
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, []);

  useEffect(() => {
    navigation();
  }, []);
  return (
    <>
      <div className="com-profile">
        <div className="container">
          <ComHeader />
          {/* Inner section */}
          <div className="sidebar">
            <div className="sidebar__inner">
              <ul className="sidebar__list">
                {isLoading ? (
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 140, height: 24 }}
                  />
                ) : (
                  <NavLink
                    className="sidebar__item"
                    to={"jobs"}
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faBriefcase}
                      style={{ color: "#0050C8" }}
                      width={20}
                      height={20}
                    />{" "}
                    Jobs
                  </NavLink>
                )}
                {isLoading ? (
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 140, height: 24 }}
                  />
                ) : (
                  <NavLink
                    className="sidebar__item"
                    to={"timeoff"}
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faStopwatch}
                      style={{ color: "#0050C8" }}
                      width={20}
                      height={20}
                    />
                    Time Off
                  </NavLink>
                )}
                {isLoading ? (
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 140, height: 24 }}
                  />
                ) : (
                  <NavLink
                    className="sidebar__item"
                    to={"evaluation"}
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faClipboardCheck}
                      style={{ color: "#0050C8" }}
                      width={20}
                      height={20}
                    />
                    Evaluation
                  </NavLink>
                )}
                {isLoading ? (
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 140, height: 24 }}
                  />
                ) : (
                  <NavLink
                    className="sidebar__item"
                    to={"talentpool"}
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUserGroup}
                      style={{ color: "#0050C8" }}
                      width={20}
                      height={20}
                    />{" "}
                    Talent Pool
                  </NavLink>
                )}
                {isLoading ? (
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 140, height: 24 }}
                  />
                ) : (
                  <NavLink
                    className="sidebar__item"
                    to={"/"}
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      className="icon"
                      icon={faCog}
                      style={{ color: "#0050C8" }}
                      width={20}
                      height={20}
                    />{" "}
                    Settings
                  </NavLink>
                )}
              </ul>
              <div className="sidebar__out">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
