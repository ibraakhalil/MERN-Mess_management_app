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
import { getTemporaryMeal } from '../store/action/userAction'
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function ManagerPanel() {
  const [compo, setCompo] = useState(<Summary />)
  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(true)
  const dispatch = useDispatch()
  const { runningMealMonth } = useSelector(state => state.manager)

  useEffect(() => {
    dispatch(getRunningMealMonth(setLoading))
    dispatch(getTemporaryMeal(setLoading))
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
    setToggle(!toggle)
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

        {runningMealMonth?.isActive && <div className={`manager_panel ${toggle ? 'active' : ''}`}>
          <div className="manager_sidebar">
            {/* <div className="sidebar_toggle"><FaPlusSquare /></div> */}
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
                <div className="hamburger" onClick={() => setToggle(!toggle)}>
                  <svg class={`ham hamRotate ham1 ${!toggle ? 'active' : ''}`} viewBox="0 0 100 100" width="80" >
                    <path
                      class="line top"
                      d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                    <path
                      class="line middle"
                      d="m 30,50 h 40" />
                    <path
                      class="line bottom"
                      d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
                  </svg>
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