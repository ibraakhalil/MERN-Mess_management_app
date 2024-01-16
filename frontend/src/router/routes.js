import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Error from '../pages/Error'
import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'
import ManagerPanel from '../pages/ManagerPanel'
import Admin from '../pages/Admin'
import Setting from '../pages/Setting'
import ComingSoon from '../pages/ComingSoon'
import MealMonth from '../pages/MealMonth'
import { AdminProtected, ProfileProtected, UserProtected, WhenLoggedOut } from './Protected'

function routes() {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/meal_month/:id' element={<MealMonth />} />
            <Route path='/user/profile/:userId' element={<Profile />} />

            <Route path='/auth/' element={<WhenLoggedOut />}>
                <Route path='login' element={<Login />} />
            </Route>


            <Route path='/admin/' element={<AdminProtected />}>
                <Route path='' element={<Admin />} />
            </Route>
            <Route path='/user/profile/edit/:userId' element={<ProfileProtected />}>
                <Route path='' element={<EditProfile />} />
            </Route>
            <Route path='/manager/' element={<UserProtected />}>
                <Route path='' element={<ManagerPanel />} />
            </Route>


            <Route path='/setting' element={<Setting />} />
            <Route path='/comingsoon' element={<ComingSoon />} />
            <Route path='/*' element={<Error />} />
        </Routes>
    )
}

export default routes