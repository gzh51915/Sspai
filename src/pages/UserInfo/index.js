import React, { PureComponent } from "react";
import { WingBlank, WhiteSpace, Tabs } from "antd-mobile";
import "./UserInfo.css";
import HomeNavbar from "../../components/HomeNavbar";
import EditUserInfo from "../../components/EditUserInfo";
import EditUserPsw from "../../components/EditUserPsw";
import { withRouter } from "react-router-dom";

class UserInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { title: <span>资料编辑</span> },
        { title: <span>帐号和密码</span> },
      ],
    };
  }
  componentWillMount() {
    // 登录验证
    if (!sessionStorage.user) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div>
        <HomeNavbar />
        <header>
          <WingBlank size="lg">
            <h1>帐号设置</h1>
          </WingBlank>
          <WingBlank size="md">
            <hr color="#e5e5e5" />
          </WingBlank>
          <WhiteSpace size="md" />
          <Tabs
            tabs={this.state.tabs}
            tabBarBackgroundColor="transparent"
            tabBarActiveTextColor="#fd281a"
            tabBarInactiveTextColor="#8e8787"
            swipeable={false}
            tabBarUnderlineStyle={{ borderColor: "#fd281a" }}
          >
            <EditUserInfo />
            <EditUserPsw />
          </Tabs>
        </header>
      </div>
    );
  }
}
export default withRouter(UserInfo);
