import React, { useEffect, useState } from 'react'
import './css/summary.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMeal, getMealMonthSummary } from '../../store/action/managerActions'
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs'

function Summary({ id }) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { summary, meals } = useSelector(state => state.manager)
    const todayMeal = meals?.filter(meal => new Date(meal.date).toDateString() == new Date().toDateString())[0]

    useEffect(() => {
        dispatch(getMealMonthSummary(id, setLoading))
        id && dispatch(getMeal(id, setLoading))
    }, [id])


    return (
        <div className='summary'>
            <div className="row1">
                <div className="item">
                    <h3>Meal Rate</h3>
                    <h2>{summary?.mealRate || 0.00}৳</h2>
                </div>
                <div className="item">
                    <h3>Total Meal</h3>
                    <h2>{summary?.totalMeals}</h2>
                </div>
                <div className="item">
                    <h3>Total Cost</h3>
                    <h2>{summary?.totalCosts}৳</h2>
                </div><div className="item">
                    <h3>Meal Member</h3>
                    <h2>{summary?.individualDatas?.length}</h2>
                </div>
            </div>
            {todayMeal && <div className='today_meal'>
                <h3>Today Meal</h3>
                {todayMeal?.meals.length > 0 && todayMeal.meals.map((meal, i) =>
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
            </div>}
        </div>
    )
}

export default Summary