import axios from "./api";

const token = localStorage.getItem("token");
const companyInfo = localStorage.getItem("companyInfo");
const parsedCompanyInfo = JSON.parse(companyInfo);
const companyId = parsedCompanyInfo?._id;
console.log(companyId);

const ProfileService = {
  //* PROFILE | GET REQUEST
  profileGet: async () => {
    try {
      const data = await axios.get(`recruiter/token?token=${token}`);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //* PROFILE | PUT REQUEST
  profileChange: async (body) => {
    try {
      const data = await axios.put("recruiter", body, {
        headers: {
          token,
        },
      });
      console.log(body);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  profileDelete: async () => {
    try {
      const data = await axios.delete("recruiter", {
        headers: {
          token,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default ProfileService;
