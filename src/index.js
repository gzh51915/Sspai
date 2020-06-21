import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//导入编辑器的样式
import App from "./App";


import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
      <App />
  </Router>,
  document.getElementById("root")
);


