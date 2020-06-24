import React, {Component,lazy} from 'react';
import MyBreadcrumb from '../../conponents/my-Breadcrumb'
import {Layout, Button,message} from 'antd';
import './home.css'
import {Menu} from 'antd';
import {Switch,Route,Link,Redirect} from 'react-router-dom'
import Loading from '../../conponents/loading'
import Loadable from 'react-loadable'
import {tokenRequest} from "../../api/request";
const HomeIndex = Loadable({
    loader:() => import("../index"),
    loading:Loading
})
const Admin = Loadable({
    loader:() => import("../people/admin"),
    loading:Loading
})
const User = Loadable({
    loader:() => import('../people/user'),
    loading:Loading
})
const ArticleList = Loadable({
    loader:() => import("../article/list"),
    loading:Loading
})
const ArticleNav = Loadable({
    loader:() => import("../article/nav"),
    loading:Loading
})
const Banner = Loadable({
    loader:() => import("../show/banner"),
    loading:Loading
})
const EditBanner = Loadable({
    loader:() => import('../show/editBanner'),
    loading:Loading
})
const ArticleContent = Loadable({
    loader:() => import('../article/content'),
    loading:Loading
})
const AddArticle = Loadable({
    loader:() => import('../article/addarticle'),
    loading:Loading
})
const Test = Loadable({
    loader:() => import("../test"),
    loading:Loading
})
const Cart = Loadable({
    loader:() => import("../../pages/show/cart"),
    loading:Loading
})

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
                            <Menu.Item key="文章列表管理"><Link to='/home/articleList'>文章列表管理</Link></Menu.Item>
                            <Menu.Item key="文章内容管理"><Link to='/home/articleContent'>文章内容管理</Link></Menu.Item>
                            <Menu.Item key="添加文章管理"><Link to='/home/addarticle'>添加文章管理</Link></Menu.Item>
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
                            <Route path='/home/articleContent' component={ArticleContent}/>
                            <Route path='/home/addarticle' component={AddArticle}/>
                            <Route path='/home/banner' component={Banner} exact/>
                            <Route path='/home/banner/:id' component={EditBanner}/>
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