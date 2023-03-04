import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Error from '../pages/Error'
import Dashboard from '../pages/Dashboard'
import Protected from '../components/Protected'
import AdminProtected from '../components/AdminProtected'
import WhenLoggedOut from '../components/WhenLoggedOut'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'

function routes() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />

            <Route path='/auth/' element={<WhenLoggedOut />}>
                <Route path='login' element={<Login />} />
            </Route>

            <Route path='/user/' element={<Protected />}>
                <Route path='profile/:userId' element={<Profile />} />
                <Route path='profile/edit/:userId' element={<EditProfile />} />
            </Route>

            <Route path='/admin/' element={<AdminProtected />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='register' element={<Register />} />
            </Route>


            <Route path='/*' element={<Error />} />
        </Routes>
    )
}

export default routes