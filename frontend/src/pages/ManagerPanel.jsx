import React, { useEffect, useState } from 'react'
import './css/ManagerPanel.css'
import Expense from '../components/manager/Expense'
import Deposite from '../components/manager/Deposite'
import Meal from '../components/manager/Meal'
import Summary from '../components/manager/Summary'
import { useDispatch, useSelector } from 'react-redux'
import { getRunningMealMonth } from '../store/action/managerActions'
import moment from 'moment'
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function ManagerPanel() {
  const [compo, setCompo] = useState(<Summary />)
  const [loading2, setLoading2] = useState(false)
  const dispatch = useDispatch()
  const { runningMealMonth, loading } = useSelector(state => state.manager)

  useEffect(() => {
    dispatch(getRunningMealMonth(setLoading2))
  }, [dispatch])


  const handleClick = (e) => {
    const lists = document.querySelectorAll(".section ul li")
    const components = [<Summary />, <Expense />, <Deposite />, <Meal />]
    lists.forEach((list, i) => {
      if (list === e.target) {
        setCompo(components[i])
      }
      list.classList.remove('active')
    })
    e.target.classList.add('active')
  }

  return (
    <>
      {loading && <div className='loading'>Loading...</div>}
      {!loading && <div className='container min_height'>
        {!runningMealMonth?.isActive &&
          <div>
            <h1>Manager not set yet!</h1>
          </div>}

        {runningMealMonth?.isActive && <div className='manager_panel'>
          <div className='running_manager'>
            <div className='top'>
              <h1>{runningMealMonth.manager.name}</h1>
              <h1>{months[runningMealMonth.month - 1]}, 2023</h1>
            </div>
            <div className='details'>
              <div className="date">
                <p> Start Date
                  <span>{moment(runningMealMonth.startDate).format('ll')}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="section">
            <ul>
              <li className='active' onClick={handleClick}>Summary</li>
              <li onClick={handleClick}>Market cost</li>
              <li onClick={handleClick}>Deposite</li>
              <li onClick={handleClick}>Insert Meal</li>
            </ul>
          </div>
          {compo}
        </div>}
      </div>}
    </>
  )
}

export default ManagerPanel