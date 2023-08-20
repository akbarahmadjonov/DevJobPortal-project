import React from "react";
import { useEffect } from "react";
import "./Profile.scss";
import { Form, Input, Button } from "antd";
import { ComHeader } from "../../../Widgets/CompanyProfileHeader/ComHeader";
import ProfileService from "../../../API/CompanyProfile.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [companyProfile, setCompanyProfile] = useState(null);

  const navigate = useNavigate();

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

  return (
    <>
      <div className="profile">
        <div className="container">
          <ComHeader />
          <button
            onClick={navigate(-1)}
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
                // onFinish={onFinish}
                // initialValues={userData}
              >
                <Form.Item label="Company Name" name="companyName">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Name" name="name">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Website" name="website">
                  <Input style={{ width: "100%" }} />
                </Form.Item>
                {/* Add more fields as needed */}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="profile__details">
              <h2 className="profile-form__title">Current profile</h2>
              <h2 className="profile__details-titles">Company Profile:</h2>
              <p className="profile__details-titles">Company Name:</p>
              <p className="profile__details-titles">Email:</p>
              <p className="profile__details-titles">Name:</p>
              <p className="profile__details-titles">Phone Number:</p>
              <p className="profile__details-titles">Website:</p>
              {/* Render more user details as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
