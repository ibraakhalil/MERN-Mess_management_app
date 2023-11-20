import React from 'react'
import './css/sidebar.css'


function Sidebar({ componentIndex }) {
  const handleClick = (e) => {
    const index = e.target.dataset.index
    componentIndex(index)

  }

  return (
    <div className='admin_sidebar'>
      <ul className='wrapper'>
        <li onClick={handleClick} data-index={0}>Dashboard</li>
        <li onClick={handleClick} data-index={1}>Mess Members</li>
        <li onClick={handleClick} data-index={2}>Add Members</li>
        <li onClick={handleClick} data-index={3}>Set Manager</li>
      </ul>
    </div>
  )
}

export default Sidebar