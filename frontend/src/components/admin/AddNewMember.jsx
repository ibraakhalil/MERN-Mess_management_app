import React, { useState } from 'react'
import './css/addNewMember.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addMember } from '../../store/action/authAction'

function AddNewMember() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const init = {
    name: '',
    phone: '',
    email: '',
    address: '',
    profession: ''
  }

  const formik = useFormik({
    initialValues: init,
    onSubmit: (values) => {
      dispatch(addMember(values, navigate, setLoading))
      navigate('/')
    }
  })

  return (
    <div className="new_member">
      <div className="form-header">
        <h2>New Member Form</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='wrapper'>
          <div className="form-group">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              required />
            {error.name && <div className="error-feedback">
              <p>{error.name}</p>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone"> Phone: </label>
            <input
              type="text"
              name="phone"
              onChange={formik.handleChange}
              required />
            {error.phone && <div className="error-feedback">
              <p>{error.phone}</p>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange} />
            {error.email && <div className="error-feedback">
              <p>{error.email}</p>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="profession"> Profession: </label>
            <input
              type="text"
              name="profession"
              onChange={formik.handleChange} />
            {error.profession && <div className="error-feedback">
              <p>{error.profession}</p>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="address"> Address: </label>
            <input
              type="text"
              name="address"
              onChange={formik.handleChange} />
            {error.address && <div className="error-feedback">
              <p>{error.address}</p>
            </div>}
          </div>
        </div>

        <button className='btn2' type="submit">Add Member</button>
      </form>
    </div>
  )
}

export default AddNewMember;