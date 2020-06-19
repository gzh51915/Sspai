import React, {Component} from 'react';
import {Form, Input, Button, message, Card} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss'
import {loginRequest} from "../../api/request";

class Index extends Component {
    onFinish = async (values)=>{
        const result = await loginRequest(values.username,values.password)
        if (result.code === 200){
            sessionStorage.setItem('adminToken',result.data.authorization)
            sessionStorage.setItem('admin',result.data.username)
            this.props.history.push('/home')
            message.success('登录成功')
        }else {
            message.error(result.msg)
        }
    }
    render() {
        return (
            <Card style={{width:'40vw',backgroundColor:'#ccc',margin:'auto'}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
                    <Form.Item name="username"
                        rules={[{required: true,message: '管理员账号不能为空！'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入管理员账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true,message: '管理员密码不能为空！'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入管理员密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Index;