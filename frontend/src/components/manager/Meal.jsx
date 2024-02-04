import React, { useEffect, useRef, useState } from 'react'
import './css/meal.css'
import moment from 'moment'
import MealChart from './MealChart'
import { useDispatch, useSelector } from 'react-redux'
import { BsMoonStarsFill, BsPlusSquareFill, BsSmartwatch, BsSunFill, BsTrashFill } from 'react-icons/bs'
import { postMeal } from '../../store/action/managerActions'
import { deleteTempMeal, getMealMonth, getTemporaryMeal } from '../../store/action/userAction'


function Meal({ id }) {
  const [loading, setLoading] = useState(true)
  const [mealValues, setMealValues] = useState({ lunch: 0, dinner: 0 })
  const dispatch = useDispatch()
  let { users, temporaryMeal, mealMonth } = useSelector(state => state.user)
  const { user } = useSelector(state => state.auth.user)
  const { meals } = useSelector(state => state.manager)
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
    dispatch(getMealMonth(id))
    const mapedUsersId = temporaryMeal?.meals.map(item => item._id)
    mapedUsersId && setMembers(members.filter((user) => !mapedUsersId.includes(user._id)))
    mapedUsersId && setEntryLists(temporaryMeal.meals)
  }, [dispatch])

  const showEntryForm = (e) => setShow({ ...show, entry: !show.entry })

  const handleSubmit = (e) => {
    e.preventDefault()
    let memberId = memberValue.current.value
    let filteredMember = users.filter((user) => user._id === memberId)[0]
    let lunch = launchValue.current.value
    let dinner = dinnerValue.current.value
    const memberData = {
      _id: filteredMember._id,
      name: filteredMember.name,
      lunch: lunch > 0 ? lunch : 0,
      dinner: dinner > 0 ? dinner : 0
    }
    setEntryLists([...entryLists, memberData])
    setMembers(members.filter((user) => user._id !== memberId))
    setMealValues({ lunch: 0, dinner: 0 })
  }

  const handleSave = (e) => {
    const newMeal = {
      mealMonth: id,
      totalLunch: 0,
      totalDinner: 0,
      date: dateValue.current.value,
      meals: entryLists.filter(entry => entry.lunch > 0 || entry.dinner > 0)
    }
    newMeal.meals.forEach(item => newMeal.totalLunch += Number(item.lunch))
    newMeal.meals.forEach(item => newMeal.totalDinner += Number(item.dinner))
    const isDateExist = meals?.filter(item => item.date === new Date(newMeal.date).toISOString()).length > 0

    if (isDateExist) {
      console.log('Date already Taken!');
    } else {
      dispatch(postMeal(newMeal, setLoading))
      temporaryMeal && dispatch(deleteTempMeal(temporaryMeal._id))
      setEntryLists([])
      setMembers(users)
      setMealValues({ lunch: 0, dinner: 0 })
    }
  }

  const handleDateChange = (e) => {
    const p = document.querySelector('.date_field p')
    const isDateExist = meals?.filter(item => item.date === new Date(e.target.value).toISOString()).length > 0
    setDateField(e.target.value)
    p.style.display = isDateExist ? 'block' : 'none'
  }


  return (
    <div className='meal'>
      <div className="top">
        <h3>Meal Chart</h3>
        {((user?._id === mealMonth?.manager._id) || user?.admin) && <button onClick={showEntryForm} className='btn1'>
          {show.entry ? 'Hide Form' : 'Add Meal'}
        </button>}
      </div>

      {show.entry &&
        <div className='new_entry'>
          <form onSubmit={handleSubmit}>
            <div className='wrapper'>
              <div className='date_field'>
                <input type="date" name='date' onChange={handleDateChange} defaultValue={new Date().toISOString().slice(0, 10)} ref={dateValue} required />
                <p>Date already taken!</p>
              </div>

              <div className='will_reset'>
                <select name="name" id="name_select" ref={memberValue}>
                  {members?.map((user, i) =>
                    <option key={i} value={user._id} >{user.name}</option>
                  )}
                </select>
              </div>

              <div className='meal_entry will_reset'>
                <div className='lunch'>
                  <span onClick={() => setMealValues({ ...mealValues, lunch: mealValues.lunch - 1 })}>-</span>
                  <input type="number" step={.5} name='launch' readOnly value={mealValues.lunch} ref={launchValue} placeholder='Launch' required />
                  <span onClick={() => setMealValues({ ...mealValues, lunch: mealValues.lunch + 1 })}>+</span>
                </div>
                <div className='dinner'>
                  <span onClick={() => setMealValues({ ...mealValues, dinner: mealValues.dinner - 1 })}>-</span>
                  <input type="number" step={.5} name='dinner' readOnly value={mealValues.dinner} ref={dinnerValue} placeholder='Dinner' required />
                  <span onClick={() => setMealValues({ ...mealValues, dinner: mealValues.dinner + 1 })}>+</span>
                </div>
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
            {entryLists.length === 0 && <div className='empty_msg'>
              <img src="/resource/empty.png" alt="empty" />
            </div>}
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
      <MealChart id={id} />
    </div>
  )
}

export default Meal