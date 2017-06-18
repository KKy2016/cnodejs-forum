let initUserState

if (sessionStorage.user) {
    initUserState = {
        login: true,
        msg: JSON.parse(sessionStorage.user)
    }
} else {
    initUserState = {
        login: false,
        msg: {}
    }
}

function userReducer(state = initUserState, action) {
    if (action.type === 'LOGIN_SUCCESS') {
        return {
            login: true,
            msg: action.payload
        }
    } else if (action.type === 'LOGIN_FAIL') {
        return {
            login: false,
            msg: {}
        }
    }

    return state
}

export default userReducer