import * as ActionTypes from '../ActionTypes'

const initialState = {
    customers: null,
    currentCustomer: null,
    customerAlert: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
    switch(action.type){
        case ActionTypes.GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            }
        case ActionTypes.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload.customer],
                currentCustomer: action.payload.alert
            }
        case ActionTypes.FILTER_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: state.customers.find(c => c._id === action.payload)
            }
        case ActionTypes.UPDATE_CUSTOMER:
            return {
                ...state,
                customers: state.customers.map(customer => customer._id === action.payload.customer._id ? action.payload.customer : customer),
                currentCustomer: action.payload.customer,
                customerAlert: action.payload.alert
            }
        // #endregion
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                customerAlert: action.payload,
            }
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                customerAlert: null
            }
        default:
            return state;
    }
}