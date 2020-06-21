import React, { Component } from "react";
import { WingBlank, Flex, WhiteSpace } from "antd-mobile";
import "./ArticleContent.css";
import { getOneArticle } from "../../utils/http";
import dayjs from "../../utils/day";
import { withRouter } from "react-router-dom";

class ArticleContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: "http://10.3.135.29:3000",
      img: "",
      title: "",
      html: "",
      authorName: "",
      postTime: "",
      avatar: "",
    };
  }
  getArticleContent = (id) => {
    getOneArticle(id).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          banner: res.data.data[0].banner,
          title: res.data.data[0].title,
          html: res.data.data[0].html,
          authorName: res.data.data[0].author,
          postTime: res.data.data[0].time,
          avatar: res.data.data[0].avatar,
        });
      }
    });
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.getArticleContent(id);
  }
  render() {
    const { baseUrl } = this.state;
    document.title = this.state.title;
    return (
      <div style={{ background: "#fff" }}>
        <header className="articleHeader">
          <figure className="articleBanner">
            <img src={baseUrl + this.state.banner} alt="" />
          </figure>
          <section className="articleTitle">
            <WingBlank size="lg">
              <h1>{this.state.title}</h1>
              <Flex justify="between">
                <Flex.Item className="authorInfo">
                  <img
                    src={baseUrl + this.state.avatar}
                    alt=""
                    className="authorPic"
                  />
                  <span className="authorName">{this.state.authorName}</span>
                </Flex.Item>
                <Flex.Item className="postTime">
                  <span>
                    {dayjs().from(
                      dayjs.unix(dayjs(this.state.postTime).unix())
                    )}
                  </span>
                </Flex.Item>
              </Flex>
            </WingBlank>
          </section>
        </header>
        <WhiteSpace size="xl" />
        <main>
          <WingBlank size="lg">
            <section className="articleBody">
              <WingBlank size="lg">
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.html }}
                  className="articleCSS"
                ></div>
              </WingBlank>
            </section>
          </WingBlank>
        </main>
      </div>
    );
  }
}
export default withRouter(ArticleContent);
