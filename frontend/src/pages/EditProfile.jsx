import React, { useEffect, useRef, useState } from 'react'
import './css/editProfile.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProfile, getProfile } from '../store/action/userAction'
import { FaCamera } from "react-icons/fa";

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
    dispatch(getProfile(userId, setLoading))
    profilePic && setProfileImg(profilePic)
  }, [dispatch, profilePic, userId])


  return (
    <div className="container">
      <div className="auth edit_profile">
        <h1 className='form_header'>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="top_section">
            <div className='upload_pic'>
              <img className='profile-pic' src={profileImg} alt="" />
              <label htmlFor="profilePic" className='profilePicLabel'><FaCamera /></label>
              <input
                type="file"
                name="profilePic"
                id="profilePic"
                onChange={(e) => {
                  setSelectedImg(e.currentTarget.files[0])
                  setProfileImg(URL.createObjectURL(e.currentTarget.files[0]))
                }} hidden />
            </div>
            <div className="name">
              {/* <p className='role'>{role}</p> */}
              <input
                name="name"
                defaultValue={name}
                ref={nameRef}
                required />
              <p className='phone'>{phone}</p>
              <div className="warning">
                <p>&#9888; Maximum photo size is 50 KB</p>
              </div>
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