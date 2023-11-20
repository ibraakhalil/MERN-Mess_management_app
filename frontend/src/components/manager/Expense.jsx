import React, { useEffect, useRef, useState } from 'react'
import './css/expense.css'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { deleteExpense, getExpense, postExpenses } from '../../store/action/managerActions'


function Expense() {
  const { expenses, runningMealMonth } = useSelector(state => state.manager)
  const dispatch = useDispatch()
  const [show, setShow] = useState({
    entry: false,
    delete: false
  })
  const expenseValue = useRef()
  const nameValue = useRef()
  const typeValue = useRef()

  useEffect(() => {
    dispatch(getExpense())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('.expense form input')
    let name = nameValue.current.value
    let amount = expenseValue.current.value
    let type = typeValue.current.value
    let mealMonth = runningMealMonth._id
    const data = {
      mealMonth, name, amount, type
    }

    dispatch(postExpenses(data))
    inputs.forEach((input) => input.value = "")
  }

  const handleEntry = (e) => {
    setShow({
      ...show,
      entry: true
    })
  }
  const handleDelete = (e) => {
    dispatch(deleteExpense(show.id))
    setShow({ ...show, delete: false })
  }


  return (
    <div className='expense'>
      <h3>New Entry</h3>
      {!show.entry && <button onClick={handleEntry} className='btn1'> &#8853; Add Expense</button>}
      {show.entry && <form className='new_entry' onSubmit={handleSubmit}>
        <div className='wrapper'>
          <div>
            <input type="text" name='name' ref={nameValue} placeholder='Name' required />
          </div>
          <div>
            <input type="text" name='type' ref={typeValue} placeholder='Type' required />
          </div>
          <div>
            <input type="number" name='amount' ref={expenseValue} placeholder='Amount' required />
          </div>
          <div><button className='btn2' type='submit'>Add</button></div>
        </div>
      </form>}

      <div className="expense-list">
        <div className={`delete ${show.delete ? 'show' : ''}`}>
          <div>
            <h3>Are you want to delete this?</h3>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={(e) => setShow({ ...show, delete: false })}>No</button>
          </div>
        </div>

        <ul className="head">
          <li>Date</li>
          <li>Name</li>
          <li>Type</li>
          <li>Expense</li>
          <li style={{ width: '50%' }}>Actions</li>
        </ul>
        {expenses.map((expense, i) =>
          <ul key={i} className="list">
            <li>{moment(expense.createdAt).format("ll")}</li>
            <li>{expense.name}</li>
            <li>{expense.type}</li>
            <li style={{ textAlign: "center" }}>{expense.amount} tk</li>
            <li style={{ width: '50%' }}>
              <span onClick={() => setShow({ ...show, delete: true, id: expense._id })}>&#10006;</span>
              <span>&#9998;</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default Expense