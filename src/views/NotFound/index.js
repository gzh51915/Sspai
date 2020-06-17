import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <img src={require('../../assets/img/404.jpg')} style={{width:'100%'}} alt="404页面" />
            </div>
        )
    }
}
