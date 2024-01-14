const { body } = require('express-validator')



const registerValidator = [
    body('name')
        .isLength({ min: 3, max: 24 }).withMessage('Must be 3 to 24 charts'),
    body('phone')
        .isLength({ min: 11, max: 14 }).withMessage('Invalid Phone Number'),
    body('email')
        .isEmail().withMessage('Provide a valid email'),
    body('address')
        .isLength({ max: 100 }).withMessage('Less than 100 character')
]


module.exports = { registerValidator }




