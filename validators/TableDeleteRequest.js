const { check } = require('express-validator');
const { MAX_INT10_NUMBER, LENGTH_MAXINT_MSG } = require('../helpers/config');
const TableDeleteRequest = () => {//delete - findOne()/destroy()
    return [
        check('id')
            .isInt({ min: 1, max: MAX_INT10_NUMBER }).withMessage(LENGTH_MAXINT_MSG),
    ];
};

module.exports = {
    TableDeleteRequest
};