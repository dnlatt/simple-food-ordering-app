const { body } = require('express-validator');

const UserLoginRequest = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8, max: 40 }),
    ];
};

module.exports = { UserLoginRequest };