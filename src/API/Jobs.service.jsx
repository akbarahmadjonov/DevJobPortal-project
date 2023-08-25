import axios from "./api";

const token = localStorage.getItem("token");

const JobService = {
  //* JOB GET | REQUEST
  jobGet: async () => {
    try {
      const data = await axios.get(`/job/${token}`);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //* JOB POST | REQUEST
  jobPost: async (body) => {
    console.log(body);
    try {
      const data = await axios.post("job", body, {
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //* JOB CATEGORY | REQUEST
  jobCategoryGet: async () => {
    try {
      const data = await axios.get("category", {
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

export default JobService;
