import Axios from 'axios'
import { API_URL, GET_NOTICE, SET_PROFILE } from '../constants/types'
import { setError } from './authAction'
import { GET_ALL_USERS } from '../constants/types'
import axios from 'axios'


export const getAllUsers = () => dispatch => {
    Axios.get(`${API_URL}/api/user/getallusers`)
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
        })
        .catch(e => console.log(e.message))
}

export const getProfile = (userId) => dispatch => {
    Axios.get(`${API_URL}/api/user/profile/${userId}`)
        .then(res => {
            dispatch({
                type: SET_PROFILE,
                payload: res.data
            })
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
}


