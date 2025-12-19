import React, { useEffect } from 'react'
import './css/Home.css'
import NoticeBoard from '../components/general/NoticeBoard'
import MemberCard from '../components/general/MemberCard'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'
import { useDispatch, useSelector } from 'react-redux'
import { getRunningMealMonth } from '../store/action/managerActions'
import { Link } from 'react-router-dom'
import { FaUtensils, FaUsers, FaWallet, FaCalendarAlt, FaPlus, FaChartLine, FaClipboardList } from 'react-icons/fa'
import { BsSunFill, BsMoonStarsFill, BsCloudSunFill } from 'react-icons/bs'


function Home() {
  const dispatch = useDispatch()
  const { runningMealMonth, summary } = useSelector(state => state.manager)
  const { user } = useSelector(state => state.auth)
  const { users } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getRunningMealMonth())
  }, [dispatch])

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Good Morning', icon: <BsSunFill /> }
    if (hour < 17) return { text: 'Good Afternoon', icon: <BsCloudSunFill /> }
    return { text: 'Good Evening', icon: <BsMoonStarsFill /> }
  }

  const greeting = getGreeting()
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  return (
    <div className='home'>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-shape shape-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="greeting">
              <span className="greeting-icon">{greeting.icon}</span>
              <h1>{greeting.text}, {user?.user?.name?.split(' ')[0] || 'Guest'}!</h1>
              <p className="date">{today}</p>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon members">
                  <FaUsers />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{users?.length || 0}</span>
                  <span className="stat-label">Members</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon meals">
                  <FaUtensils />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{summary?.totalMeals || 268}</span>
                  <span className="stat-label">Total Meals</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon rate">
                  <FaWallet />
                </div>
                <div className="stat-info">
                  <span className="stat-value">৳{summary?.mealRate || 42.32}</span>
                  <span className="stat-label">Meal Rate</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon deposit">
                  <FaChartLine />
                </div>
                <div className="stat-info">
                  <span className="stat-value">৳{summary?.totalDeposit || 8950}</span>
                  <span className="stat-label">Total Deposit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      {(user?.user?.manager || user?.user?.admin) && (
        <section className="quick-actions container">
          <Link to="/manager" className="action-btn primary">
            <FaPlus />
            <span>Add Meal</span>
          </Link>
          <Link to={`/meal_month/${summary?.mealMonth?._id}`} className="action-btn secondary">
            <FaClipboardList />
            <span>Full Details</span>
          </Link>
          <Link to="/manager" className="action-btn accent">
            <FaWallet />
            <span>Add Deposit</span>
          </Link>
        </section>
      )}

      {/* Notice Section */}
      <section className="section-wrapper container">
        <NoticeBoard />
      </section>

      {/* Meal Summary Section */}
      <section className="section-wrapper container">
        <div className="section-header">
          <div className="section-title">
            <FaCalendarAlt className="section-icon" />
            <h2>Meal Month Summary</h2>
          </div>
          <Link to={`/meal_month/${summary?.mealMonth?._id}`} className="view-all-btn">
            View Details →
          </Link>
        </div>
        <MealSummary id={runningMealMonth?._id} />
      </section>

      {/* Meal Chart Section */}
      <section className="section-wrapper container">
        <div className="section-header">
          <div className="section-title">
            <FaUtensils className="section-icon" />
            <h2>Meal Chart</h2>
          </div>
        </div>
        <MealChart id={runningMealMonth?._id} />
      </section>

      {/* Members Section */}
      <section className="section-wrapper container">
        <div className="section-header">
          <div className="section-title">
            <FaUsers className="section-icon" />
            <h2>Mess Members</h2>
          </div>
        </div>
        <MemberCard />
      </section>
    </div>
  )
}

export default Home
