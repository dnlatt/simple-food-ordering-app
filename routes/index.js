/* Controllers */

const BaseController = require("../controllers/BaseController");
const FoodCategoryController = require('../controllers/FoodCategoryController')

/* Validators */
const { ValidateRequest } = require('../middleware/RequestValidator.js');
const { FoodCategoryRequest } = require('../validators/FoodCategoryRequest');
const { FoodCategoryDeleteRequest } = require('../validators/FoodCategoryDeleteRequest');

module.exports = (app) => {

    /* Base Controller */
    app.get('/', BaseController.index);

    /* Food Category Start */
    // Fetch all Food Categories
    app.get('/foodcategory/list/', FoodCategoryRequest(), ValidateRequest, FoodCategoryController.list);
    // Create Food Category
    app.post('/foodcategory/', FoodCategoryRequest(), ValidateRequest, FoodCategoryController.create);
    // Delete Food Category
    app.delete('/foodcategory/:id', FoodCategoryDeleteRequest(), ValidateRequest, FoodCategoryController.destroy);
    // Update Food Category 
    app.patch('/foodcategory/:id', FoodCategoryRequest(), ValidateRequest, FoodCategoryController.update);

    /* Food Category End */
}