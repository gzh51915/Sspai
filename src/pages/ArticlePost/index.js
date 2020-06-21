import React, { Component } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import ArticleContent from "../../components/ArticleContent";

export default class ArticlePost extends Component {
  render() {
    return (
      <div className="ArticlePage">
        <HomeNavbar />
        <ArticleContent />
      </div>
    );
  }
}
