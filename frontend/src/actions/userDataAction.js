const userDataAction = (userData) => {
    return {
        type: 'GET_USER_DATA',
        payload: userData
    }
}

export default userDataAction