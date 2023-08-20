import axios from "./api";

const token = localStorage.getItem("token");

const ProfileService = {
  //* PROFILE | GET REQUEST
  profileGet: async () => {
    try {
      const data = await axios.get("/recruiter", {
        headers: {
          Authorization: token,
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
