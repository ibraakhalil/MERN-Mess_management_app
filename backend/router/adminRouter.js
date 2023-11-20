const router = require('express').Router()
const { postSetMealMonth } = require('../controller/adminController');
const { registerUser } = require("../controller/authController");
const upload = require("../middleware/upload");
const { registerValidator } = require("../utils/authValidator");



router.post('/register', upload.single('profilePic'), registerValidator, registerUser)

router.post('/set-meal-month', postSetMealMonth)



module.exports = router
