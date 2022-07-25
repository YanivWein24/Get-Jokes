import { combineReducers } from 'redux'
import categoriesReducer, { categoriesListReducer } from './categoriesReducer'
import blackFlagsReducer, { blackFlagListReducer } from './blackListFlagsReducer'
import langSelectReducer from './langSelectReducer'
import searchStringReducer from './searchStringReducer'
import jokeTypeReducer from './jokeTypeReducer'
import userDataReducer from './userDataReducer'
import jokesReducer from './jokesReducer'
import themesReducer from './themesReducer'

const allReducers = combineReducers({
    categories: categoriesReducer,
    categoriesList: categoriesListReducer,
    blackFlags: blackFlagsReducer,
    blackList: blackFlagListReducer,
    langSelect: langSelectReducer,
    searchString: searchStringReducer,
    jokeType: jokeTypeReducer,
    userData: userDataReducer,
    joke: jokesReducer,
    theme: themesReducer
})

export default allReducers