const { MSG_SUCCESS, MSG_FOOD_CATEGORIYNOT_INSERTED } = require('../helpers/constants');
const { destroy } = require('../repositories/BaseRepository');

const FoodCategoryRepository = require('../repositories/FoodCategoryRepository');

module.exports = {
    async create(request) {

        let fields = {
            categoryName: request.body.categoryname,
        }
        const { errors, data, message } = await FoodCategoryRepository.create(fields, request);
        return { errors, data, message };
    },

    async list (request) {
        let { limit, offset, status } = request.query;
        let filter = null;
        if(status){
            filter = { status : status };
        }
        const { errors, data } = await FoodCategoryRepository.findAll(filter, limit, offset);
        return { errors, data };
    },

    async destroy(request) {
        const { id } = request.params;
        const { errors, message } = await FoodCategoryRepository.destroy ({id: id});
        return {errors, message};
    },

    async update(request) {
        const { id } = request.params;
        let fields = {
            categoryName: request.body.categoryname,
        }
        const { errors, data, message } = await FoodCategoryRepository.update({ id: id }, fields);
        return { errors, data, message };
    }
}