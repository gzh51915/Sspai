import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "antd-mobile";
import "./UserLogin.css";

function UserLogin(props) {
  console.log(props);

  return (
    <>
      {props.isLogin ? (
        <div className="userPic" onClick={() => props.history.push("/reg")}>
          <img
            src="http://group.photo.store.qq.com/qun/V12btnaW15bRxB/V3tdUkbGlRSzVYoNcEJ/800?w5=592&h5=634&rf=viewer_421"
            alt=""
          />
        </div>
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
