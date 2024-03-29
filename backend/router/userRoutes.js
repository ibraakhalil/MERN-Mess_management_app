const router = require('express').Router()
const { getAllUsers, getRunningMealMonth } = require('../controller/adminController')
const { getProfile, getNotice, postNotice, updateProfile, setTemporaryMeal, getTemporaryMeal, removeMyTempMeal, deleteTempMeal, getMealMonth, getAllMealMonth, deleteNotice } = require('../controller/userController')
const { isLoggedIn } = require('../utils/userAuthorization')
const upload = require('../middleware/upload')
const { getMealMonthSummary } = require('../controller/managerController')



router.get('/profile/:userId', getProfile)
router.post('/profile/edit/:userId', isLoggedIn, updateProfile)
router.get('/getallusers', getAllUsers)

router.get('/get-running-meal-month', getRunningMealMonth)
router.get('/meal-month-summary/:id', getMealMonthSummary)
router.get('/meal_month', getAllMealMonth)
router.get('/meal_month/:id', getMealMonth)

router.get('/notice', getNotice)
router.post('/notice', isLoggedIn, postNotice)
router.delete('/notice/:id', isLoggedIn, deleteNotice)

router.get('/temp_meal', getTemporaryMeal)
router.post('/temp_meal', setTemporaryMeal)
router.put('/temp_meal/:mealId/:userId', removeMyTempMeal)
router.delete('/temp_meal/:id', deleteTempMeal)

module.exports = router