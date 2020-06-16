import axios from "./request";

// 请求文章导航栏
export const getHomeData = (type) => {
  //type users goods
  return axios.get("/home" + type);
};
// 请求文章列表
export const getList = (type, skip) => {
  //type users goods
  return axios.get("/article" + type, {
    params: {
      skip,
      limit: 5,
    },
  });
};
