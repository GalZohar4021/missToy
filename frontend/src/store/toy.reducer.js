// import {userService} from '../services/user.service.js'


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const EDIT_TOY = 'EDIT_TOY'
export const ADD_TOY = 'ADD_TOY'



const initialState = {
    toys: []
}


export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case EDIT_TOY:
            return { ...state, toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy) }
        default:
            return state
    }
}


