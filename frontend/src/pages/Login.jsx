import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/action/authAction'
import './css/Auth.css'
import { useFormik } from 'formik'

function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },
    onSubmit: (values) => {
      setLoading(true)
      dispatch(userLogin(values, navigate, setLoading))
    }
  })

  return (
    <div className='login auth'>
      <div className="form-header">
        <h2>Login</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input type="text" name="phone" onChange={formik.handleChange} required />
          {error.phone && <div className="error-feedback">
            <p>{error.phone}</p>
          </div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input type="password" name="password" onChange={formik.handleChange} required/>
          {error.password && <div className="error-feedback">
            <p>{error.password}</p>
          </div>}
        </div>
        <button className='btn2' type="submit">{loading ? 'Login...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login