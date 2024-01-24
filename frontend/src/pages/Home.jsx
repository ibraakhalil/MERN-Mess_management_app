import React, { useEffect, useState } from 'react'
import './css/Home.css'
import NoticeBoard from '../components/NoticeBoard'
import MemberCard from '../components/MemberCard'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'
import { useDispatch, useSelector } from 'react-redux'
import { getRunningMealMonth } from '../store/action/managerActions'


function Home() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { runningMealMonth } = useSelector(state => state.manager)

  useEffect(() => {
    dispatch(getRunningMealMonth(setLoading))
  }, [dispatch])

  return (
    <div className='home container'>
      <NoticeBoard />

      <h1 className='home_all_headers'>Meal Month Summary</h1>
      <MealSummary id={runningMealMonth?._id} />

      <h1 className='home_all_headers'>Meal Chart</h1>
      <MealChart id={runningMealMonth?._id}/>

      <h1 className='home_all_headers'>Member Information</h1>
      <MemberCard />
    </div>
  )
}

export default Home