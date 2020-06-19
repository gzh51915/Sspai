import React from 'react';
import './App.css'
import {Switch,Route,Redirect} from 'react-router-dom'
// import {Button} from "antd";
import Login from './pages/login'
import Home from './pages/home'
function App() {
  return (
    <div>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Redirect from='/' to='/login' exact />
        </Switch>
    </div>
  );
}

export default App;
