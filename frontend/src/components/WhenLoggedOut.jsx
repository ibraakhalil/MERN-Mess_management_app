import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


function WhenLoggedOut() {
  const { isAuthenticate } = useSelector(state => state.auth)

  return isAuthenticate ? <Navigate to='/' /> : <Outlet />

}

export default WhenLoggedOut