import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { mainRoutes } from './routes'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {
          <Route from="/admin" component={App}></Route>
        }
        {
          mainRoutes.map(item => {
            return (
              <Route key={item.pathname} path={item.pathname} component={item.component}></Route>
            )
          })
        }
        <Redirect form="/" to="/admin" exact />
        <Redirect to="/notfound" componet={mainRoutes[0].component} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
