import React, { useEffect } from 'react'
import './css/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../store/action/userAction'
import NoticeBoard from '../components/NoticeBoard'
const img1 = "https://saifulbinakalam.files.wordpress.com/2017/10/saiful-bin-a-kalam-passport-size-photo.jpg"

function Home() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  

  return (
    <>
      <div className='home'>
        <div className="container">
          <h1>Mess Project</h1>
        </div>
      </div>
      <NoticeBoard/>
      <div className='mess-members'>
        <h3>Total Mess Members</h3>
        <div className="wrapper">
          {users.map((member, i) =>
            <div key={i} className="item">
              <img src={img1} alt="" />
              <div className="info">
                <h4>{member.name}</h4>
                <h4>{member.phone}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home