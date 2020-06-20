import React, { Component } from "react";
import { WingBlank } from "antd-mobile";
import Swiper from "swiper";
import { getHomeData } from "../../utils/http";
import './Homeswiper.css'
import "../../../node_modules/swiper/css/swiper.min.css";

export default class HomeSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subSwiperUrl: "/nav",
      subSwiperData: [],
    };
  }
  componentDidMount() {
    getHomeData(this.state.subSwiperUrl).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          subSwiperData: res.data.data,
        });
      }
    });
    new Swiper(".homeswiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      initialSlide: 0,
      loop: true,
      autoplay: false,
      slidesPerView: "auto",
      loopedSlides: 4,
      //   setWrapperSize: true,
      //   spaceBetween: 0,
      //   roundLengths: true,
      //   autoHeight: true, //高度随内容变化
    });
  }
  render() {
    return (
      <WingBlank size="lg">
        <div className="swiper-container homeswiper-container">
          <div className="swiper-wrapper homeswiper-wrapper">
            {this.state.subSwiperData.map((item) => {
              return (
                <div className="swiper-slide homeswiper-slide" key={item._id}>
                  <a href={item.url} className="swiperItem">
                    <img
                      src={`https://cdn.sspai.com/${item.image}`}
                      alt={item.title}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </WingBlank>
    );
  }
}
