const blackListFlagsActions = (category) => {
    switch (category) {
        case "nsfw":
            return { type: 'REVERT_NSFW' }
        case "religious":
            return { type: 'REVERT_RELIGIOUS' }
        case "political":
            return { type: 'REVERT_POLITICAL' }
        case "racist":
            return { type: 'REVERT_RACIST' }
        case "sexist":
            return { type: 'REVERT_SEXIST' }
        case "explicit":
            return { type: 'REVERT_EXPLICIT' }
        case "reset":
            return { type: 'RESET' }
        default: return { type: '' }
    }
}

const blackListActions = (category, id) => {
    switch (category) {
        case "addFlag":
            return {
                type: 'ADD_FLAG',
                payload: id
            }
        case "removeFlag":
            return {
                type: 'REMOVE_FLAG',
                payload: id
            }
        case "removeAllFlags":
            return {
                type: "REMOVE_ALL_FLAGS"
            }
        default: return { type: '' }
    }
}

export default blackListFlagsActions
export { blackListActions }