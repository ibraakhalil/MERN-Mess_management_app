import React from 'react'
import './css/profile_sidebar.css'



function Profile_sidebar({ user }) {
    return (<>
        {user.name && <div className="sidebar">
            <div className="user-info">
                <img src={`http://localhost:5000/public/upload/${user.profilePic}`} alt="" />
                <div className="inner">
                    <h4>{user.name}</h4>
                    <p>{user.address}</p>
                </div>
            </div>
            <div className="user-nav">
                <ul>
                    <li>Profile</li>
                    <li>Add Meal</li>
                    <li>Log Out</li>
                </ul>
            </div>
        </div>}
    </>
    )
}

export default Profile_sidebar