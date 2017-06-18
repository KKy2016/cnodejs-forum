import React from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import goImg from '../../assets/img/go.png'
import loginImg from '../../assets/img/login.png'
import './Nav.css'

class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            theme: {
                'all': '全部',
                'good': '精华',
                'ask': '问答',
                'share': '分享',
                'job': '招聘'
            }
        }
    }

    render() {
        let { user, menuShow, doHiddenMenu } = this.props

        let classList = ""
        if (menuShow) {
            classList = "menu menuShow"
        } else {
            classList = "menu menuHidden"
        }

        let notLogin = (
            <div className="notLoginContainer">
                <Link to="/login">
                    <img src={loginImg} alt="login" />
                    <span>登录</span>                
                </Link>
            </div>
        )

        let login = (
            <div className="loginContainer">
                <Link to={`/user/${user.msg.loginname}`}>
                    <img src={user.msg.avatar_url} alt="userImg" />
                    <span>{user.msg.loginname}</span>
                    <img src={goImg} alt="go" />
                </Link>
            </div>
        )

        return (
            <div>
                <div className={classList} onClick={doHiddenMenu}>
                    {
                        user.login ?
                        login : 
                        notLogin
                    }

                    <div className="itemContainer">
                        <ul>
                            <li><Link className="icon-paragraph-justify" to="/list/all">全部</Link></li>
                            <li><Link className="icon-fire" to="/list/good">精华</Link></li>
                            <li><Link className="icon-bubbles" to="/list/ask">问答</Link></li>
                            <li><Link className="icon-share2" to="/list/share">分享</Link></li>
                            <li><Link className="icon-user-tie" to="/list/job">招聘</Link></li>
                        </ul>                    
                    </div>

                    <div className="about" >
                        <li><a className="icon-info">关于</a></li>
                    </div>
                </div>          

                { menuShow && <div onClick={doHiddenMenu} className="mask" /> }            
            </div>
        )
    }
}

const NavRedux = connect((state) => {
    return {
        user: state.user,
        menuShow: state.menu.show
    }
}, (dispatch) => {
    return {
        doHiddenMenu() {
            dispatch({
                type: 'MENU_HIDDEN'
            })
        }
    }
})(Nav)

export default NavRedux