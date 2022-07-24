import categoriesReducer from './categories'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    categories: categoriesReducer
})

export default allReducers