import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Error from '../pages/Error'
import Protected from '../components/Protected'
import AdminProtected from '../components/AdminProtected'
import WhenLoggedOut from '../components/WhenLoggedOut'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import ManagerPanel from '../pages/ManagerPanel'
import Admin from '../pages/Admin'
import Setting from '../pages/Setting'
import ComingSoon from '../pages/ComingSoon'

function routes() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />

            <Route path='/manager' element={<ManagerPanel />} />

            <Route path='/auth/' element={<WhenLoggedOut />}>
                <Route path='login' element={<Login />} />
            </Route>

            <Route path='/user/' element={<Protected />}>
                <Route path='profile/:userId' element={<Profile />} />
                <Route path='profile/edit/:userId' element={<EditProfile />} />
            </Route>

            <Route path='/admin/' element={<AdminProtected />}>
                <Route path='' element={<Admin />} />
            </Route>


            <Route path='/setting' element={<Setting />} />
            <Route path='/comingsoon' element={<ComingSoon />} />
            <Route path='/*' element={<Error />} />
        </Routes>
    )
}

export default routes