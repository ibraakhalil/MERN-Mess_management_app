import React, { useState } from 'react'
import './css/Header.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/action/authAction'
import { FaAngleDown, FaEnvelope, FaPowerOff, FaUserTie } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { FaCog, FaShieldAlt, FaUser } from "react-icons/fa";

function Header() {
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticate, user } = useSelector(state => state.auth)

    const handleLogout = (e) => {
        dispatch(logOut(navigate))
    }
    const handleDropdown = (e) => {
        setDropdown(!dropdown)
    }


    return (
        <div className="header">
            <div className="container">
                <nav>
                    <ul className='logo'>
                        <li>
                            <NavLink to='/'>
                                <h1>messefy</h1>
                            </NavLink>
                        </li>
                    </ul>
                    <ul>
                        {!isAuthenticate && <>
                            <li>
                                <NavLink to='/auth/login'>
                                    <button className='btn2'>Login</button>
                                </NavLink>
                            </li>
                        </>}
                        {isAuthenticate && <>
                            <div className='user'>
                                <li>
                                    <Link onClick={() => setDropdown(false)} to='/comingsoon'><IoNotifications /></Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDropdown(false)} to='/comingsoon'><FaEnvelope /></Link>
                                </li>
                                <li className={`user_details ${dropdown ? 'active' : ''}`} onClick={handleDropdown}>
                                    <img src={user.user?.profilePic} alt="user_pic" />
                                    <div>
                                        <p>{user.user.name}</p>
                                        <small>{user.user.role}</small>
                                    </div>
                                    <FaAngleDown />
                                </li>
                            </div>
                            {dropdown && <div className='header_dropdown'>
                                <li>
                                    <FaUser />
                                    <NavLink onClick={() => setDropdown(false)} to={`/user/profile/${user.user._id}`}>Profile</NavLink>
                                </li>
                                {(user.user.manager || user.user.admin) && <><li>
                                    <FaUserTie />
                                    <NavLink onClick={() => setDropdown(false)} to='/manager'>Manager</NavLink>
                                </li>
                                    {user.user.phone === '01747015688' && <>
                                        <li>
                                            <FaShieldAlt />
                                            <NavLink onClick={() => setDropdown(false)} to='/admin'>Admin</NavLink>
                                        </li>
                                    </>}
                                </>
                                }
                                <li>
                                    <FaCog />
                                    <NavLink onClick={() => setDropdown(false)} to='/comingsoon'>Setting</NavLink>
                                </li>
                                <li>
                                    <FaPowerOff />
                                    <Link><span onClick={handleLogout}>Log Out</span></Link>
                                </li>
                            </div>}
                        </>
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header