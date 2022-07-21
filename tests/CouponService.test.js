const CouponService = require('../services/CouponService')
const { Coupon } = require("../models");

const { MAX_INT10_NUMBER } = require('../helpers/config');
const { DB_ERROR, NO_DATA_RECEIVED, NO_RECORD, SUCCESSFULLY_DELETED, SUCCESSFULLY_SAVED } = require('../helpers/modelErrors');
const { toBeWithin } = require('jest-extended');
expect.extend({ toBeWithin });

const mockRequest = (body, params, decoded, query, files, method) => ({
    body, //POST requestuest request.body
    params, //GET request.params
    decoded, //request.decoded
    query, // request.query
    files, //request.files
    method
});


const expectedFields = {
    id: expect.any(Number),
    couponCode: expect.any(String),
    expireDate: expect.any(String),
    discountPrice: expect.any(Number),
    updatedAt: expect.any(String),
    createdAt: expect.any(String),
};

const TEST_FOODCATEGORY = 'Jest Coupon- Test 1';

let CouponData = '';

beforeAll( async () => {
    CouponData = await Coupon.create({
        categoryName: "Food Category - Test 1"
    }).then( data => {
        return data;
    }).catch ( err => {
        console.log(err)
    })
})

/* afterAll( async () => {
    const CouponId = CouponData.id + 1;
    await Coupon.destroy({ where: {id: CouponId} });
    await Coupon.destroy({ where: {id: CouponId + 1} });
    await Coupon.destroy({ where: {id: CouponId + 2} });
    await CouponData.destroy(CouponData)
}); */

describe('coupon.create() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {
                couponcode: 'JESTTEST001',
                expiredate: '2022-08-20', 
                discountprice: '10'
            }, // request.body
            {}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await CouponService.create(request);

        expect(res).toMatchObject({
            data: expect.any(Object),
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('coupon.update() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are updated', async () => {
        const request = mockRequest(
            {
                couponcode: 'JESTTEST002',
                expiredate: '2023-09-20', 
                discountprice: '20'
            }, // request.body
            { id: CouponData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await CouponService.update(request);

        expect(res).toMatchObject({
            data: expect.any(Object),
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('coupon.delete() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {}, // request.body
            { id: CouponData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await CouponService.destroy(request);
        
        expect(res).toMatchObject({
            message: SUCCESSFULLY_DELETED
        });
    })
});