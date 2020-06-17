import axios from "axios";

var service = axios.create({
  baseURL: "/api",
});

export default service;
