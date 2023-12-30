import React, { useRef, useState } from 'react'
import './css/meal.css'
import { useDispatch, useSelector } from 'react-redux'
import { BsMoonStarsFill, BsSunFill, BsTrashFill } from 'react-icons/bs'
import MealChart from './MealChart'
import { getMeal, postMeal } from '../../store/action/managerActions'


function Expense() {
  const [show, setShow] = useState({ entry: false, delete: false })
  let { user: { users }, manager: { runningMealMonth } } = useSelector(state => state)
  const [entryLists, setEntryLists] = useState([])
  const [members, setMembers] = useState(users)
  const memberValue = useRef()
  const dateValue = useRef()
  const launchValue = useRef()
  const dinnerValue = useRef()
  const dispatch = useDispatch()

  const handleEntryShow = (e) => {
    setShow({
      ...show,
      entry: true
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let inputs = document.querySelectorAll('.meal .new_entry form input')
    let memberId = memberValue.current.value
    let member = users.filter((user) => user._id === memberId)[0]
    let launch = launchValue.current.value
    let dinner = dinnerValue.current.value
    const data = { member, launch, dinner }

    setEntryLists([...entryLists, data])
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
      meals: entryLists.map(list => {
        return {
          _id: list.member._id,
          name: list.member.name,
          lunch: Number(list.launch),
          dinner: Number(list.dinner)

        }
      })
    }
    newMeal.meals.forEach(item => newMeal.totalLunch += item.lunch)
    newMeal.meals.forEach(item => newMeal.totalDinner += item.dinner)

    dispatch(postMeal(newMeal))
    setEntryLists([])
    setMembers(users)
    dispatch(getMeal(runningMealMonth._id))
  }


  return (
    <div className='meal'>
      <h3>New Entry</h3>
      {!show.entry && <button onClick={handleEntryShow} className='btn2'> &#8853; Add Meal</button>}
      {show.entry &&
        <div className='new_entry'>
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>
              <div>
                <select name="name" id="name_select" ref={memberValue}>
                  {members.map((user, i) =>
                    <option key={i} value={user._id} >{user.name}</option>
                  )}
                </select>
              </div>
              <div className='meal_entry'>
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
              <h2>Meal List</h2>
              <input type="date" name='date' defaultValue={new Date().toISOString().slice(0, 10)} ref={dateValue} required />
            </div>
            {entryLists.length === 0 && <div className='entryLists_empty'>😴</div>}
            <div className='lists_wrapper'>
              {entryLists.map((list, i) =>
                <ul key={i}>
                  <li>{list.member.name}</li>
                  <li>
                    <p className='lunch'>
                      <BsSunFill /> {list.launch}
                    </p>
                    <p className='dinner'>
                      <BsMoonStarsFill /> {list.dinner}
                    </p>
                  </li>
                  <li>
                    <span className='remove' onClick={() => {
                      setMembers([...members, list.member])
                      setEntryLists(entryLists.filter(entry => entry.member._id !== list.member._id))
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