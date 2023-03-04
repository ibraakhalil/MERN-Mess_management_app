import Axios from 'axios'
import { SET_PROFILE } from '../constants/types'
import { setError } from './authAction'
import { GET_ALL_USERS } from '../constants/types'


export const getAllUsers = () => dispatch => {
    Axios.get('/api/user/getallusers')
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            })
        })
        .catch(e => console.log(e.message))
}

export const getProfile = (userId) => dispatch => {
    Axios.get(`/api/user/profile/${userId}`)
        .then(res => {
            dispatch({
                type: SET_PROFILE,
                payload: res.data.user
            })
        })
        .catch(e => dispatch(setError(e.response.data.error)))
}

export const profileUpdate = () => dispatch => {
    
}


