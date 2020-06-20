import React, { Component } from "react";
import {
  WingBlank,
  WhiteSpace,
  Button,
  InputItem,
  Toast,
  Modal,
} from "antd-mobile";
import { editPassword } from "../../utils/http";

export default class EditUserPsw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: sessionStorage.user,
      password: "",
    };
  }
  // 双向绑定输入框数据
  changeMsg(val, event) {
    this.setState({
      [val]: event,
    });
  }
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
      if (res.data.code === 200) {
        Toast.success("密码修改成功！", 2);
        this.setState({
          password: "",
        });
      }
    });
  };

  render() {
    return (
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
    );
  }
}
