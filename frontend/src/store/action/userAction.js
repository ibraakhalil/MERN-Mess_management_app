import Axios from 'axios'
import { API_URL, GET_NOTICE, GET_TEMPORARY_MEAL, SET_PROFILE } from '../constants/types'
import { setError } from './authAction'
import { GET_ALL_USERS } from '../constants/types'
import axios from 'axios'


export const getAllUsers = (setLoading) => dispatch => {
    Axios.get(`${API_URL}/api/user/getallusers`)
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => console.log(e.message))
}

export const getProfile = (userId, setLoading) => dispatch => {
    Axios.get(`${API_URL}/api/user/profile/${userId}`)
        .then(res => {
            dispatch({
                type: SET_PROFILE,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => dispatch(setError(e.response.data.error)))
}
export const editProfile = (data, id, navigate, setLoading) => dispatch => {
    axios.post(`${API_URL}/api/user/profile/edit/${id}`, data)
        .then(res => {
            navigate(`/user/profile/${id}`)
            setLoading(false)
        })
        .catch(e => console.log(e.message))
}

export const getMealMonth = (id) => dispatch => {
    axios.get(`${API_URL}/api/user/meal_month/${id}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(e => console.log(e.message))
}

export const getNotice = (setLoading) => dispatch => {
    axios.get(`${API_URL}/api/user/notice`)
        .then(res => {
            dispatch({
                type: GET_NOTICE,
                payload: res.data
            })

            setLoading(false)
        })
        .catch(e => {
            console.log(e.message);
        })
}
export const postNotice = (data) => dispatch => {
    axios.post(`${API_URL}/api/user/notice`, data)
        .then(res => {
            dispatch(getNotice())
        })
        .catch(e => console.log(e.message))
}

export const getTemporaryMeal = (setLoading) => dispatch => {
    axios.get(`${API_URL}/api/user/temp_meal`)
        .then(res => {
            dispatch({
                type: GET_TEMPORARY_MEAL,
                payload: res.data
            })
            setLoading(false)
        })
        .catch(e => e.message)
}
export const setTemporaryMeal = (data, setLoading) => dispatch => {
    axios.post(`${API_URL}/api/user/temp_meal`, data)
        .then(res => {
            dispatch(getTemporaryMeal(setLoading))
        })
        .catch(e => console.log(e.response.data))
}
export const removeTempMeal = (mealId, userId) => dispatch => {
    axios.put(`${API_URL}/api/user/temp_meal/${mealId}/${userId}`)
        .then(res => {
            console.log(res.data);
            dispatch(getTemporaryMeal())
        })
        .catch(e => console.log(e.response.data))
}
export const deleteTempMeal = (id) => dispatch => {
    axios.delete(`${API_URL}/api/user/temp_meal/${id}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(e => console.log(e.response.data))
}


