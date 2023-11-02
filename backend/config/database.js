require('dotenv').config()
const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

mongoose.set('strictQuery', true);

mongoose.connect(DB_URL, () => {
    console.log('Database is connected') 
}) 