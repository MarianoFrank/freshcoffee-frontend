import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "X-Request-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axiosClient;
