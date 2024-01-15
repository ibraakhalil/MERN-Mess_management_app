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
    links: {
        facebook: String,
        xdotcom: String,
        instragram: String,
        whatsapp: String,
        linkedin: String
    },
    role: {
        type: String,
        default: 'member'
    },
    manager: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = model.user || model('User', userSchema)