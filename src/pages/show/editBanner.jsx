import React, { useState, useCallback } from 'react'
import { Form, Input,  Button, Upload, Avatar, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { editBannerRequest } from '../../api/request'
import './editBanner.scss'
function EditBanner(props) {
    console.log(props.location.state.key)
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not validate email!',
            number: '${label} is not a validate number!',
        },
    };
    const onFinish = values => {

        console.log(values);
        props.history.push('/home/banner')
    };
    function toBack() {
        props.history.push('/home/banner')
    }

    const userN = props.history.location.state.title
    const pict = props.history.location.state.url
    //上传图片
    const [loading, setLoading] = useState(false)
    const [selectBtn, setSelectBtn] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const editPic = useCallback(()=>{    
        setSelectBtn(false)
    },[])

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG 图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片不能超过2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const handleChange = useCallback((info)=>{
        console.log('info.file.status',info.file.status)
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
            {
                 setLoading(false)
                 editBannerRequest(props.location.state.key,imageUrl)
                 setImageUrl(imageUrl)
            }
            );
        }
    },[loading])

    return (
        <div className="editBox">
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className="editSbox">
                <Form.Item initialValue={userN}
                    name='username'
                    label="图片名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {
                    selectBtn ?
                        <Form.Item
                            name='pic'
                            label="图片"
                            onClick={editPic}
                        >
                            <Avatar shape="square" size={64} src={pict} />
                        </Form.Item> :
                        <Upload
                            className="uploadPic"
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="http://47.115.127.10:3000/users/userimgedit"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            headers={{authorization:sessionStorage.getItem('adminToken')}}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <Avatar shape="square" size={64} src={pict} />}
                        </Upload>
                }

                <Form.Item {...tailLayout}>
                    <Button htmlType="submit" type="primary">
                        Submit
                    </Button>
                    <Button htmlType="button" style={{ margin: '0 8px' }} onClick={toBack}>
                        返回
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withRouter(EditBanner)