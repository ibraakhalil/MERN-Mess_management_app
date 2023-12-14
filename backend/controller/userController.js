const Notice = require("../model/notice")
const User = require("../model/user")


const getProfile = async (req, res, next) => {
    const userId = req.params.userId
    try {
        const user = await User.findOne({ _id: userId })

        console.log(user)
        res.status(200).json(user)

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
    const {authorId, notice, name, role } = req.body
    const newNotice = new Notice({ authorId, name, role, notice })
    try {
        await newNotice.save()
        res.status(201).json({ message: 'Notice Published Successfully' })
    } catch (e) {
        next(e)
    }
}



module.exports = { getProfile, getNotice, postNotice }