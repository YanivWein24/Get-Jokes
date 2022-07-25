const categoriesActions = (category) => {
    switch (category) {
        case "dark":
            return { type: 'REVERT_DARK' }
        case "pun":
            return { type: 'REVERT_PUN' }
        case "programming":
            return { type: 'REVERT_PROGRAMMING' }
        case "misc":
            return { type: 'REVERT_MISC' }
        case "spooky":
            return { type: 'REVERT_SPOOKY' }
        case "christmas":
            return { type: 'REVERT_CHRISTMAS' }
        case "any":
            return { type: 'REVERT_ANY' }
        case "setAnyTrue":
            return { type: 'SET_ANY_TRUE' }
        case "setAnyFalse":
            return { type: 'SET_ANY_FALSE' }
        case "reset":
            return { type: 'RESET' }
        default: return { type: '' }
    }
}

const categoriesListActions = (category, id) => {
    switch (category) {
        case "addCategory":
            return {
                type: 'ADD_CATEGORY',
                payload: id
            }
        case "removeCategory":
            return {
                type: 'REMOVE_CATEGORY',
                payload: id
            }
        case "removeAllCategories":
            return {
                type: "REMOVE_ALL_CATEGORIES"
            }
        default: return { type: '' }
    }
}

export default categoriesActions
export { categoriesListActions }