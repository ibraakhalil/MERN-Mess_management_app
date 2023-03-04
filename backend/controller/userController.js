const User = require("../model/user")




const getProfile = async (req, res, next) => {
    const userId = req.params.userId

    try {
        const user = await User.findById(userId)
        res.status(200).json({ user })

    } catch (e) {
        next(e)
    }
}



module.exports = { getProfile }