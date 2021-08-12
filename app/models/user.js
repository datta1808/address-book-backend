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
      return userSaved;
    } catch (error) {
      return error;
    }
  }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserModel();
