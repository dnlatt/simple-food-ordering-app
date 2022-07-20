
const { FoodCategory } = require('../models/');
const FoodCateogryTable = FoodCategory.tableName; 
const { findOne, findAndCountAll, destroy, update, create } = require('./BaseRepository');
const { DB_ERROR, NO_DATA_RECEIVED, NO_RECORD, SUCCESSFULLY_DELETED, SUCCESSFULLY_SAVED } = require('../helpers/modelErrors');

module.exports = {

    // Return all records 
    async findAll (criteria, limit, offset, sort = [['id', 'DESC']]) {
        return findAndCountAll(FoodCategory, criteria, [{ all: true }], null, sort, true, limit, offset);
    },

    // Create new record
    async create(fields, request) {
        let response = { errors: null, data: null};

        const { errors, data, message } = await create(FoodCategory, fields);

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

        const { errors, data, message }= await update(FoodCategory, criteria, fields)

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
        
        const { errors, message } = await destroy(FoodCategory, criteria);

        if (errors) {
            response.errors = errors;
        } else {
            response.message = message;
        }

        return response; 
    },

}

