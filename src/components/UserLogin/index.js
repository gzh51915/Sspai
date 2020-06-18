import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Popover } from "antd-mobile";
import "./UserLogin.css";
import { options } from "less";
const Item = Popover.Item;

function UserLogin(props) {
  const goItem = (opt) => {
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
            <img
              src="http://group.photo.store.qq.com/qun/V12btnaW15bRxB/V3tdUkbGlRSzVYoNcEJ/800?w5=592&h5=634&rf=viewer_421"
              alt=""
            />
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
