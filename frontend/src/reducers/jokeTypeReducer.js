const initialState = {
    singlePart: true,
    twoPart: true
}

const jokeTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REVERT_SINGLE_PART':
            return { ...state, singlePart: !state.singlePart }
        case 'REVERT_TWO_PART':
            return { ...state, twoPart: !state.twoPart }
        case 'RESET_JOKE_TYPE':
            return {
                singlePart: true,
                twoPart: true
            }
        default: return state
    }
}

export default jokeTypeReducer