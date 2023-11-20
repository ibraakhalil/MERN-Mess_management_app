const User = require('../model/user')
const SetMealMonth = require('../model/setMealMonth')

const getAllUsers = async (req, res, next) => {

    const users = await User.find()

    res.status(200).json(users)
}


const getRunningMealMonth = async (req, res, next) => {
    try {

        const runningManager = await SetMealMonth.find({ isActive: true })
        if (runningManager) {
            if (runningManager.length > 1) {
                return res.json({ message: "Something need to fix" })
            }
            return res.status(200).json(runningManager[0])
        }

        res.status(200).json(null)
        
    } catch (e) {
        next(e)
    }
}

const postSetMealMonth = async (req, res, next) => {
    const { startDate, month, manager } = req.body
    const newMonth = new SetMealMonth({
        manager, startDate, month,
        isActive: true
    })

    try {
        await newMonth.save()
        res.status(201).json({ success: true })

    } catch (e) {
        next(e)
    }
}

module.exports = { getAllUsers, getRunningMealMonth, postSetMealMonth }