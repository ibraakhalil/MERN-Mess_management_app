const Expense = require('../model/expense')
const Meal = require('../model/meal')
const SetMealMonth = require('../model/setMealMonth')
const User = require('../model/user')

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
    const newMeal = new Meal({ mealMonth, totalDinner, totalLunch, meals, date })

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
const getMealMonthSummary = async (req, res, next) => {
    const users = await User.find()
    const mealMonth = await SetMealMonth.find({ isActive: true })
        .populate({
            path: 'mealLists',
            select: 'meals'
        })
        .populate({
            path: 'expenses',
            select: 'amount'
        })
    const mealLists = mealMonth[0].mealLists
    const deposites = mealMonth[0].deposites
    const allMeals = []
    mealLists.map(mealList => {
        mealList.meals.map(meal => {
            let member = {
                _id: meal._id,
                name: meal.name,
                dinner: meal.dinner * 0.75,
                lunch: meal.lunch * 1.25
            }
            allMeals.push(member)
        })
    })

    let summary = {
        individualDatas: [],
        totalCosts: mealMonth[0].expenses.reduce((a, b) => a + b.amount, 0),
        mealRate: () => this.totalCosts / this.totalMeals,
    }

    users.map(user => {
        const memberMeals = allMeals.filter(meal => user.name === meal.name)
        const memberDeposites = deposites.filter(deposite => user.name === deposite.name)
        const memberProccessData = {
            _id: user._id,
            name: user.name,
            totalMeal: memberMeals.reduce((a, b) => a + (b.lunch + b.dinner), 0),
            totalDiposite: memberDeposites.reduce((a, b) => a + b.amount, 0),
        }
        summary.individualDatas.push(memberProccessData)
    })

    summary.totalMeals = summary.individualDatas.reduce((a, b) => a + b.totalMeal, 0)
    summary.mealRate = (summary.totalCosts / summary.totalMeals).toFixed(2)

    res.status(200).json(summary)
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

const closeRunningMealMonth = async (req, res, next) => {
    const { id } = req.params
    try {
        const closedMonth = await SetMealMonth.findOneAndUpdate(
            { _id: id },
            {
                $set:
                {
                    'closeDate': new Date(),
                    'isActive': false
                },
            },
            { new: true }
        )
        res.status(201).json(closedMonth)

    } catch (e) {
        next(e)
    }
}

module.exports = { getExpense, postExpense, deleteExpense, getMeal, postMeal, deleteMeal, getMealMonthSummary, addDeposite, closeRunningMealMonth }