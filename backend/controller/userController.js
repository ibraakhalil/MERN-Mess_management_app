const { Types } = require("mongoose")
const Notice = require("../model/notice")
const User = require("../model/user")
const cloudinary = require("../utils/cloudinary")
const path = require('path')


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
    const { name, email, address, profilePic } = req.body
    const { userId } = req.params
    const opts = {
        overwrite: true,
        invalidate: true,
        resource_type: 'image'
    }
    try {
        const defaultPicPath = ""
        const uploadResult = profilePic && await cloudinary.uploader.upload(profilePic, opts)
        const updatedProfile = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    name, email, address,
                    profilePic: profilePic ? uploadResult.secure_url : defaultPicPath
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