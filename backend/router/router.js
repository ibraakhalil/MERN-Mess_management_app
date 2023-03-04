const router = require("express").Router()
const authRouter = require("./authRouter")
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRouter')
const { isLoggedIn, adminProtected } = require('../utils/userAuthorization');

router.use("/api/auth", authRouter)
router.use("/api/user", userRouter)
router.use("/api/admin", isLoggedIn, adminProtected, adminRouter)




router.get('/', (req, res, next) => {
    res.send('Homepage')
})

router.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).json({error: err.message})
})

module.exports = router