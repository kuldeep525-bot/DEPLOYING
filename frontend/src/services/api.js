import axios from "axios";

const api = axios.create({
  baseURL: "https://deploying-production-2fdb.up.railway.app",
  withCredentials: true,
});

export default api;
