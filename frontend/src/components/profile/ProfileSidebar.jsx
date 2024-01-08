import React from 'react'
import './css/profile_sidebar.css'
import { FaBorderAll, FaCog, FaInfoCircle } from "react-icons/fa";
import { FaBowlFood } from 'react-icons/fa6';

function ProfileSidebar({ setIndex }) {

  const handleClick = (e) => {
    const lists = document.querySelectorAll(".profile_sidebar ul.items li")
    lists.forEach((list, i) => {
      if (list === e.target) {
        setIndex(i)
      }
      list.classList.remove('active')
    })
    e.target.classList.add('active')
  }


  return (
    <div className="profile_sidebar">
      <ul className='items'>
        <li className='active' onClick={handleClick}> <FaInfoCircle /> Info</li>
        <li onClick={handleClick}> <FaBorderAll /> Overview</li>
        <li onClick={handleClick}> <FaBowlFood /> Meal </li>
        <li onClick={handleClick}> <FaCog/> Setting</li>
      </ul>
    </div>
  )
}

export default ProfileSidebar