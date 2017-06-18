import {combineReducers} from 'redux'
import menuReducer from './menuReducer.js'
import userReducer from './userReducer.js'
import alertReducer from './alertReducer.js'

const reducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    alert: alertReducer
})

export default reducer
