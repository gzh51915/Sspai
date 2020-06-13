import React, { Component } from "react";
import { WhiteSpace } from "antd-mobile";
import Swiper from "swiper";
import "./Homeswiper.css";
import "../../../node_modules/swiper/css/swiper.min.css";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: [
        "https://i.loli.net/2020/06/13/4bWHtZ3yevs1cg9.png",
        "https://i.loli.net/2020/06/13/ZCcdrSRf7HgbKqF.png",
        "https://i.loli.net/2020/06/13/lsWhvU634uK5k2Y.png",
      ],
    };
  }
  componentDidMount() {
    new Swiper(".swiper-container", {
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
      <div
        className="swiper-container"
        style={{ background: "red", height: "auto" }}
      >
        <WhiteSpace size="lg" />
        <div
          className="swiper-wrapper"
          size="md"
          style={{ textAlign: "center" }}
        >
          {this.state.imgUrl.map((item) => {
            return (
              <div className="swiper-slide">
                <a href="" className="swiperItem">
                  <img
                    src={item}
                    style={{ width: "90%", borderRadius: "10px" }}
                    alt=""
                  />
                </a>
              </div>
            );
          })}
        </div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}
