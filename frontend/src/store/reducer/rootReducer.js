import {combineReducers} from 'redux'
import { adminReducer } from './adminReducer'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    admin: adminReducer
})


export default rootReducer
