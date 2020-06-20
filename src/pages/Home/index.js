import React, { Component } from "react";
import { WhiteSpace } from "antd-mobile";
import HomeNavbar from "../../components/HomeNavbar";
import HomeCarousel from "../../components/HomeCarousel";
import HomeSwiper from "../../components/Homeswiper/";
import ArticleList from "../../pages/ArticleList";

export default class Home extends Component {
  render() {
    return (
      <div className="homePage">
        <HomeNavbar />
        <HomeCarousel />
        <WhiteSpace size="lg" />
        <HomeSwiper />
        <WhiteSpace size="lg" />
        <ArticleList />
      </div>
    );
  }
}
