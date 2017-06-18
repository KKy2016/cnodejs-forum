import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getLabel } from '../../utils.js'
import menuImg from '../../assets/img/nav.png'
import { formatTime } from '../../utils.js'
import './User.css'

class User extends React.Component{
    constructor(props) {
        super(props)
        
        this.toggle = this.toggle.bind(this)

        this.state = {
            ready: false,
            info: {}
        }
    }

    componentDidMount() {
        let name = this.props.params.name

        axios.get(`https://cnodejs.org/api/v1/user/${name}`)
             .then((res) => {
                 this.setState({
                     flag: true,
                     ready: true,
                     info: res.data.data
                 })
             })
    }

    toggle(ev) {
        
        if (ev.target.classList.contains('active')) return

        let flag = this.state.flag
        this.setState({
            flag: !flag
        })
    }

    render() {
        let { user, menuShow, toggleMenu } = this.props
        
        let classList = ""
        if (menuShow) {
            classList = "userHeader offset"
        } else {
            classList = "userHeader noOffset"
        }

        let { flag, ready, info } = this.state

        return (
            <div className="userContainer">
                { ready &&
                <div className="userHeaderContainer">
                    <div className={classList}>
                        <div className="menuImg" onClick={toggleMenu}>
                            <img src={menuImg} alt="menuImg" />
                        </div>
                        <span>用户信息</span>
                        {
                            user.login ? 
                            (<Link className="icon-paperplane" to="/publish" />) :
                            (<Link className="icon-paperplane" to="/login" />)
                        }
                    </div>   

                    <div className="info">
                        <img src={info.avatar_url} /> 
                        <p>{info.loginname}</p>
                    </div> 
                    <div className="msghead">
                        <p className={"noread " + (flag ? 'active' : '')} onClick={ this.toggle }>最近回复</p>
                        <p className={"read " + (flag ? '' : 'active')} onClick={ this.toggle }>最近发布</p>
                    </div>   

                    <div className="msgbody">
                        <ul>
                            {
                                flag ? 
                                (
                                    info.recent_replies.map((reply) => {
                                        return (
                                            <li className="msg">
                                                <Link to={`/topic/${reply.id}`}>
                                                <p className="title">{reply.title}</p>
                                                <p className="time">最近更新<strong>{formatTime(reply.last_reply_at)}</strong></p>
                                                </Link>
                                            </li>
                                        )
                                    })
                                )

                                : 

                                (
                                    info.recent_topics.map((topic) => {
                                        return (
                                            <li className="msg">
                                                <Link to={`/topic/${topic.id}`}>
                                                <p className="title">{topic.title}</p>
                                                <p className="time">最近更新<strong>{formatTime(topic.last_reply_at)}</strong></p>
                                                </Link>
                                            </li>
                                        )
                                    })
                                )
                            }

                        </ul>
                    </div>                                          
                </div>
                }
            </div>
        )
    }
}

const UserRedux = connect((state) => {
    return {
        user: state.user,
        menuShow: state.menu.show
    }
}, (dispatch) => {
    return {
        toggleMenu(){
            dispatch({
                type: 'MENU_SHOW'
            })
        }
    }
})(User)

export default UserRedux