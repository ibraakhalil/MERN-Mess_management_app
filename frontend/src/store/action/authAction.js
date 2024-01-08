import Axios from 'axios'
import { decodeToken } from 'react-jwt'
import setAuthHeaders from '../../utils/setAuthHeaders'
import { API_URL, SET_USER, USER_ERROR } from '../constants/types'

export const addMember = (user, navigator) => dispatch => {
    Axios.post(`${API_URL}/api/admin/register`, user, {
        headers: {
            'Content-Type': `multipart/form-data;`
        }
    })
        .then(res => {
            navigator()
        })
        .catch(e => {
            dispatch(setError(e.response.data.error))
        })
}

export const userLogin = (user, navigate, setLoading) => dispatch => {
    Axios.post(`${API_URL}/api/auth/login`, user)
        .then(res => {
            const token = res.data.token
            localStorage.setItem('token', token)
            setAuthHeaders()
            const decodedUser = decodeToken(token)
            dispatch({
                type: SET_USER,
                payload: decodedUser
            })
            setLoading(false)
            return decodedUser
        })
        .then((res) => {
            navigate(`/user/profile/${res.user._id}`)
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

export const logOut = (navigate) => async dispatch => {
    localStorage.removeItem('token')
    await dispatch({
        type: SET_USER,
        payload: {}
    })
    navigate(`/auth/login`)
}
