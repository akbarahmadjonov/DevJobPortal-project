import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Select } from "antd";
import JobService from "../../../API/Jobs.service";
import "./Jobs.scss";
import axios from "axios";

export const JobsNested = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobCategories, setJobCategories] = useState([]);
  const [images, setImages] = useState("");
  const [data, setData] = useState({});
  const [catIds, setCatId] = useState("");

  //* REF VALUES
  const nameRef = useRef();
  const locationRef = useRef();
  const titleRef = useRef();
  const infoRef = useRef();
  const typeRef = useRef();
  const priceRef = useRef();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setCatId(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobValues = {
      comName: nameRef.current?.value,
      comLocation: locationRef.current?.value,
      jobTitle: titleRef.current?.value,
      jobInfo: infoRef.current?.value,
      jobType: typeRef.current?.value,
      jobPrice: priceRef.current?.value,
    };

    try {
      const imageUrls = await Promise.all(
        Object.values(images).map(async (image) => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dvpc9o81x/image/upload",
            data
          );
          console.log(uploadRes);
          const { url } = uploadRes.data;
          setData({ ...jobValues, comImg: url, catId: catIds });
        })
      );

      const postJob = async () => {
        console.log(data);
        try {
          const post = await JobService.jobPost(data);
          console.log(post);
        } catch (error) {
          console.error("Error posting", error);
        }
      };
      postJob();
    } catch (error) {
      console.error("Error uploading images", error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await JobService.jobCategoryGet();
        setJobCategories(response.data);
        console.log(response);
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
          <form onSubmit={(e) => handleSubmit(e)}>
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
              <label htmlFor="jobPrice">Job Price</label>
              <input ref={priceRef} type="number" name="jobPrice" />
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
            <div>
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
          <h3 className="tab__innerTitle">Open and Paused 0</h3>
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
