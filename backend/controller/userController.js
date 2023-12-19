const { Types } = require("mongoose")
const Notice = require("../model/notice")
const User = require("../model/user")
const fs = require('fs')

const getProfile = async (req, res, next) => {
    const userId = req.params.userId
    
    try {
        const profile = await User.findOne({ _id: userId })
        console.log(profile);
        res.status(200).json(profile)
    } catch (e) {
        next(e)
    }
}
const updateProfile = async (req, res, next) => {
    const { name, email, address } = req.body
    const { userId } = req.params
    try {
        const user = await User.findOne({ _id: userId })
        const filePath = `public/upload/${user.profilePic}`
        if (req.file && fs.existsSync(filePath) && user.profilePic !== 'default_profile_pic.jpg') {
            fs.unlink(filePath, e => console.log(e))
        }

        const updatedProfile = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    name, email, address,
                    profilePic: req.file ? req.file.filename : user.profilePic
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



module.exports = { getProfile, updateProfile, getNotice, postNotice }