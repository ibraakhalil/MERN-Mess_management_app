import React, { Fragment, useEffect, useState } from 'react'
import './css/mealchart.css'
import { deleteMeal, getMeal } from '../../store/action/managerActions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { BsMoonStarsFill, BsSunFill, BsXLg } from 'react-icons/bs'


function MealChart({ id }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { meals } = useSelector(state => state.manager)
  const { user } = useSelector(state => state.auth.user)
  const sortedMeals = meals?.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    id && dispatch(getMeal(id, setLoading))
  }, [id, dispatch])

  const handleClick = (e) => {
    e.currentTarget.parentElement.classList.add("active")
  }


  const handleClose = (e) => {
    let items = document.querySelectorAll('.meal_chart .item')
    items?.forEach(item => {
      item.classList.remove('active')
    })
  }

  const handleEditMeal = (e) => {
    const meal_id = e.target.dataset.meal_id
    dispatch(deleteMeal(meal_id, setLoading))
    handleClose()
  }

  const handleDeleteMeal = (e) => {
    const meal_id = e.target.dataset.meal_id
    dispatch(deleteMeal(meal_id, setLoading))
    handleClose()
  }

  return (
    <div className='meal_chart'>
      {loading && <div className='loading'>
        <img src='/resource/dna.svg' alt="" />
      </div>}
      {!loading && <>
        {sortedMeals.length < 1 && <div className='empty_msg'>
          <img src="/resource/empty.png" alt="empty" />
        </div>}
        {sortedMeals.length > 0 && <div className="wrapper">
          {sortedMeals.map((list, i) =>
            <Fragment key={i}>
              <div className={`item ${list.meals.filter(item => item._id === user?._id)?.length > 0 ? 'has_meal' : ''}`}>
                <div onClick={handleClick} >
                  <div className="date">
                    <h1 >{moment(list.date).format("DD")}
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

                <div className="modal">
                  <div className='modal_items'>
                    <div className='modal_header'>
                      <h1>
                        <p>{moment(list.date).format('dddd')}</p>
                        {moment(list.date).format('ll')}
                      </h1>
                      <div>
                        <p>Day Total <span>{list.totalDinner + list.totalLunch}</span></p>
                        <p>Lunch <span>{list.totalLunch}</span></p>
                        <p>Dinner <span>{list.totalDinner}</span></p>
                      </div>
                    </div>
                    <div className='modal_wrapper'>
                      {list.meals.length < 1 && <div className='empty_msg'>
                        <img src="/resource/empty.png" alt="empty" />
                      </div>}
                      {list.meals.length > 0 && list.meals.map((meal, i) =>
                        <ul key={i}>
                          <li>{meal.name}</li>
                          <li className='count'>
                            <p className='lunch'>
                              <BsSunFill /> {meal.lunch}
                            </p>
                            <p className='dinner'>
                              <BsMoonStarsFill /> {meal.dinner}
                            </p>
                          </li>
                        </ul>
                      )}
                    </div>
                    {(user?.manager || user?.admin) && <div className='action'>
                      <button onClick={handleEditMeal} data-meal_id={list._id} className="btn2">Edit</button>
                      <button onClick={handleDeleteMeal} data-meal_id={list._id} className="btn2">Delete</button>
                    </div>

                    }
                  </div>
                  <div onClick={handleClose} className="close"><BsXLg /></div>
                </div>
              </div>
            </Fragment>
          )}
        </div>}
      </>}
    </div>
  )
}

export default MealChart