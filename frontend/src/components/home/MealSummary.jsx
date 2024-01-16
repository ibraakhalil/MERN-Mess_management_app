import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/mealSummary.css'
import { months } from '../../pages/ManagerPanel'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonthSummary } from '../../store/action/managerActions'


export function MealSummary({ id }) {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const summary = useSelector(state => state.manager.summary)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        id && dispatch(getMealMonthSummary(id, setLoading))
    }, [id])

    const handlePrev = (e) => {
        console.log('previous');
    }
    const handleNext = (e) => {
        console.log('Next');
    }


    return (
        <>
            {loading && <div className='loading'>
                <img src="/resource/dna.svg" alt="" />
            </div>}
            {!loading && <div className="meal_summary">
                {!summary && <p className='not_set'>Meal Month Not Set Yet!</p>}
                {summary && <>
                    <div className='top_head'>
                        <div className="row1">
                            <div className="item">
                                <h3>Manager</h3>
                                <h2>{summary?.mealMonth?.manager.name}</h2>
                            </div>
                            <div className="item">
                                <h3>Month</h3>
                                <h2>{months[summary?.mealMonth?.month - 1]}</h2>
                            </div>
                            <div className="item">
                                <h3>Meal Rate</h3>
                                <h2>{summary?.mealRate}</h2>
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
                                {pathname !== '/' && <th>Due</th>}
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
                                    {pathname !== '/' && <td>
                                        {user.totalDiposite - ((user.totalMeal) * summary?.mealRate || 0).toFixed()}
                                    </td>}
                                </tr>
                            )}
                            <tr className='total'>
                                <td className='td1'>Total</td>
                                <td>{summary?.totalMeals}</td>
                                <td>{summary?.totalCosts}</td>
                                <td>{summary?.totalDeposite}</td>
                                {pathname !== '/' && <td>--</td>}
                            </tr>
                        </tbody>
                    </table>
                    <div className='bottom_section'>
                        <div className='next_prev'>
                            <button className='btn2' onClick={handlePrev}>Previous</button>
                            <button className='btn2' onClick={handleNext}>Next</button>
                        </div>
                        <div className="details">
                            <button className='btn1'><Link to={`/meal_month/${summary?.mealMonth?._id}`}>Details</Link></button>
                        </div>

                    </div>
                </>}
            </div>}
        </>
    )
}


