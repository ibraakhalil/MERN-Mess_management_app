import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/mealMonth.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonth } from '../store/action/userAction'
import { MealSummary } from '../components/home/MealSummary'


function MealMonth() {
    const dispatch = useDispatch()
    const { id } = useParams()

    return (
        <main className='meal_month'>
            <MealSummary id={id} />
        </main>
    )
}

export default MealMonth