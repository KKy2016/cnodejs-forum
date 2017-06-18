function alertReducer(state = { msg: '' }, action) {
    if (action.type === 'ALERT_SHOW') {
        return {
            msg: action.payload
        }
    } else if (action.type === 'ALERT_HIDDEN') {
        return {
            msg: ''
        }
    }

    return { msg: '' }
}

export default alertReducer