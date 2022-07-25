const langSelectAction = (language) => {
    return {
        type: 'CHANGE_LANGUAGE',
        payload: language
    }
}

export default langSelectAction