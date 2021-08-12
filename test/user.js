/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node user.js
 *                2. If nodemon installed    cmd> npm test
 *
 * Purpose      : To test the API's
 *
 * @description : tests all the positive and negative cases
 *
 * @file        : test/user.js
 * @overview    : tests the HTTP methods with different possibilities
 * @module      : this is necessary to make sure the program works properly
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../server");
const userInputs = require("./user.json");

//assertion style
chai.should();
chai.use(chaiHttp);

/**
 * /POST request test
 * Positive and Negative - Registration of User Testing
 */
 describe('POST /register', () => {
    it('givenValidDataItShould_makePOSTRequestAndRegisterUser_andReturnsStatusCodeAs200', (done) => {
        let userData = userInputs.userCreatePos
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("User registered!");
                return done();
            });
    });

    it('givenInvalidFirstName_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegFirstName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidLastName_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegLastName
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                return done();
            });
    });

    it('givenInvalidEmail_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegEmail
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"email\" must be a valid email");
                return done();
            });
    });

    it('givenEmptyDataInPasswordField_andOtherValidData_failsToRegisterUser', (done) => {
        let userData = userInputs.userCreateNegPassword
        chai.request(server)
            .post('/register')
            .send(userData)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                return done();
            });
    });
});
