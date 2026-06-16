import axios from "axios";

const api = axios.create({
  baseURL: "https://social-media-project-m5b3.onrender.com/api",
  withCredentials: true,
});

export default api;
