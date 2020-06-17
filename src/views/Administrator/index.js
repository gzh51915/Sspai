import React, { Component } from 'react'
import { Card , Button} from 'antd';
import {getAdmin} from '../../api'
import './style.css'
import { Table } from 'antd';

const titleDisplayMap = {
    username : '姓名',
    password : '密码',
    addtime  : '创建时间',
    power    :  '权限'
}

export default class Administrator extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns : [],
            data : []
        }
    }
    async componentDidMount(){
         const res = await getAdmin()
            console.log(res.data[0])
    }
    render() {
        
        return (
            <Card>
                hdiwhdihdihdiwhdiwhidhwidwh
                
            </Card>
        
        )
    }
}
