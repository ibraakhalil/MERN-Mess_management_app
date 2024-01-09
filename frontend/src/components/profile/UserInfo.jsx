import React from 'react'

function UserInfo({ profile }) {
    return (
        <ul className='details'>
            <li><strong>Full Name</strong> <span>{profile.name}</span></li>
            <li><strong>Email Address</strong> <span>{profile.email}</span></li>
            <li><strong>Phone Number</strong> <span>{profile.phone}</span></li>
            <li><strong>Address</strong> <span>{profile.address}</span></li>
        </ul>
    )
}

export default UserInfo