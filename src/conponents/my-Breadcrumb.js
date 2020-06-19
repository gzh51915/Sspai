import React, {Component} from 'react';
import {Breadcrumb} from "antd";

class MyBreadcrumb extends Component {
    render() {
        const {list} = this.props;
        return (

                <Breadcrumb style={{ margin: '16px 0' }}>
                    {
                        list.map((item,index) =>{
                            return  <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>

        );
    }
}

export default MyBreadcrumb;