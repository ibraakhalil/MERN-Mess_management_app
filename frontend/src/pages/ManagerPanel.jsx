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
import { FaCog, FaPlusSquare, FaThumbtack } from "react-icons/fa";
import ManagerSetting from '../components/manager/ManagerSetting'
import { getAllUsers, getTemporaryMeal } from '../store/action/userAction'
import Hamburger from '../components/Hamburger'
import { AddNotice } from '../components/admin/AddNotice'
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function ManagerPanel() {
  const dispatch = useDispatch()
  const { runningMealMonth } = useSelector(state => state.manager)
  const [compo, setCompo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    dispatch(getRunningMealMonth(setLoading))
    dispatch(getTemporaryMeal(setLoading))
    dispatch(getAllUsers(setLoading))
  }, [dispatch])

  useEffect(() => {
    runningMealMonth && setCompo(<Summary id={runningMealMonth?._id} />)
  }, [runningMealMonth])


  const handleClick = (e) => {
    const lists = document.querySelectorAll(".section ul li")
    const components = [
      <Summary id={runningMealMonth?._id} />,
      <Meal id={runningMealMonth?._id} />,
      <Expense id={runningMealMonth?._id} />,
      <Deposite id={runningMealMonth?._id} />,
      <AddNotice role={'manager'} />,
      <ManagerSetting />
    ]
    lists.forEach((list, i) => {
      if (list === e.target) {
        setCompo(components[i])
      }
      list.classList.remove('active')
    })
    e.target.classList.add('active')
    setToggle(!toggle)
  }

  return (
    <>
      {loading && <div className='loading'>
        <img src="/resource/flame.svg" alt="Loading..." />
      </div>}
      {!loading && <div className='container min_height'>
        {!runningMealMonth?.isActive &&
          <div className='manager_msg'>
            <h2> &#9888;  Manager not set yet!</h2>
            <p>Please contact with Admin!</p>
          </div>
        }

        {runningMealMonth?.isActive && <div className={`manager_panel ${toggle ? 'active' : ''}`}>
          <div className="manager_sidebar">
            <div className='running_manager'>
              <div className='sidebar_top'>
                <h1>{runningMealMonth.manager.name}</h1>
                <small>Manager</small>
              </div>
              <div className='details'>
                <div className="date">
                  <p> Start Date
                    <span>{moment(runningMealMonth.startDate).format('ll')}</span>
                  </p>
                </div>
                <Hamburger toggle={toggle} setToggle={setToggle
                } />
              </div>
            </div>
            <div className="section">
              <ul>
                <li className='active' onClick={handleClick}> <IoDocuments /> Summary</li>
                <li onClick={handleClick}> <FaPlusSquare />Add Meal</li>
                <li onClick={handleClick}> <RiMoneyDollarCircleFill /> Market cost</li>
                <li onClick={handleClick}> <GiReceiveMoney /> Deposite</li>
                <li onClick={handleClick}> <FaThumbtack /> Add Notice</li>
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