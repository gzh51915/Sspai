import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
//UI组件
import {Empty, Card, message, Table, Space, Button, Modal, Form, Input, Pagination, Switch as Switch1} from 'antd';
//API请求
import {navRequest} from '../../api/request'
//UI组件
const { Column } = Table;
class Nav extends Component {
    componentDidMount() {
        //调用获取文章分栏数据
        this.getNavList()
    }
    //获取文章分栏数据
    getNavList = async () =>{
        const result = await navRequest()
        if(result.code === 200){
            this.setState({
                navList:result.data
            })
        }else {
            message.error('获取文章分栏信息失败')
        }
        console.log(result);
    }
    state = {
        navList :[]
    }
    render() {
        let {navList,showAddDialogVisible,showRemoveDialogVisible,_id} = this.state
        let {adminList} = this.state
        //table表格数据
        let dataSource = []
        navList.map((item,index)=>{
            let temp = {
                key:item._id,
                title:item.title,
                type:item.type,
                index:index+1
            }
            dataSource.push(temp)
        })
        if(navList.length){
            return (
                <div>
                    <MyBreadcrumb list={['首页','文章管理','文章分栏管理']}/>
                    <Card>
                        <Button style={{marginBottom:'20px'}} type={"primary"}>添加导航</Button>
                        <Table
                            pagination={false}
                            bordered dataSource={dataSource}>
                            <Column title="#" dataIndex="index" key="index" />
                            <Column title="分栏名称" dataIndex="title" key="title" />
                            <Column title="类型" dataIndex="type" key="type" />
                            <Column
                                title="操作"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button type={"primary"}>编辑</Button>
                                        <Button danger type={"primary"}>删除</Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </Card>
                </div>
            );
        }else {
            return <Empty />
        }
    }
}

export default Nav;