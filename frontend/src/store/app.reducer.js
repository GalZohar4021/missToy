
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const TOGGLE_CART = 'TOGGLE_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    app: {
        isLoading: false,
        isCartShown: false,
        shoppingCart: [],
        lastRemovedCart: null
    }
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, app: { ...state.app, isLoading: action.isLoading } }
        case TOGGLE_CART:
            return { ...state, app: { ...state.app, isCartShown: !state.app.isCartShown } }
        case CLEAR_CART:
            return { ...state, app: { ...state.app, shoppingCart: [] } }
        case ADD_TO_CART:
            return { ...state, app: { ...state.app, shoppingCart: state.app.shoppingCart } }
        case REMOVE_FROM_CART:
            return { ...state, app: { ...state.app, shoppingCart: state.app.shoppingCart.filter(toy => toy._id !== action.toyId) } }
        default:
            return state
    }
}