import * as ActionTypes from '../ActionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    authError: null,
    isAdmin: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
    switch(action.type){

        case ActionTypes.LOGIN_USER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                isAdmin: action.payload.isAdmin
            }
        case ActionTypes.LOGOUT_USER:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: null
            }
        case ActionTypes.AUTH_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                authError: action.payload,
                isAdmin: null
            }
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default: 
            return state
    }
}