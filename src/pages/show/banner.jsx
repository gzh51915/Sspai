import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";

class Banner extends Component {
    render() {
        return (
            <div>
                <MyBreadcrumb list={['首页','首页管理','轮播图管理']}/>
            </div>
        );
    }
}

export default Banner;