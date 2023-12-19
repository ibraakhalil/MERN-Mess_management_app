require("dotenv").config()
require('./config/database')
const express = require('express')
const router = require("./router/router")
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const path = require("path")


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/public' , express.static(path.join(__dirname, 'public')))

console.log('This is from index.js');

app.use(router)


app.listen(PORT, () => {
    console.log('Server running at port ' + PORT)
})