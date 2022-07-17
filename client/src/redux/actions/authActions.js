import axios from 'axios';
import * as ActionTypes from '../ActionTypes'
import * as utils from '../../middleware/utils'

const config = {
    headers: {
        "Content-Type": 'application/json'
    }
}

export const loginUser = userData => async dispatch => {
    try {
        const res = await axios.post('/api/users/loginUser', userData, config)
        dispatch({
            type: ActionTypes.LOGIN_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.AUTH_ERROR,
            payload: err.response.data
        })
    }
}

export const clearAuthError = () => async dispatch => dispatch({type: ActionTypes.CLEAR_ERROR})
export const logoutUser = () => async dispatch => dispatch({type: ActionTypes.LOGOUT_USER})
