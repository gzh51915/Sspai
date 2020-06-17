import React, { useState, useEffect } from "react";
import { WingBlank, WhiteSpace } from "antd-mobile";
import { getList } from "../../utils/http";
import dayjs from "dayjs";
import "./ArticleListItem.css";

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
  // 定义文章列表数据
  const [articleList, setArticleList] = useState([]);
  const [skip, setSkip] = useState(5);
  // 根据点击的文章类型获取文章列表数据
  // 看着复杂其实是为了解决useEffect的重复调用或只执行一次的问题
  useEffect(
    ({ type } = props.match.params) => {
      getList("/" + type).then((res) => {
        if (res.data.code === 200) {
          setArticleList(res.data.data);
          // 切换文章类型时重置skip
          setSkip(0);
        }
      });
    },
    // eslint-disable-next-line
    [props.match.params.type]
  );

  // 穷人版下拉刷新
  useEffect(({ type } = props.match.params) => {
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;
      var scrollHeight = document.body.scrollHeight;
      if (scrollHeight - scrollTop <= 1000) {
        getList("/" + type, skip).then((res) => {
          if (res.data.code === 200) {
            setArticleList(articleList.concat(res.data.data));
            setSkip(skip + 5);
          }
        });
      }
    };
  });

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
    </React.Fragment>
  );
}
