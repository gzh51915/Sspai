import React, { useState, useEffect } from "react";
import { WingBlank, WhiteSpace, Button, Toast } from "antd-mobile";
import { getList } from "../../utils/http";
import dayjs from "dayjs";
import "./ArticleListItem.css";
import logger from "less/lib/less/logger";

export default function ArticleListItem(props) {
  // 配置dayjs插件
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  // dayjs的替换文字，%s和%d是占位符
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s前",
      past: "%s后",
      s: "几秒钟",
      m: "一分钟",
      mm: "%d分钟",
      h: "一小时",
      hh: "%d小时",
      d: "一天",
      dd: "%d天",
      M: "一个月",
      MM: "%d个月",
      y: "一年",
      yy: "%d年",
    },
  });

  // sspai的cdn链接
  const [cdnUrl] = useState("https://cdn.sspai.com/");
  //控制请求
  const [request, setrequest] = useState(true);
  // 定义文章列表数据
  const [articleList, setArticleList] = useState([]);
  // 定义文章列表总条数
  const [total, setTotal] = useState(10);
  //控制条数
  const [skip, setSkip] = useState(10);
  // 根据点击的文章类型获取文章列表数据
  // 看着复杂其实是为了解决useEffect的重复调用或只执行一次的问题
  useEffect(() => {
    const { type } = props.match.params;
    setrequest(true);
    if (request) {
      getList(type)
        .then((res) => {
          if (res.data.code === 200) {
            setArticleList(res.data.data);
            setTotal(res.data.total);
          }
        })
        .catch((err) => {
          setArticleList([]);
        });
    }
    return function () {
      //组件销毁时停止axios请求
      setrequest(false);
      //设置条数从10开始
      setSkip(10);
    };
  }, [props.match.params.type]);

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
    return <div>暂无数据</div>;
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
                  onClick={() =>
                    (window.location.href = `https://sspai.com/post/${item.id}`)
                  }
                >
                  <img
                    className="articleImg"
                    src={cdnUrl + item.banner}
                    alt=""
                  />
                  <div className="imgMask"></div>
                  <div className="articleMsg">
                    <img
                      src={cdnUrl + item.author.avatar}
                      alt={item.title}
                      className="authorPic"
                    />
                    <span className="authorName">{item.author.nickname}</span>
                    <span className="timeBefore">
                      {dayjs().from(dayjs.unix(item.released_time))}
                    </span>
                  </div>
                </div>
                <figcaption className="articleTitle">
                  <h3
                    onClick={() =>
                      (window.location.href = `https://sspai.com/post/${item.id}`)
                    }
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
      <div
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
      </div>
    </React.Fragment>
  );
}
