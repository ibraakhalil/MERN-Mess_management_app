require('dotenv').config()
const jwt = require('jsonwebtoken')


const isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (decode) {
        req.user = decode.user
        return next()
    }

    req.status(400).json({ error: "You'r not authenticate user!" })
}


const adminProtected = (req, res, next) => {
    const { phone } = req.user
    if(phone === '01747015688') {
        return next()
    }

    req.status(400).json({ error: "You'r not Admin!" })
}


module.exports = { isLoggedIn, adminProtected }