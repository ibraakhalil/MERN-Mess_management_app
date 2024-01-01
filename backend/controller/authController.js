require('dotenv').config()
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const JWTSECRET = process.env.JWT_SECRET
const { validationResult } = require('express-validator')


const registerUser = async (req, res, next) => {
    const { name, phone, email, address } = req.body
    const errors = validationResult(req).formatWith(e => e.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.mapped() })
    }
    const newMember = new User({
        name, phone, email, address,
        password: '123456',
        profilePic: '/resource/default_profilepic.png'
    })

    try {
        const user = await User.findOne({ phone })
        if (user) {
            return res.status(400).json({ error: { phone: 'Member Already Exist' } })
        }

        await newMember.save()
        res.status(200).json({
            message: 'New member added successfully'
        })

    } catch (e) {
        next(e)
    }
}

const loginUser = async (req, res, next) => {
    const { phone, password } = req.body
    const error = {}

    try {
        const user = await User.findOne({ phone })

        if (!user) {
            error.phone = 'Member not found'
            return res.status(400).json({ error })
        }
        if (password !== user.password) {
            error.password = 'Password not match'
            return res.status(400).json({ error })
        }

        const token = jwt.sign({
            user: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                address: user.address,
                profilePic: user.profilePic,
                admin: user.admin,
                manager: user.manager,
                role: user.role
            }

        }, JWTSECRET, { expiresIn: '2 days' })

        res.status(200).json({ token })

    } catch (e) {
        next(e)
    }
}


module.exports = { registerUser, loginUser } 