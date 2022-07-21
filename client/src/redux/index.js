import {combineReducers} from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import essentialReducer from './reducers/essentialReducer'
import customerReducer from './reducers/customerReducer'
export default combineReducers({
    auth: authReducer,
    essentials: essentialReducer,
    customers: customerReducer
})