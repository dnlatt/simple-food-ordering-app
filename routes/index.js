/* Controllers */

const BaseController = require("../controllers/BaseController");
const FoodCategoryController = require('../controllers/FoodCategoryController');
const UserController = require('../controllers/UserController');
const CouponController = require('../controllers/CouponController');

/* Validators */
const { ValidateRequest } = require('../middleware/RequestValidator.js');
const { FoodCategoryRequest } = require('../validators/FoodCategoryRequest');
const { UserCreateRequest } = require('../validators/UserCreateRequest');
const { CouponRequest } = require('../validators/CouponRequest');
const { TableDeleteRequest } = require('../validators/TableDeleteRequest');

module.exports = (app) => {

    /* Base Controller */
    app.get('/', BaseController.index);


    /* User Start */

    // Fetch all Users
    app.get('/users/list/', UserController.list);
    // Create User
    app.post('/user/signup', UserCreateRequest(), ValidateRequest, UserController.create);
    // Update User
    app.patch('/user/:id', UserCreateRequest(), ValidateRequest, UserController.update);
    // Delete User
    app.delete('/user/:id', TableDeleteRequest(), ValidateRequest, UserController.destroy);

    /* User End */

    /* Food Category Start */

    // Fetch all Food Categories
    app.get('/foodcategory/list/', FoodCategoryController.list);
    // Create Food Category
    app.post('/foodcategory/', FoodCategoryRequest(), ValidateRequest, FoodCategoryController.create);
    // Update Food Category 
    app.patch('/foodcategory/:id', FoodCategoryRequest(), ValidateRequest, FoodCategoryController.update);
    // Delete Food Category
    app.delete('/foodcategory/:id', TableDeleteRequest(), ValidateRequest, FoodCategoryController.destroy);
    /* Food Category End */

    /* Coupon Start */

    // Fetch all Coupons
    app.get('/coupon/list/', CouponController.list);
    // Create Coupon
    app.post('/coupon/', CouponRequest(), ValidateRequest, CouponController.create);
    // Update Coupon 
    app.patch('/coupon/:id', CouponRequest(), ValidateRequest, CouponController.update);
    // Delete Coupon
    app.delete('/coupon/:id', TableDeleteRequest(), ValidateRequest, CouponController.destroy);

    /* Coupon End */

}