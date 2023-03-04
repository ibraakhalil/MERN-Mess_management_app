require("dotenv").config()
require('./config/database')
const express = require('express')
const router = require("./router/router")
const app = express()
const PORT = process.env.PORT



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)



app.listen(PORT, () => {
    console.log('Server running at port ' + PORT)
})