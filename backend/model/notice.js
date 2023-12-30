const { Schema, model } = require('mongoose')

const noticeShema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    notice: {
        type: String,
        required: true
    }

}, { timestamps: true })


module.exports = model.notice || model("Notice", noticeShema)