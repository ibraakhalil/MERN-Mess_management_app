import { GET_ALL_USERS } from "../constants/types"



const init = {
    users: [],
    loading: true,
    error: {}
}

export const adminReducer = (state = init, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: [...action.payload]
            }

        default: return state
    }
}