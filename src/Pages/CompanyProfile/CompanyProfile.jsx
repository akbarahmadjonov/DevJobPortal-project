import React from "react";
import "./CompanyProfile.scss";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClipboardCheck,
  faCog,
  faPlus,
  faStopwatch,
  faUser,
  faUserAlt,
  faUserAltSlash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Space } from "antd";

export const CompanyProfile = () => {
  return (
    <>
      <div className="com-profile">
        <div className="container">
          <div className="com-profile__inner">
            <h1 className="text-[#0050C8] text-[20px] font-bold">
              TheJobportal
            </h1>
            <div className="com-profile__bar">
              <div className="bell-wrapper">
                <img
                  className="com-profile__bell"
                  src={BellIcon}
                  alt="bell-icon"
                  width={25}
                  height={25}
                />
              </div>
              <div className="borderHeight"></div>
              <span className="com-profile__company">HP</span>
            </div>
          </div>
          {/* Inner section */}
          <div className="sidebar">
            <div className="sidebar__inner">
              <ul className="sidebar__list">
                <Link className="sidebar__item" to={"jobs"}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faBriefcase}
                    style={{ color: "#0050C8" }}
                  />{" "}
                  Jobs
                </Link>
                <Link className="sidebar__item" to={"timeoff"}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faStopwatch}
                    style={{ color: "#0050C8" }}
                  />
                  Time Off
                </Link>
                <Link className="sidebar__item" to={"evaluation"}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faClipboardCheck}
                    style={{ color: "#0050C8" }}
                  />
                  Evaluation
                </Link>
                <Link className="sidebar__item" to={"talentpool"}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faUserGroup}
                    style={{ color: "#0050C8" }}
                  />{" "}
                  Talent Pool
                </Link>
                <Link className="sidebar__item" to={"/"}>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faCog}
                    style={{ color: "#0050C8" }}
                  />{" "}
                  Settings
                </Link>
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
