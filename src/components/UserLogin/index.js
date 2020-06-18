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
        console.log(res);
        if (res.data.code === 200) {
          setUserPic(res.data.data[0].img);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const goItem = (opt) => {
    console.log(opt);
    switch (opt.key) {
      case "0" && "1":
        props.history.push(opt.props.vurl);
        break;
      case "2":
        delete sessionStorage.user;
        props.history.push("/");
        break;
    }
    props.history.push(opt.props.vurl);
  };
  return (
    <>
      {props.isLogin ? (
        <Popover
          overlay={[
            <Item key="0" vurl="/user">
              个人主页
            </Item>,
            <Item key="1">设置</Item>,
            <Item key="2">退出登录</Item>,
          ]}
          onSelect={goItem}
        >
          <div className="userPic">
            <img src={userpic} alt="" />
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
