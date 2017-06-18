import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import List from './components/List/List.js'
import Login from './components/Login/Login.js'
import App from './components/App/App.js'
import Topic from './components/Topic/Topic.js'
import Publish from './components/Publish/Publish.js'
import User from './components/User/User.js'
import store from './redux/store.js'
import './assets/css/reset.css'
import './assets/css/icon.css'

// 路由
render(
    (
        <Provider store={store}>
            <Router history = {browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/list/:tab" component={List} />
                    <Route path="/topic/:id" component={Topic} />
                    <Route path="/login" component={Login} />
                    <Route path="/publish" component={Publish} />
                    <Route path="/user/:name" component={User} />
                </Route>
            </Router>
        </Provider>
    ), 
    document.getElementById('root')
)


