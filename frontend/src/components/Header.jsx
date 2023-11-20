import React from 'react'
import './css/Header.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/action/authAction'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticate, user } = useSelector(state => state.auth)


    const handleLogout = (e) => {
        dispatch(logOut(navigate))
    }


    return (
        <div className="header">
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/'>
                                <h1 className='logo'>messefy</h1>
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
                            <li>
                                <NavLink to={`/user/profile/${user.user._id}`}>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to='/manager'>Manager</NavLink>
                            </li>
                            {user.user.phone === '01747015688' && <>
                                <li>
                                    <NavLink to='/admin'>Admin</NavLink>
                                </li>
                            </>}
                            <li>
                                <Link><span onClick={handleLogout}>Log Out</span></Link>
                            </li>
                        </>}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header