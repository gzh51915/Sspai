import axios from "axios";

var service = axios.create({
  // baseURL:"/api", // 开发环境下使用
  baseURL: "http://47.115.46.80:3000",
});

export default service;
