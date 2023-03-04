const router = require('express').Router()
const { getAllUsers } = require('../controller/adminController')
const { getProfile } = require('../controller/userController')
const { isLoggedIn } = require('../utils/userAuthorization')



router.get('/profile/:userId', isLoggedIn, getProfile)
router.get('/getallusers', getAllUsers)

module.exports = router