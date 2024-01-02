import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/action/userAction'
import './css/deposite.css'
import { BsTrashFill } from 'react-icons/bs'
import { addDeposite } from '../../store/action/managerActions'
import moment from 'moment'


function Deposite() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user: { users }, manager: { runningMealMonth } } = useSelector(state => state)
  const memberValue = useRef()
  const amountValue = useRef()

  useEffect(() => {
    return dispatch(getAllUsers(setLoading))
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    const _id = memberValue.current.value
    const amount = amountValue.current.value
    const newDeposite = {
      meal_month_id: runningMealMonth._id,
      data: {
        _id,
        amount,
        name: users.filter(user => user._id === _id)[0].name
      },
    }
    dispatch(addDeposite(newDeposite))
  }


  return (
    <div className='deposite'>
      <div className='new_entry'>
        <form onSubmit={handleSubmit}>
          <div className='wrapper'>
            <select name="name" id="name_select" ref={memberValue}>
              {users.map((user, i) =>
                <option key={i} value={user._id} >{user.name}</option>
              )}
            </select>
            <input type="number" name='amount' ref={amountValue} placeholder='Amount' required />
            <div>
              <button className='btn1' type='submit'>Add To List</button>
            </div>
          </div>
        </form>
        <div className="entry_lists">
          <div className='entry_header'>
            <h2>Running Month Deposite</h2>
          </div>
          {runningMealMonth.deposites.length === 0 && <div className='empty_msg'>Empty</div>}
          <div className='lists_wrapper'>
            {runningMealMonth.deposites.map((deposite, i) =>
              <ul key={i}>
                <li>{deposite.name}</li>
                <li>{deposite.amount} tk</li>
                <li>{moment(deposite.date).format('ll')}</li>
                <li>
                  <span className='remove'>
                    <BsTrashFill />
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposite