import React, { useState } from 'react'
import './css/admin.css'
import Sidebar from '../components/admin/Sidebar'
import MessMember from '../components/admin/MessMember'
import AddNewMember from '../components/admin/AddNewMember'
import Dashboard from '../components/admin/Dashboard'
import SetMealMonth from '../components/admin/SetMealMonth'
import { AddNotice } from '../components/admin/AddNotice'


function Admin() {
  const components = [<Dashboard />, <MessMember />, <AddNewMember />, <SetMealMonth />, <AddNotice/>]
  const [component, setComponent] = useState(components[0])

  const componentIndex = (index) => {
    setComponent(components[index])
  }

  return (
    <div className='admin'>
      <div className="container">
        <Sidebar componentIndex={componentIndex} />
        <main>
          {component}
        </main>
      </div>
    </div>
  )
}

export default Admin