import React, { useEffect, useRef, useState } from 'react'
import './css/meal_info.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTemporaryMeal, removeTempMeal, setTemporaryMeal } from '../../store/action/userAction'
import { FaMinus } from "react-icons/fa";
import { getMealMonthSummary } from '../../store/action/managerActions';
import moment from 'moment';
import { Link } from 'react-router-dom';


function MealInfo({ id }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const { user } = useSelector(state => state.auth.user)
    const { temporaryMeal, allMealMonths } = useSelector(state => state.user)
    const { meals, runningMealMonth, summary } = useSelector(state => state.manager)
    const date = new Date()
    const lunchRef = useRef()
    const dinnerRef = useRef()
    const dateRef = useRef()
    const tempMeal = temporaryMeal?.meals.filter(item => item._id === user._id) || []
    const mealToday = meals.filter(meal => new Date(meal.date).toDateString() === date.toDateString())[0]?.meals.filter(meal => meal._id === user._id)[0]
    const personalMealData = summary?.individualDatas.filter(data => data._id === id)[0]
    const remainingCash = Math.ceil(personalMealData?.totalDiposite - (personalMealData?.totalMeal * summary?.mealRate))

    useEffect(() => {
        !mealToday && dispatch(getTemporaryMeal(setLoading))
        dispatch(getMealMonthSummary(runningMealMonth._id, setLoading))
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
            <div className="top">
                <h3>Running Month</h3>
            </div>
            <ul className='today_meal'>
                {user?._id === id && <li>
                    <div className="heading">
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
                    {((tempMeal.length > 0) || !!mealToday) && <div className='temp_meal'>
                        <div>
                            <p>Lunch <span>{tempMeal[0]?.lunch.toString() || mealToday?.lunch}</span></p>
                            <p>Dinner <span>{tempMeal[0]?.dinner.toString() || mealToday?.dinner}</span></p>
                        </div>
                        {!mealToday && <button onClick={handleRemove} disabled={remainingTime[0] <= 0}><FaMinus /></button>}
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
                </li>}
            </ul>
            <ul className='personal_meal_details'>
                <li className={`remaining_cash ${remainingCash < 0 ? 'danger' : ''}`}>
                    <h4>Remaining Cash</h4>
                    <h3>{remainingCash} tk</h3>
                </li>
                <li className='total_meals'>
                    <h4>Personal Total Meals</h4>
                    <h3>{personalMealData?.totalMeal}</h3>
                </li>
                <li>
                    <h4>Personal Deposite</h4>
                    <h3>{personalMealData?.totalDiposite} tk</h3>
                </li>
            </ul>
            <div className="latest_months">
                <h3>Latest Meal Months</h3>
                {allMealMonths.length < 1 && <div className='empty_msg'>
                    <img src="/resource/empty.png" alt="empty" />
                </div>}
                {allMealMonths?.map(month => <li key={month._id}>
                    <p>{month?.manager.name}</p>
                    <p>{moment(month.startDate).format('ll')}</p>
                    <Link to={`/meal_month/${month._id}`} className='btn2'>Details</Link>
                </li>)}
            </div>
        </div>
    )
}

export default MealInfo