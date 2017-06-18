import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { formatTime, getLabel } from '../../utils.js'
import menuImg from '../../assets/img/nav.png'
import '../../assets/css/md.css'
import './Topic.css'

class Topic extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            ready: false,
            topic: {}
        }
    }

    componentDidMount() {

        let topicId = this.props.params.id

        axios.get(`https://cnodejs.org/api/v1/topic/${topicId}`)
             .then((res) => {
                 let topic = res.data.data
                 this.setState({ 
                     ready: true,
                     topic 
                 })
             })
    }

    render() {
        let { user, menuShow, toggleMenu } = this.props
        
        let classList = ""
        if (menuShow) {
            classList = "topicHeader offset"
        } else {
            classList = "topicHeader noOffset"
        }

        let { ready, topic } = this.state

        return (
            <div>
                {
                    ready && 
                    <div>
                        <div className="topicHeaderContainer">
                            <div className={classList}>
                                <div className="menuImg" onClick={toggleMenu}>
                                    <img src={menuImg} alt="menuImg" />
                                </div>
                                <span>主题</span>
                                {
                                    user.login ? 
                                    (<Link className="icon-paperplane" to="/publish" />) :
                                    (<Link className="icon-paperplane" to="/login" />)
                                }
                            </div>            
                        </div>

                        <div className="topicContainer">
                            <h2 className="title">{topic.title}</h2> 

                            <section className="userInfoContainer">
                                <Link to={`/user/${topic.author.loginname}`}>
                                    <img src={topic.author.avatar_url} alt="logo" />
                                </Link>
                                <div>
                                    <p>
                                        <span className="authorname">{topic.author.loginname}</span> 
                                        <span className={"label " + getLabel(topic.tab, topic.good, topic.top).class}>{getLabel(topic.tab, topic.good, topic.top).cont}</span>
                                    </p> 
                                    <p> 
                                        <span className="createat">发布于{formatTime(topic.create_at)}</span>
                                        <span className="visitcount">{topic.visit_count}次浏览</span>
                                    </p>                        
                                </div>
                            </section>

                            <section className="contentContainer">
                                <div className="markdown-body" dangerouslySetInnerHTML={{__html: topic.content}} />
                            </section>

                            <section className="replyContainer">
                                <p className="replyCount"><strong>{topic.replies.length}</strong> 条回复</p>
                                <ul className="replyList">
                                {
                                    topic.replies.map( (reply) => {
                                        return (
                                            <li className="replyItem">
                                                <div className="replyItemhead">
                                                    <Link to={`/user/${reply.author.loginname}`}>
                                                        <img src={reply.author.avatar_url} alt="logo" />
                                                    </Link>
                                                    <div>
                                                        <p>{reply.author.loginname} 发布于：{formatTime(reply.create_at)}</p>
                                                        <p>
                                                            <span className="icon-thumb-up">{reply.ups.length}</span>
                                                            <span className="icon-mail-reply"></span>
                                                        </p>
                                                    </div>
                                                </div>   
                                                <div className="replyitembody markdown-body"  dangerouslySetInnerHTML={{__html: reply.content}} />                
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </section>
                        </div>      
                    </div>
                }
            </div>
        )   
    }
}

const TopicRedux = connect((state) => {
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
})(Topic)

export default TopicRedux