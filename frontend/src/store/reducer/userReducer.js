import { GET_ALL_USERS, SET_PROFILE } from "../constants/types"



const init = {
    isLoading: true,
    user: {},
    users: [],
    error: {}
}


export const userReducer = (state=init, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }

        case GET_ALL_USERS:
            return {
                ...state,
                users: [...action.payload],
                isLoading: false
            }
    
        default: return state
    }
}