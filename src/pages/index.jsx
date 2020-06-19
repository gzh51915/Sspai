import React, {Component} from 'react';
import MyBreadcrumb from "../conponents/my-Breadcrumb";

class Index extends Component {
    state = {
        admin:''
    }
    componentDidMount() {
        const admin = sessionStorage.getItem('admin')
        this.setState({
            admin
        })
    }

    render() {
        return (
            <div className={'lisa'}>
                <MyBreadcrumb list={['首页']}/>
                <h1>欢迎  <span style={{fontSize:'24px',color:'red'}}>{this.state.admin}</span>  使用本系统</h1>

            </div>
        );
    }
}

export default Index;