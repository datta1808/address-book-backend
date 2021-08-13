/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To contain express routes
 *
 * @description
 *
 * @file        : routes/routes.js
 * @overview    : Contains all the express routes
 * @module      : this is necessary to use HTTP methods
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

const userController = require("../controllers/user");

const contactController = require("../controllers/contact");

const helper = require("../middleware/helper");

module.exports = (app) => {

	// register new user
	app.post("/register", userController.registration);

	// user login
	app.post("/login", userController.login);

	// To create a new contact
	app.post("/addContact", helper.verifyToken, contactController.addContact);

	// Getting all the data from the server
	app.get('/getContacts', helper.verifyToken, contactController.getAllContacts);
  
	// Getting contact by id
	app.get('/getContact/:contactId', helper.verifyToken, contactController.getOneContact);

	// Updating the contact
	app.put('/updateContact/:contactId', helper.verifyToken, contactController.updateContact );

	// deleting the contact
	app.delete( '/deleteContact/:contactId', helper.verifyToken, contactController.deleteContact);

};  

