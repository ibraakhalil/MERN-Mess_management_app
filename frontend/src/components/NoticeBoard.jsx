import React, { useEffect, useState } from 'react'
import './css/NoticeBoard.css'
import { getNotice } from '../store/action/userAction'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { FaRegClipboard } from "react-icons/fa";

function NoticeBoard() {
  const dispatch = useDispatch()
  const { notices } = useSelector(state => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getNotice(setLoading))
  }, [dispatch])



  return (
    <div className='notice_board'>
      <h1 className='home_all_headers'><FaRegClipboard />Recent Notice</h1>
      {loading && <div className='loading'>
        <img src="/resource/flame.svg" alt="" />
      </div>}
      <div className="background" style={{'backgroundImage': 'url(/resource/mike.png)'}}></div>
      {!loading && <div className='notice'>
        {notices?.length < 1 && <p className='empty'>Notice Not Set Yet!</p>}
        {notices?.length > 0 && <>
          <p className="notice-body">{notices[notices.length - 1]?.notice}</p>
          <div className='notice_bottom'>
            <div>
              <strong>{notices[notices.length - 1]?.role}</strong>
              <p>{notices[notices.length - 1]?.name}</p>
            </div>
            <p>{moment(notices[notices.length - 1]?.createdAt).fromNow()}</p>
          </div>
        </>}

      </div>}
      <div className='previous_notice'>
        {/* <button className='btn2'>Previous Notice →</button> */}
      </div>
    </div>
  )
}

export default NoticeBoard