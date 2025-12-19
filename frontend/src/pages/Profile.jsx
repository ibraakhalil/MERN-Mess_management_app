/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import './css/profile.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllMealMonth, getProfile, getTemporaryMeal } from '../store/action/userAction'
import TopSection from '../components/profile/TopSection'
import UserInfo from '../components/profile/UserInfo'
import Overview from '../components/profile/Overview'
import MealInfo from '../components/profile/MealInfo'
import { getMeal, getRunningMealMonth } from '../store/action/managerActions'

function Profile() {
  const { userId } = useParams()
  const { profile } = useSelector(state => state.user)
  const { runningMealMonth } = useSelector(state => state.manager)
  const [index, setIndex] = useState(0)
  const components = [<UserInfo profile={profile} />, <Overview />, <MealInfo id={userId} />]
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile(userId, setLoading))
    dispatch(getTemporaryMeal())
    dispatch(getRunningMealMonth(setLoading))
    dispatch(getAllMealMonth())
  }, [dispatch, userId])

  useEffect(() => {
    runningMealMonth && dispatch(getMeal(runningMealMonth._id, setLoading))
  }, [runningMealMonth])

  return (
    <div className='container'>
      <div className="profile">
        <TopSection profile={profile} id={userId} />

        <div className="profile_tabs">
          <ul>
            <li className={index === 0 ? 'active' : ''} onClick={() => setIndex(0)}>About</li>
            <li className={index === 1 ? 'active' : ''} onClick={() => setIndex(1)}>Overview</li>
            <li className={index === 2 ? 'active' : ''} onClick={() => setIndex(2)}>Meal Info</li>
          </ul>
        </div>

        <div className="profile_content">
          {loading && <div className='loading'>
            <img src="/resource/dna.svg" alt="" />
          </div>}
          {!loading && components[index]}
        </div>
      </div>
    </div>
  )
}

export default Profile
