const Notice = require("../model/notice")
const User = require("../model/user")
const SetMealMonth = require('../model/setMealMonth')
const TemporaryMeal = require('../model/temporaryMeal')
const cloudinary = require("../utils/cloudinary")


const getProfile = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const profile = await User.findOne({ _id: userId })
        res.status(200).json(profile)
    } catch (e) {
        next(e)
    }
}
const updateProfile = async (req, res, next) => {
    const { name, email, address, profession, profilePic } = req.body

    console.log(req.body);

    const { userId } = req.params
    const opts = {
        overwrite: true,
        invalidate: true,
        resource_type: 'image'
    }
    try {
        const user = await User.findOne({ _id: userId })
        const uploadResult = profilePic && await cloudinary.uploader.upload(profilePic, opts)
        const updatedProfile = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    name, email, address, profession,
                    profilePic: profilePic ? uploadResult.secure_url : user.profilePic
                }
            },
            { new: true }
        )
        return res.status(202).json(updatedProfile)

    } catch (e) {
        next(e)
    }
}


const getNotice = async (req, res, next) => {
    try {
        const notices = await Notice.find()
        res.status(200).json(notices)
    } catch (e) {
        next(e)
    }
}
const postNotice = async (req, res, next) => {
    const { authorId, notice, name, role } = req.body
    const newNotice = new Notice({ authorId, name, role, notice })
    try {
        await newNotice.save()
        res.status(201).json({ message: 'Notice Published Successfully' })
    } catch (e) {
        next(e)
    }
}

const getMealMonth = async (req, res, next) => {
    const id = req.params.id
    try {
        const mealMonth = await SetMealMonth.findById(id)

        res.status(201).json(mealMonth)

    } catch (e) {
        next(e)
    }
}


const getTemporaryMeal = async (req, res, next) => {
    try {
        const date = new Date(new Date().toISOString().slice(0, 10))
        const tempMeal = await TemporaryMeal.findOne({ date })
        return res.status(201).json(tempMeal)
    } catch (e) {
        next(e)
    }
}
const setTemporaryMeal = async (req, res, next) => {
    const { _id, name, date, lunch, dinner } = req.body
    const newTempMeal = new TemporaryMeal({
        date,
        meals: [{ _id, name, lunch, dinner }]
    })

    try {
        const tempMeal = await TemporaryMeal.findOne({ date })

        if (tempMeal) {
            const existMeal = tempMeal.meals.filter(item => item._id.toHexString() === _id)
            if (existMeal.length > 0) {
                return res.status(401).json({ error: 'Your Todays Meal Already Exist!' })
            }

            const upadatedTempMeal = await TemporaryMeal.findOneAndUpdate(
                { _id: tempMeal._id },
                { $push: { 'meals': { _id, name, lunch, dinner } } },
                { new: true }
            )
            return res.status(201).json(upadatedTempMeal)
        }

        const savedTempMeal = await newTempMeal.save()
        return res.status(201).json(savedTempMeal)

    } catch (e) { next(e) }
}
const removeMyTempMeal = async (req, res, next) => {
    const { mealId, userId } = req.params
    try {
        const tempMeal = await TemporaryMeal.findOne({ _id: mealId })
        const filteredMeal = tempMeal?.meals.filter(item => item._id.toHexString() === userId)[0]
        await TemporaryMeal.findOneAndUpdate(
            { _id: mealId },
            { $pull: { 'meals': filteredMeal } }
        )
        return res.status(201).json({ msg: 'Your temporary meal had removed' })
    } catch (e) {
        next(e)
    }
}
const deleteTempMeal = async (req, res, next) => {
    const { id } = req.params
    try {
        await TemporaryMeal.deleteOne({ _id: id })
        return res.status(201).json({ msg: 'Temporary meal had Deleted' })
    } catch (e) {
        next(e)
    }
}

module.exports = { getProfile, updateProfile, getNotice, postNotice, getMealMonth, getTemporaryMeal, setTemporaryMeal, removeMyTempMeal, deleteTempMeal }