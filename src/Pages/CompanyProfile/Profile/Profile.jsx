import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { Form, Input, Button, Skeleton } from "antd";
import { ComHeader } from "../../../Widgets/CompanyProfileHeader/ComHeader";
import ProfileService from "../../../API/CompanyProfile.service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faGlobe,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const companyNameRef = useRef();
  const emailRef = useRef();
  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const websiteRef = useRef();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ProfileService.profileGet();
        setCompanyProfile(response.data);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error occurred while fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const changedCompanyInfo = {
      companyName: companyNameRef.current?.value,
      email: emailRef.current?.value,
      name: nameRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      website: websiteRef.current?.value,
    };

    const changeProfile = async () => {
      try {
        const response = await ProfileService.profileChange(changedCompanyInfo);
        console.log(response);

        setCompanyProfile(response.data);

        companyNameRef.current.value = "";
        emailRef.current.value = "";
        nameRef.current.value = "";
        phoneNumberRef.current.value = "";
        websiteRef.current.value = "";
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
    changeProfile();
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
              <form
                name="profileForm"
                layout="vertical"
                onSubmit={handleUpdateProfile}
              >
                <label label="Company Name" name="companyName">
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : (
                    <input
                      ref={companyNameRef}
                      placeholder={companyProfile?.companyName}
                      style={{ width: "100%" }}
                    />
                  )}
                </label>
                <label label="Email" name="email">
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : (
                    <input
                      ref={emailRef}
                      placeholder={companyProfile?.email}
                      style={{ width: "100%" }}
                    />
                  )}
                </label>
                <label label="Name" name="name">
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : (
                    <input
                      ref={nameRef}
                      placeholder={companyProfile?.name}
                      style={{ width: "100%" }}
                    />
                  )}
                </label>
                <label label="Phone Number" name="phoneNumber">
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : (
                    <input
                      ref={phoneNumberRef}
                      placeholder={companyProfile?.phoneNumber}
                      style={{ width: "100%" }}
                    />
                  )}
                </label>
                <label label="Website" name="website">
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : (
                    <input
                      ref={websiteRef}
                      id="websiteInput"
                      style={{ width: "100%" }}
                      defaultValue={companyProfile?.website}
                    />
                  )}
                </label>
                <label>
                  {loading ? (
                    <Skeleton.Button style={{ width: "100%" }} active />
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Update Profile
                    </Button>
                  )}
                </label>
              </form>
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
                  {loading ? <Skeleton active /> : companyProfile?.companyName}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faEnvelope}
                />{" "}
                Email:{" "}
                <span className="profile__details-span">
                  {loading ? <Skeleton active /> : companyProfile?.email}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faUser} />{" "}
                Name:{" "}
                <span className="profile__details-span">
                  {loading ? <Skeleton active /> : companyProfile?.name}
                </span>
              </p>
              <p className="profile__details-titles">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faPhone}
                />{" "}
                Phone Number:{" "}
                <span className="profile__details-span">
                  {loading ? <Skeleton active /> : companyProfile?.phoneNumber}
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
                  {loading ? (
                    <Skeleton.Input style={{ width: "100%" }} active />
                  ) : companyProfile?.website ? (
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
