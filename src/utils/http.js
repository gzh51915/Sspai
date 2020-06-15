import axios from "./request";

// 请求文章导航栏
export const getMenu = (type) => {
  //type users goods
  return axios.get("/home" + type);
};
// 请求文章列表
export const getList = (type) => {
  //type users goods
  return axios.get("/article" + type);
};
