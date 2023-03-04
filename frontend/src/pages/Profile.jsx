import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfile } from '../store/action/userAction'

function Profile() {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getProfile(userId))
  }, [])


  return (
    <div className='profile'>
      <div className="container">
        <div className="info">
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h3>{user.name}</h3>
            <p>{user.phone}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile