import React, { useEffect, useRef, useState } from 'react'
import './css/editProfile.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile, getProfile } from '../store/action/userAction'

function EditProfile() {
  const { userId } = useParams()
  const [loading, setLoading] = useState(false)
  const [selectedImg, setSelectedImg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, profile: { name, email, phone, address, profilePic } } = useSelector(state => state.user)
  const [profileImg, setProfileImg] = useState('')
  const nameRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      profilePic: null
    }

    if (selectedImg) {
      let reader = new FileReader()
      reader.readAsDataURL(selectedImg)
      reader.onload = () => {
        data.profilePic = reader.result
        dispatch(editProfile(data, userId, navigate, setLoading))
      }
      reader.onerror = (err) => console.log(err);
    } else {
      dispatch(editProfile(data, userId, navigate, setLoading))
    }
  }

  useEffect(() => {
    dispatch(getProfile(userId))
    profilePic && setProfileImg(profilePic)
  }, [dispatch, profilePic])


  return (
    <div className="container">
      <div className="auth edit_profile">
        <div className="form-header">
          <h2>Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <img className='profile-pic' src={profileImg} alt="" />
            <label htmlFor="profilePic" className='profilePicLabel'></label>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              onChange={(e) => {
                setSelectedImg(e.currentTarget.files[0])
                setProfileImg(URL.createObjectURL(e.currentTarget.files[0]))
              }} hidden />
          </div>

          <div className='form_wrapper'>
            <div className="form-group">
              <label htmlFor="name"> Name</label>
              <input
                name="name"
                defaultValue={name}
                ref={nameRef}
                required />
              {error.phone && <div className="error-feedback">
                <p>{error.name}</p>
              </div>}
            </div>
            <div className="form-group">
              <label htmlFor="phone"> Phone </label>
              <input defaultValue={phone} disabled />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              ref={emailRef} />
            {error.email && <div className="error-feedback">
              <p>{error.email}</p>
            </div>}
          </div>

          <div className="form-group">
            <label htmlFor="address"> Address </label>
            <input
              name="address"
              defaultValue={address}
              ref={addressRef} />
            {error.address && <div className="error-feedback">
              <p>{error.address}</p>
            </div>}
          </div>

          <button type="submit">
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile