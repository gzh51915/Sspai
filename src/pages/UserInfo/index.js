import React, { Component } from "react";
import { WingBlank, WhiteSpace, Flex, Tabs } from "antd-mobile";
import HomeNavbar from "../../components/HomeNavbar";
import { getUserInfo } from "../../utils/http";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { title: <span>资料编辑</span> },
        { title: <span>帐号和密码</span> },
      ],
    };
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
            tabBarUnderlineStyle={{ borderColor: "#fd281a" }}
          >
            <section className="editInfo">
              <Flex>
                <Flex.Item className="editBox">
                  <img src="" alt=""></img>
                </Flex.Item>
                <Flex.Item className="editBox"></Flex.Item>
              </Flex>
            </section>
            <section className="editBox">
              <Flex>
                <Flex.Item>
                  <img src="" alt=""></img>
                </Flex.Item>
                <Flex.Item></Flex.Item>
              </Flex>
            </section>
          </Tabs>
        </header>
      </div>
    );
  }
}
