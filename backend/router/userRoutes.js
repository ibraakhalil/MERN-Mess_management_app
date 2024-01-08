const router = require('express').Router()
const { getAllUsers, getRunningMealMonth } = require('../controller/adminController')
const { getProfile, getNotice, postNotice, updateProfile, setTemporaryMeal, getTemporaryMeal, removeMyTempMeal, deleteTempMeal } = require('../controller/userController')
const { isLoggedIn } = require('../utils/userAuthorization')
const upload = require('../middleware/upload')
const { getMealMonthSummary } = require('../controller/managerController')



router.get('/profile/:userId', getProfile)
router.post('/profile/edit/:userId', isLoggedIn, updateProfile)
router.get('/getallusers', getAllUsers)

router.get('/get-running-meal-month', getRunningMealMonth)
router.get('/meal-month-summary', getMealMonthSummary)

router.get('/notice', getNotice)
router.post('/notice', isLoggedIn, postNotice)

router.get('/temp_meal', getTemporaryMeal)
router.post('/temp_meal', setTemporaryMeal)
router.put('/temp_meal/:mealId/:userId', removeMyTempMeal)
router.delete('/temp_meal/:id', deleteTempMeal)

module.exports = router