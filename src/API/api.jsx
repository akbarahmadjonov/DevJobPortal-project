import axios from "axios";
export const BASE_URL = "https://job-px4t.onrender.com/api/";
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use({
  Headers: {},
});

export default axios;
