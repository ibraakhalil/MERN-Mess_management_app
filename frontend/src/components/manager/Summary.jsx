import React, { useEffect, useState } from 'react'
import './css/summary.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonthSummary } from '../../store/action/managerActions'

function Summary({ id }) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { summary } = useSelector(state => state.manager)

    useEffect(() => {
        dispatch(getMealMonthSummary(id, setLoading))
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
                </div>
            </div>
            <div className="row2">
                <div className="item">
                    <h3>Meal Member</h3>
                    <h2>{summary?.individualDatas?.length}</h2>
                </div>
            </div>
        </div>
    )
}

export default Summary