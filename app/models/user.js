/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describes the schema for user registration & login
 *
 * @description
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs registering user and authorizing
 * @module      : Registration
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

const mongoose = require("mongoose");
// Require logger.js
const logger = require("../../config/logger");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 'pre' acts as a middleware between userSchema & save() method
userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // hash the password using our new salt
  bcrypt.hash(user.password, saltRounds, function (error, hashPassword) {
    if (error) return next(error);

    // override the cleartext password with the hashed one
    user.password = hashPassword;
    next();
  });
});

// creating a collection & assigning it to a constant
const User = mongoose.model("User", userSchema);

//created a class to write functions
class UserModel {
  /**
   * @description function written to create user data into database
   * @param {*} A valid userData is expected
   * @param {*} callBack
   */
  async createInfo(userData) {
    try {
      const user = new User({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      });

      const userSaved = await user.save({});
      logger.info("User saved successfully");
      return userSaved;
    } catch (error) {
      logger.error("Error while saving the new user");
      return error;
    }
  }

  /**
   * @description checks if user is present and generates JWT token
   * @param {*} A valid userData is expected
   * @param {*} callBack
   */
   loginUser = (clientCredentials, callback) => {
    User.findOne({ email: clientCredentials.email }, (err, data) => {
      if (err) {
        logger.error("Error while login");
        return callback(err, null);
      }
      return !data
        ? callback("User not found with email", null)
        : callback(null, data);
    });
  };
}


//exporting the class to utilize or call function created in this class
module.exports = new UserModel();
