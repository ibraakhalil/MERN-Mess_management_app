import { combineReducers } from 'redux'
import { adminReducer } from './adminReducer'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'
import { mangerReducer } from './managerReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    manager: mangerReducer
})


export default rootReducer
