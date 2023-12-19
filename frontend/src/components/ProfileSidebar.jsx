import React from 'react'
import './css/profile_sidebar.css'
import { API_URL } from '../store/constants/types'


function ProfileSidebar({ profile }) {
    return (
        <>
            {profile && <div className="sidebar">
                <div className="user-info">
                    <img src={profile.profilePic} alt="profile_pic" />
                    <div className="inner">
                        <h4>{profile.name}</h4>
                        <p>{profile.address}</p>
                    </div>
                    <div className="bottom">
                        <button className='btn2'>Follow</button>
                        <button>Message</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProfileSidebar