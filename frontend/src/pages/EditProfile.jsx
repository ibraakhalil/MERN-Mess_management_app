import React, { useState } from 'react'
import './css/Auth.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

function EditProfile() {
  const [imgBlob, setImgBlob] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, user } = useSelector(state => state.auth)
  const { user: { name, email, address, phone } } = user


  const init = {
    name: '',
    phone: '',
    email: '',
    address: ''
  }

  const formik = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      console.log(values)
      // dispatch(profileUpdate(values, navigate))
    }
  })

  return (
    <div className="register">
      <div className="form-header">
        <h2>Edit Profile</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>

        <div className="form-group">
          <img className='profile-pic' src={imgBlob} alt="" />
          <label htmlFor="profilePic" className='profilePicLabel'></label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            onChange={(e) => {
              const blob = URL.createObjectURL(e.currentTarget.files[0])
              setImgBlob(blob)
              formik.setFieldValue('profilePic', e.currentTarget.files[0])
            }} hidden />
        </div>

        <div className="form-group">
          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            name="name"
            value={name}
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
            value={phone}
            onChange={formik.handleChange}
            required 
            disabled/>
          <div className="error-feedback">
            <p>{error.phone}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.email}</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address"> Address: </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.address}</p>
          </div>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default EditProfile