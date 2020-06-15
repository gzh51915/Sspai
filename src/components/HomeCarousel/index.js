import React, { Component } from "react";
import { Carousel } from "antd-mobile";

export default class HomeCarousel extends Component {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 170,
  };
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "eda28311gy1gfsz6hcko1j23h02bchdt",
          "eda28311gy1gfsz71uk9mj23h02bctx1",
          "eda28311gy1gfsz7dz6dtj23h02bc1a9",
        ],
      });
    }, 100);
  }
  render() {
    return (
      <div>
        <Carousel
          autoplay={false}
          infinite
          dotActiveStyle={{ marginBottom: "15px", marginRight: "15px" }}
          dotStyle={{ marginBottom: "15px", marginRight: "15px" }}
        >
          {this.state.data.map((val) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight,
              }}
            >
              <img
                src={`https://tvax2.sinaimg.cn/large/${val}.jpg`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}
