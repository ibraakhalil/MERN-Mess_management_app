import React from 'react'
import './css/Auth.css'
import {useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addMember } from '../store/action/authAction'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const init = {
    name: '',
    phone: '',
    email: '',
    address: ''
  }

  const formik = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      dispatch(addMember(values, navigate))
    }
  })

  return (
    <div className="register">
      <div className="form-header">
        <h2>New Member Form</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <label htmlFor="profilePic">Profile Pic: </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={(e) => { formik.setFieldValue('profilePic', e.currentTarget.files[0]) }} />
        </div>

        <div className="form-group">
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange} 
            required />
          <div className="error-feedback">
            <p>{error.name}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone"> Phone: </label>
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange} 
            required />
          <div className="error-feedback">
            <p>{error.phone}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.email}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="profession"> Profession: </label>
          <input
            type="text"
            name="profession"
            onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.profession}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address"> Address: </label>
          <input
            type="text"
            name="address"
            onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.address}</p>
          </div>
        </div>

        <button type="submit">Add Member</button>
      </form>
    </div>
  )
}

export default Register