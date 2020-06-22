import axios from "axios";

var service = axios.create({
  // baseURL:"/api", // 开发环境下使用
  baseURL: "http://10.3.135.29:3000/",
});

export default service;
