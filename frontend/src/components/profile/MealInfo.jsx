import React, { useEffect, useRef, useState } from 'react'
import './css/meal_info.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTemporaryMeal, removeTempMeal, setTemporaryMeal } from '../../store/action/userAction'
import { FaMinus } from "react-icons/fa";


function MealInfo() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { auth: { user: { user } }, user: { temporaryMeal }, manager: { meals } } = useSelector(state => state)
    const date = new Date()
    const lunchRef = useRef()
    const dinnerRef = useRef()
    const dateRef = useRef()
    const tempMeal = temporaryMeal?.meals.filter(item => item._id === user._id) || []
    const mealToday = meals.filter(meal => new Date(meal.date).toDateString() === date.toDateString())[0]?.meals.filter(meal => meal._id === user._id)[0]


    useEffect(() => {
        !mealToday && dispatch(getTemporaryMeal(setLoading))
    }, [dispatch])

    const handleSave = (e) => {
        const data = {
            _id: user._id,
            name: user.name,
            date: dateRef.current.value,
            lunch: lunchRef.current.value,
            dinner: dinnerRef.current.value
        }
        !mealToday && dispatch(setTemporaryMeal(data))
    }

    const handleRemove = (e) => {
        temporaryMeal && dispatch(removeTempMeal(temporaryMeal._id, user._id))
    }

    const time = [24 - date.getHours(), 59 - date.getMinutes()]
    const [remainingTime, setRemainingTime] = useState(time)
    setInterval(() => {
        return setRemainingTime(time)
    }, 1000 * 60);

    return (
        <div className='meal_info'>
            <ul>
                <li>
                    <h4>Total Meals</h4>
                    <h3>24.5</h3>
                </li>
                <li>
                    <h4>Personal Deposite</h4>
                    <h3>1200</h3>
                </li>
                <li>
                    <h4>Remaining Cash</h4>
                    <h3>780 tk</h3>
                </li>
            </ul>
            <ul className='today_meal'>
                <li>
                    <div className="top">
                        <h4>Today Meal</h4>
                        {(remainingTime[0] >= 0) && !mealToday && <div className='remaining_time'>
                            <p>Time Remaining {remainingTime[0]}:{remainingTime[1]}</p>
                        </div>}
                        {remainingTime[0] <= 0 && <div className='times_up'>
                            <p>Times up</p>
                        </div>}
                        {mealToday && <div className=''>
                            <p>Manager Set Your Meal</p>
                        </div>}
                    </div>
                    {(tempMeal.length > 0 || mealToday) && <div className='temp_meal'>
                        <div>
                            <p>Lunch <span>{tempMeal[0]?.lunch || mealToday.lunch}</span></p>
                            <p>Dinner <span>{tempMeal[0]?.dinner || mealToday.dinner}</span></p>
                        </div>
                        <button onClick={handleRemove} disabled={(!!mealToday || remainingTime[0] <= 0)}><FaMinus /></button>
                    </div>}
                    {(!tempMeal.length > 0) && !mealToday && <>
                        {(remainingTime[0] <= 0) && <div className='time_over'>
                            <p>Time is over</p>
                        </div>}
                        {(remainingTime[0] <= 0) === false && <>
                            <input type="date" name='date' defaultValue={date.toISOString().slice(0, 10)} ref={dateRef} required />
                            <div className='meal_input'>
                                <div className="lunch">
                                    <label htmlFor="lunch">Lunch</label>
                                    <input type="number" ref={lunchRef} defaultValue={0} />
                                </div>
                                <div className="dinner">
                                    <label htmlFor="dinner">Dinner</label>
                                    <input type="number" ref={dinnerRef} defaultValue={0} />
                                </div>
                            </div>
                            <div>
                                <button className='btn1' onClick={handleSave} disabled={(remainingTime[0] <= 0)}>Save</button>
                            </div>
                        </>}
                    </>}
                </li>
                <li className='total_meals'>
                    <h4>Personal Total Meals</h4>
                    <h3>24.5</h3>
                </li>
            </ul>
        </div>
    )
}

export default MealInfo