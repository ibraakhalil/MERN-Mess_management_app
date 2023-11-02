import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/action/authAction'
import './css/Auth.css'
import { useNavigate } from 'react-router-dom'




function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector(state => state.auth)

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },
    onSubmit: (values) => {

      console.log("Login Cliked")
      
      dispatch(userLogin(values, navigate))

    }
  })

  return (
    <div className='login'>
      <div className="form-header">
        <h2>Login</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input type="text" name="phone" onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.phone}</p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input type="text" name="password" onChange={formik.handleChange} />
          <div className="error-feedback">
            <p>{error.password}</p>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login