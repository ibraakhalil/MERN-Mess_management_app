import React, { useEffect } from 'react'
import './css/sidebar.css'
import { NavLink } from 'react-router-dom'


function Sidebar({ componentIndex }) {
  const handleClick = (e) => {
    const index = e.target.dataset.index
    componentIndex(index)
  }

  useEffect(() => {
    const lists = document.querySelectorAll('.admin_sidebar li')
    lists.forEach((list, i) => {
      list.addEventListener('click', (e) => {
        lists.forEach(list => list.classList.remove('active'))
        list.classList.add('active')
      })
    })
  }, [])


  return (
    <div className='admin_sidebar'>
      <ul className='wrapper'>
        <li className='active' onClick={handleClick} data-index={0}>Dashboard</li>
        <li onClick={handleClick} data-index={1}>Add Member</li>
        <li onClick={handleClick} data-index={2}>Mess Members</li>
        <li onClick={handleClick} data-index={3}>Set Manager</li>
        <li onClick={handleClick} data-index={4}>Add Notice</li>
      </ul>
    </div>
  )
}

export default Sidebar