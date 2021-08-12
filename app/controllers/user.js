/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the operations of registration and login
 *
 * @description
 *
 * @file        : controllers/user.js
 * @overview    : controls user registration and login tasks
 * @module      : UserController
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 12-08-2021
 *********************************************************************/

const userService = require('../services/user');

const { userDataValidation } = require('../middleware/validation');

class UserController {
    /**
     * @description function written to register user
     * @param {*} A valid req is expected
     * @param {*} res
     */
    async registration(req, res) {
        try {
            let dataValidation = userDataValidation.validate(req.body);
            if (dataValidation.error) {
                // 403 - Invalid format
                return res.status(403).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
            const userCreated = await userService.createUserInfo(userData);
            res.send({success: true, message: "User registered!", data: userCreated});
            
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while registering user" });
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new UserController();

