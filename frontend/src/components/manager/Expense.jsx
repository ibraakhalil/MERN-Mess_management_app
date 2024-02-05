import React, { useEffect, useRef, useState } from 'react'
import './css/expense.css'
import moment from 'moment'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { deleteExpense, getExpense, postExpenses } from '../../store/action/managerActions'


function Expense({ id }) {
  const dispatch = useDispatch()
  const { expenses } = useSelector(state => state.manager)
  const { user } = useSelector(state => state.auth.user)
  const { mealMonth } = useSelector(state => state.user)
  const [show, setShow] = useState({ entry: false, delete: false })
  const expenseValue = useRef()
  const nameValue = useRef()
  const typeValue = useRef()

  useEffect(() => {
    dispatch(getExpense(id))
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('.expense form input')
    let name = nameValue.current.value
    let amount = expenseValue.current.value
    let type = typeValue.current.value
    const data = { mealMonth: id, name, amount, type }
    dispatch(postExpenses(data))
    inputs.forEach((input) => input.value = "")
  }

  const showEntryForm = (e) => {
    setShow({ ...show, entry: !show.entry })
  }

  const handleDelete = (e) => {
    dispatch(deleteExpense(show.id))
    setShow({ ...show, delete: false })
  }

  return (
    <div className='expense'>
      <div className="top">
        <h3>Market Cost</h3>
        {(user?.manager || user?.admin) && <button onClick={showEntryForm} className='btn1'>
          {!show.entry ? 'Add Expense' : 'Hide Form'}
        </button>}
      </div>
      {show.entry && <form className='new_entry' onSubmit={handleSubmit}>
        <div className='wrapper'>
          <div>
            <input type="text" name='name' ref={nameValue} placeholder='Member Name' required />
          </div>
          <div>
            <input type="text" name='type' ref={typeValue} placeholder='Market Type' required />
          </div>
          <div>
            <input type="number" name='amount' ref={expenseValue} placeholder='Amount' required />
          </div>
          <div><button className='btn2' type='submit'>Add</button></div>
        </div>
      </form>}

      <div className="expense-list">
        {expenses?.length == 0 && <div className='empty_msg'>
          <img src="/resource/empty.png" alt="empty" />
        </div>}
        <div className={`delete ${show.delete ? 'show' : ''}`}>
          <div>
            <h3>Are you want to delete this?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={(e) => setShow({ ...show, delete: false })}>No</button>
          </div>
        </div>
        {expenses?.map((expense, i) =>
          <ul key={i} className="list">
            <li>{moment(expense.createdAt).format("ll")}</li>
            <li>{expense.name}</li>
            <li>{expense.type}</li>
            <li>{expense.amount}৳</li>
            {((user?._id === mealMonth?.manager._id) || user?.admin) && <li onClick={(e) => e.currentTarget.classList.toggle('active')} className='expense_action'>
              <BsThreeDotsVertical />
              <div className='action_btn'>
                <span onClick={() => setShow({ ...show, delete: true, id: expense._id })}>
                  &#10006; Remove
                </span>
                <span>
                  &#9998; Edit
                </span>
              </div>
            </li>}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Expense