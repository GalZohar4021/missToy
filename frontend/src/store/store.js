import { combineReducers, legacy_createStore as createStore } from "redux"

import { toyReducer } from './toy.reducer'
import { userReducer } from "./user.reducer"
import { appReducer } from './app.reducer'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    appModule: appReducer,
    toyModule: toyReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer, middleware)


// For debug 
store.subscribe(() => {
})
