import React, { useState } from "react";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";
import { Dropdown, Menu, Modal } from "antd";
import "./ComHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import ProfileService from "../../API/CompanyProfile.service";
//* Context
import { useCompanyProfile } from "../../context/CompanyProfileContext";

export const ComHeader = () => {
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [terminateModalVisible, setTerminateModalVisible] = useState(false);

  //* FROM CONTEXT
  const companyProfile = useCompanyProfile();
  const companyName = companyProfile?.companyName;
  const firstCharacter = companyName?.charAt(0);
  const lastCharacter = companyName?.charAt(companyName.length - 1);
  const mixedCharacter = firstCharacter + lastCharacter;

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const showTerminateModal = () => {
    setTerminateModalVisible(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const handleCancelTerminate = () => {
    setTerminateModalVisible(false);
  };

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    handleLogOut();
  };

  const handleConfirmTerminate = async () => {
    try {
      await ProfileService.profileDelete();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log("Error terminating account:", error);
    }
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="2">
        <Link to="/profile">Change profile</Link>
      </Menu.Item>
      <Menu.Item onClick={showLogoutModal} key="4" danger>
        Log out
      </Menu.Item>
      <Menu.Item onClick={showTerminateModal} key="5" danger>
        Terminate account
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
              {mixedCharacter} 
              {/* Accepts string, not working */}
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
      <Modal
        title="⚠Warning: Irreversible Action"
        visible={terminateModalVisible}
        onCancel={handleCancelTerminate}
        onOk={handleConfirmTerminate}
      >
        <p>Are you sure you want to terminate your account?</p>
      </Modal>
    </div>
  );
};
