const router = require('express').Router()
const { loginUser } = require('../controller/authController')

router.post('/login', loginUser)

module.exports = router
