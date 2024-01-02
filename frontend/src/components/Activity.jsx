import React, { useEffect, useState } from 'react'
import './css/Activity.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../store/action/userAction'

function Activity() {
    const memberpic = "https://i.postimg.cc/9X8gm5WX/handsome-young-man-with-new-stylish-haircut.jpg"

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAllUsers(setLoading))
    }, [dispatch])


    return (
        <div className='activity'>
            <div className="wrapper">
                {users.map((user, i) =>
                    <ul className="item" key={i}>
                        <li className='img'>
                            <img src={memberpic} alt="" />
                        </li>
                        <li className='name'>
                            <p>{user.name}</p>
                            <span>Student</span>
                        </li>
                        <li>
                            <p>1020tk</p>
                        </li>
                        <li>
                            <p>37.5</p>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Activity