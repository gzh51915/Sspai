import React, {Component} from 'react';
//自定义半封装组件
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import MyModal from "../../conponents/my-Modal";
import RemoveModal from "../../conponents/Remove-Modal";
//UI组件
import {
    Empty,
    Card,
    message,
    Table,
    Space,
    Switch as Switch1,
    Button,
    Avatar
} from 'antd';
import { UserOutlined} from "@ant-design/icons";
//接口请求
import {adminRequest,changeRequest,addAdminRequest,removeAdminRequest} from '../../api/request'
//UI组件
const { Column } = Table;
class Admin extends Component {
    state = {
        //管理员信息列表
        adminList:[],
        //控制添加管理员对话框显示与否
        showAddDialogVisible: false,
        //控制删除管理员对话框显示与否
        showRemoveDialogVisible: false,
        //分页配置信息
        current:1,
        pageSize:5,
        //将要删除的管理员名
        willRemoveUsername:''

}
    async componentDidMount() {
        //获取管理员信息
        this.getAdminList()
    }
    //获取管理员信息并存在state里
    getAdminList = async()=>{
        const res = await adminRequest()
        if(res.code === 403){
            message.error('令牌验证失败,请重新登录')
            this.props.history.push('/login')
        }
        if (res.code !== 200){
            message.error('管理员信息获取失败')
        }
        else {
            this.setState({
                adminList:res.data
            })
        }
    }
    //权限信息修改
    onChange = async (pre,item,next,record) =>{
        let _id = item.key
        let {adminList} = this.state
        let index = adminList.findIndex(item=>item._id === _id)
        adminList[index].power = !adminList[index].power
        const result = await changeRequest(item.name,adminList[index].power)
        if (result.code === 200){
            this.setState({
                adminList
            })
            message.success('修改权限成功')
        }else {
            message.error('修改权限失败')
        }
    }
    //点击添加管理员展示对话框
    showAddDialog = () =>{
        this.setState({
            showAddDialogVisible:true
        })
    }
    //点击管删除理员展示对话框
    showRemoveDialog = (item) =>{
        this.setState({
            showRemoveDialogVisible:true,
            willRemoveUsername:item.name
        })
    }
    //隐藏对话框
    hiddenAddDialog = () =>{
        this.setState({
            showAddDialogVisible:false,
        })
    }
    //点击隐藏删除管理员展示对话框
    hiddenRemoveDialog = () =>{
        this.setState({
            showRemoveDialogVisible:false
        })
    }
    //点击确定添加管理员事件
    addAdmin = async (values) =>{
        let {username,password,role} = values
        if(values){
            let result = await addAdminRequest(username,password,role)
            if (result.code !== 200){
                message.error('添加管理员失败'+ result.msg)
            }else {
                this.getAdminList()
                message.success('添加管理员成功')
            }
            this.setState({
                showAddDialogVisible:false,
            })
        }
    }
    //点击改变页数
    pageChange = (current, pageSize) => {
        this.setState({current})
    }
    //点击删除对应管理员
    removeAdmin =  async ()=>{
        let {willRemoveUsername} = this.state
        const result = await removeAdminRequest(willRemoveUsername)
        if (result.code === 200){
            this.getAdminList()
            message.success('删除管理员成功')
        }else {
            message.error('删除管理员失败')
        }
        this.setState({
            showRemoveDialogVisible:false
        })
    }
    render() {
        let {showAddDialogVisible,showRemoveDialogVisible} = this.state
        let {adminList} = this.state
        //table表格数据
        let dataSource = []
        adminList.map((item,index)=>{
            let temp = {
                key:item._id,
                name:item.username,
                time:(item.addtime).toLocaleString(),
                power:item.power,
                role:item.role,
                index:index+1,
                img:item.avatar
            }
            dataSource.push(temp)
        })
        if(adminList.length){
            return (
                <div>
                    <MyBreadcrumb list={['首页','人员管理','管理员管理']}/>
                    <Card>
                        <Button onClick={this.showAddDialog} type='primary' style={{marginBottom:'20px'}}>添加管理员</Button>
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
                                        return <Avatar src={'http://47.115.127.10:3000/'+text} size={50} icon={<UserOutlined />}/>
                                    }}
                            />
                            <Column title="角色" dataIndex="role" key="role" />
                            <Column title="时间" dataIndex="time" key="time" />
                            <Column title="权限" dataIndex="power" key="power"
                                    render={(text, record)=>{
                                        return <Switch1
                                            checked={record.power?true:false}
                                            onChange={this.onChange.bind(this,text,record)} />}}/>
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
                    </Card>
                    {/*添加管理员对话框*/}
                    <MyModal showDialog={showAddDialogVisible}
                             hiddenDialog={this.hiddenAddDialog}
                             info={'管理员'}
                             onFinish={this.addAdmin}>
                    </MyModal>
                {/*    删除对话框*/}
                    <RemoveModal showDialog={showRemoveDialogVisible}
                                 hiddenDialog={this.hiddenRemoveDialog}
                                 onSubmit={this.removeAdmin}
                    ></RemoveModal>
                </div>
            );
        }
        else {
            //
            return <Empty />
        }
    }
}

export default Admin;