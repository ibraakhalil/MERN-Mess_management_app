const router = require('express').Router()
const { postSetMealMonth } = require('../controller/adminController');
const { registerUser } = require("../controller/authController");
const { registerValidator } = require("../utils/authValidator");


router.post('/register', registerValidator, registerUser)
router.post('/set-meal-month', postSetMealMonth)


module.exports = router
