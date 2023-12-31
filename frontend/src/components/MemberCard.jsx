import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../store/action/userAction'
import './css/MemberCard.css'



function MemberCard() {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)


    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className='mess-members'>
            <div className="wrapper">
                {users.map((member, i) =>
                    <div key={i} className="card">
                        <div className='role'>{member.role}</div>
                        <div className='img'>
                            <img src={member.profilePic} alt="" />
                        </div>
                        <div className="info">
                            <h4>{member.name}</h4>
                            <p className='address'>{member.address}</p>
                        </div>
                        <div className='card_btn'>
                            <button className='btn2'>Message</button>
                            <button className=''>Follow</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemberCard