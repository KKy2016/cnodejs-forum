import React from 'react'
import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import Nav from '../Nav/Nav.js'
import Alert from '../Alert/Alert.js'
import logo from '../../assets/img/cnode.png'
import './App.css'

class App extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
            // 跳转
            browserHistory.push('/list/all')
        }, 2000)
    }

    render() {
        let template

        let { msg } = this.props

        if (this.state.loading) {
            template = (
                <div className="loading">
                    <img className="logo" alt="logo" src={logo} ref={(img) => {setTimeout(() => {img && img.classList.add("logoLoad")}, 0)}} />
                </div>
            )
        } else {
            template = (
                <div>
                    { msg && <Alert msg = {msg}/> }
                    <Nav />
                    {this.props.children}            
                </div>
            )
        }
        return template         
    }
}

const AppRedux = connect(
    (state) => {
        return {
            msg: state.alert.msg
        }
    }
)(App)

export default AppRedux