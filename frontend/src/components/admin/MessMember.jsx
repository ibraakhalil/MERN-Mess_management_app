import React, { useState } from 'react'
import './css/messMember.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/action/userAction'


function MessMember() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
  
    useEffect(() => {
      dispatch(getAllUsers(setLoading))
    }, [dispatch])
  
  return (
    <div className="all-member">
            <h1>Current Mess Member</h1>
            <div className="wrapper">
              {users.map((user, i) =>
                <div className='item' key={i}>
                  <img src="" alt="" />
                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.phone}</p>
                    <p>{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
  )
}

export default MessMember