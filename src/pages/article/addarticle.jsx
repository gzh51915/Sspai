import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import MyMarkDown from "../../conponents/myMarkDown";
import {Button, Card, Form, Input, message, Select,Upload} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import {navRequest,saveArticleImgRequest,addArticleRequest,adminRequest,addArticleListRequest} from "../../api/request";

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
            loading: false,
            //管理员数据
            adminList:[],
            //文章分栏数据
            navList : [],
            //添加文章参数
            articleMsg : {
                title: '',
                banner: '',
                author: '',
                desc: '',
                content: '',
                mark:'',
                html:'',
                avatar:''
            }
        }
    }
    componentDidMount() {
        this.getNavList()
        this.getAdminList()
    }
    //获取文章分栏数据
    getNavList =async () =>{
        try{
            const res = await navRequest()
            if (res.code === 200){
                this.setState({
                    navList:res.data
                })
            }else {
                message.error('获取文章分栏失败')
            }
        }catch (e) {
            console.log(e);
        }
    }
    //获取管理员数据
    getAdminList =async () =>{
        try{
            const res = await adminRequest()
            if (res.code === 200){
                this.setState({
                    adminList:res.data
                })
            }else {
                message.error('获取管理员失败')
            }
        }catch (e) {
            console.log(e);
        }
    }
    //获取markdown文档内容
    getContent = ({html,text:mark}) => {
        this.setState({
            articleMsg:{...this.state.articleMsg,mark,html}
        })
    }
    //点击确定添加文章事件
    addArticle = async (values) =>{
        let avatar
        this.state.adminList.map(item=>{
            if(item.id === values.author){ avatar = item.avatar}
        })
        if(this.state.articleMsg.mark){
            const result = await saveArticleImgRequest(this.state.imageUrl)
            this.setState({
                articleMsg:{...this.state.articleMsg,...values,banner:result.path,avatar,img:''}
            },async ()=>{
                const result  =await addArticleRequest(this.state.articleMsg);
                const result2  =await addArticleListRequest({...this.state.articleMsg,mark:'', html:'',});
                if(result.code === 200 && result2.code === 200){
                    message.success('添加成功')
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                }else {
                    message.error('添加失败')
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                }
            })
        }else{
            message.warn('请输入文章内容')
        }
    }
    //
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {articleMsg,navList,imageUrl,adminList} = this.state
        return (
            <div>
                <MyBreadcrumb list={['首页','文章管理','添加文章管理']}/>
                <Card>
                    <Form  onFinish={this.addArticle}>
                        <Form.Item label="文章标题" name="title"  style={{width:'30vw'}}
                                   rules={[
                                       {required: true,message: `文章标题不能为空！`,type:"string"},
                                       {min:4,message:'不能少于4个字符'}]}>
                            <Input  value={articleMsg.title}/>
                        </Form.Item>
                        <Form.Item label="文章描述" name='desc'  style={{width:'30vw'}}
                            rules={[{required: true,message: `文章描述不能为空`,type:"string"},
                                {min:10,message:'不能少于10个字符'}]}>
                            <Input value={articleMsg.desc}/>
                        </Form.Item>
                        <Form.Item label="管理员" name='author'  style={{width:'30vw'}}
                                   rules={[{required: true,message: `文章作者不能为空`,type:"string"}]}>
                            <Select placeholder="选择文章类型" >
                                { adminList.map(item=>{
                                    return <Option key={item.id}>{item.username}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item  style={{width:'30vw'}} name="type" label="文章类型" rules={[{ required: true }]}>
                            <Select placeholder="选择文章类型" >
                                { navList.map(item=>{
                                    return <Option key={item.type}>{item.title}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item label='文章封面' name='img' rules={[{ required: true }]}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="http://localhost:3000/article/saveArticleImg"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                                headers={{authorization:sessionStorage.getItem('adminToken')}}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <MyMarkDown getContent={this.getContent} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"  htmlType="submit">
                                确认添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Content;