import axios from 'axios';
import * as ActionTypes from '../ActionTypes'
import * as utils from '../../middleware/utils'

const config = {
    headers: {
        "Content-Type": 'application/json',
        'x-auth-token': localStorage.getItem('token')
    }
}

export const getEssentials = () => async dispatch => {
    try {
        const res = await axios.get('/api/essentials', config)
        dispatch({
            type: ActionTypes.GET_ESSENTIALS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}

// #region ------- GENDER METHODS -------------------
export const addGender = (newGender) => async dispatch => {
    try {
        const res = await axios.post('/api/essentials/genders', newGender, config)
        dispatch({
            type: ActionTypes.ADD_GENDER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}

export const updateGender = gender => async dispatch => {
    try {
        const res = await axios.patch(`/api/essentials/genders/${gender._id}`, gender, config)
        dispatch({
            type: ActionTypes.UPDATE_GENDER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}

export const deleteGender = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/essentials/genders/${id}`, config)
        dispatch({
            type: ActionTypes.DELETE_GENDER,
            payload: {
                id,
                alert: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}
// #endregion


// #region ------- STATE METHODS -------------------
export const addState = (newState) => async dispatch => {
    try {
        const res = await axios.post('/api/essentials/states', newState, config)
        dispatch({
            type: ActionTypes.ADD_STATE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}

export const updateState = state => async dispatch => {
    try {
        const res = await axios.patch(`/api/essentials/states/${state._id}`, state, config)
        dispatch({
            type: ActionTypes.UPDATE_STATE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}

export const deleteState = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/essentials/states/${id}`, config)
        dispatch({
            type: ActionTypes.DELETE_STATE,
            payload: {
                id,
                alert: res.data
            }
        })
    } catch (err) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: err.response.data
        })
    }
}
// #endregion

export const clearAlert = () => async dispatch => dispatch({type: ActionTypes.CLEAR_ERROR})
export const logoutUser = () => async dispatch => dispatch({type: ActionTypes.LOGOUT_USER})
