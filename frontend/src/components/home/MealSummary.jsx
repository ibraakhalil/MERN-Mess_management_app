import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/mealSummary.css'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonthSummary, getRunningMealMonth } from '../../store/action/managerActions'
import { months } from '../../pages/ManagerPanel'
import moment from 'moment'
const memberpic = "https://i.postimg.cc/9X8gm5WX/handsome-young-man-with-new-stylish-haircut.jpg"

export function MealSummary() {
    const dispatch = useDispatch()
    const { user: { users }, manager: { runningMealMonth, summary } } = useSelector(state => state)

    useEffect(() => {
        dispatch(getRunningMealMonth())
        dispatch(getMealMonthSummary())
    }, [dispatch])

    return (
        <div className="container">
            <h1 className='home_all_headers'>Present Month Summary</h1>
            <div className="meal_summary">
                <div className='top_head'>
                    <div className="row1">
                        <div className="item">
                            <h3>Manager</h3>
                            <h2>{runningMealMonth?.manager.name}</h2>
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
                <table>
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
                        {summary.individualDatas?.map((user) =>
                            <tr key={user._id}>
                                <td>
                                    <div>
                                        <Link to={`/user/profile/${user._id}`}>
                                            <img src={memberpic} alt="member_pic" />
                                        </Link>
                                        <span className='name'>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.totalMeal}</td>
                                <td>{((user.totalMeal) * summary.mealRate).toFixed()}</td>
                                <td>{user.totalDiposite}</td>
                                <td>{user.totalDiposite - ((user.totalMeal) * summary.mealRate).toFixed()}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

