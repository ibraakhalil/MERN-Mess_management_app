import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/setManager.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/action/userAction'
import { postSetMealMonth } from '../../store/action/adminActions';
import { closeRunningMealMonth, getRunningMealMonth } from '../../store/action/managerActions'
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



function SetMealMonth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user: { users }, manager: { runningMealMonth, loading } } = useSelector(state => state)
  const dateRef = useRef()
  const monthRef = useRef()
  const managerRef = useRef()

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getRunningMealMonth())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      startDate: dateRef.current.value,
      month: monthRef.current.value,
      manager: {
        name: users.filter(user => user._id === managerRef.current.value)[0].name,
        _id: managerRef.current.value
      }
    }

    dispatch(postSetMealMonth(data))
  }

  const handleClose = (e) => {
    dispatch(closeRunningMealMonth(runningMealMonth._id, navigate))
  }


  return (
    <>
      {loading && <div className='loadin'>Loading...</div>}
      {!loading && <div className='meal_month'>
        {runningMealMonth?.isActive &&
          <div className='running_month'>
            <div className='top'>
              <h3>Running Month</h3>
              <h1>{months[runningMealMonth.month - 1]}, 2023</h1>
            </div>
            <div className='details'>
              <h1>{runningMealMonth.manager.name}</h1>
              <div className="date">
                <p> Start Date
                  <span>{moment(runningMealMonth.startDate).format('ll')}</span>
                </p>
                <p onClick={handleClose}>Close</p>
              </div>
            </div>
          </div>
        }
        {!runningMealMonth?.isActive && <div className="set_manager">
          <h2>Set Meal Manager</h2>
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  ref={dateRef}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  required />
              </div>
              <div className="form-group">
                <label htmlFor="month">Meal Month</label>
                <select name="month" ref={monthRef}>
                  {months.map((month, i) =>
                    <option key={i} value={i + 1}>{month}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="manager">Select Manager</label>
                <select name="manager" ref={managerRef}>
                  {users.map((user, i) =>
                    <option key={i} value={user._id}>{user.name}</option>
                  )}
                </select>
              </div>
            </div>

            <button className='btn1' type="submit">Submit</button>
          </form>
        </div>}
      </div>}
    </>
  )
}

export default SetMealMonth;