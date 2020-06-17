import React, { Component } from "react";
import HomeMenu from "../../components/HomeMenu";
import { WhiteSpace } from "antd-mobile";
import ArticleListItem from "../../components/ArticleListItem";
import { Route, Redirect } from "react-router-dom";

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <HomeMenu />
        <WhiteSpace size="lg" />
        <Route path="/article/:type" component={ArticleListItem} exact />
        <Redirect from="/article" to="/article/index" exact />
      </div>
    );
  }
}
