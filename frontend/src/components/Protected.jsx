import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'



function Protected() {
    const { isAuthenticate } = useSelector(state => state.auth)

    return isAuthenticate ? <Outlet /> : <Navigate to='/auth/login' />

}

export default Protected