import axios from "axios"
import { API_URL } from "../constants/types"
import { getRunningMealMonth } from "./managerActions"



export const postSetMealMonth = (data) => async dispatch => {
    const res = await axios.post(`${API_URL}/api/admin/set-meal-month`, data)

    if (res.statusText === "OK") dispatch(getRunningMealMonth())
}
