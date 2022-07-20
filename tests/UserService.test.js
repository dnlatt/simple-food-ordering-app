const UserService = require('../services/UserService')
const { User } = require("../models");

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
    userName: expect.any(String),
    userEmail: expect.any(String),
    userPassword: expect.any(String),
    userRole: expect.any(Number),
    updatedAt: expect.any(Date),
    createdAt: expect.any(Date),
};

const TEST_User = 'Jest Food Cateogry - Test 1';

let UserData = '';

beforeAll( async () => {
    UserData = await User.create({
        username: 'Jest Test',
        useremail: 'Jest_Tester@gmail.com',
        userpassword: 'J3$tP@$$w0rd',
        userrole: 2,
    }).then( data => {
        return data;
    }).catch ( err => {
        console.log(err)
    })
})



describe('User.create() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {
                username: 'test',
                useremail: 'tester@gmail.com',
                userpassword: 'P@$$w0rd',
                userrole: 2,
            }, // request.body
            {}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await UserService.create(request);

        expect(res).toMatchObject({
            data: expectedFields,
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('User.update() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are updated', async () => {
        const request = mockRequest(
            {
                username: 'Test Update',
                useremail: 'TesterUpdate@gmail.com',
                userpassword: 'P@$$w0rd',
                userrole: 2,
            }, // request.body
            { id: UserData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await UserService.update(request);

        expect(res).toMatchObject({
            data: expectedFields,
            message: SUCCESSFULLY_SAVED
        });
    })
});

describe('User.delete() >>> { errors, data, message} ', () =>  {
    it('Should return success if all data are valid', async () => {
        const request = mockRequest(
            {}, // request.body
            { id: UserData.id}, // request.params
            {}, //request.decoded
            {}, //request.query
            {},
            ''
        );
        
        const res = await UserService.destroy(request);
        
        expect(res).toMatchObject({
            message: SUCCESSFULLY_DELETED
        });
    })
});


afterAll( async () => {
    const UserId = UserData.id + 1;
    await User.destroy({ where: {id: UserId} });
    await User.destroy({ where: {id: UserId + 1} });
    await User.destroy({ where: {id: UserId + 2} });
    await UserData.destroy(UserData)
}); 