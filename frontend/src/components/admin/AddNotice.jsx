import { useDispatch, useSelector } from 'react-redux'
import './css/addNotice.css'
import { useEffect, useRef, useState } from 'react'
import { getNotice, postNotice } from '../../store/action/userAction'
import moment from 'moment'
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from 'axios'
import { API_URL } from '../../store/constants/types'

export function AddNotice({ role }) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { notices } = useSelector(state => state.user)
    const noticeRef = useRef()
    const myNotices = notices?.filter(notice => notice.role.toLowerCase() === role)
    const textarea = document.querySelector('.notice_form textarea')

    useEffect(() => {
        dispatch(getNotice(setLoading))
    }, [dispatch])


    const handlePublish = (e) => {
        const notice = noticeRef.current.value
        if (notice.length < 20) return console.log('notice must be 20 character');
        const data = {
            authorId: user.user._id,
            name: user.user.name,
            role: user.user.admin ? 'Admin' : 'Manager',
            notice
        }
        dispatch(postNotice(data))
        textarea.value = ''
    }

    const deleteNotice = (id) => {
        axios.delete(`${API_URL}/api/user/notice/${id}`)
            .then(res => {
                dispatch(getNotice(setLoading))
            })
            .catch(e => console.log(e.message))
    }

    const editNotice = (id, notice) => {
        textarea.value = notice
        deleteNotice(id)
    }



    return (
        <div className='notice_entry'>
            <div className="notice_form">
                <label htmlFor="notice">Write Your Notice</label>
                <textarea name="notice" ref={noticeRef} cols="20" rows="5"></textarea>
                <button className="btn1" onClick={handlePublish} >Publish</button>
            </div>
            <div className="latest_notice">
                {myNotices?.reverse().map((notice, i) => <div key={i} className='item'>
                    <div className='notice_author'>
                        <h4>{notice.name}</h4>
                        <div>
                            <p>{moment(notice.createdAt).format('ll')}</p>
                            <div onClick={(e) => e.currentTarget.classList.toggle('active')} className='action'>
                                <span>
                                    <BsThreeDotsVertical />
                                </span>
                                <ul>
                                    <li onClick={() => editNotice(notice._id, notice.notice)}>Edit</li>
                                    <li onClick={() => deleteNotice(notice._id)}>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <p>
                        {(notice.notice).slice(0, 200) + '....'}
                    </p>
                </div>)}
            </div>
        </div>
    )
}
