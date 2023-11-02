require("dotenv").config()
require('./config/database')
const express = require('express')
const router = require("./router/router")
const app = express()
const PORT = process.env.PORT
const cors = require('cors')



app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/public/upload', express.static('./public/upload'))

app.use(router)



app.listen(PORT, () => {
    console.log('Server running at port ' + PORT)
})