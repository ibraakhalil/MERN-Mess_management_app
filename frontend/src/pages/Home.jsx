import React from 'react'
import './css/Home.css'
import NoticeBoard from '../components/NoticeBoard'
import MemberCard from '../components/MemberCard'
import { MealSummary } from '../components/home/MealSummary'
import MealChart from '../components/manager/MealChart'


function Home() {
  return (
    <>
      <div className='home'>
        <NoticeBoard />
      </div>
      <MealSummary />
      <div className='container'><MealChart /></div>
      <MemberCard />
    </>
  )
}

export default Home