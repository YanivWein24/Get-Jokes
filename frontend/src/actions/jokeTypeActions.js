const categoriesActions = (action) => {
    switch (action) {
        case "revertSinglePart":
            return { type: 'REVERT_SINGLE_PART' }
        case "revertTwoPart":
            return { type: 'REVERT_TWO_PART' }
        case "resetJokeType":
            return { type: 'RESET_JOKE_TYPE' }
        default: return { type: '' }
    }
}

export default categoriesActions