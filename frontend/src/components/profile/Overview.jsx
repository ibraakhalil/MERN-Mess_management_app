import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './css/overview.css'
import moment from 'moment'


function Overview() {
  const { managingMonth } = useSelector(state => state.user.profile)

  return (
    <div className='overview'>
      <div className="managing_month">
        <h3>Months Of Managing Meal</h3>
        <ul>
          {managingMonth.length < 1 && <div className='empty_msg'>
            <img src="/resource/empty.png" alt="empty" />
          </div>}
          {managingMonth?.map(month =>
            <li key={month._id}>
              <p>{moment(month.startDate).format('ll')}</p>
              <Link to={`/meal_month/${month._id}`} className='btn2'>Details</Link>
            </li>)}
        </ul>
      </div>
    </div>
  )
}

export default Overview