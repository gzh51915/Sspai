import React, { useState, useEffect } from "react";
import { WingBlank, WhiteSpace, Button, Toast } from "antd-mobile";
import { getList } from "../../utils/http";
import dayjs from "../../utils/day";
import "./ArticleListItem.css";

export default function ArticleListItem(props) {
  // sspai的cdn链接
  const [baseUrl] = useState("http://10.3.135.29:3000/");
  // 控制请求
  const [request, setrequest] = useState(true);
  // 定义文章列表数据
  const [articleList, setArticleList] = useState([]);
  // 定义文章列表总条数
  const [total, setTotal] = useState(10);
  // 控制条数
  const [skip, setSkip] = useState(10);
  // 根据点击的文章类型获取文章列表数据
  // 解决useEffect的重复调用或只执行一次的问题
  useEffect(() => {
    const { type } = props.match.params;
    setrequest(true);
    console.log(type);

    if (request) {
      getList(type)
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res);

            if (res.data.data.length !== 0) {
              setArticleList(res.data.data);
              setTotal(res.data.total);
            } else {
              setArticleList([]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setArticleList([]);
        });
    }
    return function () {
      // 组件销毁时停止axios请求
      setrequest(false);
      // 设置条数从10开始
      setSkip(10);
    };
  }, [props.match.params, request]);

  const showMore = () => {
    const { type } = props.match.params;
    setSkip(skip + 10);
    if (skip < total) {
      getList(type, skip).then((res) => {
        if (res.data.code === 200) {
          setArticleList([...articleList, ...res.data.data]);
        }
      });
    } else {
      Toast.fail("没有更多的数据了");
    }
  };

  if (!articleList.length) {
    return (
      <div style={{ padding: "15px", fontSize: "25px", textAlign: "center" }}>
        <p>无更多结果</p>
      </div>
    );
  }
  return (
    <React.Fragment>
      {articleList.map((item) => {
        return (
          <React.Fragment key={item.id}>
            <WingBlank size="md">
              <figure className="articleCard">
                <div
                  className="imgbox"
                  onClick={() => (window.location.href = `/post/${item.id}`)}
                >
                  <img
                    className="articleImg"
                    src={baseUrl + item.banner}
                    alt=""
                  />
                  <div className="imgMask"></div>
                  <div className="articleMsg">
                    <img
                      src={baseUrl + item.avatar}
                      alt={item.title}
                      className="authorPic"
                    />
                    <span className="authorName">{item.author}</span>
                    <span className="timeBefore">
                      {dayjs().from(dayjs.unix(dayjs(item.time).unix()))}
                    </span>
                  </div>
                </div>
                <figcaption className="articleTitle">
                  <h3
                    onClick={() => (window.location.href = `/post/${item.id}`)}
                  >
                    {item.title}
                  </h3>
                </figcaption>
              </figure>
            </WingBlank>
            <WhiteSpace size="lg" />
          </React.Fragment>
        );
      })}
      <Button
        style={{
          backgroundColor: "#fff",
          boxSizing: "border-box",
          margin: "0 8px 20px",
          lineHeight: "50px",
          textAlign: "center",
          fontSize: "16px",
          color: "#666",
        }}
        onClick={showMore}
      >
        查看更多
      </Button>
    </React.Fragment>
  );
}
