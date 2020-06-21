import React, {Component} from 'react';
//自定义半封装组件
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import MyModal from "../../conponents/my-Modal";
import RemoveModal from "../../conponents/Remove-Modal";
//UI组件
import {Empty, Card, message, Table, Space, Button, Avatar,Modal, Form, Input,Pagination} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
//接口请求
import {userRequest, addUserRequest, removeUserRequest, removeAdminRequest,} from '../../api/request'
//UI组件
const { Column } = Table;

class User extends Component {
    state = {
        //用户信息列表
        usersList:[],
        //控制添加用户对话框显示与否
        showAddDialogVisible: false,
        //控制删除用户对话框显示与否
        showRemoveDialogVisible: false,
        //分页配置信息
        current:1,
        pageSize:5,
        //将要删除的用户名
        willRemoveUsername:''
    }
    async componentDidMount() {
        //获取用户信息
        this.getUsersList()
    }
    //获取用户信息，并存储
    getUsersList = async()=>{
        const res = await userRequest()
        if (res.code !== 200){
            message.error('用户信息获取失败')
        }else {
            this.setState({
                usersList:res.data
            })
        }
    }
    //点击改变页数
    pageChange = (current, pageSize) => {
        this.setState({current})
    }
    //点击添加用户展示对话框
    showAddDialog = () =>{
        this.setState({
            showAddDialogVisible:true
        })
    }
    //隐藏添加对话框
    hiddenAddDialog = () =>{
        this.setState({
            showAddDialogVisible:false,
        })
    }
    //点击确定添加用户事件
    addUser = async (values) =>{
        let {username,password} = values
        if(values){
            let result = await addUserRequest(username,password)
            if (result.code !== 200){
                message.error('添加用户失败'+ result.msg)
            }else {
                this.getUsersList()
                this.setState({
                    showAddDialogVisible:false,
                })
                message.success('添加用户成功')
            }
        }
    }
    //隐藏删除用户对话框
    hiddenRemoveDialog = ()=>{
        this.setState({
            showRemoveDialogVisible:false
        })
    }
    //点击管删除理员展示对话框
    showRemoveDialog = (item) =>{
        this.setState({
            showRemoveDialogVisible:true,
            willRemoveUsername:item.name
        })
    }
    //点击确定删除用户对话框
    removeUser = async () =>{
        let {willRemoveUsername} = this.state
        const result = await removeUserRequest(willRemoveUsername)
        if (result.code === 200){
            this.getUsersList()
            message.success('删除用户成功')
        }else {
            message.error('删除用户失败')
        }
        this.setState({
            showRemoveDialogVisible:false
        })
    }
    render() {
        let {usersList,showAddDialogVisible,showRemoveDialogVisible} = this.state
        //table表格数据
        let dataSource = []
        usersList.map((item,index)=>{
            let temp = {
                key:item._id,
                name:item.username,
                time:(item.regtime).toLocaleString(),
                img:'http://10.3.135.29:3000'+item.img,
                nickname:item.nickname,
                index:index+1
            }
            dataSource.push(temp)
        })
        if(usersList.length){
            return (
                <div>
                    <MyBreadcrumb list={['首页','人员管理','用户管理']}/>
                    <Card>
                        <Button onClick={this.showAddDialog} type='primary' style={{marginBottom:'20px'}}>添加用户</Button>
                        <Table
                            pagination={{  // 分页
                                current: this.state.current,
                                pageSize: this.state.pageSize,
                                showTotal: total => `共 ${total} 条数`,
                                onChange: (current, pageSize) => this.pageChange(current, pageSize),
                            }}
                            bordered dataSource={dataSource}>
                            <Column title="#" dataIndex="index" key="index" />
                            <Column title="用户名" dataIndex="name" key="name" />
                            <Column title="头像" dataIndex="img" key="img"
                                render={(text,record)=>{
                                    return <Avatar src={text} size={50} icon={<UserOutlined />}/>
                                }}
                            />
                            <Column title="昵称" dataIndex="nickname" key="nickname" />
                            <Column title="时间" dataIndex="time" key="time" />
                            <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                            <Space size="middle">
                                <Button type={"primary"}>编辑</Button>
                                <Button onClick={this.showRemoveDialog.bind(this,text)} danger type={"primary"}>删除</Button>
                            </Space>
                        )}
                            />
                        </Table>
                        {/*添加用户对话框*/}
                        <MyModal showDialog={showAddDialogVisible}
                                 info={'用户'}
                                 hiddenDialog={this.hiddenAddDialog}
                                 onFinish={this.addUser}
                        />
                        {/*    删除对话框*/}
                        <RemoveModal showDialog={showRemoveDialogVisible}
                                     hiddenDialog={this.hiddenRemoveDialog}
                                     onSubmit={this.removeUser}
                        />
                    </Card>
                </div>
            );
        }else {
            return <Empty />
        }

    }
}

export default User;