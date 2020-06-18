import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/article" component={Home} />
        <Route path="/reg" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={UserInfo} />
        <Redirect from="/" to="/article" exact />
      </Switch>
    </div>
  );
}

export default App;
