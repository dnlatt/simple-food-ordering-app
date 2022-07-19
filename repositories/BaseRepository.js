const { DB_ERROR, NO_RECORD, NO_DATA_RECEIVED, SUCCESSFULLY_SAVED, SUCCESSFULLY_DELETED } = require('../helpers/modelErrors');
const { CSV_HARD_CAP } = require('../helpers/config');
const { ValidationError } = require('sequelize');
module.exports = {
    /**
     * Generic function to get one / findOne row in the table
     *
     * @param {*} 
     * @model : the model that you want to get the data from
     * @criteria : model condition of your query
     * @include :  sequlize model include , array format. sample: [{ all: true }], include: ['wheels', 'publications']
     * @atttributes : sequelize model attributes to change the fields in your resultset
     * @sort : resultset sorting, sample[['file_que_id', 'DESC']]
     * 
    *  @return json data
    *  response = { errors: null, data: null };
     * 
     */
    async findOne (model, criteria, include = null, attributes = null, sort = null, groupBy = null ){
        let response = { errors: null, data: null };
        try {
            
            const record = await model.findOne({
                attributes: attributes,
                where: criteria,
                include: include,
                order: sort,
                group: groupBy
            });
            response.data = record;
        } catch (e) {
            console.log('+++++++findOne(): ', e);
            response.errors = [{ err: DB_ERROR }];
        }
        return response;

    },
    /**
     * Generic function to get one row in the table
     *
     * @param {*}
     * @model : the model that you want to get the data from
     * @criteria : model condition of your query
     * @include :  sequlize model include , array format. sample: [{ all: true }], include: ['wheels', 'publications']
     * @atttributes : sequelize model attributes to change the fields in your resultset
     * @sort : resultset sorting, sample[['file_que_id', 'DESC']]
     *
     * @return response json
     * response = { errors: null, data: null };
     *
     */
    async findAndCountAll (model, criteria, include = null, attributes = null, sort = null, distinct = true, limit = 10, offset = 0, groupBy = null, raw = null ){
        let response = { errors: null, data: null };
        try {
            const records = await model.findAndCountAll({
                attributes: attributes,
                where: criteria,
                order: sort,
                group: groupBy,
                limit: limit,
                offset: offset,
                distinct: distinct,
                include: include,
                raw: raw
            });
            
            response.data = records;
            if(groupBy){
                for (const item of records.count){
                    item.totalPages = (item.count) ? Math.ceil(item.count / limit) : 0;
                    item.toExportBatches = (item.count) ? Math.ceil(item.count / CSV_HARD_CAP) : 0;
                }

            }else{
                response.data.totalPages = (records.count) ? Math.ceil(records.count / limit) : 0;
                response.data.toExportBatches = (records.count) ? Math.ceil(records.count / CSV_HARD_CAP) : 0;

            }
            
        } catch (e) {
            console.log('+++++++findAll(): ', e);
            response.errors = [{ err: DB_ERROR }];
        }
        return response;
    },

    /**
    * Generic function to get one row in the table
    *
    * @param {*}
    * @model : the model that you want to get the data from
    * @criteria : model condition of your query
    * @include :  sequlize model include , array format. sample: [{ all: true }], include: ['wheels', 'publications']
    * @atttributes : sequelize model attributes to change the fields in your resultset
    * @sort : resultset sorting, sample[['file_que_id', 'DESC']]
    *
    * @return response json
    * response = { errors: null, data: null };
    *
    */
    async findAll (model, criteria, include = null, attributes = null, sort = null, distinct = true, groupBy = null, raw = null) {
        let response = { errors: null, data: null };
        try {
            const records = await model.findAll({
                attributes: attributes,
                where: criteria,
                order: sort,
                group: groupBy,
                distinct: distinct,
                include: include,
                raw:raw
            });
            response.data = records;

        } catch (e) {
            console.log('+++++++findAll(): ', e);
            response.errors = [{ err: DB_ERROR }];
        }
        return response;
    },

    /**
    * Generic function to insert records into the database
    *
    * @param {*} 
    * @model : the model that you want to get the data from
    * @fields : json key value pair of fields to be inserted into the Database
    *
    * @return json data
    * response = { errors: null, data: null, message: null };
    * 
    */
    async create (model, fields) {
        const tableName = model.tableName;
        let response = { errors: null, data: null, message: null };
        if (Object.keys(fields).length === 0) {
            response.errors = [{ err: NO_DATA_RECEIVED }];
            return response;
        }else{
            try {
                const result = await model.create(fields);
                
                response.data = result;
                response.message = SUCCESSFULLY_SAVED;
                return response;

            } catch (e) {
                if (e instanceof ValidationError) {
                    const { message } = e.errors[0];
                    response.errors = [{ err: message }];
                } else {
                    response.errors = [{ err: DB_ERROR }];
                }
                return response;
            }
        }
    },
    /**
     * Generic function to update records into the database by primary key
     *
     * @param {*}
     * @model : the model that you want to get the data from
     * @criteria : model condition of your query
     * 
     * @sort : resultset sorting, sample[['file_que_id', 'DESC']]
     * 
     * @return json data
     * response = { errors: null, data: null, message: null };
     * 
    */
    async update (model, criteria, fields, sort = null) {
        const tableName = model.tableName;
        let response = { errors: null, data: null, message: null };
        if (!criteria) {
            response.errors = [{ err: NO_DATA_RECEIVED }];
            return response;
        } else {
            try {
                const record = await model.findOne({
                    where: criteria,
                    order: sort
                });
                if (record) {
                    const result = await record.update(fields);
                    response.message = SUCCESSFULLY_SAVED;
                    response.data = result;
                    // try {
                    //     const result = await model.update(fields, {where: criteria});
                    //     response.message = SUCCESSFULLY_SAVED;
                    //     response.data = record;
                    // } catch (error) {
                    //     response.errors = [{ err: DB_ERROR }];
                    // }
                    
                }
                else response.errors = [{ err: NO_RECORD }];

                return response;
            } catch (e) {
                if (e instanceof ValidationError) {
                    const { message } = e.errors[0];
                    response.errors = [{ err: message }];
                } else {
                    response.errors = [{ err: DB_ERROR }];
                }
                return response;
            }
        }
    },

    /**
     * Generic function to set the record status to in-active by primary key
     *
     * @param {*} 
     * @model : the model that you want to get the data from
     * @criteria : model condition of your query
     * @newStatus : json data of the new value. sample { status: 'inactive' }
     * 
     * @sort : resultset sorting, sample[['file_que_id', 'DESC']]
     * 
     * @return json data
     * response = { errors: null, message: null };
     * 
     */
    async destroy (model, criteria, sort = null) {
        const tableName = model.tableName;
        let response = { errors: null, message: null };
        if (!criteria) {
            response.errors = [{ err: NO_DATA_RECEIVED }];
            return response;
        }else{
            try {
                const record = await model.findOne({
                    where: criteria,
                    order: sort
                });
                if (record) {
                    const result = await record.destroy();
                    response.message = SUCCESSFULLY_DELETED;
                }
                else response.errors = [{ err: NO_RECORD }];
                return response;
            } catch (e) {
                if (e instanceof ValidationError) {
                    const { message } = e.errors[0];
                    response.errors = [{ err: message }];
                } else {
                    response.errors = [{ err: DB_ERROR }];
                }
                return response;
            }
        }
    },
};