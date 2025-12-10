import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://asignment-11.vercel.app",
});

// 🔐 Add Token Automatically in Each Request
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token name you stored

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
