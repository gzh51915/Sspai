import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
//UI组件
import {Empty, Card, message, Table, Space, Button, Modal, Form, Input,  Switch as Switch1,
      } from 'antd';
//API请求
import {navRequest} from '../../api/request'
//UI组件
const { Column } = Table;
class Nav extends Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        navList :[],
        firstName:'',
        secondName:'',
    };
    formRef = React.createRef();
    componentDidMount() {
        //调用获取文章分栏数据
        this.getNavList()
        console.log(1);
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
    }
    editManger = (record) => {
        this.setState({
            visible: true,
            firstName:record.title,
            secondName:record.type
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });

        const {value} = this.formRef.props

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 100);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false
        });
    };
    onChange = (e) => {
        // console.log(this.formRef.current.props);
    }
    onChange1 = (value) => {
        // console.log('changed1', value)
    }
    render() {
        let {navList,showAddDialogVisible,showRemoveDialogVisible,_id} = this.state
        let {adminList} = this.state
        const { visible, confirmLoading, ModalText } = this.state;
        const onFinish = values => {
            console.log(values);
        };
        //form样式
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
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
                                        <Button type={"primary"} onClick={this.editManger.bind(this,record)}>编辑</Button>
                                        <Button danger type={"primary"}>删除</Button>
                                    </Space>
                                )}
                            />

                        </Table>
                        <Modal
                            title="Title"
                            visible={visible}
                            onOk={this.handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={this.handleCancel}
                        >
                            <Form {...layout}  name="user"  onFinish={onFinish} validateMessages={validateMessages}>
                                <Form.Item
                                    name={['user', 'name']}
                                    label="分栏名称"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input  onChange={this.onChange} ref={formRef=>this.formRef = formRef}/>
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="类型"
                                    rules={[
                                        {
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input onChange={this.onChange1}/>
                                </Form.Item>
 
                            </Form>
                        </Modal>
                    </Card>
                </div>
            );
        }else {
            return <Empty />
        }
    }
}

export default Nav;