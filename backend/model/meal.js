const { Schema, model } = require('mongoose')


const mealSchema = new Schema({
    date: Date,
    totalLunch: Number,
    totalDinner: Number,
    mealMonth: {
        type: Schema.Types.ObjectId,
        ref: "SetMealMonth"
    },
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


module.exports = model.meal || model('Meal', mealSchema)