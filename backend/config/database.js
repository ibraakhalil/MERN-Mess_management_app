require('dotenv').config()
const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || 8080

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL, () => {
    console.log('Database is connected')
}) 