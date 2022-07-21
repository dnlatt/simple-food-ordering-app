
const { Coupon } = require('../models');
const FoodCateogryTable = Coupon.tableName; 
const { findOne, findAndCountAll, destroy, update, create } = require('./BaseRepository');
const { DB_ERROR, NO_DATA_RECEIVED, NO_RECORD, SUCCESSFULLY_DELETED, SUCCESSFULLY_SAVED } = require('../helpers/modelErrors');
const {MSG_ACCOUNT_EXISTS} = require("../helpers/constants");

module.exports = {

    // Return all records 
    async findAll (criteria, limit, offset, sort = [['id', 'DESC']]) {
        return findAndCountAll(Coupon, criteria, [{ all: true }], null, sort, true, limit, offset);
    },

    // Create new record
    async create(fields, request) {
        
        let response = { errors: null, data: null};
        const { errors, data, message } = await create(Coupon, fields);

        if (errors) {
            response.errors = errors;
        } else {
            response.message = message;
            response.data = data; 
        }
        return response; 
    },

    // Update record 

    async update(criteria, fields) {
        let response = { errors: null, data: null, message: null }; 

        const { errors, data, message }= await update(Coupon, criteria, fields)

        if (errors) {
            response.errors = errors;
        } else {
            response.message = message;
            response.data = data; 
        }

        return response; 
    }, 

    // Delete record

    async destroy(criteria) {
        let response = {errors: null, message: null};
        
        const { errors, message } = await destroy(Coupon, criteria);

        if (errors) {
            response.errors = errors;
        } else {
            response.message = message;
        }

        return response; 
    },

}

