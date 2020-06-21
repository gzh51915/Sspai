import React ,{Component} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";


class List extends Component {
    render() {
        return (
            <div>
                <MyBreadcrumb list={['首页', '文章管理', '文章列表管理']} />

            </div>
        )
    }
}
export default List