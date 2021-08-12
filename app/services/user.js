/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : services/user.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : This is necessary to perform CRUD operations
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

 const userModel = require("../models/user.js");

class UserService {
    /**
     * @description function created to create user into database
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    async createUserInfo(userData) {
        try {
            const createdUser = await userModel.createInfo(userData);
            return createdUser;
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserService();