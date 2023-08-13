import React from "react";
import "./CompanyProfile.scss";
import BellIcon from "../../Assets/Images/admin/bell-icon.png";

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
        </div>
      </div>
    </>
  );
};
