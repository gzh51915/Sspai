import axios from "./request";

// 请求文章导航栏
export const getHomeData = (type) => {
  //type users goods
  return axios.get("/home" + type);
};
// 请求文章列表
export const getList = (type, skip) => {
  //type users goods
  return axios.get("/article/" + type, {
    params: {
      skip,
      limit: 10,
    },
  });
};

// 请求验证码
export const getVcode = () => {
  return axios.get("/users/vcode");
};

// 请求注册
export const getReg = ({ username, password, vcode }) => {
  return axios({
    method: "POST",
    url: "/users/reg",
    data: {
      username,
      password,
      vcode,
    },
  });
};

// 登录
export const getLogin = ({ username, password }) => {
  return axios.get("/users/login", {
    params: {
      username,
      password,
    },
  });
};
