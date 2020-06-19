import React, {Component} from 'react';
import {Button, Form, Input, message, Modal,Select} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
const { Option } = Select;
class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //隐藏对话框
    hiddenAddDialog = () =>{
        this.password.handleReset('')
        this.username.handleReset('')
        this.props.hiddenDialog()
        message.info('取消了添加')
    }
    render() {
        let {showDialog,hiddenDialog,info,onFinish} = this.props
        return (
            <Modal
                title={`添加${info}`}
                visible={showDialog}
                onCancel={this.hiddenAddDialog}
                onOk={this.hiddenAddDialog}
                cancelText={'取消'}
                okText={'返回'}
            >
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item name="username"
                               rules={[
                                   {required: true,message: `${info}账号不能为空！`,type:"string"},
                                   {min:4,message:'不能少于4个字符'}]}>
                        <Input  value={this.state.username}
                                ref={username =>this.username = username }
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder={`请输入${info}账号`} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true,message: `${info}密码不能为空`,type:"string"},
                            {min:4,message:'不能少于4个字符'}]}>
                        <Input
                            ref={password =>this.password = password }
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder={`请输入${info}密码`}
                            value={this.state.password}
                        />
                    </Form.Item>

                    {
                        info === '管理员' ?
                            <Form.Item name='role' rules={[{required: true}]}>
                                <Select placeholder="选择角色">
                                    <Option value="管理员">管理员</Option>
                                    <Option value="经理">经理</Option>
                                    <Option value="普通员工">普通员工</Option>
                                </Select>
                            </Form.Item> : ''
                    }
                    <Form.Item>
                        <Button type="primary"  htmlType="submit">
                            确认添加
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default MyModal;