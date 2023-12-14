import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../store/action/userAction'
import './css/MemberCard.css'



function MemberCard() {
    const img1 = "https://saifulbinakalam.files.wordpress.com/2017/10/saiful-bin-a-kalam-passport-size-photo.jpg"
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)


    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className="container">
            <h1 className='home_all_headers'>Mess Member Information</h1>
            <div className='mess-members'>
                <div className="wrapper">
                    {users.map((member, i) =>
                        <div key={i} className="card">
                            <div className='role'>Member</div>
                            <div className='img'>
                                <img src={img1} alt="" />
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
        </div>
    )
}

export default MemberCard