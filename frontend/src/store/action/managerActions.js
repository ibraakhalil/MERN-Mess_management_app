import axios from "axios"
import { API_URL, GET_EXPENSES, GET_MEAL, GET_RUNNING_MEAL_MONTH, POST_EXPENSES } from "../constants/types"


export const getRunningMealMonth = () => async dispatch => {
    axios.get(`${API_URL}/manager/get-running-meal-month`)
        .then(res => {
            dispatch({
                type: GET_RUNNING_MEAL_MONTH,
                payload: res.data
            })
        })
        .catch(e => {
            console.log(e.message)
        })
}


export const getExpense = () => dispatch => {
    axios.get(`${API_URL}/manager/expenses`)
        .then(res => {
            dispatch({
                type: GET_EXPENSES,
                payload: res.data
            })
        })
}
export const postExpenses = (data) => dispatch => {
    axios.post(`${API_URL}/manager/expenses`, data)
        .then(res => {
            dispatch({
                type: POST_EXPENSES,
                payload: res.data
            })
        })
}
export const deleteExpense = (expenseid) => dispatch => {
    axios.delete(`${API_URL}/manager/expenses/${expenseid}`)
        .then(res => {
            dispatch(getExpense())
        })
        .catch(e => console.log(e.message))
}


export const getMeal = () => dispatch => {
    axios.get(`${API_URL}/manager/meal`)
        .then(res => {
            dispatch({
                type: GET_MEAL,
                payload: res.data
            })
        })
        .catch(e => {
            console.log(e)
        })
}
export const postMeal = (data) => dispatch => {
    axios.post(`${API_URL}/manager/meal`, data)
        .then(res => {
            dispatch(getMeal())
        })
        .catch(e => {
            console.log(e)
        })
}
export const deleteMeal = (mealId) => dispatch => {
    axios.delete(`${API_URL}/manager/meal/${mealId}`)
        .then(res => {
            dispatch(getMeal())
        })
}

export const addDeposite = (data) => dispatch => {

    axios.post(`${API_URL}/manager/deposite`, data)
        .then(res => {
            console.log(res.data)
            dispatch(getRunningMealMonth())
        })
}