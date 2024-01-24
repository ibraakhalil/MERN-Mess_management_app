const router = require('express').Router()
const { postExpense, getExpense, deleteExpense, getMeal, postMeal, deleteMeal, addDeposite, closeRunningMealMonth, getMealMonthSummary, removeDeposite } = require('../controller/managerController')
const { isLoggedIn } = require('../utils/userAuthorization')

router.get('/expenses/:id', getExpense)
router.post('/expenses', isLoggedIn, postExpense)
router.delete('/expenses/:id', isLoggedIn, deleteExpense)

router.get('/meal/:mealMonthId', getMeal)
router.post('/meal', isLoggedIn, postMeal)
router.delete('/meal/:id', isLoggedIn, deleteMeal)

router.post('/deposite', isLoggedIn, addDeposite)
router.put('/deposite/remove/:id/:index', isLoggedIn, removeDeposite)

router.get('/close-meal/:id', isLoggedIn, closeRunningMealMonth)


module.exports = router