import axios from "axios"
import { API_URL, GET_EXPENSES, GET_MEAL, GET_MEAL_MONTH_SUMMARY, GET_RUNNING_MEAL_MONTH, POST_EXPENSES } from "../constants/types"


export const getRunningMealMonth = (setLoading) => async dispatch => {
    axios.get(`${API_URL}/api/user/get-running-meal-month`)
        .then(res => {
            dispatch({
                type: GET_RUNNING_MEAL_MONTH,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => {
            console.log(e.message)
        })
}
export const closeRunningMealMonth = (mealMonth_id, navigate) => dispatch => {
    axios.get(`${API_URL}/manager/close-meal/${mealMonth_id}`)
        .then(res => {
            dispatch(getRunningMealMonth())
            navigate('/')
        })
        .catch(e => console.log(e.message))
}
export const getMealMonthSummary = (setLoading) => dispatch => {
    axios.get(`${API_URL}/api/user/meal-month-summary`)
        .then(res => {
            dispatch({
                type: GET_MEAL_MONTH_SUMMARY,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => console.log(e.message))
}


export const getExpense = () => dispatch => {
    axios.get(`${API_URL}/manager/expenses`)
        .then(res => {
            dispatch({
                type: GET_EXPENSES,
                payload: res.data
            })
        })
        .catch(e => console.log(e.message))
}
export const postExpenses = (data) => dispatch => {
    axios.post(`${API_URL}/manager/expenses`, data)
        .then(res => {
            dispatch({
                type: POST_EXPENSES,
                payload: res.data
            })
        })
        .catch(e => console.log(e.message))
}
export const deleteExpense = (expenseid) => dispatch => {
    axios.delete(`${API_URL}/manager/expenses/${expenseid}`)
        .then(res => {
            dispatch(getExpense())
        })
        .catch(e => console.log(e.message))
}


export const getMeal = (mealMonthId, setLoading) => dispatch => {
    axios.get(`${API_URL}/manager/meal/${mealMonthId}`)
        .then(res => {
            dispatch({
                type: GET_MEAL,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => {
            console.log(e.message)
        })
}
export const postMeal = (data, setLoading) => dispatch => {
    axios.post(`${API_URL}/manager/meal`, data)
        .then(res => {
            dispatch(getMeal(data.mealMonth, setLoading))
        })
        .catch(e => {
            console.log(e.message)
        })
}
export const deleteMeal = (mealId) => dispatch => {
    axios.delete(`${API_URL}/manager/meal/${mealId}`)
        .then(res => {
            dispatch(getMeal(res.data.mealMonth_id))
        })
        .catch(e => e.message)
}

export const addDeposite = (data) => dispatch => {

    axios.post(`${API_URL}/manager/deposite`, data)
        .then(res => {
            console.log(res.data)
            dispatch(getRunningMealMonth())
        })
        .catch(e => console.log(e.message))
}