import React, { Component } from "react";
import { WingBlank } from "antd-mobile";
import Swiper from "swiper";
import "./HomeSwiper.css";
import "../../../node_modules/swiper/css/swiper.min.css";

export default class HomeSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: [
        "https://tva2.sinaimg.cn/large/eda28311gy1gfsz6hcko1j23h02bchdt.jpg",
        "https://tvax3.sinaimg.cn/large/eda28311gy1gfsz71uk9mj23h02bctx1.jpg",
        "https://tvax4.sinaimg.cn/large/eda28311gy1gfsz7dz6dtj23h02bc1a9.jpg",
      ],
    };
  }
  componentDidMount() {
    new Swiper(".homeswiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: false,
      slidesPerView: 2,
      setWrapperSize: true,
      spaceBetween: 0,
      roundLengths: true,
      autoHeight: true, //高度随内容变化
    });
  }
  render() {
    return (
      <WingBlank className="swiper-container homeswiper-container" size="lg">
        <div className="swiper-wrapper homeswiper-wrapper" size="md">
          {this.state.imgUrl.map((item, index) => {
            return (
              <div className="swiper-slide homeswiper-slide" key={index}>
                <a href={item} className="swiperItem">
                  <img src={item} alt="" />
                </a>
              </div>
            );
          })}
        </div>
      </WingBlank>
    );
  }
}
