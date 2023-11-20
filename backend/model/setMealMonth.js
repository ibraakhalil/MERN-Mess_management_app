const { Schema, model } = require('mongoose')


const setMealMonthSchmema = new Schema({
    manager: {
        name: String,
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    month: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    closeDate: Date,
    isActive: {
        type: Boolean,
        default: false
    },
    mealLists: [{
        type: Schema.Types.ObjectId,
        ref: "Meal"
    }],
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: "Expense"
    }],
    deposites: [{
        name: String,
        amount: Number,
        _id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            default: new Date()
        }
    }]

}, { timestamps: true })


module.exports = model('SetMealMonth', setMealMonthSchmema)