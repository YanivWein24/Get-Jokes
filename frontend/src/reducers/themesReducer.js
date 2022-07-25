const initialState = JSON.parse(localStorage.getItem('theme'))

const themesReducer = (state = initialState ? initialState : "light", action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return state === "light" ? "dark" : "light"
        default: return state
    }
}

export default themesReducer