import React, { useState } from 'react'
import './css/profile.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfile, getTemporaryMeal } from '../store/action/userAction'
import TopSection from '../components/profile/TopSection'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import UserInfo from '../components/profile/UserInfo'
import Overview from '../components/profile/Overview'
import MealInfo from '../components/profile/MealInfo'
import { getMeal, getRunningMealMonth } from '../store/action/managerActions'

function Profile() {
  const { userId } = useParams()
  const { user: { profile }, manager: { runningMealMonth } } = useSelector(state => state)
  const [index, setIndex] = useState(0)
  const components = [<UserInfo profile={profile} />, <Overview />, <MealInfo />]
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile(userId, setLoading))
    dispatch(getTemporaryMeal())
    dispatch(getRunningMealMonth(setLoading))
  }, [dispatch, userId])

  useEffect(() => {
    runningMealMonth && dispatch(getMeal(runningMealMonth._id, setLoading))
  }, [runningMealMonth])




  return (
    <div className='container'>
      <div className="profile">
        <TopSection profile={profile} />
        <div className="profile_wrapper">
          <ProfileSidebar setIndex={setIndex} />
          <div className='component'>
            {loading && <div className='loading'>
              <img src="/resource/dna.svg" alt="" />
            </div>}
            {!loading && components[index]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile