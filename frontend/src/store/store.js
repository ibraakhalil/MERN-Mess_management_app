import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducer/rootReducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

export default store