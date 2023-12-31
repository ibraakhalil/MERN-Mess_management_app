import React, { Fragment, useEffect } from 'react'
import './css/mealchart.css'
import { deleteMeal, getMeal } from '../../store/action/managerActions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { BsMoonStarsFill, BsSunFill, BsXLg } from 'react-icons/bs'

function MealChart() {
  const dispatch = useDispatch()
  const { manager: { meals, runningMealMonth } } = useSelector(state => state)
  const sortedMeals = meals.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    runningMealMonth && dispatch(getMeal(runningMealMonth?._id))
  }, [runningMealMonth, dispatch])

  const handleClick = (e) => {
    let item = e.target.parentElement.parentElement
    item.classList.add("active")
  }

  const handleClose = (e) => {
    let items = document.querySelectorAll('.meal_chart .item')
    items?.forEach(item => {
      item.classList.remove('active')
    })
  }

  const handleDeleteMeal = (e) => {
    const meal_id = e.target.dataset.meal_id
    dispatch(deleteMeal(meal_id))
    handleClose()
  }

  return (
    <div className='meal_chart'>
      <div className="wrapper">
        {sortedMeals.map((list, i) =>
          <Fragment key={i}>
            <div className="item">
              <div className="date">
                <h1 onClick={handleClick} >{moment(list.date).format("DD")}
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
              <div className="modal">
                <div className='modal_items'>
                  <div className='modal_header'>
                    <h1>{moment(list.date).format('ll')}</h1>
                    <div>
                      <p>Day Total <span>{list.totalDinner + list.totalLunch}</span></p>
                      <p>Lunch <span>{list.totalLunch}</span></p>
                      <p>Dinner <span>{list.totalDinner}</span></p>
                    </div>
                  </div>
                  <div className='modal_wrapper'>
                    {list.meals.map((meal, i) =>
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
                  <button onClick={handleDeleteMeal} data-meal_id={list._id} className="btn2">Delete</button>
                </div>
                <div onClick={handleClose} className="close"><BsXLg /></div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default MealChart