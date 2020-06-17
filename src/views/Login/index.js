import React, { Component } from 'react'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {  getUserName } from '../../api'
// import {getLogin} from '../../store/action/login'
import {startLogin , loginSuccess ,loginFailed ,logout} from '../../store/action/login'
import './style.css'
import { connect } from 'react-redux';
class Login extends Component {
  state = {
    loginToken: ''
  }
  render() {
    const onFinish = async values => {
      const username = values.username
      const password = values.password
      this.props.startLogin()
      let res = await getUserName(username, password)
      if(res.code === 200){
        window.localStorage.setItem('authorization',JSON.stringify(res.data.authorization))
        window.localStorage.setItem('userInfo',JSON.stringify(res.data.username))
        this.props.loginSuccess()
        this.props.history.push('/admin/administrator')
      }else{
        this.props.loginFailed()
      }
    }
    return (
      <div className="loginBox">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '大爷，别忘了写你的大名哦' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="给二大爷我写下你的大名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '大爷，没密码莫得授权看付费内容哦' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="别忘了把你的支付密码写上"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
              </Button>
          </Form.Item>
        </Form>
      </div>

    )
  }
}

const mapState = (state) => {
  return {
    login : state.login.isLogin,
    load : state.login.loading
  }
}

export default connect(mapState,{startLogin , loginSuccess ,loginFailed ,logout})(Login)