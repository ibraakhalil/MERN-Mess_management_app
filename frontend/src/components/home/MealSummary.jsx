import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/mealSummary.css'
import { months } from '../../pages/ManagerPanel'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getMealMonthSummary } from '../../store/action/managerActions'


// Dummy data for when no data is available
const dummyData = {
    mealMonth: {
        manager: { name: 'Ibrhaim Khalil' },
        month: new Date().getMonth() + 1,
        startDate: new Date()
    },
    mealRate: 45,
    totalMeals: 156,
    totalCosts: 7020,
    totalDeposite: 8500,
    individualDatas: [
        { _id: '1', name: 'Rahul Ahmed', profilePic: 'https://i.pravatar.cc/150?img=1', totalMeal: 28, totalDiposite: 1500 },
        { _id: '2', name: 'Karim Hasan', profilePic: 'https://i.pravatar.cc/150?img=2', totalMeal: 25, totalDiposite: 1200 },
        { _id: '3', name: 'Sakib Khan', profilePic: 'https://i.pravatar.cc/150?img=3', totalMeal: 30, totalDiposite: 1400 },
        { _id: '4', name: 'Rifat Islam', profilePic: 'https://i.pravatar.cc/150?img=4', totalMeal: 22, totalDiposite: 1100 },
        { _id: '5', name: 'Tanvir Rahman', profilePic: 'https://i.pravatar.cc/150?img=5', totalMeal: 26, totalDiposite: 1300 },
        { _id: '6', name: 'Imran Hossain', profilePic: 'https://i.pravatar.cc/150?img=6', totalMeal: 25, totalDiposite: 2000 },
    ]
}


export function MealSummary({ id }) {
    const { pathname } = useLocation()
    const dispatch = useDispatch()
    const summaryFromStore = useSelector(state => state.manager.summary)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(getMealMonthSummary(id, setLoading))
        } else {
            // No id provided, stop loading and use dummy data
            setLoading(false)
            setError(true)
        }
    }, [id, dispatch])

    // Use dummy data if no summary or error
    const summary = (!summaryFromStore || error) ? dummyData : summaryFromStore
    const isDummy = !summaryFromStore || error


    return (
        <>
            {loading && <div className='loading'>
                <img src="/resource/dna.svg" alt="" />
            </div>}
            {!loading && <div className={`meal_summary ${isDummy ? 'demo-mode' : ''}`}>
                {isDummy && <div className="demo-badge">Demo Data</div>}
                <div className='top_head'>
                    <div className="row1">
                        <div className="item card-manager" style={{ "--bg-icon": "url(/resource/manager.png)" }}>
                            <h3>Manager</h3>
                            <h2>{summary?.mealMonth?.manager?.name || 'Not Set'}</h2>
                        </div>
                        <div className="item card-month" style={{ "--bg-icon": "url(/resource/calendar.png)" }}>
                            <h3>Month</h3>
                            <h2>{months[summary?.mealMonth?.month - 1]}, {moment(summary?.mealMonth?.startDate).format('YYYY')}</h2>
                        </div>
                        <div className="item card-rate" style={{ "--bg-icon": "url(/resource/money.png)" }}>
                            <h3>Meal Rate</h3>
                            <h2>৳{summary?.mealRate || 0}</h2>
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
                                        <Link to={isDummy ? '#' : `/user/profile/${user._id}`}>
                                            <img src={user.profilePic} alt="member_pic" />
                                        </Link>
                                        <span className='name'>{user.name}</span>
                                    </div>
                                </td>
                                <td>{user.totalMeal}</td>
                                <td>৳{((user.totalMeal) * summary?.mealRate || 0).toFixed()}</td>
                                <td>৳{user.totalDiposite}</td>
                                {pathname !== '/' && <td>
                                    ৳{user.totalDiposite - ((user.totalMeal) * summary?.mealRate || 0).toFixed()}
                                </td>}
                            </tr>
                        )}
                        <tr className='total'>
                            <td className='td1'>Total</td>
                            <td>{summary?.totalMeals}</td>
                            <td>৳{summary?.totalCosts}</td>
                            <td>৳{summary?.totalDeposite}</td>
                            {pathname !== '/' && <td>--</td>}
                        </tr>
                    </tbody>
                </table>
            </div>}
        </>
    )
}
