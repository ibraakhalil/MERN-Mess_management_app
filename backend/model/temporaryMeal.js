const { Schema, model } = require('mongoose')


const tempMealSchema = new Schema({
    date: Date,
    meals: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
            lunch: Number,
            dinner: Number
        }
    ]

}, { timestamps: true })


module.exports = model.temporaryMeal || model('TemporaryMeal', tempMealSchema)



