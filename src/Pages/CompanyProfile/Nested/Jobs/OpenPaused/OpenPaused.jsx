import React from "react";
import "./OpenPaused.scss";
import { VscFolderActive } from "react-icons/vsc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsHeadphones } from "react-icons/bs";
import { FaPeopleGroup, FaPodcast } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { Select } from "antd";
import { Dropdown, Menu } from "antd";
import { useEffect } from "react";
import JobService from "../../../../../API/Jobs.service";
import { useState } from "react";

export const OpenPaused = () => {
  const [companyJob, setCompanyJob] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="1" danger>
        Delete this job
      </Menu.Item>
    </Menu>
  );

  //* GET REQUEST | FETCH
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await JobService.jobGet();
        console.log(response);
        setCompanyJob(response.data?.data.posts);
      } catch (error) {
        console.error("Error occurred while fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="open-paused">
      <div className="container">
        {companyJob ? (
          <div className="open-paused__inner">
            <div className="open-paused__block">
              <h2 className="job__title">{companyJob?.jobTitle}</h2>
              <span className="job__createdTime">Created: June 1</span>
            </div>
            <div className="open-paused__box">
              <div className="open-paused__block">
                <div className="open-paused__box-outer">
                  <VscFolderActive
                    style={{ color: "#0050C8", fontSize: "23px" }}
                  />
                  <span>Active</span>
                  <span>4</span>
                </div>
              </div>
              <div className="open-paused__block">
                <div className="open-paused__box-outer">
                  <GiSandsOfTime
                    style={{ color: "#0050C8", fontSize: "23px" }}
                  />
                  <span>Proposed</span>
                  <span>4</span>
                </div>
              </div>
              <div className="open-paused__block">
                <div className="open-paused__box-outer">
                  <BsHeadphones
                    style={{ color: "#0050C8", fontSize: "23px" }}
                  />
                  <span>Interview</span>
                  <span>0</span>
                </div>
              </div>
              <div className="open-paused__block">
                <div className="open-paused__box-outer">
                  <FaPeopleGroup
                    style={{ color: "#0050C8", fontSize: "23px" }}
                  />
                  <span>Hired</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="open-paused__disQua">
              <HiOutlineDesktopComputer
                style={{ color: "#0050C8", fontSize: "23px" }}
              />
              <span>Disqualified</span>
              <span>0</span>
            </div>
            <div className="open-paused__block">
              <Select
                defaultValue="Paused"
                style={{ width: "120px", borderBottom: "1px solid #d9d9d9" }}
                onChange={handleChange}
                options={[{ value: "Paused" }]}
              />
            </div>
            <div className="open-paused__block">
              <Dropdown overlay={dropdownMenu} trigger={["click"]}>
                <div
                  onClick={(e) => e.preventDefault()}
                  className="open-paused__dotsIcon"
                >
                  <BsThreeDots style={{ color: "#0050C8", fontSize: "23px" }} />
                </div>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div className="open-paused__nojob">
            <FaPodcast style={{ color: "#0050C8", fontSize: "23px" }} />
            <h2 className="open-paused__sub">No jobs created yet!</h2>
            <span>Open Doors: Post Your Job using the button above!</span>
          </div>
        )}
      </div>
    </div>
  );
};
