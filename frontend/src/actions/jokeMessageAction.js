const jokeMessageAction = (action) => {
    switch (action) {
        case "toggleMessage":
            return { type: "TOGGLE_MESSAGE" }
        default: return ""
    }
}

export default jokeMessageAction