const searchStringActions = (action, text) => {
    switch (action) {
        case "changeString":
            return {
                type: 'CHANGE_STRING',
                payload: text
            }
        case "delete":
            return {
                type: 'DELETE',
            }
        default: return { type: '' }
    }
}

export default searchStringActions