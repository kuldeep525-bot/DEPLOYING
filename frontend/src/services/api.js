import axios from "axios";

const api = axios.create({
  baseURL: "https://deploying-hsaq.onrender.com",
  withCredentials: true,
});

export default api;
