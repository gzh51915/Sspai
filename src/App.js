import React, { Component } from 'react';
import './App.css';
import Frame from './components/Frame/index'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { adminRoutes, mainRoutes } from './routes'
import { connect } from 'react-redux'
import { verifyToken } from './api'
import { logout } from './store/action/login'
import { message } from 'antd';

const menu = adminRoutes.filter((item) => item.exact === true)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: Boolean(JSON.parse(localStorage.getItem('authorization')))
    }
  }
  async componentDidMount() {
    const getResult = await verifyToken(JSON.parse(localStorage.getItem('authorization')))
    const { logout } = this.props
    if(!this.updater.isMounted(this)) return
    if (getResult.code === 200) {
      this.setState({
        login: true
      })
    } else {
      this.setState({
        login: false
      })
      logout()
      this.props.history.push('/login')
      message.error(getResult.msg)
    }
  }
  render() {
    return (
      this.state.login ?
        <div className="App">
          <Frame menu={menu}>
            <Switch>
              {
                adminRoutes.map(item => {
                  return (
                    <Route key={item.pathname} path={item.pathname} exact={item.exact}
                      render={(routerProps)=>{
                        return <item.component {...routerProps} />
                      }}
                    />
                  )
                })
              }
              <Redirect from="/admin" to={adminRoutes[0].pathname} exact />
              <Redirect to={mainRoutes[0].pathname} />
            </Switch>
          </Frame>
        </div>
        : <Redirect to="/login" />
    );
  }

}


const mapState = state => {
  return {
    isLogin: state.login.isLogin,
    // role:state.login.role         这里是权限管理的，今晚加班搞搞呗
  }
}

export default connect(mapState, { logout })(withRouter(App));
