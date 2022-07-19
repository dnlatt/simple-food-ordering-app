const { body } = require('express-validator');

const FoodCategoryRequest = () => {
    return [
        body('categoryname').isString(),
    ];
};

module.exports = { FoodCategoryRequest };