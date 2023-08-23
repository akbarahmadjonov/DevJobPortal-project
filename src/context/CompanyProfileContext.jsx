import React, { createContext, useContext, useState, useEffect } from "react";
import ProfileService from "../API/CompanyProfile.service";

const CompanyProfileContext = createContext();

export const CompanyProfileProvider = ({ children }) => {
  const [companyProfile, setCompanyProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ProfileService.profileGet();
        setCompanyProfile(response.data);
      } catch (error) {
        console.error("Error occurred while fetching user profile", error);
      }
      };
      
      fetchUserProfile();
  }, []);
    return (
        <CompanyProfileContext.Provider value={companyProfile}>
            {children}
        </CompanyProfileContext.Provider>
    )
};

export const useCompanyProfile = () => useContext(CompanyProfileContext)