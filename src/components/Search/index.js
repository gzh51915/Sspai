import React, { useState, useEffect, useRef } from "react";
import { WingBlank, Drawer, SearchBar, Button, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";
import "./Search.css";

function Search(props) {
  // 抽屉第一次加载时不弹出
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(props.open);
  const searchRef = useRef();
  // 点击空白处使抽屉缩回去
  const openBar = () => {
    setOpen(!open);
  };
  const goSearch = () => {
    props.history.replace("/find/" + searchRef.current.state.value);
    searchRef.current.state.value = "";
  };
  const searchCon = (
    <div className="searchZone">
      <WingBlank style={{ background: "#fff" }}>
        <SearchBar
          placeholder="Search"
          maxLength={8}
          showCancelButton={false}
          className="seachBar"
          ref={searchRef}
        />
        <WhiteSpace size="lg" />
        <Button type="warning" onClick={goSearch}>
          搜索
        </Button>
      </WingBlank>
    </div>
  );

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
        contentStyle={{ color: "#A6A6A6", textAlign: "center", paddingTop: 42 }}
        overlayStyle={{ height: "100%" }}
        position="top"
        open={open}
        touch={false}
        onOpenChange={openBar}
      ></Drawer>
    </div>
  );
}

export default withRouter(Search);
