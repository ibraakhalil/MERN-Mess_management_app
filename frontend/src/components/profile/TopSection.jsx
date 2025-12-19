import React from 'react'
import './css/top_section.css'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaPen, FaPhoneSquare, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useSelector } from 'react-redux';

function TopSection({ profile, id }) {
    const { user } = useSelector(state => state.auth.user)

    if (!profile) return null;

    return (
        <div className="top_section_modern">
            <div className="profile_header_content">
                <div className="profile_avatar">
                    <img src={profile.profilePic || "/resource/default_avatar.png"} alt={profile.name} />
                </div>

                <div className="profile_info">
                    <h1 className="profile_name">{profile.name}</h1>
                    <p className="profile_role">{profile.profession || 'Member'}</p>

                    <div className="profile_social_links">
                        <a href={`tel:${profile.phone}`} title={profile.phone}><FaPhoneSquare /></a>
                        {profile.links?.facebook && <a href={profile.links.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>}
                        {profile.links?.xdotcom && <a href={profile.links.xdotcom} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>}
                        {profile.links?.instragram && <a href={profile.links.instragram} target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>}
                        {profile.links?.whatsapp && <a href={`https://wa.me/${profile.phone}`} target="_blank" rel="noopener noreferrer"><FaWhatsappSquare /></a>}
                        {profile.links?.linkedin && <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                    </div>
                </div>

                {user?._id === id && (
                    <div className="profile_actions">
                        <Link to={`/user/profile/edit/${profile._id}`} className="edit_btn">
                            <FaPen /> <span>Edit</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopSection
