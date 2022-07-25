import categoriesReducer, { categoriesListReducer } from './categories'
import blackFlagsReducer, { blackFlagListReducer } from './blackListFlags'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    categories: categoriesReducer,
    categoriesList: categoriesListReducer,
    blackFlags: blackFlagsReducer,
    blackList: blackFlagListReducer

})

export default allReducers