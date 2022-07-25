const jokesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_JOKE':
            return action.payload
        case 'RESET_JOKE':
            return {}
        default: return state
    }
}

export default jokesReducer