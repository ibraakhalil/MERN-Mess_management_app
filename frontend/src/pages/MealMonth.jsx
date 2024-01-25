import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/mealMonth.css'
import { useDispatch, useSelector } from 'react-redux'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'
import Expense from '../components/manager/Expense'
import Deposite from '../components/manager/Deposite'


function MealMonth() {
    const dispatch = useDispatch()
    const { id } = useParams()


    return (
        <div className="container">
            <main className='meal_month'>
                <div><MealSummary id={id} /></div>
                <div className='mealchart_main'>
                    <div class="top"><h3>Meal Chart</h3><button class="btn1">Add Meal</button></div>
                    <MealChart id={id} />
                </div>
                <div><Expense id={id} /></div>
                <div><Deposite id={id} /></div>
            </main>
        </div>
    )
}

export default MealMonth