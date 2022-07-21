const CouponService = require('../services/CouponService');
const { OK_STATUS_CODE, CREATED_STATUS_CODE, UNAUTHORIZED_STATUS_CODE, SERVER_ERROR_STATUS_CODE } = require('../helpers/globals');
const { destroy } = require('../repositories/BaseRepository');

module.exports = {


    async create(request, response) {
        const { errors, data, message } = await CouponService.create(request, response);

        if (errors) 
            return response.status(SERVER_ERROR_STATUS_CODE).json({ errors })
        else 
            return response.status(CREATED_STATUS_CODE).json({ data, message})
    },

    async list(request, response) {
        const {errors, data, message} = await CouponService.list(request, response);

        if (errors)
            return request.status(SERVER_ERROR_STATUS_CODE).json({ errors })
        else 
            return response.status(OK_STATUS_CODE).json({ data, message});
    }, 

    async destroy (request, response) {
        const {errors, message} = await CouponService.destroy(request);
        if (errors)
            return response.status(SERVER_ERROR_STATUS_CODE).json({ errors });
        else 
            return response.status(OK_STATUS_CODE).json({ message });
    }, 

    async update (request, response) {
        const {errors, data, message} = await CouponService.update(request);
        if (errors)
            return response.status(SERVER_ERROR_STATUS_CODE).json( {errors} );
        else 
            return response.status(OK_STATUS_CODE).json({ data, message });
    }


}