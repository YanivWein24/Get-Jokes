const langSelectReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return action.payload
        default: return state
    }
}

export default langSelectReducer