/* eslint-disable */

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
describe("POST /register", () => {
  it("givenValidData_itShouldRegisterUser_andReturnsStatusCodeAs200", (done) => {
    let userData = userInputs.userCreatePos;
    chai
      .request(server)
      .post("/register")
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("User registered!");
        return done();
      });
  });

  it("givenInvalidFirstName_andOtherValidData_failsToRegisterUser", (done) => {
    let userData = userInputs.userCreateNegFirstName;
    chai
      .request(server)
      .post("/register")
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql('"firstName" is not allowed to be empty');
        return done();
      });
  });

  it("givenInvalidLastName_andOtherValidData_failsToRegisterUser", (done) => {
    let userData = userInputs.userCreateNegLastName;
    chai
      .request(server)
      .post("/register")
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql('"lastName" is not allowed to be empty');
        return done();
      });
  });

  it("givenInvalidEmail_andOtherValidData_failsToRegisterUser", (done) => {
    let userData = userInputs.userCreateNegEmail;
    chai
      .request(server)
      .post("/register")
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql('"email" must be a valid email');
        return done();
      });
  });

  it("givenEmptyDataInPasswordField_andOtherValidData_failsToRegisterUser", (done) => {
    let userData = userInputs.userCreateNegPassword;
    chai
      .request(server)
      .post("/register")
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql('"password" is not allowed to be empty');
        return done();
      });
  });
});

/**
 * @description Test cases for User login.
 *              Contains both positive and negative cases.
 */
describe("POST - User Login", () => {
  it("givenValidEmailAndPassword_shouldLoginTheUser_andReturnToken", (done) => {
    const userCredentials = userInputs.userLoginPass;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("Login successful");
        err ? done(err) : done();
      });
  });

  it("givenInvalidEmail_AndValidPassword_shouldReturnError", (done) => {
    const userCredentials = userInputs.loginWrongEmail;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Invalid Username or Password");
        err ? done(err) : done();
      });
  });

  it("givenValidEmail_AndInValidPassword_shouldReturnError", (done) => {
    const userCredentials = userInputs.userLoginWrongPasswordFail;
    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.should.have
          .property("message")
          .eql("Invalid Username or Password");
        err ? done(err) : done();
      });
  });
});

//method to execute before further Test Cases
describe("ADDRESS BOOK API", () => {
  let token = "";

  beforeEach((done) => {
    const userData = userInputs.userLoginPass;
    chai
      .request(server)
      .post("/login")
      .send(userData)
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        if (err) return done(err);
        done();
      });
  });

  /**
   * @description: Test cases for creating new employee object with POST.
   *               Contains positive and negative cases.
   */
  describe("POST - Add New Contact", () => {
    it("givenUserDetails_whenValid_shouldAddNewContact", (done) => {
      const contactDetails = userInputs.addContactPass;
      chai
        .request(server)
        .post("/addContact")
        .send(contactDetails)
        .set("token", token) // authorization parameter is set
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Contact Created!");
          res.body.should.have.property("data").should.be.a("object");
          if (err) return done(err);
          done();
        });
    });

    it("givenUserDetails_whenNameIsInWrongFormat_shouldReturnError", (done) => {
      const contactDetails = userInputs.addContactInvalidNameFormat1;
      chai
        .request(server)
        .post("/addContact")
        .send(contactDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql(
              `\"firstName\" with value \"${contactDetails.firstName}\" fails to match the required pattern: /^[A-Z]{1}[\\sA-Za-z]{1,30}/`
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenNameIsLessThanThreeChars_shouldReturnError", (done) => {
      const contactDetails = userInputs.addContactInvalidNameFormat2;
      chai
        .request(server)
        .post("/addContact")
        .send(contactDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"firstName" length must be at least 2 characters long');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenNameIsNotAString_shouldReturnError", (done) => {
      const contactDetails = userInputs.addContactInvalidNameFormat4;
      chai
        .request(server)
        .post("/addContact")
        .send(contactDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"firstName" must be a string');
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenUserDetails_whenEmailIsInWrongFormat_shouldReturnError", (done) => {
      const contactDetails = userInputs.addContactInvalidEmailFormat;
      chai
        .request(server)
        .post("/addContact")
        .send(contactDetails)
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql('"email" must be a valid email');
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for retrieving all the contacts with GET.
   *              Contains positive and negative cases.
   */
  describe("GET - Retrieves All Data", () => {
    it("givenValidRequest_shouldReturn_AllTheContactsData", (done) => {
      chai
        .request(server)
        .get("/getContacts")
        .set("token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it("givenInValidToken_shouldReturnError", (done) => {
      chai
        .request(server)
        .get("/getContacts")
        .set("token", token + "1")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("invalid signature");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  /**
   * @description Test cases for updating the contacts by id with PUT.
   *              Contains positive and negative cases.
   */
  describe("PUT - Update Contact Data", () => {
    it("givenValidData_shouldUpdate_contactDataSuccessfully", (done) => {
      chai
        .request(server)
        .put(`/updateContact/${userInputs.getOnePass.id}`)
        .send(userInputs.updateEmployeePass)
        .set("token", token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          if (error) {
            return done(error);
          }
          done();
        });
    });

    /**
     * @description Test cases for deleting the contact by id with DELETE.
     *              Contains positive and negative cases.
     */
    describe("DELETE - Removes Contacts", () => {
      it("givenValidIDAndToken_shouldDelete_contactDataSuccessfully", (done) => {
        chai
          .request(server)
          .delete(`/deleteContact/${userInputs.deletePass.id}`)
          .set("token", token)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("success").eql(true);
            res.body.should.have
              .property("message")
              .eql("Contact deleted successfully!");
            if (error) {
              return done(error);
            }
            done();
          });
      });

      it("givenInValidID_andValidToken_shouldReturnErrorMessage", (done) => {
        chai
          .request(server)
          .delete(`/deleteContact/${userInputs.getOneFail.id}`)
          .set("token", token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            if (err) {
              return done(err);
            }
            done();
          });
      });
    });
  });
});
