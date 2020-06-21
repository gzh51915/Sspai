import React, { Component } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import SearchItem from "../../components/SearchItem";
import { WhiteSpace } from "antd-mobile";

export default class SearchResult extends Component {
  render() {
    return (
      <div>
        <HomeNavbar />
        <WhiteSpace size="lg" />
        <SearchItem />
      </div>
    );
  }
}
