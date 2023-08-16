import React, { useEffect } from "react";
import "./CompanyProfile.scss";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClipboardCheck,
  faCog,
  faStopwatch,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Space, Menu } from "antd";

const dropdownMenu = (
  <Menu>
    {/* <Menu.Item key="1">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    </Menu.Item> */}
    <Menu.Item key="2">Change profile</Menu.Item>
    <Menu.Item key="3">Settings</Menu.Item>
    <Menu.Item key="4" danger>
      Log out
    </Menu.Item>
  </Menu>
);

export const CompanyProfile = () => {
  const navigate = useNavigate();
  function navigation() {
    //* Automatically takes to route
    navigate("jobs/openpaused");
  }

  useEffect(() => {
    navigation();
  }, []);
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
              <span className="com-profile__company">
                <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                  <a
                    className="profile__com"
                    onClick={(e) => e.preventDefault()}
                  >
                    HP
                  </a>
                </Dropdown>
              </span>
            </div>
          </div>
          {/* Inner section */}
          <div className="sidebar">
            <div className="sidebar__inner">
              <ul className="sidebar__list">
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
