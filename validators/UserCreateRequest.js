const { body } = require('express-validator');

const UserCreateRequest = () => {
    return [
        body('username').isString(),
        body('useremail').isEmail(),
        body('userpassword').isLength({ min: 8, max: 40 }),
        body('userrole').isNumeric()
    ];
};

module.exports = { UserCreateRequest };