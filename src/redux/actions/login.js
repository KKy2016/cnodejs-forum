import axios from 'axios'

function login(accesstoken) {
    return (dispatch) => {
        axios.post('https://cnodejs.org/api/v1/accesstoken', { accesstoken })
             .then((user) => {
                 dispatch({
                     type: 'LOGIN_SUCCESS',
                     payload: user.data
                 })
             }).catch(() => {
                 dispatch({
                     type: 'lOGIN_FAIL'
                 })
                 dispatch({
                     type: 'ALERT_SHOW',
                     payload: '登陆失败'
                 })
             })
    }
}

export default login