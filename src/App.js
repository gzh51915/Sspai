import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";
import ArticlePost from "./pages/ArticlePost";
import SearchResult from "./pages/SearchResult";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/article"
          component={Home}
          onEnter={() => {
            document.title = "多数派";
          }}
        />
        <Route
          path="/reg"
          component={Register}
          onEnter={() => {
            document.title = "注册-多数派";
          }}
        />
        <Route
          path="/login"
          component={Login}
          onEnter={() => {
            document.title = "登录-多数派";
          }}
        />
        <Route
          path="/user"
          component={UserInfo}
          onEnter={() => {
            document.title = "设置-用户信息";
          }}
        />
        <Route path="/post/:id" component={ArticlePost} />
        <Route path="/find/:keyword" component={SearchResult} />
        <Redirect from="/" to="/article" exact />
      </Switch>
    </div>
  );
}

export default App;
