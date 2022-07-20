
const { User } = require('../models');
const FoodCateogryTable = User.tableName; 
const { findOne, findAndCountAll, destroy, update, create } = require('./BaseRepository');
const { DB_ERROR, NO_DATA_RECEIVED, NO_RECORD, SUCCESSFULLY_DELETED, SUCCESSFULLY_SAVED } = require('../helpers/modelErrors');
const {MSG_ACCOUNT_EXISTS} = require("../helpers/constants");

module.exports = {

    // Return all records 
    async findAll (criteria, limit, offset, sort = [['id', 'DESC']]) {
        return findAndCountAll(User, criteria, [{ all: true }], null, sort, true, limit, offset);
    },

    // Create new record
    async create(fields, request) {
        let response = { errors: null, data: null};

        /* Check Email Exist */

        const { userEmail } = fields;

        const record = await User.findOne({
            where: {userEmail: userEmail}
        });

        if (record) {
            response.errors = MSG_ACCOUNT_EXISTS;
        }
        else {
            const { errors, data, message } = await create(User, fields);

            if (errors) {
                response.errors = errors;
            } else {
                response.message = message;
                response.data = data; 
            }
        }

        return response; 
    },

    // Update record 

    async update(criteria, fields) {
        let response = { errors: null, data: null, message: null }; 

        const { errors, data, message }= await update(User, criteria, fields)

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
        
        const { errors, message } = await destroy(User, criteria);

        if (errors) {
            response.errors = errors;
        } else {
            response.message = message;
        }

        return response; 
    },

}

