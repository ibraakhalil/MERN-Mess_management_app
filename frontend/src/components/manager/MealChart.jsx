import React, { useEffect, useState, useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './css/mealchart.css'
import { deleteMeal, getMeal } from '../../store/action/managerActions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { BsMoonStarsFill, BsSunFill, BsXLg } from 'react-icons/bs'


// Generate dummy meal data for current month
const generateDummyMeals = () => {
  const dummyMembers = [
    { _id: '1', name: 'Rahul Ahmed', lunch: 1, dinner: 1 },
    { _id: '2', name: 'Karim Hasan', lunch: 1, dinner: 0 },
    { _id: '3', name: 'Sakib Khan', lunch: 0, dinner: 1 },
    { _id: '4', name: 'Rifat Islam', lunch: 1, dinner: 1 },
    { _id: '5', name: 'Tanvir Rahman', lunch: 1, dinner: 1 },
  ]

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const meals = []

  // Generate data for past days of current month
  for (let day = 1; day <= Math.min(daysInMonth, today.getDate()); day++) {
    const date = new Date(currentYear, currentMonth, day)

    // Randomly select 3-5 members for each day
    const numMembers = Math.floor(Math.random() * 3) + 3
    const shuffled = [...dummyMembers].sort(() => 0.5 - Math.random())
    const selectedMembers = shuffled.slice(0, numMembers).map(m => ({
      ...m,
      lunch: Math.random() > 0.3 ? 1 : 0,
      dinner: Math.random() > 0.3 ? 1 : 0
    }))

    const totalLunch = selectedMembers.reduce((sum, m) => sum + m.lunch, 0)
    const totalDinner = selectedMembers.reduce((sum, m) => sum + m.dinner, 0)

    meals.push({
      _id: `dummy_${day}`,
      date: date.toISOString(),
      totalLunch,
      totalDinner,
      meals: selectedMembers
    })
  }

  return meals
}


// Modal Component using Portal for full-screen backdrop
function MealModal({ meal, onClose, isDummy, user, onEdit, onDelete }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  const modalContent = (
    <div className="meal-modal-overlay" onClick={onClose}>
      <div className="meal-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="meal-modal-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <BsXLg />
        </button>
        <div className='modal_header'>
          <h1>
            <p>{moment(meal.date).format('dddd')}</p>
            {moment(meal.date).format('ll')}
          </h1>
          <div>
            <p>Day Total <span>{meal.totalDinner + meal.totalLunch}</span></p>
            <p>Lunch <span>{meal.totalLunch}</span></p>
            <p>Dinner <span>{meal.totalDinner}</span></p>
          </div>
        </div>
        <div className='modal_wrapper'>
          {meal.meals.length < 1 && <div className='empty_msg'>
            <img src="/resource/empty.png" alt="empty" />
          </div>}
          {meal.meals.length > 0 && meal.meals.map((m, i) =>
            <ul key={m._id || i}>
              <li>{m.name}</li>
              <li className='count'>
                <p className='lunch'>
                  <BsSunFill /> {m.lunch}
                </p>
                <p className='dinner'>
                  <BsMoonStarsFill /> {m.dinner}
                </p>
              </li>
            </ul>
          )}
        </div>
        {!isDummy && (user?.manager || user?.admin) && (
          <div className='action'>
            <button onClick={(e) => onEdit(e, meal._id)} className="btn2">Edit</button>
            <button onClick={(e) => onDelete(e, meal._id)} className="btn2">Delete</button>
          </div>
        )}
      </div>
    </div>
  )

  // Use ReactDOM.createPortal to render modal at document body level
  return ReactDOM.createPortal(modalContent, document.body)
}


function MealChart({ id }) {
  const [loading, setLoading] = useState(true)
  const [activeModal, setActiveModal] = useState(null)
  const dispatch = useDispatch()
  const { meals } = useSelector(state => state.manager)
  const authUser = useSelector(state => state.auth.user)
  const user = authUser?.user

  // Generate dummy meals only once using useMemo
  const dummyMeals = useMemo(() => generateDummyMeals(), [])

  // Use real meals if available, otherwise use dummy data
  const mealsData = (meals && meals.length > 0) ? meals : dummyMeals
  const isDummy = !meals || meals.length === 0

  const sortedMeals = [...mealsData].sort((a, b) => new Date(a.date) - new Date(b.date))

  useEffect(() => {
    if (id) {
      dispatch(getMeal(id, setLoading))
    } else {
      setLoading(false)
    }
  }, [id, dispatch])

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [])

  const handleCardClick = useCallback((index) => {
    setActiveModal(index)
  }, [])

  const handleEditMeal = useCallback((e, meal_id) => {
    e.stopPropagation()
    if (isDummy) return
    dispatch(deleteMeal(meal_id, setLoading))
    setActiveModal(null)
  }, [isDummy, dispatch])

  const handleDeleteMeal = useCallback((e, meal_id) => {
    e.stopPropagation()
    if (isDummy) return
    dispatch(deleteMeal(meal_id, setLoading))
    setActiveModal(null)
  }, [isDummy, dispatch])

  const activeMeal = activeModal !== null ? sortedMeals[activeModal] : null

  return (
    <div className={`meal_chart ${isDummy ? 'demo-mode' : ''}`}>
      {isDummy && <div className="demo-badge">Demo Data</div>}
      {loading && <div className='loading'>
        <img src='/resource/dna.svg' alt="" />
      </div>}
      {!loading && <>
        {sortedMeals.length < 1 && <div className='empty_msg'>
          <img src="/resource/empty.png" alt="empty" />
        </div>}
        {sortedMeals.length > 0 && <div className="wrapper">
          {sortedMeals.map((list, index) => (
            <div
              key={list._id || index}
              className={`item ${list.meals.filter(item => item._id === user?._id)?.length > 0 ? 'has_meal' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="date">
                <h1>{moment(list.date).format("DD")}
                  <span>{moment(list.date).format("MMM")}</span>
                </h1>
              </div>
              <div className="total_meal">
                <div>
                  <p className='lunch'>
                    <BsSunFill /> {list.totalLunch}
                  </p>
                  <p className='dinner'>
                    <BsMoonStarsFill /> {list.totalDinner}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </>}

      {/* Modal using Portal for full-screen backdrop */}
      {activeMeal && (
        <MealModal
          meal={activeMeal}
          onClose={closeModal}
          isDummy={isDummy}
          user={user}
          onEdit={handleEditMeal}
          onDelete={handleDeleteMeal}
        />
      )}
    </div>
  )
}

export default MealChart
