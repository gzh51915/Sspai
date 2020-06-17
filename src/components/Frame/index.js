import React, { Component } from 'react'
import { Layout, Menu, Avatar, message } from 'antd';
import { getWebImg } from '../../api'
import '../../layout/Frame.scss'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../store/action/login'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import Breadcrumb from '../../util/breadcrumb'

// import '@/layout/Frame.scss'
class Frame extends Component {
    state = {
        res: [],
        logo: '',
        isLogin: false,
        isExit: Boolean(localStorage.getItem('authorization')),
        data:['管理界面','管理添加']
    }
    async componentDidMount() {
        let resImg = await getWebImg()
        let loge = resImg.data[0].logo2
        this.setState({
            res: resImg,
            logo: loge
        })
    }
    loginBtn = () => {
        if (localStorage.getItem('authorization')) {
            message.success('您已经登陆成功了')
            this.setState({
                isExit: true
            })
        }
    }

    exitBtn = () => {
        const { history } = this.props
        this.props.logout()
        message.success('退出成功')
        history.push('/login')
        this.setState({
            isExit: false
        })
    }
    menuItem = ( key ) => {                 //这里是点击左边菜单栏跳转
        this.props.history.push(key)    //key要解构，原因在于它在对象里面，要拿出来才用的了
        if(key.key == "1"){
            this.setState({
                data:['管理界面','管理添加']
            })
            this.props.history.push('/admin/administrator')
        }
        if(key.key == "2"){
            this.setState({
                data:['管理界面','用户添加']
            })
            this.props.history.push('/admin/administrator/user')
        }
    }
    // menu1Item = ( key ) => {                 //这里是点击左边菜单栏跳转
    //     this.props.history.push('/administrator/user')    //key要解构，原因在于它在对象里面，要拿出来才用的了
    // }
    render() {
        const { Header, Content, Footer, Sider } = Layout;
        const { SubMenu } = Menu;
        const selectedKeysArr = this.props.location.pathname.split('/')        //这里是为了默认值，左边的菜单栏的默认选项
        selectedKeysArr.length = 3
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <Avatar src={this.state.logo} size={50} />
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} className="menu-right">
                        {this.state.isExit ? <Menu.Item key="0" onClick={this.exitBtn}>退出</Menu.Item> : <Menu.Item key="0" onClick={this.loginBtn}>登录</Menu.Item>}
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                           selectedKeys={[selectedKeysArr.join('/')]}
                            style={{ height: '100%', borderRight: 0 }} 
                        >
                            <SubMenu key="sub1" icon={<MenuUnfoldOutlined />} key='/admin/administrator' title="管理文档" onClick={this.menuItem}>
                                <Menu.Item key="1" >管理添加</Menu.Item>
                                <Menu.Item key="2">用户添加</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<AppstoreOutlined />} key='/admin/artical' title="文章管理" onClick={this.menu1Item}>
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb data={this.state.data}>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>后台系统啥也不是 五天解决</Footer>
            </Layout>

        )
    }
}

const mapState = (state) => {
    return {
        login: state.login.isLogin
    }
}


// export default connect(mapState)(withRouter(Frame))
export default connect(mapState, { logout })(withRouter(Frame))