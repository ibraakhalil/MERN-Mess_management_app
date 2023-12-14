import React, { useEffect } from 'react'
import './css/NoticeBoard.css'
import { getNotice } from '../store/action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


function NoticeBoard() {
  const dispatch = useDispatch()
  const { notices } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getNotice())
  }, [dispatch])

  return (
    <div className="container">
      <div className='notice_board'>
        <h1 className='home_all_headers'>Recent Notice</h1>
        <div className="notice">
          <p>{notices[0]?.notice}</p>
          <div className='notice_bottom'>
            <p>{moment(notices[0]?.createdAt).fromNow()}</p>
            <div>
              <strong>{notices[0]?.role}</strong>
              <p>{notices[0]?.name}</p>
            </div>

          </div>
        </div>
        <div className='previous_notice'>
          {/* <button className='btn2'>Previous Notice →</button> */}
        </div>
      </div>
    </div>
  )
}

export default NoticeBoard