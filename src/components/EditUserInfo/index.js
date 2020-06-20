import React, { Component } from "react";
import {
  WingBlank,
  WhiteSpace,
  Flex,
  Button,
  InputItem,
  Toast,
} from "antd-mobile";
import { editUserPic, editNickName, getUserInfo } from "../../utils/http";

export default class EditUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPic: "",
      nickName: "",
      id: sessionStorage.user,
      newNickName: "",
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
  // 检测昵称栏回车键
  namePressEnter = (eve) => {
    if (eve.which !== 13) return;
    this.updateNewName();
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

  render() {
    return (
      <WingBlank className="editInfo" size="lg">
        <Flex className="editBox">
          <Flex.Item className="picSection">
            <img src={"http://10.3.135.29:3000/" + this.state.userPic} alt="" />
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
    );
  }
}
