import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/user.reducer'
import { appStateReducer } from './reducers/app-state.reducer'


const rootReducer = combineReducers({
    userModule: userReducer,
    appStateModule: appStateReducer
})



// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export const store = createStore(rootReducer, applyMiddleware(thunk))

// Store types
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
