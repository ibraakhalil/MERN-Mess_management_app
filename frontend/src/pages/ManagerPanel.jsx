import React, { useEffect, useState } from 'react'
import './css/ManagerPanel.css'
import Expense from '../components/manager/Expense'
import Deposite from '../components/manager/Deposite'
import Meal from '../components/manager/Meal'
import Summary from '../components/manager/Summary'
import { useDispatch, useSelector } from 'react-redux'
import { getRunningMealMonth } from '../store/action/managerActions'
import moment from 'moment'
import { IoDocuments } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaCog, FaPlusSquare } from "react-icons/fa";
import ManagerSetting from '../components/manager/ManagerSetting'
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
    const components = [<Summary />, <Expense />, <Deposite />, <Meal />, <ManagerSetting />]
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
          <div className='manager_msg'>
            <h2> &#9888;  Manager not set yet!</h2>
            <p>Please contact with Admin!</p>
          </div>
        }

        {runningMealMonth?.isActive && <div className='manager_panel'>
          <div className="manager_sidebar">
            <div className='running_manager'>
              <div className='top'>
                <h1>{runningMealMonth.manager.name}</h1>
                <small>Manager</small>
                {/* <h1>{months[runningMealMonth.month - 1]}, 2023</h1> */}
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
                <li className='active' onClick={handleClick}> <IoDocuments /> Summary</li>
                <li onClick={handleClick}> <RiMoneyDollarCircleFill /> Market cost</li>
                <li onClick={handleClick}> <GiReceiveMoney /> Deposite</li>
                <li onClick={handleClick}> <FaPlusSquare />Insert Meal</li>
                <li onClick={handleClick}> <FaCog />Setting</li>
              </ul>
            </div>
          </div>
          <div className="components">
            {compo}
          </div>
        </div>}
      </div>}
    </>
  )
}

export default ManagerPanel