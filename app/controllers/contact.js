/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Controls the CRUD operations
 *
 * @description
 *
 * @file        : controllers/contact.js
 * @overview    : controller module to control the requests
 * @module      : Controller
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 13-08-2021
 *********************************************************************/

const service = require("../services/contact.js");

const { contactValidator } = require("../middleware/validation");

class Controller {
  /**
   * function to call the create function from service.js (creates new contact)
   * @param {*} req
   * @param {*} res
   * @returns HTTP status and object
   */
  async addContact(req, res) {
    try {
      //validation
      const contactValidation = contactValidator.validate(req.body);
      if (contactValidation.error) {
        return res
          .status(400)
          .send({ message: contactValidation.error.details[0].message });
      }

      //Object for the new contact data
      const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email
      };

      //calling method to add new contact data
      const contactCreated = await service.addNewContact(newContact);
      res.send({
        success: true,
        message: "Contact Created!",
        data: contactCreated,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Some error occurred while creating Contact",
      });
    }
  }

  /**
   * function to call the getAllContacts function that gets all the data, from the service.js
   * @param {*} req
   * @param {*} res
   * @returns HTTP status and object
   */
  getAllContacts = (req, res) => {
    service
      .getAllContacts()
      .then((data) => {
        return res.send(data);
      })
      .catch((err) => {
        return res.send(err);
      });
  };

  /**
   * function to call the getOne function that gets the required contact data, from the service.js
   * @param {*} req
   * @param {*} res
   * @returns HTTP status and employee object
   */
  async getOneContact(req, res) {
    const contactId = req.params;
    try {
      const getContact = await service.getOne(contactId);
      res.json(getContact);
    } catch (err) {
      res.status(500).send({ message: err.message || "Some error occurred!" });
    }
  }

  /**
   * function to call the update function that updates the required contact data, from the service.js
   * @param {*} req 
   * @param {*} res 
   * @returns HTTP status and object
   */
   async updateContact(req, res) {
    try {
      //validation
      const updateValidation = contactValidator.validate(req.body);
      if (updateValidation.error) {
        return res
          .status(400)
          .send({ message: updateValidation.error.details[0].message });
      }

      //id param for updating exact contact
      const contactId = req.params;

      //contact updated details from client
      const updatedDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
      };

      //calling method to update contact data
      const updatedContact = await service.update(contactId, updatedDetails);
      res.send(updatedContact);
    } catch (err) {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while updating a contact!",
        });
    }
  }

  /**
   * function to call the deleteContactData function that deletes the required contact data, from the service.js
   * @param {*} req 
   * @param {*} res 
   * @returns HTTP status and object
   */
   deleteContact = (req, res) => {
    let contactId = req.params.contactId;
    service.deleteContactData(contactId, (error, data) => {
      return error
        ? res.status(400).send({
            success: false,
            message: "Error occured while deleting contact",
          })
        : res.send({
            success: true,
            message: "Contact deleted successfully!",
            data: data,
          });
    });
  };
}

//exporting the class
module.exports = new Controller();
