import React from "react";
import { NavBar, Icon, Button } from "antd-mobile";



export default function index() {
  return (
    <div>
      <NavBar
        mode="dark"
        leftContent={
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: "4px",height:"50px"}}
          >
            <img
              src="https://cdn.sspai.com/sspai/assets/img/favicon/icon.ico"
               height="50" alt=""
            />
          </Button>
        }
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
          <Icon key="1" type="ellipsis" style={{ marginRight: "16px" }} />,
          <Icon key="2" type="check-circle"  />,
        ]}
        style={{height:"50px"}}
      >
        多数派
      </NavBar>
    </div>
  );
}
