import React from 'react'
import './css/Home.css'
import NoticeBoard from '../components/NoticeBoard'
import MemberCard from '../components/MemberCard'
import Activity from '../components/Activity'

function Home() {

  return (
    <>
      <div className='home'>
        <div className="container">
          <NoticeBoard />
        </div>
      </div>
      <Activity/>
      <MemberCard />
    </>
  )
}

export default Home