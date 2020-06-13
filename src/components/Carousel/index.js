import React, { Component } from "react";
import { Carousel } from "antd-mobile";

export default class index extends Component {
  state = {
    data: ["1", "2", "3"],
    imgHeight: 170,
  };
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          "4bWHtZ3yevs1cg9",
          "ZCcdrSRf7HgbKqF",
          "lsWhvU634uK5k2Y",
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
          dotStyle={{marginBottom:"20px",marginRight:"15px"}}
          dotActiveStyle={{marginBottom:"20px",marginRight:"15px"}}
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => console.log("slide to", index)}
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
                src={`https://i.loli.net/2020/06/13/${val}.png`}
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
