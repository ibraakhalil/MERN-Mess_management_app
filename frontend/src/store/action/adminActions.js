import axios from "axios"
import { API_URL } from "../constants/types"
import { getRunningMealMonth } from "./managerActions"



export const postSetMealMonth = (data) => dispatch => {
    axios.post(`${API_URL}/api/admin/set-meal-month`, data)
        .then(res => {
            dispatch(getRunningMealMonth())
        })
        .catch(e => console.log(e.message))
}
