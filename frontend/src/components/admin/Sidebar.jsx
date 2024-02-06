import React, { useEffect, useState } from 'react'
import './css/sidebar.css'
import { FaMicrosoft, FaRegCalendarPlus, FaThumbtack, FaUserPlus, FaUsers } from 'react-icons/fa'
import Hamburger from '../general/Hamburger'

function Sidebar({ componentIndex }) {
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    const lists = document.querySelectorAll('.admin_sidebar li')
    lists.forEach((list, i) => {
      list.addEventListener('click', (e) => {
        componentIndex(i)
        lists.forEach(list => list.classList.remove('active'))
        list.classList.add('active')
      })
    })
  }, [])

  return (
    <div className={`admin_sidebar ${!toggle ? 'active' : ''}`}>
      <Hamburger toggle={toggle} setToggle={setToggle} />
      <ul className='wrapper'>
        <li className='active'>
          <FaMicrosoft /> <span>Dashboard</span>
        </li>
        <li>
          <FaUsers /> <span>Mess Members</span>
        </li>
        <li>
          <FaUserPlus /> <span>Add Member</span>
        </li>
        <li>
          <FaRegCalendarPlus /> <span>Set Manager</span>
        </li>
        <li>
          <FaThumbtack /> <span>Add Notice</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar