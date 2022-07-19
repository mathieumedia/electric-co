import * as ActionTypes from '../ActionTypes'

const initialState = {
    essentials: null,
    essentialAlert: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
    switch(action.type){
        case ActionTypes.GET_ESSENTIALS:
            return {
                ...state,
                essentials: action.payload
            }
        // #region ---- GENDER -----
        case ActionTypes.ADD_GENDER:
            return {
                ...state,
                essentials: {
                    ...state.essentials,
                    genders: [...state.essentials.genders, action.payload.gender],
                },
                essentialAlert: action.payload.alert
            }
        case ActionTypes.UPDATE_GENDER:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    genders: state.essentials.genders.map(gender => gender._id === action.payload._id ? action.payload : gender)
                },
                essentialAlert: {message: 'Gender Successfully Updated', type: 'success'}
            }
        case ActionTypes.DELETE_GENDER:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    genders: state.essentials.genders.filter(gender => gender._id !== action.payload.id)
                },
                essentialAlert: action.payload.alert
            }
        // #endregion
        // #region ---- STATE -----
        // #region ---- BILLING STATUS -----
        case ActionTypes.ADD_BILLING_STATUS:
            return {
                ...state,
                essentials: {
                    ...state.essentials,
                    billingStatuses: [...state.essentials.billingStatuses, action.payload.status],
                },
                essentialAlert: action.payload.alert
            }
        case ActionTypes.UPDATE_BILLING_STATUS:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    billingStatuses: state.essentials.billingStatuses.map(billingStatus => billingStatus._id === action.payload._id ? action.payload : billingStatus)
                },
                essentialAlert: {message: 'Status Successfully Updated', type: 'success'}
            }
        case ActionTypes.DELETE_BILLING_STATUS:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    billingStatuses: state.essentials.billingStatuses.filter(billingStatus => billingStatus._id !== action.payload.id)
                },
                essentialAlert: action.payload.alert
            }
        // #endregion
        
        // #region ---- ACCOUNT TYPES -----
        case ActionTypes.ADD_ACCOUNT_TYPE:
            return {
                ...state,
                essentials: {
                    ...state.essentials,
                    accountTypes: [...state.essentials.accountTypes, action.payload.accountType],
                },
                essentialAlert: action.payload.alert
            }
        case ActionTypes.UPDATE_ACCOUNT_TYPE:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    accountTypes: state.essentials.accountTypes.map(accountType =>accountType._id === action.payload._id ? action.payload : accountType)
                },
                essentialAlert: {message: 'Account Type Successfully Updated', type: 'success'}
            }
        case ActionTypes.DELETE_ACCOUNT_TYPE:
            return {
                ...state,
                essentials:{
                    ...state.essentials,
                    accountTypes: state.essentials.accountTypes.filter(accountType =>accountType._id !== action.payload.id)
                },
                essentialAlert: action.payload.alert
            }
        // #endregion
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                essentialAlert: action.payload,
            }
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                essentialAlert: null
            }
        default:
            return state;
    }
}