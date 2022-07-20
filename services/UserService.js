const { MSG_SUCCESS, MSG_FOOD_CATEGORIYNOT_INSERTED } = require('../helpers/constants');
const UserRepository = require('../repositories/UserRepository');
const bcrypt = require("bcrypt");

module.exports = {
    async create(request) {
        let hashedPassword = await bcrypt.hash(request.body.userpassword,10);
        let fields = {
            userName: request.body.username,
            userEmail: request.body.useremail,
            userPassword: hashedPassword,
            userRole: request.body.userrole,
        }
        const { errors, data, message } = await UserRepository.create(fields, request);
        return { errors, data, message };
    },

    async list (request) {
        let { limit, offset, status } = request.query;
        let filter = null;
        if(status){
            filter = { status : status };
        }
        const { errors, data } = await UserRepository.findAll(filter, limit, offset);
        return { errors, data };
    },

    async destroy(request) {
        const { id } = request.params;
        const { errors, message } = await UserRepository.destroy ({id: id});
        return {errors, message};
    },

    async update(request) {
        const { id } = request.params;
        let hashedPassword = await bcrypt.hash(request.body.userpassword,10);
        let fields = {
            userName: request.body.username,
            userEmail: request.body.useremail,
            userPassword: hashedPassword,
            userRole: request.body.userrole,
        }
        const { errors, data, message } = await UserRepository.update({ id: id }, fields);
        return { errors, data, message };
    }
}