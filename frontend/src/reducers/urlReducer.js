const urlReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE_URL':
            return action.payload
        default: return state
    }
}

export default urlReducer