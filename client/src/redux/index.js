import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import essentialReducer from './reducers/essentialReducer'

export default combineReducers({
    auth: authReducer,
    essentials: essentialReducer
})