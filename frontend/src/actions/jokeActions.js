const jokeActions = (action, joke) => {
    switch (action) {
        case "getJoke":
            return {
                type: 'GET_JOKE',
                payload: joke
            }
        case "resetJoke":
            return {
                type: 'RESET_JOKE'
            }
        default: return {}
    }
}

export default jokeActions