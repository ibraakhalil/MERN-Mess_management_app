const router = require('express').Router()
const { getRunningMealMonth } = require('../controller/adminController')
const { postExpense, getExpense, deleteExpense, getMeal, postMeal, deleteMeal, addDeposite } = require('../controller/managerController')

router.get('/expenses', getExpense)
router.post('/expenses', postExpense)
router.delete('/expenses/:id', deleteExpense)

router.get('/meal', getMeal)
router.post('/meal', postMeal)
router.delete('/meal/:id', deleteMeal)
router.get('/get-running-meal-month', getRunningMealMonth)

router.post('/deposite', addDeposite)


module.exports = router