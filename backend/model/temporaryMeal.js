const { Schema, model } = require('mongoose')


const tempMealSchema = new Schema({
    date: Date,
    meals: [
        {
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: String,
            lunch: {
                type: Number,
                required: true,
                default: 0
            },
            dinner: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]

}, { timestamps: true })


module.exports = model.temporaryMeal || model('TemporaryMeal', tempMealSchema)



