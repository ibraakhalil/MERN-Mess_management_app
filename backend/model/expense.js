const { Schema, model } = require('mongoose')


const expenseScheama = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    mealMonth: {
        type: Schema.Types.ObjectId,
        ref: "SetMealMonth"
    },

}, { timestamps: true })

module.exports = model('Expense', expenseScheama)