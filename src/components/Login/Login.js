import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import menuImg from '../../assets/img/nav.png'
import './Login.css'
import loginActionGenerator from '../../redux/actions/login.js'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    componentDidUpdate() {
        let { login, user } = this.props
        if (login) {
            sessionStorage.user = JSON.stringify(user)
            browserHistory.push('/list/all')
        }
    }

    render() {

        let { menuShow, toggleMenu, toLogin } = this.props

        let classList = ""
        if (menuShow) {
            classList = "loginHeader offset"
        } else {
            classList = "loginHeader noOffset"
        }

        return (
            <div>
                <div className="loginHeaderContainer">
                    <div className={classList}>
                        <div className="menuImg" onClick={toggleMenu}>
                            <img src={menuImg} alt="menuImg" />
                        </div>
                        <span>登录</span>
                    </div>                  
                </div>
                <div className="inputContainer">
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <a onClick={() => { toLogin(this.state.value) }}>登录</a>
                </div>            
            </div>
        )
    }
}

const LoginRedux = connect((state) => {
    return {
        menuShow: state.menu.show,
        login: state.user.login,
        user: state.user.msg
    }
}, (dispatch) => {
    return {
        toggleMenu(){
            dispatch({
                type: 'MENU_SHOW'
            })
        },
        toLogin(accesstoken) {
            dispatch(loginActionGenerator(accesstoken))
        }
    }
})(Login)

export default LoginRedux