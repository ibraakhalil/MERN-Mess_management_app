const { Schema, model } = require('mongoose')


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    profession: String,
    address: String,
    profilePic: String,
    isManager: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = model('User', userSchema)