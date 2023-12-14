import React from 'react'
import './css/profile_sidebar.css'



function ProfileSidebar(props) {
    const { user } = props.user

    return (<>
        {user.name && <div className="sidebar">
            <div className="user-info">
                <img src={`http://localhost:5000/public/upload/${user.profilePic}`} alt="profile_pic" />
                <div className="inner">
                    <h4>{user.name}</h4>
                    <p>{user.address}</p>
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