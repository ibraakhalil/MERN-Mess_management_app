import React, { useEffect, useRef, useState } from 'react'
import './css/meal.css'
import moment from 'moment'
import MealChart from './MealChart'
import { useDispatch, useSelector } from 'react-redux'
import { BsMoonStarsFill, BsPlusSquareFill, BsSmartwatch, BsSunFill, BsTrashFill } from 'react-icons/bs'
import { postMeal } from '../../store/action/managerActions'
import { deleteTempMeal, getTemporaryMeal } from '../../store/action/userAction'


function Expense() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  let { users, temporaryMeal } = useSelector(state => state.user)
  let { runningMealMonth } = useSelector(state => state.manager)
  const [show, setShow] = useState({ entry: false, delete: false })
  const [dateField, setDateField] = useState(new Date())
  const [entryLists, setEntryLists] = useState([])
  const [members, setMembers] = useState(users)
  const memberValue = useRef()
  const dateValue = useRef()
  const launchValue = useRef()
  const dinnerValue = useRef()

  useEffect(() => {
    dispatch(getTemporaryMeal(setLoading))
    const mapedUsersId = temporaryMeal?.meals.map(item => item._id)
    mapedUsersId && setMembers(members.filter((user) => !mapedUsersId.includes(user._id)))
    mapedUsersId && setEntryLists(temporaryMeal.meals)
  }, [dispatch])

  const handleEntryShow = (e) => {
    setShow({
      ...show,
      entry: true
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('.meal .new_entry form .will_reset input')
    let memberId = memberValue.current.value
    let filteredMember = users.filter((user) => user._id === memberId)[0]
    const memberData = {
      _id: filteredMember._id,
      name: filteredMember.name,
      lunch: launchValue.current.value,
      dinner: dinnerValue.current.value
    }

    setEntryLists([...entryLists, memberData])
    setMembers(members.filter((user) => user._id !== memberId))
    inputs.forEach((input) => input.value = 0)
  }

  const handleSave = (e) => {
    let date = dateValue.current.value
    const newMeal = {
      mealMonth: runningMealMonth._id,
      date,
      totalLunch: 0,
      totalDinner: 0,
      meals: entryLists
    }
    newMeal.meals.forEach(item => newMeal.totalLunch += Number(item.lunch))
    newMeal.meals.forEach(item => newMeal.totalDinner += Number(item.dinner))

    dispatch(postMeal(newMeal, setLoading))
    temporaryMeal && dispatch(deleteTempMeal(temporaryMeal._id))
    setEntryLists([])
    setMembers(users)
  }


  return (
    <div className='meal'>
      <h3>New Entry</h3>
      {!show.entry && <button onClick={handleEntryShow} className='btn2'> <BsPlusSquareFill /> Add New Meal</button>}
      {show.entry &&
        <div className='new_entry'>
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>

              <div className='date_field'>
                <input type="date" name='date' onChange={(e) => setDateField(e.target.value)} defaultValue={new Date().toISOString().slice(0, 10)} ref={dateValue} required />
              </div>

              <div className='will_reset'>
                <select name="name" id="name_select" ref={memberValue}>
                  {members.map((user, i) =>
                    <option key={i} value={user._id} >{user.name}</option>
                  )}
                </select>
              </div>

              <div className='meal_entry will_reset'>
                <input type="number" name='launch' defaultValue={1} ref={launchValue} placeholder='Launch' required />
                <input type="number" name='dinner' defaultValue={1} ref={dinnerValue} placeholder='Dinner' required />
              </div>
              <div>
                <button className='btn1' type='submit' disabled={members.length > 0 ? false : true}>Add To List</button>
              </div>
            </div>
          </form>
          <div className="entry_lists">
            <div className='entry_header'>
              <h2><BsSmartwatch /> {moment(dateField).format('ll')}</h2>
            </div>
            {entryLists.length === 0 && <div className='empty_msg'>Empty List</div>}
            <div className='lists_wrapper'>
              {entryLists.map((item, i) =>
                <ul key={i}>
                  <li>{item.name}</li>
                  <li>
                    <p className='lunch'>
                      <BsSunFill /> {item.lunch}
                    </p>
                    <p className='dinner'>
                      <BsMoonStarsFill /> {item.dinner}
                    </p>
                  </li>
                  <li>
                    <span className='remove' onClick={() => {
                      setMembers([...members, users.filter(user => item._id === user._id)[0]])
                      setEntryLists(entryLists.filter(entry => entry._id !== item._id))
                    }}>
                      <BsTrashFill />
                    </span>
                  </li>
                </ul>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              {entryLists.length !== 0 && <button className='btn2' onClick={handleSave}>Save</button>}
            </div>
          </div>
        </div>
      }
      <MealChart />
    </div>
  )
}

export default Expense