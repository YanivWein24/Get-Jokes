const categoriesActions = (action) => {
    switch (action) {
        case "revertSinglePart":
            return { type: 'REVERT_SINGLE_PART' }
        case "revertTwoPart":
            return { type: 'REVERT_TWO_PART' }
        case "reset":
            return { type: 'RESET' }
        default: return { type: '' }
    }
}

export default categoriesActions