/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> npm server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Encapsulates the applications business logic
 *
 * @description
 *
 * @file        : models/contact.js
 * @overview    : Provides schema for database and performs CRUD operations
 * @module      : Service
 * @author      : Dattatreya Bagale <bagaledatta18@gmail.com>
 * @version     : 1.0.0
 * @since       : 13-08-2021
 *********************************************************************/

const contactModel = require("../models/contact");

// Service Class
class Service {
  /**
   * @description function to add new contacts
   * @param {*} newContact
   */
  async addNewContact(newContact) {
    try {
      // method to create new contact object with given data
      const contactSaved = await contactModel.createContact(newContact);
      return contactSaved;
    } catch (err) {
      return err;
    }
  }

  /**
   * @description This function will fetch data from the database
   */
  getAllContacts() {
    //method to get all the contacts
    return contactModel
      .findAll()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * @description finding contact by id
   * @param {*} contactId
   */
  async getOne(contactId) {
    try {
      if (!contactId.contactId) {
        return res
          .status(404)
          .send({ message: `Contact with given id not found` });
      }
      // method to get contact data with id
      return await contactModel.getContactById(contactId.contactId);
    } catch (error) {
      return error;
    }
  }

  /**
   * @description updating contact by id
   * @param {*} contactId
   */
  async update(contactId, contactData) {
    try {
      //calling method to update contact
      return await contactModel.updateContactById(contactId, contactData);
    } catch (error) {
      return error;
    }
  }

  /**
     * @description delete contact by id
     * @param {*} contactId 
     * @param {*} callback 
     */
   deleteContactData = (contactId, callback) => {
    try {
      contactModel.deleteById(contactId, (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
    } catch (error) {
      return callback(error, null);
    }
  };
}

//exporting class
module.exports = new Service();
