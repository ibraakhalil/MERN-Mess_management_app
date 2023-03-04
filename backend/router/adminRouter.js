const router = require('express').Router()
const { registerUser } = require("../controller/authController");
const upload = require("../middleware/upload");
const { registerValidator } = require("../utils/authValidator");




router.post('/register', upload.single('profilePic'), registerValidator, registerUser)



module.exports = router
