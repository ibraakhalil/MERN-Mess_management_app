import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'



function AdminProtected() {
    const { isAuthenticate, user } = useSelector(state => state.auth)
    if (isAuthenticate) {
        const { phone, email } = user.user

        return phone === '01747015688' && email === 'ibrahim@gmail.com' ? <Outlet /> : <Navigate to='/' />
    } else {
        return <Navigate to='/' />
    }

}

export default AdminProtected