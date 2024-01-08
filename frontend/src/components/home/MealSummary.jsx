import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/mealSummary.css'
import { months } from '../../pages/ManagerPanel'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonthSummary, getRunningMealMonth } from '../../store/action/managerActions'


export function MealSummary() {
    const dispatch = useDispatch()
    const { manager: { runningMealMonth, summary } } = useSelector(state => state)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getRunningMealMonth(setLoading))
        dispatch(getMealMonthSummary(setLoading))
    }, [dispatch])

    const handlePrev = (e) => {
        console.log('previous');
    }
    const handleNext = (e) => {
        console.log('Next');
    }



    return (
        <div className="meal_summary">
            <div className='top_head'>
                <div className="row1">
                    <div className="item">
                        <h3>Manager</h3>
                        <h2>{runningMealMonth?.manager?.name}</h2>
                    </div>
                    <div className="item">
                        <h3>Month</h3>
                        <h2>{months[runningMealMonth?.month - 1]}</h2>
                    </div>
                    <div className="item">
                        <h3>Start Date</h3>
                        <h2>{moment(runningMealMonth?.startDate).format('ll')}</h2>
                    </div>
                </div>
            </div>
            {loading && <div className='loading'>
                <img src="/resource/dna.svg" alt="" />
            </div>}
            {!loading && <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Meal</th>
                        <th>Meal Cost</th>
                        <th>Deposite</th>
                        <th>Due</th>
                    </tr>
                </thead>
                <tbody>
                    {summary?.individualDatas?.map((user) =>
                        <tr key={user._id}>
                            <td>
                                <div>
                                    <Link to={`/user/profile/${user._id}`}>
                                        <img src={user.profilePic} alt="member_pic" />
                                    </Link>
                                    <span className='name'>{user.name}</span>
                                </div>
                            </td>
                            <td>{user.totalMeal}</td>
                            <td>{((user.totalMeal) * summary?.mealRate || 0).toFixed()}</td>
                            <td>{user.totalDiposite}</td>
                            <td>
                                {user.totalDiposite - ((user.totalMeal) * summary?.mealRate || 0).toFixed()}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>}
            <div className='bottom_section'>
                <div className='next_prev'>
                    <button className='btn2' onClick={handlePrev}>Previous</button>
                    <button className='btn2' onClick={handleNext}>Next</button>
                </div>

            </div>
        </div>
    )
}


