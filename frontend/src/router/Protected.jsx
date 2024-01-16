import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate, useParams } from 'react-router-dom'


export function AdminProtected() {
    const { isAuthenticate, user } = useSelector(state => state.auth)
    if (isAuthenticate) {
        const { phone, email } = user.user
        return phone === '01747015688' && email === 'ibrahim@gmail.com' ? <Outlet /> : <Navigate to='/' />
    } else {
        return <Navigate to='/' />
    }
}

export function ProfileProtected() {
    const { userId } = useParams()
    const { user } = useSelector(state => state.auth.user)
    return user?._id === userId ? <Outlet /> : <Navigate to={'/'} />
}

export function UserProtected() {
    const { isAuthenticate } = useSelector(state => state.auth)
    return isAuthenticate ? <Outlet /> : <Navigate to='/auth/login' />
}

export function WhenLoggedOut() {
    const { isAuthenticate } = useSelector(state => state.auth)
    return isAuthenticate ? <Navigate to='/' /> : <Outlet />
}