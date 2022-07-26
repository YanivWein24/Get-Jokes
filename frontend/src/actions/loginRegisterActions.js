const loginRegisterActions = (action, payload) => {
    switch (action) {
        case "updateFirstName":
            return {
                type: 'UPDATE_FIRST_NAME',
                payload: payload
            }
        case "updateLastName":
            return {
                type: 'UPDATE_LAST_NAME',
                payload: payload
            }
        case "showPassword":
            return {
                type: 'SHOW_PASSWORD',
            }
        default: return { type: '' }
    }
}

export default loginRegisterActions