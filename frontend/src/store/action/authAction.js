import Axios from 'axios'
import {decodeToken} from 'react-jwt'
import setAuthHeaders from '../../utils/setAuthHeaders'
import { SET_USER, USER_ERROR } from '../constants/types'


export const addMember = (user, navigate) => dispatch => {
    Axios.post('https://messmanager-api.vercel.app/api/admin/register', user, {
        headers: {
            'Content-Type': `multipart/form-data;`
          }
    })
    .then(res => {
        console.log(res.data)
        navigate('/admin/dashboard')
    })
    .catch(e => {
        dispatch(setError(e.response.data.error)) 
    })
}

export const userLogin = (user, navigate) => dispatch => {
    Axios.post('https://messmanager-api.vercel.app/api/auth/login', user)
    .then(res => {
        const token = res.data.token
        localStorage.setItem('token', token)
        setAuthHeaders()
        const user = decodeToken(token)
        dispatch({
            type: SET_USER,
            payload: user
        })
        console.log(user)
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
