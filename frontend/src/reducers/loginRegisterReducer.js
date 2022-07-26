const initialState = {
    firstName: '',
    lastName: '',
    showPassword: false
}

const loginRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_FIRST_NAME':
            return { ...state, firstName: action.payload }
        case 'UPDATE_LAST_NAME':
            return { ...state, lastName: action.payload }
        case 'SHOW_PASSWORD':
            return { ...state, showPassword: !state.showPassword }
        default: return state
    }
}

export default loginRegisterReducer