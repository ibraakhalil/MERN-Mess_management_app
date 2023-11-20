import { GET_EXPENSES, GET_MEAL, GET_RUNNING_MEAL_MONTH, POST_EXPENSES } from "../constants/types";



const init = {
    loading: true,
    runningMealMonth: null,
    expenses: [],
    meals: []
}

export const mangerReducer = (state = init, action) => {
    switch (action.type) {
        case GET_RUNNING_MEAL_MONTH:
            return {
                ...state,
                runningMealMonth: action.payload,
                loading: false
            }
        case GET_EXPENSES:
            return {
                ...state,
                expenses: action.payload
            }
        case POST_EXPENSES:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case GET_MEAL:
            return {
                ...state,
                meals: action.payload
            }

        default: return state
    }
}