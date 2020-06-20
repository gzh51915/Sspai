import React, { Component } from "react";
import {
  WingBlank,
  WhiteSpace,
  Flex,
  Tabs,
  Button,
  InputItem,
  Toast,
  Modal,
} from "antd-mobile";
import HomeNavbar from "../../components/HomeNavbar";
import {
  getUserInfo,
  editUserPic,
  editNickName,
  editPassword,
} from "../../utils/http";
import "./UserInfo.css";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        { title: <span>资料编辑</span> },
        { title: <span>帐号和密码</span> },
      ],
      userPic: "",
      nickName: "",
      id: sessionStorage.user,
      newNickName: "",
      password: "",
    };
  }
  // 双向绑定输入框数据
  changeMsg(val, event) {
    this.setState({
      [val]: event,
    });
  }
  // 获取用户数据
  getInfo = (id) => {
    getUserInfo(id).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          userPic: res.data.data[0].img,
          nickName: res.data.data[0].nickname,
        });
      }
    });
  };

  // 伪造的文件上传框
  fakeUpload = () => {
    this.refs.uploadImg.click();
  };

  // 上传文件
  uploadUserPic = () => {
    let that = this;
    let id = this.state.id;
    let file = this.refs.uploadImg.files[0];
    // 读取文件，并转为base64格式
    let reader = new FileReader();
    function img2base64() {
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        resolve(reader);
      });
    }
    (async function () {
      let img = await img2base64();
      reader.onload = () => {
        let imgUrl = img.result;
        editUserPic(id, imgUrl).then((res) => {
          if (res.data.code === 200) {
            Toast.success("头像上传成功！", 2);
            that.getInfo(id);
          }
        });
      };
    })();
  };

  // 删除头像
  deletePic = () => {
    editUserPic(this.state.id, "").then((res) => {
      if (res.data.code === 200) {
        Toast.success("头像删除成功！", 2);
        this.getInfo(this.state.id);
      }
    });
  };

  // 更改密码
  updateNewPsw = () => {
    console.log(1);
    let { id, password } = this.state;
    let pswReg = /^[a-zA-Z]\w{6,20}$/;
    if (!pswReg.test(password)) {
      Toast.fail("请输入符合条件的密码！", 2);
      return;
    }
    editPassword(id, password).then((res) => {
      console.log(res);
      if (res.data.code === 200) {
        Toast.success("密码修改成功！", 2);
      }
    });
  };

  // 检测昵称栏回车键
  namePressEnter = (eve) => {
    if (eve.which !== 13) return;
    this.updateNewName();
  };

  // 刷新昵称
  updateNewName = () => {
    let { id, newNickName } = this.state;
    let Reg = /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/;
    if (!Reg.test(newNickName)) {
      Toast.fail("请输入4~16位的用户名！", 2);
      return;
    }
    editNickName(id, newNickName).then((res) => {
      if (res.data.code === 200) {
        Toast.success("昵称修改成功！", 2);
        this.setState({
          nickName: newNickName,
          newNickName: "",
        });
      }
    });
  };

  componentDidMount() {
    this.getInfo(this.state.id);
  }

  compoentDidUpdate() {
    // this.getInfo(this.state.id);
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
            <WingBlank className="editInfo" size="lg">
              <Flex className="editBox">
                <Flex.Item className="picSection">
                  <img
                    src={"http://10.3.135.29:3000/" + this.state.userPic}
                    alt=""
                  />
                </Flex.Item>
                <Flex.Item className="picBtnSection">
                  <Flex justify="end">
                    <Button
                      className="picBtn deletePic pointer"
                      size="small"
                      onClick={this.deletePic}
                      inline="true"
                    >
                      <span>删除头像</span>
                    </Button>
                    <Button
                      className="picBtn uploadPic pointer"
                      size="small"
                      inline="true"
                      onClick={this.fakeUpload}
                    >
                      <span>
                        上传新头像
                        <input
                          type="file"
                          ref="uploadImg"
                          accept="image/png,image/jpg"
                          style={{ display: "none" }}
                          onChange={this.uploadUserPic}
                        />
                      </span>
                    </Button>
                  </Flex>
                </Flex.Item>
              </Flex>
              <section className="editBox">
                <h3 className="editTip">昵称</h3>
                <InputItem
                  className="nickNameIpt"
                  placeholder={this.state.nickName}
                  value={this.state.newNickName}
                  maxLength="20"
                  onChange={this.changeMsg.bind(this, "newNickName")}
                  clear
                  onKeyDown={this.namePressEnter}
                />
                <WhiteSpace size="md" />
              </section>
              <article className="saveBtnSection">
                <Button
                  size="small"
                  className="saveBtn pointer"
                  inline
                  activeStyle={{ background: "#fd281a", color: "#fff" }}
                  onClick={this.updateNewName}
                >
                  <span>保存</span>
                </Button>
              </article>
            </WingBlank>
            <WingBlank className="editPsw" size="lg">
              <section className="editBox">
                <h3 className="editTip">密码修改</h3>
                <InputItem
                  type="password"
                  className="nickNameIpt"
                  value={this.state.password}
                  maxLength="20"
                  onChange={this.changeMsg.bind(this, "password")}
                  clear
                />
                <WhiteSpace size="md" />
              </section>
              <article className="saveBtnSection">
                <Button
                  size="small"
                  className="saveBtn pointer"
                  inline
                  activeStyle={{ background: "#fd281a", color: "#fff" }}
                  onClick={() => {
                    Modal.alert("", "是否确定更改新密码？", [
                      { text: "否", onPress: () => console.log("cancel") },
                      { text: "是", onPress: () => this.updateNewPsw() },
                    ]);
                  }}
                >
                  <span>保存</span>
                </Button>
              </article>
            </WingBlank>
          </Tabs>
        </header>
      </div>
    );
  }
}
