import React, { useEffect, useState } from "react";
import "./OpenPaused.scss";
import { VscFolderActive } from "react-icons/vsc";
import { GiSandsOfTime } from "react-icons/gi";
import { BsHeadphones } from "react-icons/bs";
import { FaPeopleGroup, FaPodcast } from "react-icons/fa6";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { Button, Input, Modal, Select, Skeleton, message } from "antd";
import { Dropdown, Menu } from "antd";
import JobService from "../../../../../API/Jobs.service";
import { useJobContext } from "../../../../../context/JobContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const OpenPaused = () => {
  const { companyJob, setCompanyJob } = useJobContext();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [updatedJobData, setUpdatedJobData] = useState({});
  const [strangeState, setStrangeState] = useState({});
  const [skillStext, setSkillsText] = useState({});
  const [moreInfoText, setMoreInfoText] = useState({});
  const [typeOfMoney, setTypeOfMoney] = useState({});
  const [openLoader, setOpenLoader] = useState(false);

  // Delete success notification
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a prompt message with custom className and style",
      className: "custom-class",
      style: {
        marginTop: "200vh",
      },
    });
  };

  //* EDIT MODAL
  // Function to open the view modal
  const handleOpenViewModal = (job) => {
    setSelectedJob(job);
    setViewModalVisible(true);
  };

  // Function to open the edit modal
  const handleOpenEditModal = async (jobId) => {
    setSelectedJob({});
    setOpenLoader(true);
    const getByID = await JobService.jobGetByID(jobId);
    getByID.data ? setSelectedJob(getByID.data) : setSelectedJob({});
    setUpdatedJobData(getByID.data || {});
    if (getByID.data) {
      let combinedSkills = getByID.data.jobSkills.skillName?.join(",");
      setMoreInfoText({
        ...moreInfoText,
        id: getByID.data.moreInfo[0]._id,
        moreInfo: getByID.data.moreInfo[0].jobText,
      });
      setTypeOfMoney({
        ...typeOfMoney,
        id: getByID.data.moneyTypeId?._id,
        moneyText: getByID.data.moneyTypeId?.moneyType,
      });
      setSkillsText({
        ...skillStext,
        id: getByID.data.jobSkills._id,
        skills: combinedSkills,
      });
    }
    // setStrangeState({
    //   ...strangeState,
    //   jobSkills: combinedSkills?.join(','),
    // })
    setEditModalVisible(true);
    setOpenLoader(false);
  };

  // Function to close the view modal
  const handleCloseViewModal = () => {
    setSelectedJob({});
    setViewModalVisible(false);
  };

  // Function to close the edit modal
  const handleCloseEditModal = () => {
    setSelectedJob({});
    setEditModalVisible(false);
  };

  const handleOpenModal = async (job) => {
    setOpenLoader(true);
    const getByID = await JobService.jobGetByID(job);
    getByID.data ? setSelectedJob(getByID.data) : setSelectedJob({});
    // setSelectedJob(getByID?.data);

    setModalVisible(true);
    setOpenLoader(false);
  };

  const handleCloseModal = () => {
    setSelectedJob({});
    setModalVisible(false);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await JobService.jobGet();
      setCompanyJob(response.data?.posts);
      setLoading(false);
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
      message.success("Successfully deleted post");
    } catch (error) {
      console.error("Error occurred while deleting job", error);
    }
  };

  const handleEditJob = async (e, _id) => {
    e.preventDefault();
    try {
      let updateJobObj = {
        comImg: updatedJobData?.comImg,
        comName: updatedJobData?.comName,
        comLocation: updatedJobData?.comLocation,
        jobTitle: updatedJobData?.jobTitle,
        jobInfo: updatedJobData?.jobInfo,
        jobType: updatedJobData?.jobType,
        jobPrice: updatedJobData?.jobPrice,
        jobskillsId: skillStext.id,
        jobskills: skillStext.skills?.split(/[ ,]+/),
        moreInfoId: moreInfoText.id,
        moreInfo: moreInfoText.moreInfo,
        typeMoneyId: typeOfMoney.id,
        typeMoney: typeOfMoney.moneyText,
      };
      let { data } = await JobService.jobEdit(selectedJob._id, updateJobObj);
      if (data) {
        message.success("Successfully edited post");
      }
      handleCloseEditModal();
    } catch (error) {
      console.error("Error occurred while updating job", error);
    }
  };

  const dropdownMenu = (jobId) => (
    <Menu onClick={(e) => e.domEvent.stopPropagation()}>
      <Menu.Item key="1" onClick={() => handleOpenEditModal(jobId)}>
        Edit this post
      </Menu.Item>
      <Menu.Item key="2" danger>
        <Popconfirm
          title="Delete this job?"
          onConfirm={() => deleteJob(jobId)}
          onCancel={() => message.info("Job deletion canceled.")}
          okText="Yes"
          cancelText="No"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          Delete this job
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const formatCreatedAt = (createdAt) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: "100%",
        }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="open-paused open-paused__scroll">
        {contextHolder}
        <div className="container">
          {loading ? (
            <Skeleton active />
          ) : companyJob?.length > 0 ? (
            <div>
              {companyJob?.map((data) => (
                <div
                  className="open-paused__inner"
                  key={data._id}
                  onClick={() => handleOpenModal(data._id)}
                >
                  <div className="open-paused__block">
                    <h2 className="job__title">{data?.jobTitle}</h2>
                    <span className="job__createdTime">
                      Created: {formatCreatedAt(data?.createdAt)}
                    </span>
                  </div>
                  <div className="open-paused__box">
                    <div className="open-paused__block">
                      <div className="open-paused__box-outer">
                        <VscFolderActive
                          style={{ color: "#0050C8", fontSize: "23px" }}
                        />
                        <span>Active</span>
                        <span>{companyJob?.length}</span>
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
                      defaultValue="Active"
                      style={{
                        width: "120px",
                        borderBottom: "1px solid #d9d9d9",
                      }}
                      onChange={handleChange}
                      onClick={(e) => e.stopPropagation()}
                      options={[{ value: "Active" }, { value: "Paused" }]}
                    />
                  </div>
                  <div className="open-paused__block">
                    <Dropdown
                      overlay={dropdownMenu(data._id)}
                      trigger={["click"]}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <div className="open-paused__dotsIcon">
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
        <Modal
          visible={modalVisible}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          <div className="modal-wrapper">
            <h1
              style={{ display: "flex", alignItems: "center" }}
              className="modal-upper__title"
            >
              {`Detailed "${selectedJob?.jobTitle}" post`}
              <span className="job__createdTime selectedJobTime">
                Created: {formatCreatedAt(selectedJob?.createdAt)}
              </span>
            </h1>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Company Image</span>
                <img
                  src={selectedJob?.comImg}
                  width={100}
                  alt="company image"
                />
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Company Name</span>
                <p>{selectedJob?.comName}</p>
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Company Location</span>
                <p>{selectedJob?.comLocation}</p>
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Job Title</span>
                <p>{selectedJob?.jobTitle}</p>
              </div>
            </div>
            <div className="modal-">
              <div className="modal-values">
                <span className="modal-title">Job Info</span>
                <p>{selectedJob?.jobInfo}</p>
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Job Type (Online & Offline)</span>
                <p>{selectedJob?.jobType}</p>
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Job Price</span>
                <p>{selectedJob?.jobPrice}</p>
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Job Skills</span>
                {selectedJob?.jobSkills?.skillName?.map((skill) => {
                  return <p>{skill}</p>;
                })}
              </div>
            </div>
            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">Currency Type</span>
                <p>{selectedJob?.moneyTypeId?.moneyType}</p>
              </div>
            </div>

            <div className="modal-inner">
              <div className="modal-values">
                <span className="modal-title">More Info</span>
                {selectedJob?.moreInfo?.map((info) => {
                  return <p>{info.jobText}</p>;
                })}
              </div>
            </div>
          </div>
          <div></div>
        </Modal>
        {/* Edit Job Details Modal */}
        <Modal
          visible={editModalVisible}
          onCancel={handleCloseEditModal}
          footer={null}
          width={800}
        >
          <form onSubmit={(e) => handleEditJob(e)}>
            <div className="modal-values">
              <span className="modal-title">Company Image</span>
              {/* <input
                className="modal-values__input"
                value={updatedJobData.comImg}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    comImg: e.target.value,
                  })
                }
              /> */}
              Is being integrated
            </div>
            <div className="modal-values">
              <span className="modal-title">Company Name</span>
              <input
                className="modal-values__input"
                value={updatedJobData.comName}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    comName: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Company Location</span>
              <input
                className="modal-values__input"
                value={updatedJobData.comLocation}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    comLocation: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Job Title</span>
              <input
                className="modal-values__input"
                value={updatedJobData.jobTitle}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    jobTitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Job Info</span>
              <input
                className="modal-values__input"
                value={updatedJobData.jobInfo}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    jobInfo: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Skills</span>
              <input
                className="modal-values__input"
                value={skillStext.skills}
                onChange={(e) =>
                  setSkillsText({
                    ...skillStext,
                    skills: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">More Info</span>
              <input
                className="modal-values__input"
                value={moreInfoText.moreInfo}
                onChange={(e) =>
                  setMoreInfoText({
                    ...moreInfoText,
                    moreInfo: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Currency Type</span>
              <input
                className="modal-values__input"
                value={typeOfMoney.moneyText}
                onChange={(e) =>
                  setTypeOfMoney({
                    ...typeOfMoney,
                    moneyText: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Job Type</span>
              <input
                className="modal-values__input"
                value={updatedJobData.jobType}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    jobType: e.target.value,
                  })
                }
              />
            </div>
            <div className="modal-values">
              <span className="modal-title">Job Price</span>
              <input
                className="modal-values__input"
                value={updatedJobData.jobPrice}
                onChange={(e) =>
                  setUpdatedJobData({
                    ...updatedJobData,
                    jobPrice: e.target.value,
                  })
                }
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
