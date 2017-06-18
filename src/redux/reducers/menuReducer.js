function menuReducer(state = {show: false}, action) {
    if (action.type === 'MENU_SHOW') {
        return {
            show: true
        }
    } else if (action.type === 'MENU_HIDDEN') {
        return {
            show: false
        }
    } 
    return state
}

export default menuReducer