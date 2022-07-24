const initialState = {
    any: true,
    dark: false,
    pun: false,
    programming: false,
    misc: false,
    spooky: false,
    christmas: false,
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REVERT_DARK':
            return { ...state, dark: !state.dark }
        case 'REVERT_PUN':
            return { ...state, pun: !state.pun }
        case 'REVERT_PROGRAMMING':
            return { ...state, programming: !state.programming }
        default: return state
    }
}

export default categoriesReducer