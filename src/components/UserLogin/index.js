import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Popover } from "antd-mobile";
import "./UserLogin.css";
import { getUserInfo } from "../../utils/http";
const Item = Popover.Item;

function UserLogin(props) {
  const [userpic, setUserPic] = useState("");
  useEffect(() => {
    getUserInfo(sessionStorage.user)
      .then((res) => {
        if (res.data.code === 200) {
          setUserPic(res.data.data[0].img);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const goItem = (opt) => {
    switch (opt.key) {
      case "0":
        props.history.push(opt.props.vurl);
        break;
      case "1":
        delete sessionStorage.user;
        props.history.push("/");
        break;
      default:
        props.history.push(opt.props.vurl);
    }
    props.history.push(opt.props.vurl);
  };
  return (
    <>
      {props.isLogin ? (
        <Popover
          overlay={[
            <Item key="0" vurl="/user">
              设置
            </Item>,
            <Item key="1">退出登录</Item>,
          ]}
          onSelect={goItem}
        >
          <div className="userPic">
            <img src={"http://47.115.46.80:3000/" + userpic} alt="" />
          </div>
        </Popover>
      ) : (
        <Button
          className="homeLogin"
          size="small"
          onClick={() => props.history.push("/login")}
        >
          <span>登录</span>
        </Button>
      )}
    </>
  );
}
export default withRouter(UserLogin);
