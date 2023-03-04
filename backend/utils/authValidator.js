const { body } = require('express-validator')



const registerValidator = [
    body('name')
        .isLength({ min: 3, max: 24 }).withMessage('Must be 3 to 24 charts'),
    body('phone')
        .isLength({ min: 11, max: 14 }).withMessage('Invalid Phone Number'),
    body('email')
        .isEmail().withMessage('Provide a valid email')
    // body('password')
    //     .isLength({ min: 6 }).withMessage('Password must be 6 charts'),
    // body('confirmPassword')
    //     .custom((confirmPassword, { req }) => {
    //         if (req.body.password !== confirmPassword) {
    //             throw new Error('Confirm Password not match')
    //         }
    //         return true;
    //     })
]


module.exports = { registerValidator }




