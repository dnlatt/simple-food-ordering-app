
const CouponRepository = require('../repositories/CouponRepository');

module.exports = {
    async create(request) {
        let fields = {
            couponCode: request.body.couponcode,
            expireDate: request.body.expiredate,
            discountPrice: request.body.discountprice,
        }
        const { errors, data, message } = await CouponRepository.create(fields, request);
        return { errors, data, message };
    },

    async list (request) {
        let { limit, offset, status } = request.query;
        let filter = null;
        if(status){
            filter = { status : status };
        }
        const { errors, data } = await CouponRepository.findAll(filter, limit, offset);
        return { errors, data };
    },

    async destroy(request) {
        const { id } = request.params;
        const { errors, message } = await CouponRepository.destroy ({id: id});
        return {errors, message};
    },

    async update(request) {
        const { id } = request.params;
        let fields = {
            couponCode: request.body.couponcode,
            expireDate: request.body.expiredate,
            discountPrice: request.body.discountprice,
        }
        const { errors, data, message } = await CouponRepository.update({ id: id }, fields);
        return { errors, data, message };
    }
}