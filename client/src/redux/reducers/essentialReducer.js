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