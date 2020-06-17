import React, { Component } from "react";
import {
  Flex,
  WingBlank,
  WhiteSpace,
  InputItem,
  Radio,
  Button,
  Toast,
} from "antd-mobile";
import { getVcode, getReg } from "../../utils/http";
import "./Register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      vcode: "",
      agree: false,
    };
  }
  getCode = () => {
    getVcode().then((res) => {
      if (res.status === 200) {
        document.querySelector("#vcode_svg").innerHTML = res.data;
      }
    });
  };
  componentDidMount() {
    this.getCode();
  }
  changeMsg(val, event) {
    this.setState({
      [val]: event,
    });
  }

  checkReg = () => {
    let { username, password, password2, vcode, agree } = this.state;
    let userReg = /^\w{6,20}$/;
    let pswReg = /^[a-zA-Z]\w{6,20}$/;
    if (!userReg.test(username)) {
      Toast.fail("请输入6~20位的数字字母组合作为帐号", 2);
      return;
    }
    if (!pswReg.test(password)) {
      Toast.fail("请输入6~20位的数字字母组合作为密码", 2);
      return;
    }
    if (password !== password2) {
      Toast.fail("请输入相同的密码", 2);
      return;
    }
    if (!agree) {
      Toast.fail("请点击同意条款", 2);
      return;
    }
    getReg({ username, password, vcode }).then((res) => {
      switch (res.data.code) {
        case 200:
          Toast.success("注册成功", 2);
          this.props.history.push("/login");
          break;
        case 300:
          Toast.fail("验证码错误", 2);
          break;
        default:
          Toast.offline("注册失败，未知错误", 2);
      }
    });
  };
  render() {
    // 根据是否点击同意条款来改变字体颜色
    const agreeColor = {
      color: this.state.agree ? "#292525" : "#8e8787",
    };
    return (
      <div className="regPage">
        <WhiteSpace size="xl" />
        <WingBlank style={{ textAlign: "center" }} className="regLogo pointer">
          <img
            src="https://tvax4.sinaimg.cn/large/eda28311gy1gfudd4epyqj205o020glk.jpg"
            alt=""
            onClick={() => this.props.history.push("/")}
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
          ></InputItem>
          <WhiteSpace size="lg" />
          <InputItem
            clear
            placeholder="确认密码"
            type="password"
            onChange={this.changeMsg.bind(this, "password2")}
          ></InputItem>
          <WhiteSpace size="lg" />
          <Flex justify="between">
            <Flex.Item>
              <InputItem
                clear
                placeholder="验证码"
                onChange={this.changeMsg.bind(this, "vcode")}
              ></InputItem>
            </Flex.Item>
            <Flex.Item>
              <span
                id="vcode_svg"
                className="pointer"
                onClick={this.getCode}
              ></span>
            </Flex.Item>
          </Flex>

          <WhiteSpace size="md" />
          <Radio
            key={0}
            className="my-radio pointer"
            checked={this.state.agree}
            onClick={() => this.setState({ agree: !this.state.agree })}
          >
            <span style={agreeColor}>
              我已经阅读并同意<a href="/">《多数派用户协议》</a>
            </span>
          </Radio>
          <WhiteSpace size="lg" />
          <Flex justify="between">
            <span
              onClick={() => this.props.history.push("/login")}
              className="pointer"
            >
              返回登录
            </span>
            <Button
              className="regBtn pointer"
              size="small"
              onClick={this.checkReg}
            >
              <span>注册</span>
            </Button>
          </Flex>
        </WingBlank>
      </div>
    );
  }
}
