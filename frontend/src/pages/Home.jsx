import React from 'react'
import './css/Home.css'
import NoticeBoard from '../components/NoticeBoard'
import MemberCard from '../components/MemberCard'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'


function Home() {
  return (
    <div className='home container'>
      <NoticeBoard />

      <h1 className='home_all_headers'>Meal Month Summary</h1>
      <MealSummary />

      <h1 className='home_all_headers'>Meal Chart</h1>
      <MealChart />

      <h1 className='home_all_headers'>Member Information</h1>
      <MemberCard />
    </div>
  )
}

export default Home