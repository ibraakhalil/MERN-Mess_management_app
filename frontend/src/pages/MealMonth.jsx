import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/mealMonth.css'
import { useDispatch } from 'react-redux'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'
import Expense from '../components/manager/Expense'
import Deposite from '../components/manager/Deposite'
import { getMealMonth } from '../store/action/userAction'


function MealMonth() {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getMealMonth(id))
    }, [dispatch])


    return (
        <div className="container">
            <main className='meal_month'>
                <div><MealSummary id={id} /></div>
                <div className='mealchart_main'>
                    <div className="top">
                        <h3>Meal Chart</h3>
                    </div>
                    <MealChart id={id} />
                </div>
                <div className="exp_depo_wrapper">
                    <Expense id={id} />
                    <Deposite id={id} />
                </div>

            </main>
        </div>
    )
}

export default MealMonth