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
        case 'REVERT_MISC':
            return { ...state, misc: !state.misc }
        case 'REVERT_SPOOKY':
            return { ...state, spooky: !state.spooky }
        case 'REVERT_CHRISTMAS':
            return { ...state, christmas: !state.christmas }
        case 'REVERT_ANY':
            return { ...state, any: !state.any }
        case 'SET_ANY_TRUE':
            return { ...state, any: true }
        case 'SET_ANY_FALSE':
            return { ...state, any: false }
        case 'RESET_CATEGORIES':
            return {
                any: true,
                dark: false,
                pun: false,
                programming: false,
                misc: false,
                spooky: false,
                christmas: false,
            }
        default: return state
    }
}

const categoriesListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [...state, action.payload]
        case 'REMOVE_CATEGORY':
            return state.filter((category) => category !== action.payload)
        case 'REMOVE_ALL_CATEGORIES':
            return []
        default: return state
    }
}

export default categoriesReducer
export { categoriesListReducer }