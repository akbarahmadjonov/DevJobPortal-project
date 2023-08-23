import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Input, Form } from "antd";
import JobService from "../../../API/Jobs.service";
import "./Jobs.scss";

export const JobsNested = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const jobDataRef = useRef({
    comImg: null,
    comName: "Hoca",
    comLocation: "South Korea",
    jobTitle: "Full Stack",
    jobInfo:
      "bizga kerak Full Stack Developer. chunki Full Stack sekin sekin ishga kirib bizning companyadan qochib o'tirdi. biz o'zimzni ishga sodiqmiz.",
    jobType: "of-online",
    jobPrice: 1000,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("comImg", jobDataRef.current.comImg);
    formData.append("comName", values.comName);
    formData.append("comLocation", values.comLocation);
    formData.append("jobTitle", values.jobTitle);
    formData.append("jobInfo", values.jobInfo);
    formData.append("jobType", values.jobType);
    formData.append("jobPrice", values.jobPrice);

    try {
      const response = await JobService.jobPost(formData);
      console.log("Job created successfully:", response);

      jobDataRef.current = {
        comImg: null,
        comName: "",
        comLocation: "",
        jobTitle: "",
        jobInfo: "",
        jobType: "",
        jobPrice: 0,
      };
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const comImgRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "comImg") {
      jobDataRef.current.comImg = files[0];
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigation();
  }, []);

  function navigation() {
    // Automatically takes to route
    navigate("openpaused");
  }

  return (
    <div className="job-nested">
      <div className="job-nested__inner">
        <h1 className="job-nested__title">Jobs</h1>
        <Button className="jobsTalentButtons" onClick={showModal}>
          <FontAwesomeIcon
            className="icon"
            icon={faPlus}
            style={{ color: "#fff" }}
          />{" "}
          Create a job
        </Button>
        <Modal
          title="Create Job"
          visible={isModalVisible}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form onFinish={handleSubmit}>
            <div className='job-nested__form'>
              <label htmlFor="comImg">Company Image</label>
              <Input
                type="file"
                id="comImg"
                name="comImg"
                onChange={handleInputChange}
                ref={comImgRef}
              />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="comName">Company Name</label>
              <Input name="comName" onChange={handleInputChange} />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="comLocation">Company Location</label>
              <Input name="comLocation" onChange={handleInputChange} />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="jobTitle">Job Title</label>
              <Input name="jobTitle" onChange={handleInputChange} />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="jobInfo">Job Info</label>
              <Input.TextArea
                name="jobInfo"
                rows={4}
                onChange={handleInputChange}
              />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="jobType">Job Type</label>
              <Input name="jobType" onChange={handleInputChange} />
            </div>
            <div className='job-nested__form'>
              <label htmlFor="jobPrice">Job Price</label>
              <Input
                type="number"
                name="jobPrice"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Button type="primary" htmlType="submit">
                Create
              </Button>{" "}
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </div>
          </Form>
        </Modal>
      </div>
      <div className="tab__router">
        <NavLink
          className="tab__links"
          to={"openpaused"}
          activeClassName="active"
        >
          <h3 className="tab__innerTitle">Open and Paused 1</h3>
        </NavLink>
        <NavLink
          className="tab__links"
          to={"archived"}
          activeClassName="active"
        >
          <h3 className="tab__innerTitle">Archived 0</h3>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
