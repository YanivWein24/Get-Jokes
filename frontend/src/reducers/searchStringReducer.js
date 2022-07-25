const searchStringReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_STRING':
            return action.payload
        case 'DELETE':
            return ""
        default: return state
    }
}

export default searchStringReducer