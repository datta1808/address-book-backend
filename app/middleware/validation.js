/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : User input data validation
 *
 * @description
 *
 * @file        : middleware/validation.js
 * @overview    : validates user input data
 * @module      : this is necessary to validate user input data
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

const joi = require("joi");

const userDataValidation = joi.object({
	firstName: joi
		.string()
		.pattern(new RegExp("^[A-Z]{1}[a-z]{1,30}"))
		.required(),
	lastName: joi.string().pattern(new RegExp("^[A-Z]{1}[a-z]{1,30}")).required(),
	email: joi.string().email().required(),
	password: joi
		.string()
		.pattern(
			new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
		)
		.required(),
});

const userLoginData = joi.object({
	email: joi
		.string()
		.email()
		.required()
		.pattern(
			new RegExp(
				"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
			)
		),
	password: joi
		.string()
		.pattern(
			new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
		)
		.required(),
});

module.exports = { userDataValidation, userLoginData };
