import { SET_USER, USER_ERROR } from "../constants/types"


const init = {
    user: {},
    isAuthenticate: false,
    error: {}
}

export const authReducer = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticate: Object.keys(action.payload).length > 0
            }

        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }

        default: return state
    }
}



export const authReducer2 = (state = init, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                name: action.payload
            }

        default: return state
    }
}