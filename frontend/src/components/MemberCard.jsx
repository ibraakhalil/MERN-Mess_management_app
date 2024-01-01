import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../store/action/userAction'
import './css/MemberCard.css'



function MemberCard() {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        dispatch(getAllUsers(setLoading))
    }, [dispatch])

    return (
        <div className='mess-members'>
            {loading && <div className='loading'>
                <img src="/resource/dna.svg" alt="" />
            </div>}
            {!loading && <div className="wrapper">
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
            </div>}
        </div>
    )
}

export default MemberCard