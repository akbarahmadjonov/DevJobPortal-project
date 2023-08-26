import React, { useEffect, useState } from "react";
import "./OpenPaused.scss";
import { VscFolderActive } from "react-icons/vsc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsHeadphones } from "react-icons/bs";
import { FaPeopleGroup, FaPodcast } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { Select } from "antd";
import { Dropdown, Menu } from "antd";
import JobService from "../../../../../API/Jobs.service";

export const OpenPaused = () => {
  const [companyJob, setCompanyJob] = useState([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await JobService.jobGet();
      setCompanyJob(response.data.posts);
      console.log(response);
    } catch (error) {
      console.error("Error occurred while fetching user profile", error);
    }
  };
  const deleteJob = async (id) => {
    try {
      await JobService.jobDelete(id);
      // After deleting the job, manually update the state
      setCompanyJob((prevCompanyJob) =>
        prevCompanyJob.filter((job) => job._id !== id)
      );
    } catch (error) {
      console.error("Error occurred while deleting job", error);
    }
  };

  const dropdownMenu = (jobId) => (
    <Menu>
      <Menu.Item key="1" danger onClick={() => deleteJob(jobId)}>
        Delete this job
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="open-paused">
      <div className="container">
        {companyJob.length > 0 ? (
          <div>
            {companyJob.map((data) => (
              <div className="open-paused__inner" key={data._id}>
                <div className="open-paused__block">
                  <h2 className="job__title">{data.jobTitle}</h2>
                  <span className="job__createdTime">Created: June 1</span>
                </div>
                <div className="open-paused__box">
                  <div className="open-paused__block">
                    <div className="open-paused__box-outer">
                      <VscFolderActive
                        style={{ color: "#0050C8", fontSize: "23px" }}
                      />
                      <span>Active</span>
                      <span>0</span>
                    </div>
                  </div>
                  <div className="open-paused__block">
                    <div className="open-paused__box-outer">
                      <GiSandsOfTime
                        style={{ color: "#0050C8", fontSize: "23px" }}
                      />
                      <span>Proposed</span>
                      <span>0</span>
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
                    style={{
                      width: "120px",
                      borderBottom: "1px solid #d9d9d9",
                    }}
                    onChange={handleChange}
                    options={[{ value: "Paused" }]}
                  />
                </div>
                <div className="open-paused__block">
                  <Dropdown
                    overlay={dropdownMenu(data._id)}
                    trigger={["click"]}
                  >
                    <div
                      onClick={(e) => e.preventDefault()}
                      className="open-paused__dotsIcon"
                    >
                      <BsThreeDots
                        style={{ color: "#0050C8", fontSize: "23px" }}
                      />
                    </div>
                  </Dropdown>
                </div>
              </div>
            ))}
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
