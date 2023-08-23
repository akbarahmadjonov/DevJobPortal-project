import React from "react";
import { useEffect } from "react";
import "./Profile.scss";
import { Form, Input, Button } from "antd";
import { ComHeader } from "../../../Widgets/CompanyProfileHeader/ComHeader";
import ProfileService from "../../../API/CompanyProfile.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faGlobe,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

//* Only export company name to Component header
export const Profile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);

  const navigate = useNavigate();

  const companyName = useRef();
  const email = useRef();
  const name = useRef();
  const phoneNumber = useRef();
  const website = useRef();
  //* GET REQUEST | FETCH
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ProfileService.profileGet();
        setCompanyProfile(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error occurred while fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  //* PUT REQUEST | PUT
  const handleUpdateProfile = async () => {
    const changedCompanyInfo = {
      companyName: companyName.current?.value,
      email: email.current?.value,
      name: name.current?.value,
      phoneNumber: phoneNumber.current?.value,
      website: website.current?.value,
    };

    try {
      const response = await ProfileService.profileChange(changedCompanyInfo);
      console.log(response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="profile">
        <div className="container">
          <ComHeader />
          <button
            onClick={() => navigate(-1)}
            style={{ padding: "5px" }}
            className="jobsTalentButtons"
          >
            &lt; Back
          </button>
          <div className="profile__form-inner">
            <div className="profile__form">
              <h2 className="profile-form__title">Edit Profile</h2>
              <Form
                name="profileForm"
                layout="vertical"
                onFinish={handleUpdateProfile}
                initialValues={companyProfile}
              >
                <Form.Item
                  ref={companyName}
                  label="Company Name"
                  name="companyName"
                >
                  <Input
                    placeholder={companyProfile?.companyName}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item ref={email} label="Email" name="email">
                  <Input
                    placeholder={companyProfile?.email}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item ref={name} label="Name" name="name">
                  <Input
                    placeholder={companyProfile?.name}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  ref={phoneNumber}
                  label="Phone Number"
                  name="phoneNumber"
                >
                  <Input
                    placeholder={companyProfile?.phoneNumber}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item ref={website} label="Website" name="website">
                  <Input
                    id="websiteInput"
                    style={{ width: "100%" }}
                    defaultValue={companyProfile?.website}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="profile__details">
              <h2 className="profile-form__title">Current profile</h2>
              <p className="profile__details-titles">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faGlobe}
                />{" "}
                Company Name:{" "}
                <span className="profile__details-span">
                  {companyProfile?.companyName}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faEnvelope}
                />{" "}
                Email:{" "}
                <span className="profile__details-span">
                  {" "}
                  {companyProfile?.email}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faUser} />{" "}
                Name:{" "}
                <span className="profile__details-span">
                  {companyProfile?.name}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faPhone}
                />{" "}
                Phone Number:{" "}
                <span className="profile__details-span">
                  {companyProfile?.phoneNumber}
                </span>
              </p>
              <p className="profile__details-titles">
                <span className="profile__details-icon">
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faGlobe}
                  />
                </span>
                Website:{" "}
                <span className="profile__details-span">
                  {companyProfile?.website ? (
                    companyProfile?.website
                  ) : (
                    <>
                      No website provided by recruiter{" "}
                      <Button
                        type="link"
                        onClick={() => {
                          const websiteInput =
                            document.getElementById("websiteInput");
                          if (websiteInput) {
                            websiteInput.focus();
                          }
                        }}
                      >
                        Add Website
                      </Button>
                    </>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
