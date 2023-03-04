const router = require('express').Router()
const upload = require('../middleware/upload')
const { registerUser, loginUser } = require('../controller/authController')
const { registerValidator } = require('../utils/authValidator')


router.post('/login', loginUser)



module.exports = router
