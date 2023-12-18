import Axios from 'axios'
import { decodeToken } from 'react-jwt'
import setAuthHeaders from '../../utils/setAuthHeaders'
import { API_URL, SET_USER, USER_ERROR } from '../constants/types'


export const addMember = (user, navigate) => dispatch => {
    console.log(user);
    Axios.post(`${API_URL}/api/admin/register`, user, {
        headers: {
            'Content-Type': `multipart/form-data;`
        }
    })
        .then(res => {
            if (res.statusText === "OK") navigate('/')
        })
        .catch(e => {
            dispatch(setError(e.response.data.error))
        })
}

export const userLogin = (user, navigate) => dispatch => {
    Axios.post(`${API_URL}/api/auth/login`, user)
        .then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            setAuthHeaders()
            const user = decodeToken(token)
            dispatch({
                type: SET_USER,
                payload: user
            })
        })
        .catch(e => {
            dispatch(setError(e.response.data.error))
        })
}

export const setError = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    }
}

export const logOut = (navigate) => {
    localStorage.removeItem('token')
    return {
        type: SET_USER,
        payload: {}
    }
}
