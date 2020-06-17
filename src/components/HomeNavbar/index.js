import React, { useState } from "react";
import { NavBar, Icon, Button } from "antd-mobile";
import Search from "../Search";
// import { Link } from "react-router-dom";
import UserLogin from "../UserLogin";

export default function HomeNavbar() {
  const [isLogin, setIsLogin] = useState(sessionStorage.user);
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <NavBar
        mode="dark"
        leftContent={
          <Button
            type="primary"
            inline
            key="0"
            size="small"
            style={{ marginRight: "4px", height: "50px" }}
          >
            <img
              src="https://cdn.sspai.com/sspai/assets/img/favicon/icon.ico"
              height="50"
              alt=""
            />
          </Button>
        }
        rightContent={[
          <Icon
            className="pointer"
            key="1"
            type="search"
            color="#333"
            style={{ marginRight: "16px" }}
            onClick={() => {
              setOpen(!open);
            }}
          />,
          <Icon
            key="2"
            className="pointer"
            type="ellipsis"
            color="#333"
            style={{ marginRight: "16px" }}
          />,
          <UserLogin isLogin />,
        ]}
        style={{ height: "50px" }}
      >
        多数派
      </NavBar>
      <Search open={open} />
    </div>
  );
}
