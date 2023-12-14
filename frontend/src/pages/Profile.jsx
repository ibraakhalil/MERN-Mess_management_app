import React from 'react'
import './css/profile.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfile } from '../store/action/userAction'
import ProfileSidebar from '../components/ProfileSidebar'

function Profile() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const { user } = useSelector(state => state.auth)
  const profile = user.user

  return (
    <div className='container'>
      <div className="profile">
        <ProfileSidebar user={user} />
        <div className="info">
          <ul className='details'>
            <li><span>Full Name</span> {profile.name}</li>
            <li><span>Email Address</span> {profile.email}</li>
            <li><span>Phone Number</span> {profile.phone}</li>
            <li><span>Address</span> {profile.address}</li>
            <button className='btn2'>Edit</button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile