import React from 'react'
import { Breadcrumb } from 'antd'
function Bread({data}){
    return (
        <Breadcrumb style={{fontSize : 18}}>
            {
            data.map((item,index) => {
                return (
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    )
                })
            }
        </Breadcrumb>
    )
}

export default Bread

