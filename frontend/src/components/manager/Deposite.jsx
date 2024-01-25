import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getMealMonth } from '../../store/action/userAction'
import './css/deposite.css'
import { BsTrashFill } from 'react-icons/bs'
import { addDeposite, removeDeposite } from '../../store/action/managerActions'
import moment from 'moment'


function Deposite({ id }) {
  const [show, setShow] = useState({ entry: false, delete: false })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { users, mealMonth } = useSelector(state => state.user)
  const memberValue = useRef()
  const amountValue = useRef()

  useEffect(() => {
    dispatch(getAllUsers(setLoading))
    id && dispatch(getMealMonth(id))
  }, [id, dispatch])


  const handleSubmit = (e) => {
    const _id = memberValue.current.value
    const amount = amountValue.current.value
    const name = users.filter(user => user._id === _id)[0].name
    const newDeposite = {
      meal_month_id: id,
      data: { _id, name, amount }
    }
    dispatch(addDeposite(newDeposite))
    setShow({ ...show, entry: false })
  }

  const showEntryForm = (e) => {
    setShow({ ...show, entry: !show.entry })
  }
  const handleRemove = (e) => {
    const i = e.currentTarget.dataset.index
    dispatch(removeDeposite(id, i))
  }


  return (
    <div className='deposite'>
      <div className="top">
        <h3>Deposites</h3>
        <button className='btn1' onClick={showEntryForm}>
          {show.entry ? 'Hide Form' : 'Add New'}
        </button>
      </div>
      {show.entry && <div className='new_entry'>
        <form>
          <div className='wrapper'>
            <select name="name" id="name_select" ref={memberValue}>
              {users.map((user, i) =>
                <option key={i} value={user._id} >{user.name}</option>
              )}
            </select>
            <input type="number" name='amount' ref={amountValue} placeholder='Amount' required />
            <div>
              <button className='btn1' onClick={handleSubmit}>Add To List</button>
            </div>
          </div>
        </form>
      </div>}
      <div className="entry_lists">
        {mealMonth?.deposites.length === 0 && <div className='empty_msg'>
          <img src="/resource/empty.png" alt="empty" />
        </div>}
        <div className='lists_wrapper'>
          {mealMonth?.deposites.map((deposite, i) =>
            <ul key={i}>
              <li>{deposite.name}</li>
              <li>{deposite.amount} tk</li>
              <li>{moment(deposite.date).format('ll')}</li>
              <li>
                <span onClick={handleRemove} data-index={i} className='remove'>
                  <BsTrashFill />
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Deposite