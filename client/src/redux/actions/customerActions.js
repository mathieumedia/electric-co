import * as ActionTypes from '../ActionTypes';
import * as helper from '../../middleware/utils'
import axios from 'axios';

const config = {
    headers: {
        "Content-Type": 'application/json',
        "x-auth-token": localStorage.getItem('token')
    }
}

export const addCustomer = newCustomer => async dispatch => {
    try {
        const res = await axios.post('/api/customers', newCustomer, config)
        dispatch({
            type: ActionTypes.ADD_CUSTOMER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: error.response.data
        })
    }
}

export const updateCustomer = customer => async dispatch => {
    try {
        const res = await axios.patch(`/api/customers/${customer._id}`, customer, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: error.response.data
        })
    }
}

export const getCustomers = () => async dispatch => {
    try {
        const res = await axios.get('/api/customers', config)
        dispatch({
            type: ActionTypes.GET_CUSTOMERS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: error.response.data
        })
    }
}

export const getCurrentCustomer = (id) => async dispatch => {
    
    dispatch({
        type: ActionTypes.FILTER_CURRENT_CUSTOMER,
        payload: id
    })
}

export const addCustomerBill = newBill => async dispatch => {
    try {
        const res = await axios.post("/api/customers/bills", newBill, config)
        dispatch({
            type: ActionTypes.UPDATE_CUSTOMER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: ActionTypes.SET_ERROR,
            payload: error.response.data
        })
    }
}



export const clearCustomerAlert = () => async dispatch => dispatch({type: ActionTypes.CLEAR_ERROR})
