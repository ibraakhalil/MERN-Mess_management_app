const router = require('express').Router()
const { postExpense, getExpense, deleteExpense, getMeal, postMeal, deleteMeal, addDeposite, closeRunningMealMonth, getMealMonthSummary } = require('../controller/managerController')

router.get('/expenses', getExpense)
router.post('/expenses', postExpense)
router.delete('/expenses/:id', deleteExpense)

router.get('/meal', getMeal)
router.post('/meal', postMeal)
router.delete('/meal/:id', deleteMeal)

router.post('/deposite', addDeposite)

router.get('/meal-month-summary', getMealMonthSummary)

router.get('/close-meal/:id', closeRunningMealMonth)


module.exports = router