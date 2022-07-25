import { combineReducers } from 'redux'
import categoriesReducer, { categoriesListReducer } from './categories'
import blackFlagsReducer, { blackFlagListReducer } from './blackListFlags'
import langSelectReducer from './langSelectReducer'
import searchStringReducer from './searchStringReducer'
import jokeTypeReducer from './jokeTypeReducer'

const allReducers = combineReducers({
    categories: categoriesReducer,
    categoriesList: categoriesListReducer,
    blackFlags: blackFlagsReducer,
    blackList: blackFlagListReducer,
    langSelect: langSelectReducer,
    searchString: searchStringReducer,
    jokeType: jokeTypeReducer
})

export default allReducers