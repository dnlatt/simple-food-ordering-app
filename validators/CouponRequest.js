const { body } = require('express-validator');

const CouponRequest = () => {
    return [
        body('couponcode').isString(),
        body('expiredate').isDate(),
        body('discountprice').isNumeric()
    ];
};

module.exports = { CouponRequest };