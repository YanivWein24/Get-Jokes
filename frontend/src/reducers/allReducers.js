import { combineReducers } from 'redux'
import categoriesReducer, { categoriesListReducer } from './categoriesReducer'
import blackFlagsReducer, { blackFlagListReducer } from './blackListFlagsReducer'
import langSelectReducer from './langSelectReducer'
import searchStringReducer from './searchStringReducer'
import jokeTypeReducer from './jokeTypeReducer'
import userDataReducer from './userDataReducer'
import jokesReducer from './jokesReducer'
import themesReducer from './themesReducer'
import jokeMessageReducer from './jokeMessageReducer'
import urlReducer from './urlReducer'
import loginRegisterReducer from './loginRegisterReducer'

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
    theme: themesReducer,
    jokeMessage: jokeMessageReducer,
    url: urlReducer,
    loginRegister: loginRegisterReducer
})

export default allReducers