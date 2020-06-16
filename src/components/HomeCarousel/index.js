import React, { Component } from "react";
import { getHomeData } from "../../utils/http";
import { Carousel } from "antd-mobile";

export default class HomeCarousel extends Component {
  state = {
    bannerUrl: "/banner",
    imgHeight: 170,
    bannerData: [],
  };
  componentDidMount() {
    getHomeData(this.state.bannerUrl).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          bannerData: res.data.data,
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Carousel
          autoplay={true}
          infinite
          dotActiveStyle={{ marginBottom: "15px", marginRight: "15px" }}
          dotStyle={{ marginBottom: "15px", marginRight: "15px" }}
        >
          {this.state.bannerData.map((item) => (
            <a
              key={item._id}
              href={item.url}
              style={{
                display: "block",
              }}
            >
              <img
                src={`https://cdn.sspai.com/${item.image}`}
                alt=""
                style={{
                  position: "relative",
                  verticalAlign: "middle",
                  objectFit: "cover",
                  width: "100%",
                  height: this.state.imgHeight,
                }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}
