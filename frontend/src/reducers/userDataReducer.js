const initialState = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    jokes: []
}

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_DATA':
            return action.payload
        default: return state
    }
}

export default userDataReducer