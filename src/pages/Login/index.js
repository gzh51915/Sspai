import React, { Component } from "react";
import {
  Flex,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Toast,
} from "antd-mobile";
import { getLogin } from "../../utils/http";
import "./Login.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  componentDidMount() {}
  changeMsg(val, event) {
    this.setState({
      [val]: event,
    });
  }

  pressEnter = (eve) => {
    if (eve.which !== 13) return;
    this.checkLogin();
  };
  checkLogin = () => {
    let { username, password } = this.state;
    getLogin({ username, password }).then((res) => {
      if (res.data.code === 200) {
        Toast.success("登录成功", 2);
        sessionStorage.user = res.data.data[0].id;
        this.props.history.push("/");
      } else {
        Toast.fail("帐号或密码错误", 2);
      }
    });
  };
  render() {
    return (
      <div className="regPage">
        <WhiteSpace size="xl" />
        <WingBlank style={{ textAlign: "center" }} className="regLogo pointer">
          <img
            src="https://tvax4.sinaimg.cn/large/eda28311gy1gfudd4epyqj205o020glk.jpg"
            onClick={() => this.props.history.push("/")}
            alt=""
          />
        </WingBlank>
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WingBlank>
          <InputItem
            id="username"
            clear
            placeholder="帐号"
            onChange={this.changeMsg.bind(this, "username")}
          ></InputItem>
          <WhiteSpace size="lg" />
          <InputItem
            clear
            placeholder="密码"
            type="password"
            onChange={this.changeMsg.bind(this, "password")}
            onVirtualKeyboardConfirm={this.checkLogin}
            onKeyDown={this.pressEnter}
          ></InputItem>
          <WhiteSpace size="lg" />
          <Flex justify="between">
            <span
              onClick={() => this.props.history.push("/reg")}
              className="pointer"
            >
              忘记密码
            </span>
            <Flex justify="around">
              <Button
                className="btn regBtn pointer"
                size="small"
                onClick={() => this.props.history.push("/reg")}
              >
                <span>注册</span>
              </Button>
              <Button
                className="btn logBtn pointer"
                size="small"
                onClick={this.checkLogin}
              >
                <span>登录</span>
              </Button>
            </Flex>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}
