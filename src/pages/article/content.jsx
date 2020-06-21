import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import MyMarkDown from "../../conponents/myMarkDown";
import {Card} from 'antd'
class Content extends Component {
    getContent = ({html,text:mark}) => {
        console.log('html结构的：',html);
        console.log('mark结构的：', mark);
    }
    render() {
        return (
            <div>
                <MyBreadcrumb list={['首页','文章管理','文章内容管理']}/>
                <Card>
                    
                    <MyMarkDown getContent={this.getContent} />
                </Card>
            </div>
        );
    }
}

export default Content;