import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfile } from '../store/action/userAction'
import Profile_sidebar from '../components/profile_sidebar'

function Profile() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getProfile(userId))
  }, [])


  return (
    <div className='profile'>
      <Profile_sidebar user={user}/>
      <div className="container">
        <div className="info">
          

        </div>
      </div>
    </div>
  )
}

export default Profile