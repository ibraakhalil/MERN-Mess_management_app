import React from 'react'

function UserInfo({ profile }) {
    return (
        <ul className='details'>
            <li><span>Full Name</span> {profile.name}</li>
            <li><span>Email Address</span> {profile.email}</li>
            <li><span>Phone Number</span> {profile.phone}</li>
            <li><span>Address</span> {profile.address}</li>
        </ul>
    )
}

export default UserInfo