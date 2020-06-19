import React, {Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";

class Cart extends Component {
    render() {
        return (
            <div>
                <MyBreadcrumb list={['首页','首页管理','卡片管理']}/>
            </div>
        );
    }
}

export default Cart;