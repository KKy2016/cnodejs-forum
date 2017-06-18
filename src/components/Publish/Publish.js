import React from 'react'
import { connect } from 'react-redux'
import menuImg from '../../assets/img/nav.png'
import './Publish.css'

class Publish extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        let { menuShow, toggleMenu } = this.props
        
        let classList = ""
        if (menuShow) {
            classList = "publishHeader offset"
        } else {
            classList = "publishHeader noOffset"
        }


        return (
            <div>
                <div className="publishHeaderContainer">
                    <div className={classList}>
                        <div className="menuImg" onClick={toggleMenu}>
                            <img src={menuImg} alt="menuImg" />
                        </div>
                        <span>发布</span>
                    </div>            
                </div>

                <div className="publishWrap">
                    <div className="category">
                        <span>选择分类：</span>
                        <select>
                            <option value="share">分享</option>
                            <option value="ask">问答</option>
                            <option value="job">招聘</option>
                        </select>
                        <div className="btnWrap">
                            <button>发布</button>             
                        </div>
                    </div>
                    <div className="title">
                        <input type="text" placeholder="请输入标题，字数大于10小于100" />
                    </div> 
                    <div className="content">
                        <textarea rows="30" placeholder="支持markdown"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

const PublishRedux = connect((state) => {
    return {
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
})(Publish)

export default PublishRedux