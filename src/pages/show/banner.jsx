import React, { useEffect, useState, useCallback } from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import { bannerRequest } from '../../api/request'
import { Table, Tag, Space, Card, Empty, Button, message, Avatar } from 'antd';
import  BannerModel from '../../conponents/banner-Model'
import { useHistory } from "react-router-dom";

function Banner() {
    const [size] = useState('large')
    //Modal
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalTitle,setModalTitle] = useState('删除轮播图')
    const [bannerImg, setBanner] = useState([])
    const colums=[{
        title: '#',
        dataIndex: 'idx',
        key: 'idx',
    },
    {
        title: '图片名称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '图片',
        dataIndex: 'url',
        key: 'url',
        render:(text,record)=>{
            console.log('text',text);
            console.log('record',record);
            return <Avatar src={text} size={40}/>
        }
    }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button type="primary" shape="round" onClick={()=>{editBanner(record)}}>编辑</Button>
                <Button type="primary" shape="round" danger onClick={deleteBanner}>删除</Button>
            </Space>
        ),
    }]
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        (async (bannerRequest)=> {
            let bannerImg = await bannerRequest()
            if (bannerImg.code === 200) {
                let imgData = []
                bannerImg.data.map((item, index) => {
                    imgData.push({
                        key: item.id,
                        idx: index + 1,
                        title: item.title,
                        url: 'http://47.115.127.10:3000/' + item.image
                     
                    })
                }, [])
                setDataSource(imgData)
            } else {
                console.log(bannerImg);
                message.error('获取数据失败')
            }
        })(bannerRequest)
    },[])
    //删除轮播图
    const deleteBanner = useCallback(()=>{    
        return setVisible({visible:true})
    },[])
    const handleOk = useCallback(()=>{
        console.log(visible)
        setConfirmLoading({visible:true})
        return setTimeout(() => {
            setVisible({visible:true})
            setConfirmLoading({visible:false})
        }, 1000);
        
    },[])
    const handleCancel = useCallback(()=>{
        return setVisible({visible:false})
    },[])
    //编辑轮播图
    let history = useHistory();
    const editBanner=(record)=>{
        console.log(record.key)
        history.push('/home/banner/'+record.key,record)
        console.log('history',history)
        console.log('record',record)
    }
    return (
        <Card title={<Button>添加轮播图</Button>}>
            <Table dataSource={dataSource} columns={colums} bordered>

            </Table>
            <BannerModel
            
                title={modalTitle}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {/* <p>{ModalText}</p> */}
            </BannerModel>
        </Card>
    )
    // if(bannerImg.data.length){
    // }else{
    //     return <Empty />
    // }
}
export default Banner

