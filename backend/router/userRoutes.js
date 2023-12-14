const router = require('express').Router()
const { getAllUsers, getRunningMealMonth } = require('../controller/adminController')
const { getProfile, getNotice, postNotice } = require('../controller/userController')
const { isLoggedIn } = require('../utils/userAuthorization')



router.get('/profile/:userId', isLoggedIn, getProfile)
router.get('/getallusers', getAllUsers)

router.get('/get-running-meal-month', getRunningMealMonth)

router.get('/notice', getNotice)
router.post('/notice', postNotice)

module.exports = router