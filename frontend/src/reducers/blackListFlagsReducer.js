const initialState = {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
}

const blackFlagsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REVERT_NSFW':
            return { ...state, nsfw: !state.nsfw }
        case 'REVERT_RELIGIOUS':
            return { ...state, religious: !state.religious }
        case 'REVERT_POLITICAL':
            return { ...state, political: !state.political }
        case 'REVERT_RACIST':
            return { ...state, racist: !state.racist }
        case 'REVERT_SEXIST':
            return { ...state, sexist: !state.sexist }
        case 'REVERT_EXPLICIT':
            return { ...state, explicit: !state.explicit }
        case 'RESET_FLAGS':
            return {
                nsfw: false,
                religious: false,
                political: false,
                racist: false,
                sexist: false,
                explicit: false,
            }
        default: return state
    }
}

const blackFlagListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_FLAG':
            return [...state, action.payload]
        case 'REMOVE_FLAG':
            return state.filter((flag) => flag !== action.payload)
        case 'REMOVE_ALL_FLAGS':
            return []
        default: return state
    }
}

export default blackFlagsReducer
export { blackFlagListReducer }