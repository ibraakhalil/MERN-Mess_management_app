import { useDispatch, useSelector } from 'react-redux'
import './css/addNotice.css'
import { useRef } from 'react'
import { getNotice, postNotice } from '../../store/action/userAction'

export function AddNotice() {
    const dispatch = useDispatch()
    const { auth: { user }, user: { notices } } = useSelector(state => state)
    const noticeRef = useRef()

    const handlePublish = (e) => {
        const data = {
            authorId: user.user._id,
            name: user.user.name,
            role: user.user.admin ? 'Admin' : 'Manager',
            notice: noticeRef.current.value
        }
        dispatch(postNotice(data))
    }


    return (
        <div className="notice_form">
            <label htmlFor="notice">Write Your Notice</label>
            <textarea name="notice" id="notice" ref={noticeRef} cols="30" rows="10"></textarea>
            <button className="btn1" onClick={handlePublish} >Publish</button>
        </div>
    )
}