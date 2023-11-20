const { Schema, model } = require('mongoose')


const mealShema = new Schema({
    date: Date,
    mealMonth: {
        type: Schema.Types.ObjectId,
        ref: "SetMealMonth"
    },
    totalLunch: Number,
    totalDinner: Number,
    meals: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            name: String,
            lunch: Number,
            dinner: Number
        }
    ]

}, { timestamps: true })


module.exports = model('Meal', mealShema)