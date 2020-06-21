import React, { useState, useEffect } from "react";
import { WingBlank, WhiteSpace } from "antd-mobile";
import { getSearch } from "../../utils/http";
import { withRouter } from "react-router-dom";
import dayjs from "../../utils/day";

function SearchItem(props) {
  const [baseUrl] = useState("http://10.3.135.29:3000/");
  const [searchList, setSearchList] = useState([]);
  // 定义文章列表数据
  useEffect(() => {
    const { keyword } = props.match.params;
    getSearch(keyword).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        setSearchList(res.data.data);
      }
    });
  }, [props.match.params]);
  return (
    <React.Fragment>
      {searchList.map((item) => {
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
      <div style={{ padding: "15px", fontSize: "25px", textAlign: "center" }}>
        <p>无更多搜索结果</p>
      </div>
    </React.Fragment>
  );
}

export default withRouter(SearchItem);
