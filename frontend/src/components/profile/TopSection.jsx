import React from 'react'
import './css/top_section.css'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagramSquare, FaPen, FaPhoneSquare, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function TopSection({ profile }) {
    return (<>
        {profile && <div className="top_section">
            <div className="ts_wrapper">
                <div className='user_info'>
                    <img src={profile.profilePic} alt="profile_pic" />
                    <div className="inner">
                        <h4>{profile.name}</h4>
                        <p>{profile.address}</p>
                        <div className="social">
                            <a href="tel:123-456-7890"><FaPhoneSquare /></a>
                            <Link to={'facebook.com'}><FaFacebookSquare /></Link>
                            <Link to={'x.com'}><FaSquareXTwitter /></Link>
                            <Link to={'instragram.com'}><FaInstagramSquare /></Link>
                            <Link to={'https://wa.me/9746646464'}><FaWhatsappSquare /></Link>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button className='btn2'>
                        <Link to={`/user/profile/edit/${profile._id}`}>
                            <FaPen /> <span>Edit Profile</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>}
    </>)
}

export default TopSection