import React from "react";
import "./App.css";
import { WhiteSpace } from "antd-mobile";
import HomeNavbar from "./components/HomeNavbar";
import HomeCarousel from "./components/HomeCarousel";
import HomeSwiper from "./components/HomeSwiper";
import ArticleList from "./pages/ArticleList";

function App() {
  return (
    <div className="App">
      <HomeNavbar />
      <HomeCarousel />
      <WhiteSpace size="lg" />
      <HomeSwiper />
      <WhiteSpace size="lg" />
      <ArticleList />
    </div>
  );
}

export default App;
