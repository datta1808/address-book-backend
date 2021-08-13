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

const helper = require("../middleware/helper");

// Require logger.js
const logger = require("../../config/logger");

class UserService {
	/**
   * @description function created to create user into database
   * @param {*} A valid userData is expected
   * @param {*} callBack
   */
	async createUserInfo(userData) {
		try {
			const createdUser = await userModel.createInfo(userData);
			logger.info("User registered successfully");
			return createdUser;
		} catch (error) {
			logger.error("Error while registering the new user");
			return error;
		}
	}

	/**
   * @description function created to login user
   * @param {*} A valid userData is expected
   * @param {*} callBack
   */
	userLogin(userCredentials, callback) {
		userModel.loginUser(userCredentials, (err, data) => {
			if (err) {
				return callback(err, null);
			}

			//check if the password matches
			if (helper.comparePassword(userCredentials.password, data.password)) {
				//create a token
				let token = helper.generateToken(userCredentials);
				logger.info("Token is generated");
				return !token
					? callback("Wrong password!", null)
					: callback(null, token);
			}
			logger.info("Invalid Credintials");
			return callback("Invalid Credentials", null);
		});
	}
}

//exporting the class to utilize or call function created in this class
module.exports = new UserService();
