import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'

export default combineReducers({
    auth: authReducer
})