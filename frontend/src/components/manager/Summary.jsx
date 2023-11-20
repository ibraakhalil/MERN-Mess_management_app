import React from 'react'
import './css/summary.css'
import Activity from '../Activity'


function Summary() {
    return (
        <div className='summary'>
            <div className="row1">
                <div className="item">
                    <h3>Meal Rate</h3>
                    <h2>35.67 tk</h2>
                </div>
                <div className="item">
                    <h3>Total Meal</h3>
                    <h2>215.5</h2>
                </div>
                <div className="item">
                    <h3>Total Cost</h3>
                    <h2>7520 tk</h2>
                </div>
            </div>
            <div className="row2">
                <div className="item">
                    <div className='members_headers'>
                        <h3>Meal Members</h3>
                        <button className='btn1'>Add One</button>
                        </div>
                    <ul>
                        <li>Name</li>
                        <li>Deposite</li>
                        <li>Meal</li>
                    </ul>
                    <Activity />
                </div>

                <div className="item">
                    <h3>Meal Member</h3>
                    <h2>7</h2>
                </div>
            </div>

        </div>
    )
}

export default Summary