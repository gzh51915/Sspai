import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { WingBlank } from "antd-mobile";
import { getMenu } from "../../utils/http";
import Swiper from "swiper";
import "../../../node_modules/swiper/css/swiper.min.css";
import "./HomeMenu.css";

// 引入store
import store from "../../store";
import { reMenu } from "../../store/actions/home";

export default class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: store.getState().menuData,
    };
  }
  componentDidMount() {
    // 获取文章类型列表
    getMenu("/navlist").then((res) => {
      if (res.data.code === 200) {
        store.dispatch(reMenu(res.data.data));
      }
    });
    store.subscribe(() => {
      this.setState({
        menuData: store.getState().menuData,
      });
    });
    new Swiper(".homemenu-container", {
      autoplay: false,
      slidesPerView: "auto",
      loopedSlides: 5,
      setWrapperSize: true,
      spaceBetween: 10,
      roundLengths: true,
      autoHeight: true, //高度随内容变化
    });
  }
  render() {
    return (
      <WingBlank size="lg">
        <div className="swiper-container homemenu-container" size="sm">
          <div className="swiper-wrapper homemenu-wrapper">
            {this.state.menuData.map((item) => {
              return (
                <NavLink
                  className="swiper-slide homemenu-slide"
                  activeClassName="active"
                  to={item.url}
                  key={item._id}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      </WingBlank>
    );
  }
}
