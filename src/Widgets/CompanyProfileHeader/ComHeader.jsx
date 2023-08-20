import React, { useState } from "react";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";
import { Dropdown, Menu, Modal } from "antd";
import "./ComHeader.scss";
import { Link, useNavigate } from "react-router-dom";

export const ComHeader = () => {
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    handleLogOut();
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="2">
        <Link to="/profile">Change profile</Link>
      </Menu.Item>
      <Menu.Item onClick={showLogoutModal} key="4" danger>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="com-profile__inner">
      <Link to="/">
        <h1 className="text-[#0050C8] text-[20px] font-bold">TheJobportal</h1>
      </Link>
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
            <a className="profile__com" onClick={(e) => e.preventDefault()}>
              HP
            </a>
          </Dropdown>
        </span>
      </div>
      <Modal
        title="Confirm Log Out"
        visible={logoutModalVisible}
        onCancel={handleCancelLogout}
        onOk={handleConfirmLogout}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};
