
const jokeMessageReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_MESSAGE':
            return !state
        default: return state
    }
}

export default jokeMessageReducer