import React  from 'react';
import Loadable from 'react-loadable'
import './App.css'
import {Switch,Route,Redirect} from 'react-router-dom'
import Loading from './conponents/loading'
const Login = Loadable({
  loader:() => import('./pages/login'),
  loading:Loading
})
const Home = Loadable({
  loader:() => import('./pages/home'),
  loading:Loading
})
// const Login = lazy(()=> import('./pages/login'))
// const Home = lazy(()=> import('./pages/home'))
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
