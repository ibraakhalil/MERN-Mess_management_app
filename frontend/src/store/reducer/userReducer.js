import { GET_ALL_USERS, GET_NOTICE, SET_PROFILE } from "../constants/types"



const init = {
    isLoading: true,
    notices: [],
    profile: {},
    users: [],
    error: {}
}

export const userReducer = (state = init, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                isLoading: false,
                profile: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: [...action.payload],
                isLoading: false
            }
        case GET_NOTICE:
            return {
                ...state,
                notices: [...action.payload],
                isLoading: false
            }

        default: return state
    }
}