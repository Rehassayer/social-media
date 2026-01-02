import axios from "axios";

const api = axios.create({
  //backend port
  baseURL: "http://localhost:8010",
  withCredentials: true,
});

export default api;
