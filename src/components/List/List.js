import React from 'react'
import axios from 'axios'
import $ from 'webpack-zepto'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { formatTime, getLabel } from '../../utils.js'
import menuImg from '../../assets/img/nav.png'
import './List.css'

class List extends React.Component{
    constructor(props) {
        super(props)

        this.searchKey = {
            page: 1,
            num: 20,
            tab: ''
        }
        this.sroll = true
        
        this.map = {
            'all': '全部',
            'good': '精华',
            'job': '招聘',
            'ask': '问答',
            'share': '分享'
        }
        
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        let tab = this.props.params.tab
        this.searchKey.tab = tab
        
        // 初始化 
        this.getList(this.searchKey)

        $(window).on('scroll', () => {
            let wH = $(window).height()
            let wSH = $(window).scrollTop()

            if (($(document).height() < (wH + wSH + 200)) && this.scroll) {
                this.scroll = false
                this.searchKey.page++
                this.getList(this.searchKey)
            }
        })

    }

    componentDidUpdate() {
        let tab = this.props.params.tab
        if (tab === this.searchKey.tab) return

        this.setState({list: []})

        this.searchKey = {
            page: 1,
            num: 20,
            tab: tab
        }

        this.getList(this.searchKey)
    }

    componentWillUnmount() {
        $(window).off()        
    }

    getList({page, num, tab}) {
        axios.get(`https://cnodejs.org/api/v1/topics?page=${page}&limit=${num}&tab=${tab}`).then((list) => {
            list = this.state.list.concat(list.data.data)
            
            this.setState(
                {
                    list: list
                }
            )

            this.scroll = true
        })
    }

    render() {
        let tab = this.props.params.tab
        let { user, menuShow, toggleMenu } = this.props
        
        let classList = ""
        if (menuShow) {
            classList = "listHeader offset"
        } else {
            classList = "listHeader noOffset"
        }



        let list = this.state.list.map((item) => {
            let label = getLabel(item.tab, item.good, item.top)
            return (
                <li key={item.id}>
                    <Link to={`/topic/${item.id}`}>
                    <h2>
                        <span className={label.class + " label"}>{label.cont}</span>
                        <p>{item.title}</p>
                    </h2>
                    <div className="infoContainer">
                        <img src={item.author.avatar_url} />
                        <div className="info">
                            <p>
                                <span>{item.author.loginname}</span>
                                <span><i>{item.reply_count}</i> / {item.visit_count}</span>
                            </p>
                            <p>
                                <span>{formatTime(item.create_at)}</span>
                                <span>{formatTime(item.last_reply_at)}</span>
                            </p>
                        </div>
                    </div>
                    </Link>
                </li>
            )
        })

        return (
            <div>
                <div className="listHeaderContainer">
                    <div className={classList}>
                        <div className="menuImg" onClick={toggleMenu}>
                            <img src={menuImg} alt="menuImg" />
                        </div>
                        <span>{this.map[tab]}</span>
                        {
                            user.login ? 
                            (<Link className="icon-paperplane" to="/publish" />) :
                            (<Link className="icon-paperplane" to="/login" />)
                        }
                    </div>            
                </div>
                <div className="listContainer">
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        )
    }
}

const ListRedux = connect((state) => {
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
})(List)

export default ListRedux