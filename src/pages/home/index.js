import React, {Component} from 'react';
import MyBreadcrumb from '../../conponents/my-Breadcrumb'
import {Layout, Button,message} from 'antd';
import './home.css'
import {Menu} from 'antd';
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import HomeIndex from "../index";
import Admin from "../people/admin";
import User from  '../people/user'
import ArticleList from "../article/list";
import ArticleNav from "../article/nav";
import Banner from "../show/banner";
import Cart from "../show/cart";
import {tokenRequest} from "../../api/request";
import Test from "../test";
const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

class Index extends Component {
    //判断token
    async componentDidMount() {
        let token = sessionStorage.getItem('adminToken')
        if (!token) {
            this.props.history.push('/')
        }else {
            const result = await tokenRequest(token)
            if(result.code !== 200){
                this.props.history.push('/')
                message.error('令牌验证失败，请重新登录')
            }
        }
    }
    //退出登录
    logout = () => {
        sessionStorage.removeItem('adminToken')
        this.props.history.push('/')
        message.success('退出成功')
    }
    render() {
        return (
            <Layout>
                {/*左边菜单导航*/}
                <Sider width={256} style={{backgroundColor: '#333', height: '100vh',paddingTop:'64px'}}>
                    <Menu
                        style={{width: '100%',boxSizing:'border-box',border:'none',backgroundColor:'#fff'}}
                        mode="inline"
                    >
                        <SubMenu
                            style={{backgroundColor:"#ccc"}}
                            key="人员管理" title='人员管理'
                        >
                            <Menu.Item key="管理员管理" ><Link to='/home/admin'>管理员管理</Link></Menu.Item>
                            <Menu.Item key="用户管理" ><Link to='/home/user'>用户管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            style={{backgroundColor:"#ccc"}}
                            key="sub2" title='文章管理'
                        >
                            <Menu.Item key="文章分栏管理"><Link to='/home/articleNav'>文章分栏管理</Link></Menu.Item>
                            <Menu.Item key="文章内容管理"><Link to='/home/articleList'>文章内容管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            style={{backgroundColor:"#ccc"}}
                            key="sub3" title='首页管理'
                        >
                            <Menu.Item key="轮播图管理"><Link to='/home/banner'>轮播图管理</Link></Menu.Item>
                            <Menu.Item key="卡片管理"><Link to='/home/cart'>卡片管理</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                {/*右边头部*/}
                <Layout style={{backgroundColor: '#ccc'}}>
                    <Header style={{backgroundColor: '#333'}}>
                        <div className='logoBox'></div>
                        <div className='logotitle'>后台管理系统</div>
                        <Button onClick={this.logout} style={{float: 'right', marginTop: '16px'}} danger
                                type="primary">退出</Button>
                    </Header>
                    {/*中间内容*/}
                    <Content style={{padding: '0 30px',backgroundColor:"lightcyan"}}>
                        {/*面包屑导航*/}
                        <Switch>
                            <Route path='/home/index' component={HomeIndex}/>
                            <Route path='/home/admin' component={Admin}/>
                            <Route path='/home/user' component={User}/>
                            <Route path='/home/articleNav' component={ArticleNav}/>
                            <Route path='/home/articleList' component={ArticleList}/>
                            <Route path='/home/banner' component={Banner}/>
                            <Route path='/home/cart' component={Cart}/>
                            <Route path='/home/test' component={Test}/>
                            <Redirect from='/home' to='/home/index' exact/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;