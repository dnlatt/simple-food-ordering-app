const FoodCategoryService = require('../services/FoodCategoryService')
const { FoodCategory } = require("../models");

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
    categoryName: expect.any(String),
    updatedAt: expect.any(Date),
    createdAt: expect.any(Date),
};

const TEST_FOODCATEGORY = 'Jest Food Cateogry - Test 1';

let FoodCategoryData = '';

beforeAll( async () => {
    FoodCategoryData = await FoodCategory.create({
        categoryName: "Food Category - Test 1"
    }).then( data => {
        return data;
    }).catch ( err => {
        console.log(err)
    })
})

/* afterAll( async () => {
    const FoodCategoryId = FoodCategoryData.id + 1;
    await FoodCategory.destroy({ where: {id: FoodCategoryId} });
    await FoodCategory.destroy({ where: {id: FoodCategoryId + 1} });
    await FoodCategory.destroy({ where: {id: FoodCategoryId + 2} });
    await FoodCategoryData.destroy(FoodCategoryData)
}); */

describe('foodCategory.create() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {
                categoryname: 'Jest Food Cateogry - Test 1'
            }, // request.body
            {}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await FoodCategoryService.create(request);

        expect(res).toMatchObject({
            data: expectedFields,
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('foodCategory.update() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are updated', async () => {
        const request = mockRequest(
            {
                categoryname: 'Update Jest Food Cateogry - Test V1'
            }, // request.body
            { id: FoodCategoryData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await FoodCategoryService.update(request);

        expect(res).toMatchObject({
            data: expectedFields,
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('foodCategory.delete() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {}, // request.body
            { id: FoodCategoryData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await FoodCategoryService.destroy(request);
        
        expect(res).toMatchObject({
            message: SUCCESSFULLY_DELETED
        });
    })
});