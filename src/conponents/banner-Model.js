import {message,Modal} from 'antd'
import React , {useState, useEffect}from 'react'

export default function BannerModel(props) {
    console.log('props',props);
    return (
        <Modal
            title={props.title}
            visible={props.visible.visible}
            onOk={props.onOk}
            confirmLoading={props.confirmLoading}
            onCancel={props.onCancel}
        >
            {/* <p>{message.warning('This is a warning message')}</p> */}
        </Modal>
    )
}