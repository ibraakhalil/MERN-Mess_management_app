import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/manager-setting.css'
import { closeRunningMealMonth } from '../../store/action/managerActions'
import { useDispatch, useSelector } from 'react-redux'

function ManagerSetting() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { runningMealMonth } = useSelector(state => state.manager)

    const handleClose = (e) => {
        dispatch(closeRunningMealMonth(runningMealMonth._id, navigate))
    }
    return (
        <div className='manager_setting'>
            <ul>
                <li className='close'>
                    <h3>Meal Month Close Option</h3>
                    <button onClick={handleClose}>Close</button>
                </li>
                <li>
                    <h3>Meal Calculation Rate</h3>
                    <div className='rate'>
                        <div>
                            <p>Lunch</p>
                            <input type="number" name='lunch' />
                        </div>
                        <div>
                            <p>Dinner</p>
                            <input type="number" name='dinner' />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ManagerSetting