const categoriesActions = (category) => {
    switch (category) {
        case "dark":
            return { type: 'REVERT_DARK' }
        case "pun":
            return { type: 'REVERT_PUN' }
        case "programming":
            return { type: 'REVERT_PROGRAMMING' }
    }
}

export default categoriesActions