const Expense = require('../model/expense')
const Meal = require('../model/meal')
const SetMealMonth = require('../model/setMealMonth')


const getExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.find()
        res.status(200).json(expenses)

    } catch (e) {
        next(e)
    }
}
const postExpense = async (req, res, next) => {
    const { mealMonth, name, type, amount } = req.body
    const newExpense = new Expense({ mealMonth, name, type, amount })

    try {
        const savedExpense = await newExpense.save()
        await SetMealMonth.findOneAndUpdate(
            { _id: mealMonth },
            { $push: { "expenses": savedExpense._id } }
        )
        res.status(201).json(savedExpense)

    } catch (e) {
        next(e)
    }
}
const deleteExpense = async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id })
        await SetMealMonth.findOneAndUpdate(
            { _id: deletedExpense.mealMonth },
            { $pull: { "expenses": deletedExpense._id } }
        )
        res.status(204).json({ message: "success" })

    } catch (e) {
        next(e)

    }
}


const getMeal = async (req, res, next) => {
    try {
        const meal = await Meal.find()

        res.status(201).json(meal)
    } catch (err) {
        next(err)
    }
}
const postMeal = async (req, res, next) => {
    const { mealMonth, totalLunch, totalDinner, meals, date } = req.body
    const newMeal = new Meal({mealMonth, totalDinner, totalLunch, meals, date })

    try {
        const meal = await Meal.findOne({ date: new Date(date) })
        if (meal) {
            return res.status(401).json({ message: 'This date of meal already taken!' })
        }

        const saveMeal = await newMeal.save()
        await SetMealMonth.findOneAndUpdate(
            { _id: mealMonth },
            { $push: { "mealLists": saveMeal._id } })

        res.status(201).json(saveMeal)

    } catch (e) {
        next(e)
    }
}
const deleteMeal = async (req, res, next) => {
    const meal_id = req.params.id
    console.log(meal_id)
    try {
        const deletedMeal = await Meal.findOneAndDelete({ _id: meal_id })
        await SetMealMonth.findOneAndUpdate(
            { _id: deletedMeal.mealMonth },
            { $pull: { "mealLists": deletedMeal._id } }
        )
        res.status(201).json({ message: "Delete Success" })
    } catch (e) {
        next(e)
    }
}

const addDeposite = async (req, res, next) => {
    const { meal_month_id, data } = req.body
    try {
        await SetMealMonth.findOneAndUpdate(
            { _id: meal_month_id },
            { $push: { "deposites": data } }
        )
        res.status(201).json({ message: 'Deposite Add Successfully' })

    } catch (e) {
        next(e)
    }
}

module.exports = { getExpense, postExpense, deleteExpense, getMeal, postMeal, deleteMeal, addDeposite }