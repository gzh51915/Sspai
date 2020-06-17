import React, { useState, useEffect } from "react";
import { WingBlank, Drawer, SearchBar } from "antd-mobile";
import "./Search.css";

export default function Search(props) {
  // 抽屉第一次加载时不弹出
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(props.open);
  const searchCon = (
    <div className="searchZone">
      <WingBlank style={{ background: "#fff" }}>
        <SearchBar
          placeholder="Search"
          maxLength={8}
          showCancelButton={false}
          className="seachBar"
        />
      </WingBlank>
    </div>
  );

  // 点击空白处使抽屉缩回去
  const openBar = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (i >= 1) {
      openBar();
    }
    setI(i + 1);
    // eslint-disable-next-line
  }, [props.open]);

  return (
    <div style={{ position: "relative" }}>
      <Drawer
        className="my-drawer"
        enableDragHandle
        sidebar={searchCon}
        style={{
          minHeight: document.documentElement.clientHeight,
        }}
        contentStyle={{ color: "#A6A6A6", textAlign: "center", paddingTop: 42 }}
        overlayStyle={{}}
        position="top"
        open={open}
        touch={false}
        onOpenChange={openBar}
      ></Drawer>
    </div>
  );
}
