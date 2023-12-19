import React from 'react'
import './css/profile.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProfile } from '../store/action/userAction'
import ProfileSidebar from '../components/ProfileSidebar'

function Profile() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const { profile } = useSelector(state => state.user)

  console.log(profile);

  useEffect(() => {
    dispatch(getProfile(userId))
  }, [dispatch, userId])


  return (
    <div className='container'>
      <div className="profile">
        <ProfileSidebar profile={profile} />
        <div className="info">
          <ul className='details'>
            <li><span>Full Name</span> {profile.name}</li>
            <li><span>Email Address</span> {profile.email}</li>
            <li><span>Phone Number</span> {profile.phone}</li>
            <li><span>Address</span> {profile.address}</li>
            <button className='btn2'>
              <Link to={`/user/profile/edit/${profile._id}`}>Edit</Link>
            </button>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile