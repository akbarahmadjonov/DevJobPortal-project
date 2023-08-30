import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Select, message, Skeleton } from "antd";
import JobService from "../../../API/Jobs.service";
import axios from "axios";
import { useJobContext } from "../../../context/JobContext";
import "./Jobs.scss";

export const JobsNested = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [images, setImages] = useState({});
  const [catIds, setCatId] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, []);

  // Success post message
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

  const nameRef = useRef();
  const locationRef = useRef();
  const titleRef = useRef();
  const infoRef = useRef();
  const typeRef = useRef();
  const priceRef = useRef();
  const jobskillsRef = useRef();
  const typeMoneyRef = useRef();
  const moreInfoRef = useRef();

  const { companyJob, setCompanyJob } = useJobContext();

  const handleChange = (value: string) => {
    setCatId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobValues = {
      comName: nameRef.current.value,
      comLocation: locationRef.current.value,
      jobTitle: titleRef.current.value,
      jobInfo: infoRef.current.value,
      jobType: typeRef.current.value,
      jobPrice: priceRef.current.value,
      jobskills: jobskillsRef.current.value
        .split(",")
        .map((skill) => skill.trim()),
      typeMoney: typeMoneyRef.current?.value,
      moreInfo: moreInfoRef.current?.value,
    };

    try {
      const imageUrls = await Promise.all(
        Object.values(images).map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dvpc9o81x/image/upload",
            formData
          );
          return uploadRes.data.url;
        })
      );

      const catId = catIds;
      const dataToSend = { ...jobValues, comImg: imageUrls[0], catId: catId };

      const datas = await JobService.jobPost(dataToSend);
      setCompanyJob((prevCompanyJob) => [...prevCompanyJob, datas.data?.data]);
      setIsModalVisible(false);
      message.success("Successfully added post");
    } catch (error) {
      console.error("Error uploading images or posting", error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await JobService.jobCategoryGet();
        setJobCategories(response.data);
      } catch (error) {
        console.error("Error getting category", error);
      }
    };
    getCategory();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    navigation();
  }, []);

  function navigation() {
    navigate("openpaused");
  }

  return (
    <div className="job-nested">
      <div className="job-nested__inner">
        <h1 className="job-nested__title">Jobs</h1>
        {isLoading ? (
          <Skeleton.Input
            active
            size="small"
            style={{ width: 140, height: 24 }}
          />
        ) : (
          <Button className="jobsTalentButtons" onClick={showModal}>
            <FontAwesomeIcon
              className="icon"
              icon={faPlus}
              style={{ color: "#fff" }}
            />{" "}
            Create a job
          </Button>
        )}
        <Modal
          title="Create a new Job"
          visible={isModalVisible}
          footer={null}
          width={800}
          onCancel={() => setIsModalVisible(false)}
        >
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <div className="job-nested__form">
              <label htmlFor="comImg">Company Image</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={(e) => {
                  const { name, files } = e.target;
                  setImages((prevImages) => ({
                    ...prevImages,
                    [name]: files[0],
                  }));
                }}
                multiple
                accept="image/*"
              />
            </div>
            <div className="job-nested__form">
              <label htmlFor="comName">Company Name</label>
              <input ref={nameRef} name="comName" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="comLocation">Company Location</label>
              <input ref={locationRef} name="comLocation" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobTitle">Job Title</label>
              <input ref={titleRef} name="jobTitle" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobInfo">Job Info</label>
              <textarea ref={infoRef} name="jobInfo" rows={4} />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobType">Job Type</label>
              <input ref={typeRef} name="jobType" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="typeMoney">Currency Type</label>
              <input ref={typeMoneyRef} type="text" name="typeMoney" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobPrice">Job Price</label>
              <input ref={priceRef} type="number" name="jobPrice" />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobskills">Job Skills (comma-separated)</label>
              <input
                ref={jobskillsRef}
                name="jobskills"
                onChange={(e) => {
                  const skills = e.target.value
                    .split(",")
                    .map((skill) => skill.trim());
                  jobskillsRef.current.value = skills;
                }}
              />
            </div>
            <div className="job-nested__form">
              <label htmlFor="moreInfo">More Info</label>
              <textarea ref={moreInfoRef} name="moreInfo" rows={4} />
            </div>
            <div className="job-nested__form">
              <label htmlFor="jobPrice">Job Category</label>
              <Select
                className="job-nested__select"
                defaultValue="Pick one"
                onChange={handleChange}
                options={jobCategories?.map((category) => ({
                  value: category?._id,
                  label: category?.jobName,
                }))}
              />
            </div>
            <div className="job-nested__buttons">
              <Button type="primary" htmlType="submit">
                Create
              </Button>{" "}
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="tab__router">
        <NavLink
          className="tab__links"
          to={"openpaused"}
          activeClassName="active"
        >
          <h3 className="tab__innerTitle">
            Open and Paused {companyJob?.length}
          </h3>
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
